import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { maskPhoneNumber } from "@/lib/otpEngine";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ success: false, error: "Tracking token is required" }, { status: 400 });
    }

    const [orderRows]: any[] = await pool.query(
      `SELECT 
        o.order_id,
        o.order_number,
        o.operating_mode,
        o.pickup_token,
        o.customer_mobile,
        o.order_status,
        o.subtotal_amount,
        o.discount_amount,
        o.sc_amount,
        o.vat_amount,
        o.net_payable,
        o.created_at,
        o.updated_at,
        outl.outlet_name,
        outl.outlet_type,
        ev.event_name,
        ev.location_name as event_location
       FROM orders o
       LEFT JOIN outlets outl ON o.outlet_id = outl.outlet_id
       LEFT JOIN events ev ON o.event_id = ev.event_id
       WHERE o.tracking_token = ?`,
      [token]
    );

    if (!orderRows.length) {
      return NextResponse.json(
        { success: false, error: "Order not found with provided tracking token" },
        { status: 404 }
      );
    }

    const order = orderRows[0];

    // Compute progress milestone step (0 to 3)
    let milestone_step = 0;
    let milestone_text = "Order Confirmed";
    if (order.order_status === "QUEUED" || order.order_status === "CONFIRMED") {
      milestone_step = 0;
      milestone_text = "Order Confirmed & In Queue";
    } else if (order.order_status === "PREPARING") {
      milestone_step = 1;
      milestone_text = "Chefs are Preparing Your Meal";
    } else if (order.order_status === "PREPARED" || order.order_status === "READY") {
      milestone_step = 2;
      milestone_text = "Order Ready for Pickup!";
    } else if (order.order_status === "COLLECTED" || order.order_status === "COMPLETED") {
      milestone_step = 3;
      milestone_text = "Order Collected. Enjoy your meal!";
    }

    // Fetch items
    const [items]: any[] = await pool.query(
      `SELECT 
        oi.quantity,
        oi.unit_price,
        oi.line_total,
        oi.cooking_notes,
        oi.round_number,
        i.item_name,
        i.item_code
       FROM order_items oi
       JOIN items i ON oi.item_id = i.item_id
       WHERE oi.order_id = ?
       ORDER BY oi.round_number ASC, oi.order_item_id ASC`,
      [order.order_id]
    );

    return NextResponse.json({
      success: true,
      data: {
        order_number: order.order_number,
        pickup_token: order.pickup_token,
        masked_phone: maskPhoneNumber(order.customer_mobile),
        order_status: order.order_status,
        milestone_step,
        milestone_text,
        outlet_name: order.outlet_name,
        event_name: order.event_name,
        created_at: order.created_at,
        subtotal_amount: order.subtotal_amount,
        discount_amount: order.discount_amount,
        sc_amount: order.sc_amount,
        vat_amount: order.vat_amount,
        net_payable: order.net_payable,
        items,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
