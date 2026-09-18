import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM item_categories WHERE is_active = 1 ORDER BY display_order ASC"
    );

    const [items] = await pool.query(`
      SELECT 
        i.item_id,
        i.category_id,
        i.item_code,
        i.item_name,
        i.description,
        i.image_url,
        i.kitchen_dept,
        i.is_spicy,
        i.is_vegetarian,
        i.is_active,
        ip.selling_price
      FROM items i
      LEFT JOIN item_prices ip ON i.item_id = ip.item_id AND ip.is_current = 1
      WHERE i.is_active = 1
      ORDER BY i.category_id ASC, i.item_name ASC
    `);

    return NextResponse.json({
      success: true,
      categories,
      items,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
