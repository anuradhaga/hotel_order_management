import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);

    const [orderRows]: any[] = await pool.query(
      `SELECT 
        o.*,
        outl.outlet_name,
        outl.outlet_code,
        outl.outlet_type,
        rt.table_number,
        rt.dining_zone,
        ev.event_name,
        ev.location_name as event_location
       FROM orders o
       LEFT JOIN outlets outl ON o.outlet_id = outl.outlet_id
       LEFT JOIN restaurant_tables rt ON o.table_id = rt.table_id
       LEFT JOIN events ev ON o.event_id = ev.event_id
       WHERE o.order_id = ?`,
      [orderId]
    );

    if (!orderRows.length) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const order = orderRows[0];

    // Fetch order items
    const [items]: any[] = await pool.query(
      `SELECT 
        oi.*,
        i.item_name,
        i.item_code,
        i.kitchen_dept,
        i.is_spicy,
        i.is_vegetarian,
        c.category_name
       FROM order_items oi
       JOIN items i ON oi.item_id = i.item_id
       LEFT JOIN item_categories c ON i.category_id = c.category_id
       WHERE oi.order_id = ?
       ORDER BY oi.round_number ASC, oi.order_item_id ASC`,
      [orderId]
    );

    // Fetch payments
    const [payments]: any[] = await pool.query(
      `SELECT p.*, u.full_name as cashier_name
       FROM payments p
       LEFT JOIN users u ON p.cashier_user_id = u.user_id
       WHERE p.order_id = ?
       ORDER BY p.payment_id DESC`,
      [orderId]
    );

    // Fetch OTP if Mode A
    const [otpRows]: any[] = await pool.query(
      `SELECT * FROM otp_transactions WHERE order_id = ? ORDER BY otp_id DESC LIMIT 1`,
      [orderId]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        items,
        payments,
        otp: otpRows[0] || null,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = parseInt(id, 10);
    const body = await req.json();
    const { order_status } = body;

    const validStatuses = [
      "DRAFT",
      "OTP_PENDING",
      "CONFIRMED",
      "QUEUED",
      "PREPARING",
      "PREPARED",
      "READY",
      "COLLECTED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!order_status || !validStatuses.includes(order_status)) {
      return NextResponse.json(
        { success: false, error: `Invalid order status. Allowed: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const [existing]: any[] = await pool.query(
      "SELECT table_id, operating_mode FROM orders WHERE order_id = ?",
      [orderId]
    );
    if (!existing.length) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    await pool.execute(
      "UPDATE orders SET order_status = ? WHERE order_id = ?",
      [order_status, orderId]
    );

    // If marked ready or prepared, update item statuses
    if (order_status === "PREPARED" || order_status === "READY") {
      await pool.execute(
        "UPDATE order_items SET item_status = 'PREPARED' WHERE order_id = ? AND item_status != 'SERVED'",
        [orderId]
      );
    } else if (order_status === "COLLECTED" || order_status === "COMPLETED") {
      await pool.execute(
        "UPDATE order_items SET item_status = 'SERVED' WHERE order_id = ?",
        [orderId]
      );
    }

    // If cancelled and associated with table, reset table
    if (order_status === "CANCELLED" && existing[0].table_id) {
      await pool.execute(
        "UPDATE restaurant_tables SET current_status = 'AVAILABLE', active_order_id = NULL WHERE table_id = ?",
        [existing[0].table_id]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${order_status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
