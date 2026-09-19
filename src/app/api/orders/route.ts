import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { calculateHospitalityTaxes } from "@/lib/taxEngine";
import {
  generateOrderNumber,
  generateTrackingToken,
  generatePickupToken,
  generateOtpCode,
  hashOtpCode,
} from "@/lib/otpEngine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const mode = searchParams.get("mode");
    const outlet_id = searchParams.get("outlet_id");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    let sql = `
      SELECT 
        o.*,
        outl.outlet_name,
        outl.outlet_code,
        rt.table_number,
        rt.dining_zone,
        ev.event_name,
        (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.order_id) as total_items,
        (SELECT MAX(round_number) FROM order_items oi WHERE oi.order_id = o.order_id) as max_round
      FROM orders o
      LEFT JOIN outlets outl ON o.outlet_id = outl.outlet_id
      LEFT JOIN restaurant_tables rt ON o.table_id = rt.table_id
      LEFT JOIN events ev ON o.event_id = ev.event_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      sql += " AND o.order_status = ?";
      params.push(status);
    }
    if (mode) {
      sql += " AND o.operating_mode = ?";
      params.push(mode);
    }
    if (outlet_id) {
      sql += " AND o.outlet_id = ?";
      params.push(outlet_id);
    }

    sql += " ORDER BY o.created_at DESC LIMIT ?";
    params.push(limit);

    const [orders] = await pool.query(sql, params);
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const body = await req.json();
    const {
      operating_mode, // 'OUTLET_COUNTER' or 'DINE_IN'
      outlet_id,
      event_id,
      table_id,
      customer_mobile,
      waiter_user_id,
      guest_count = 1,
      items, // Array of { item_id, quantity, unit_price, cooking_notes, round_number }
      discount_amount = 0,
      existing_order_id, // If appending a round to an existing open table order
      notes,
    } = body;

    if (!operating_mode || !outlet_id || !items || !items.length) {
      return NextResponse.json(
        { success: false, error: "Missing required order fields: operating_mode, outlet_id, items" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    let targetOrderId: number;
    let orderNumber: string;
    let trackingToken: string;
    let pickupToken: string | null = null;
    let simulatedOtp: string | null = null;

    if (existing_order_id) {
      // Mode B: Appending a round to an existing order (e.g. Round 2 Mains)
      targetOrderId = Number(existing_order_id);
      const [existingOrderRows]: any[] = await connection.execute(
        "SELECT * FROM orders WHERE order_id = ? FOR UPDATE",
        [targetOrderId]
      );
      if (!existingOrderRows.length) {
        await connection.rollback();
        return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
      }
      orderNumber = existingOrderRows[0].order_number;
      trackingToken = existingOrderRows[0].tracking_token;
      pickupToken = existingOrderRows[0].pickup_token;

      // Determine round number
      const [roundRows]: any[] = await connection.execute(
        "SELECT COALESCE(MAX(round_number), 0) + 1 as next_round FROM order_items WHERE order_id = ?",
        [targetOrderId]
      );
      const nextRound = roundRows[0]?.next_round || 2;

      let eventDedicatedKitchen: string | null = null;
      if (existingOrderRows[0]?.event_id) {
        const [evRows]: any = await connection.execute(
          "SELECT dedicated_kitchen_dept FROM events WHERE event_id = ?",
          [existingOrderRows[0].event_id]
        );
        if (evRows.length > 0 && evRows[0].dedicated_kitchen_dept) {
          eventDedicatedKitchen = evRows[0].dedicated_kitchen_dept;
        }
      }

      // Insert new round items
      for (const itm of items) {
        const lineTotal = Number(itm.quantity) * Number(itm.unit_price);
        const routedDept = itm.routed_kitchen_dept || eventDedicatedKitchen || null;
        await connection.execute(
          `INSERT INTO order_items (order_id, item_id, round_number, quantity, unit_price, line_total, cooking_notes, routed_kitchen_dept, item_status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'QUEUED')`,
          [
            targetOrderId,
            itm.item_id,
            itm.round_number || nextRound,
            itm.quantity,
            itm.unit_price,
            lineTotal,
            itm.cooking_notes || null,
            routedDept,
          ]
        );
      }

      // Recalculate totals for the entire master order
      const [allLines]: any[] = await connection.execute(
        "SELECT SUM(line_total) as grand_subtotal FROM order_items WHERE order_id = ?",
        [targetOrderId]
      );
      const grandSubtotal = Number(allLines[0]?.grand_subtotal || 0);

      const taxes = calculateHospitalityTaxes({
        subtotal: grandSubtotal,
        discountAmount: Number(discount_amount) || Number(existingOrderRows[0].discount_amount) || 0,
      });

      await connection.execute(
        `UPDATE orders 
         SET subtotal_amount = ?, discount_amount = ?, sc_amount = ?, vat_amount = ?, net_payable = ?
         WHERE order_id = ?`,
        [
          taxes.subtotal,
          taxes.discountAmount,
          taxes.serviceChargeAmount,
          taxes.vatAmount,
          taxes.netPayable,
          targetOrderId,
        ]
      );
    } else {
      // Creating a brand new order
      orderNumber = generateOrderNumber();
      trackingToken = generateTrackingToken();

      // Calculate initial subtotal
      let itemsSubtotal = 0;
      for (const itm of items) {
        itemsSubtotal += Number(itm.quantity) * Number(itm.unit_price);
      }

      const taxes = calculateHospitalityTaxes({
        subtotal: itemsSubtotal,
        discountAmount: Number(discount_amount) || 0,
      });

      let initialStatus: string;
      if (operating_mode === "OUTLET_COUNTER") {
        if (!event_id && !customer_mobile) {
          await connection.rollback();
          return NextResponse.json(
            { success: false, error: "Customer mobile number is mandatory for counter orders (FR-OUT-002)" },
            { status: 400 }
          );
        }
        // If it's a Special Event order, release straight to kitchen queue without OTP block
        initialStatus = event_id ? "QUEUED" : "OTP_PENDING";
        pickupToken = generatePickupToken();
      } else {
        // Mode B Restaurant Dine-In
        initialStatus = "QUEUED"; // Directly release to kitchen queue
      }

      const [orderResult]: any = await connection.execute(
        `INSERT INTO orders 
         (order_number, operating_mode, outlet_id, event_id, table_id, customer_mobile, tracking_token, pickup_token, order_status, subtotal_amount, discount_amount, sc_amount, vat_amount, net_payable, guest_count, waiter_user_id, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderNumber,
          operating_mode,
          outlet_id,
          event_id || null,
          table_id || null,
          customer_mobile || null,
          trackingToken,
          pickupToken,
          initialStatus,
          taxes.subtotal,
          taxes.discountAmount,
          taxes.serviceChargeAmount,
          taxes.vatAmount,
          taxes.netPayable,
          guest_count || 1,
          waiter_user_id || null,
          notes || null,
        ]
      );

      targetOrderId = orderResult.insertId;

      let eventDedicatedKitchen: string | null = null;
      if (event_id) {
        const [evRows]: any = await connection.execute(
          "SELECT dedicated_kitchen_dept FROM events WHERE event_id = ?",
          [event_id]
        );
        if (evRows.length > 0 && evRows[0].dedicated_kitchen_dept) {
          eventDedicatedKitchen = evRows[0].dedicated_kitchen_dept;
        }
      }

      // Insert order items
      for (const itm of items) {
        const lineTotal = Number(itm.quantity) * Number(itm.unit_price);
        const routedDept = itm.routed_kitchen_dept || eventDedicatedKitchen || null;
        await connection.execute(
          `INSERT INTO order_items (order_id, item_id, round_number, quantity, unit_price, line_total, cooking_notes, routed_kitchen_dept, item_status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'QUEUED')`,
          [
            targetOrderId,
            itm.item_id,
            itm.round_number || 1,
            itm.quantity,
            itm.unit_price,
            lineTotal,
            itm.cooking_notes || null,
            routedDept,
          ]
        );
      }

      // If Mode A Counter (non-event): Generate 6-digit cryptographic OTP (FR-OUT-003)
      if (operating_mode === "OUTLET_COUNTER" && !event_id) {
        simulatedOtp = generateOtpCode();
        const otpHash = hashOtpCode(simulatedOtp);
        const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

        await connection.execute(
          `INSERT INTO otp_transactions (order_id, mobile_number, otp_code_plain, otp_code_hash, expiry_time, sms_status)
           VALUES (?, ?, ?, ?, ?, 'SENT')`,
          [targetOrderId, customer_mobile, simulatedOtp, otpHash, expiryDate]
        );
      }

      // If Mode B Dine-In: Update table status to SEATED and link active_order_id
      if (operating_mode === "DINE_IN" && table_id) {
        await connection.execute(
          `UPDATE restaurant_tables 
           SET current_status = 'SEATED', active_order_id = ? 
           WHERE table_id = ?`,
          [targetOrderId, table_id]
        );
      }
    }

    await connection.commit();

    return NextResponse.json({
      success: true,
      data: {
        order_id: targetOrderId,
        order_number: orderNumber,
        operating_mode,
        order_status: operating_mode === "OUTLET_COUNTER" ? "OTP_PENDING" : "QUEUED",
        tracking_token: trackingToken,
        pickup_token: pickupToken,
        customer_mobile: customer_mobile || null,
        simulated_otp: simulatedOtp, // Provided for instant testing display in dev
        tracking_url: `/track/${trackingToken}`,
      },
    });
  } catch (error: any) {
    await connection.rollback();
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
