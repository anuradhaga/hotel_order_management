import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get("dept"); // e.g., 'BANQUET_KITCHEN', 'GRILL', 'MAIN_KITCHEN', 'PASTRY', 'BAR'
    const event_id = searchParams.get("event_id"); // filter by specific special event

    let orderSql = `
      SELECT 
        o.order_id,
        o.order_number,
        o.operating_mode,
        o.order_status,
        o.pickup_token,
        o.guest_count,
        o.event_id,
        o.created_at,
        o.updated_at,
        outl.outlet_name,
        outl.outlet_code,
        rt.table_number,
        rt.dining_zone,
        ev.event_name,
        ev.event_code,
        ev.dedicated_kitchen_dept,
        TIMESTAMPDIFF(MINUTE, o.created_at, NOW()) as elapsed_minutes,
        TIMESTAMPDIFF(SECOND, o.created_at, NOW()) as elapsed_seconds
      FROM orders o
      LEFT JOIN outlets outl ON o.outlet_id = outl.outlet_id
      LEFT JOIN restaurant_tables rt ON o.table_id = rt.table_id
      LEFT JOIN events ev ON o.event_id = ev.event_id
      WHERE o.order_status IN ('QUEUED', 'PREPARING', 'PREPARED', 'READY')
    `;
    const orderParams: any[] = [];

    if (event_id) {
      orderSql += " AND o.event_id = ?";
      orderParams.push(event_id);
    }

    orderSql += " ORDER BY o.created_at ASC";

    // Fetch active kitchen orders
    const [orders]: any[] = await pool.query(orderSql, orderParams);

    // Fetch items for each active order
    const enrichedTickets = await Promise.all(
      orders.map(async (ord: any) => {
        let itemQuery = `
          SELECT 
            oi.order_item_id,
            oi.round_number,
            oi.quantity,
            oi.cooking_notes,
            oi.item_status,
            oi.routed_kitchen_dept,
            i.item_name,
            i.item_code,
            COALESCE(oi.routed_kitchen_dept, i.kitchen_dept) AS kitchen_dept,
            i.is_spicy,
            i.is_vegetarian
          FROM order_items oi
          JOIN items i ON oi.item_id = i.item_id
          WHERE oi.order_id = ?
        `;
        const params: any[] = [ord.order_id];
        if (dept) {
          itemQuery += " AND COALESCE(oi.routed_kitchen_dept, i.kitchen_dept) = ?";
          params.push(dept);
        }
        itemQuery += " ORDER BY oi.round_number ASC, oi.order_item_id ASC";

        const [items]: any[] = await pool.query(itemQuery, params);

        // Compute SLA status
        const elapsed = ord.elapsed_minutes || 0;
        let sla_status: "GREEN" | "AMBER" | "RED_FLASHING";
        if (elapsed <= 10) {
          sla_status = "GREEN";
        } else if (elapsed <= 20) {
          sla_status = "AMBER";
        } else {
          sla_status = "RED_FLASHING";
        }

        return {
          ...ord,
          sla_status,
          items,
        };
      })
    );

    // Filter out tickets that don't have items for the selected dept (if filtered)
    const result = dept
      ? enrichedTickets.filter((t) => t.items.length > 0)
      : enrichedTickets;

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, next_status, item_id } = body;

    if (!order_id || !next_status) {
      return NextResponse.json(
        { success: false, error: "order_id and next_status are required" },
        { status: 400 }
      );
    }

    if (item_id) {
      // Update individual item preparation status
      await pool.execute(
        "UPDATE order_items SET item_status = ? WHERE order_id = ? AND item_id = ?",
        [next_status, order_id, item_id]
      );
    } else {
      // Update whole order status
      await pool.execute(
        "UPDATE orders SET order_status = ? WHERE order_id = ?",
        [next_status, order_id]
      );

      // Cascade to items
      if (next_status === "PREPARING") {
        await pool.execute(
          "UPDATE order_items SET item_status = 'PREPARING' WHERE order_id = ? AND item_status = 'QUEUED'",
          [order_id]
        );
      } else if (next_status === "PREPARED") {
        await pool.execute(
          "UPDATE order_items SET item_status = 'PREPARED' WHERE order_id = ? AND item_status != 'SERVED'",
          [order_id]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Kitchen ticket updated to ${next_status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
