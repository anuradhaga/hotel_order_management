import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/events/[id]/menu - Fetch customized menu items for an event
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);

    const [rows]: any = await pool.query(
      `SELECT 
        emi.event_menu_item_id,
        emi.event_id,
        emi.item_id,
        emi.custom_price,
        emi.is_complimentary,
        emi.override_kitchen_dept,
        emi.display_order,
        emi.is_available,
        i.item_code,
        i.item_name,
        COALESCE(i.item_size, 'Regular') AS item_size,
        i.description,
        i.image_url,
        i.kitchen_dept AS default_kitchen_dept,
        COALESCE(emi.override_kitchen_dept, e.dedicated_kitchen_dept, i.kitchen_dept) AS effective_kitchen_dept,
        i.is_spicy,
        i.is_vegetarian,
        c.category_id,
        c.category_name,
        COALESCE(ip.min_price, 1500.00) AS catalog_price,
        CASE 
          WHEN emi.is_complimentary = 1 THEN 0.00
          WHEN emi.custom_price IS NOT NULL THEN emi.custom_price
          ELSE COALESCE(ip.min_price, 1500.00)
        END AS selling_price
      FROM event_menu_items emi
      JOIN events e ON emi.event_id = e.event_id
      JOIN items i ON emi.item_id = i.item_id
      LEFT JOIN item_categories c ON i.category_id = c.category_id
      LEFT JOIN (
        SELECT item_id, MIN(selling_price) AS min_price
        FROM item_prices
        WHERE is_current = 1
        GROUP BY item_id
      ) ip ON i.item_id = ip.item_id
      WHERE emi.event_id = ? AND i.is_active = 1
      ORDER BY emi.display_order ASC, c.display_order ASC, i.item_name ASC`,
      [eventId]
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error("Error fetching event menu:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/events/[id]/menu - Add or update customized items in the event menu
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);
    const body = await req.json();

    const {
      item_id,
      custom_price,
      is_complimentary = false,
      override_kitchen_dept,
      display_order = 0,
      is_available = true,
    } = body;

    if (!item_id) {
      return NextResponse.json(
        { success: false, error: "item_id is required" },
        { status: 400 }
      );
    }

    await pool.execute(
      `INSERT INTO event_menu_items 
        (event_id, item_id, custom_price, is_complimentary, override_kitchen_dept, display_order, is_available)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        custom_price = VALUES(custom_price),
        is_complimentary = VALUES(is_complimentary),
        override_kitchen_dept = VALUES(override_kitchen_dept),
        display_order = VALUES(display_order),
        is_available = VALUES(is_available)`,
      [
        eventId,
        item_id,
        custom_price !== undefined && custom_price !== "" ? custom_price : null,
        is_complimentary ? 1 : 0,
        override_kitchen_dept || null,
        display_order,
        is_available ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Event menu item configured successfully",
    });
  } catch (error: any) {
    console.error("Error saving event menu item:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]/menu - Remove item from event customized menu
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("item_id");

    if (!itemId) {
      return NextResponse.json(
        { success: false, error: "item_id is required" },
        { status: 400 }
      );
    }

    await pool.execute(
      "DELETE FROM event_menu_items WHERE event_id = ? AND item_id = ?",
      [eventId, itemId]
    );

    return NextResponse.json({
      success: true,
      message: "Item removed from event menu successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
