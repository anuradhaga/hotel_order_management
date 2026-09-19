import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const itemId = searchParams.get("item_id");

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== "all") {
      const activeVal = String(status).toLowerCase() === "active" ? 1 : 0;
      conditions.push("a.is_active = ?");
      params.push(activeVal);
    }

    if (itemId && itemId !== "all") {
      conditions.push("a.item_id = ?");
      params.push(Number(itemId));
    }

    if (search && String(search).trim()) {
      const term = `%${String(search).trim()}%`;
      conditions.push("(a.addon_name LIKE ? OR i.item_name LIKE ? OR a.description LIKE ?)");
      params.push(term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // 1. Fetch Addons
    const addonsQuery = `
      SELECT 
        a.addon_id,
        a.addon_id AS id,
        a.addon_id AS row_key,
        a.item_id,
        COALESCE(i.item_name, 'General Item') AS Item,
        COALESCE(i.item_name, 'General Item') AS item_name,
        i.item_code,
        i.image_url AS item_image,
        a.addon_name AS Addon,
        a.addon_name,
        a.price,
        a.price AS price_raw,
        CONCAT('LKR ', FORMAT(COALESCE(a.price, 0), 2)) AS Price,
        a.description,
        a.image_url,
        a.is_active,
        CASE WHEN a.is_active = 1 THEN 'Active' ELSE 'Inactive' END AS Status,
        CASE WHEN a.is_active = 1 THEN 'Active' ELSE 'Inactive' END AS status,
        DATE_FORMAT(a.created_at, '%d %b %Y') AS created_at
      FROM item_addons a
      LEFT JOIN items i ON a.item_id = i.item_id
      ${whereClause}
      ORDER BY a.addon_id DESC
    `;

    const [addonsRows]: any[] = await pool.query(addonsQuery, params);

    // 2. Fetch Active Items for the dropdown selector
    const [itemsList]: any[] = await pool.query(`
      SELECT 
        item_id,
        item_id AS value,
        item_name,
        item_name AS label,
        item_code,
        COALESCE(NULLIF(image_url, ''), 'assets/img/items/default-food.svg') AS image
      FROM items
      WHERE is_active = 1
      ORDER BY item_name ASC
    `);

    return NextResponse.json({
      success: true,
      data: addonsRows,
      items: itemsList,
      totalCount: addonsRows.length,
    });
  } catch (error: any) {
    console.error("GET /api/addons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch addons" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      item_id,
      addon_name,
      price = 0,
      description = "",
      image_url = null,
      is_active = 1,
    } = body;

    if (!addon_name || !addon_name.trim()) {
      return NextResponse.json(
        { success: false, error: "Addon name is required" },
        { status: 400 }
      );
    }

    if (!item_id) {
      return NextResponse.json(
        { success: false, error: "Item selection is required" },
        { status: 400 }
      );
    }

    const cleanName = addon_name.trim();
    const cleanPrice = parseFloat(price) || 0;

    const [result]: any[] = await pool.query(
      `INSERT INTO item_addons 
        (item_id, addon_name, price, description, image_url, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        Number(item_id),
        cleanName,
        cleanPrice,
        description ? description.trim() : null,
        image_url || null,
        is_active ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Addon created successfully",
      addon_id: result.insertId,
    });
  } catch (error: any) {
    console.error("POST /api/addons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create addon" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      addon_id,
      id,
      item_id,
      addon_name,
      price,
      description,
      image_url,
      is_active,
    } = body;

    const targetId = addon_id || id;
    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Addon ID is required" },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (item_id !== undefined) {
      updates.push("item_id = ?");
      params.push(Number(item_id));
    }
    if (addon_name !== undefined) {
      updates.push("addon_name = ?");
      params.push(addon_name.trim());
    }
    if (price !== undefined) {
      updates.push("price = ?");
      params.push(parseFloat(price) || 0);
    }
    if (description !== undefined) {
      updates.push("description = ?");
      params.push(description.trim());
    }
    if (image_url !== undefined) {
      updates.push("image_url = ?");
      params.push(image_url || null);
    }
    if (is_active !== undefined) {
      updates.push("is_active = ?");
      params.push(is_active ? 1 : 0);
    }

    if (updates.length > 0) {
      params.push(targetId);
      await pool.query(
        `UPDATE item_addons SET ${updates.join(", ")} WHERE addon_id = ?`,
        params
      );
    }

    return NextResponse.json({
      success: true,
      message: "Addon updated successfully",
    });
  } catch (error: any) {
    console.error("PUT /api/addons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update addon" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const addonId = searchParams.get("addon_id") || searchParams.get("id");

    if (!addonId) {
      return NextResponse.json(
        { success: false, error: "Addon ID is required" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM item_addons WHERE addon_id = ?", [addonId]);

    return NextResponse.json({
      success: true,
      message: "Addon deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/addons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete addon" },
      { status: 500 }
    );
  }
}
