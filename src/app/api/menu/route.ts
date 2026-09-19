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
        COALESCE(i.item_size, 'Regular') AS item_size,
        i.description,
        i.image_url,
        i.kitchen_dept,
        i.is_spicy,
        i.is_vegetarian,
        i.is_active,
        COALESCE(ip.min_price, 1500.00) AS selling_price
      FROM items i
      LEFT JOIN (
        SELECT item_id, MIN(selling_price) AS min_price
        FROM item_prices
        WHERE is_current = 1
        GROUP BY item_id
      ) ip ON i.item_id = ip.item_id
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
