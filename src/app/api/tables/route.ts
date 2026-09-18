import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        rt.table_id,
        rt.table_number,
        rt.seating_capacity,
        rt.dining_zone,
        rt.current_status,
        rt.active_order_id,
        o.order_number,
        o.guest_count,
        o.order_status,
        o.net_payable,
        o.waiter_user_id,
        u.full_name as waiter_name,
        o.created_at as order_created_at
      FROM restaurant_tables rt
      LEFT JOIN orders o ON rt.active_order_id = o.order_id
      LEFT JOIN users u ON o.waiter_user_id = u.user_id
      ORDER BY rt.table_id ASC
    `);

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { table_id, current_status, active_order_id } = body;

    if (!table_id || !current_status) {
      return NextResponse.json(
        { success: false, error: "table_id and current_status are required" },
        { status: 400 }
      );
    }

    await pool.execute(
      `UPDATE restaurant_tables 
       SET current_status = ?, active_order_id = ? 
       WHERE table_id = ?`,
      [current_status, active_order_id ?? null, table_id]
    );

    return NextResponse.json({
      success: true,
      message: `Table status updated to ${current_status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
