import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getItemsServerData } from "@/lib/items";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category_id = searchParams.get("category_id");
    const status = searchParams.get("status");
    const is_vegetarian = searchParams.get("is_vegetarian");
    const sortBy = searchParams.get("sortBy") || "id_asc";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = Math.max(1, Number(searchParams.get("pageSize")) || 20);

    const result = await getItemsServerData({
      page,
      pageSize,
      search,
      category_id,
      status,
      is_vegetarian,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      data: result.items,
      categories: result.categories,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
      page: result.page,
      pageSize: result.pageSize,
    });
  } catch (error: any) {
    console.error("GET /api/items error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch items" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      item_name,
      item_code,
      item_size = "Regular",
      category_id,
      selling_price = 0,
      sizes,
      description = "",
      kitchen_dept = "MAIN_KITCHEN",
      is_vegetarian = 0,
      is_spicy = 0,
      is_active = 1,
      image_url,
    } = body;

    if (!item_name || !item_name.trim()) {
      return NextResponse.json(
        { success: false, error: "Item name is required" },
        { status: 400 }
      );
    }

    const cleanName = item_name.trim();
    const cleanCode =
      item_code?.trim() ||
      `ITM-${Date.now().toString().slice(-4)}`;

    // Prepare sizes list
    let finalSizes: Array<{ size_name: string; selling_price: number }> = [];
    if (Array.isArray(sizes) && sizes.length > 0) {
      finalSizes = sizes.map((s: any) => ({
        size_name: (s.size_name || s.size || "Regular").trim(),
        selling_price: parseFloat(s.selling_price ?? s.price) || 0,
      }));
    } else {
      finalSizes = [
        {
          size_name: (item_size || "Regular").trim(),
          selling_price: parseFloat(selling_price) || 0,
        },
      ];
    }

    const primarySize = finalSizes[0].size_name;

    // Insert into items
    const [result]: any[] = await pool.query(
      `INSERT INTO items 
        (item_name, item_code, item_size, category_id, description, kitchen_dept, is_vegetarian, is_spicy, is_active, image_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        cleanName,
        cleanCode,
        primarySize,
        category_id || 1,
        description,
        kitchen_dept,
        is_vegetarian ? 1 : 0,
        is_spicy ? 1 : 0,
        is_active ? 1 : 0,
        image_url || null,
      ]
    );

    const newItemId = result.insertId;

    // Insert into item_prices for each specified size & price
    for (const sz of finalSizes) {
      await pool.query(
        `INSERT INTO item_prices 
          (item_id, selling_price, size_name, effective_date, is_current)
         VALUES (?, ?, ?, NOW(), 1)`,
        [newItemId, sz.selling_price, sz.size_name]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item created successfully",
      item_id: newItemId,
    });
  } catch (error: any) {
    console.error("POST /api/items error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create item" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      item_id,
      item_name,
      item_code,
      item_size,
      category_id,
      selling_price,
      sizes,
      description,
      kitchen_dept,
      is_vegetarian,
      is_spicy,
      is_active,
      image_url,
    } = body;

    if (!item_id) {
      return NextResponse.json(
        { success: false, error: "Item ID is required" },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (item_name !== undefined) {
      updates.push("item_name = ?");
      params.push(item_name.trim());
    }
    if (item_code !== undefined) {
      updates.push("item_code = ?");
      params.push(item_code.trim());
    }
    if (item_size !== undefined) {
      updates.push("item_size = ?");
      params.push(item_size.trim());
    } else if (Array.isArray(sizes) && sizes.length > 0) {
      updates.push("item_size = ?");
      params.push((sizes[0].size_name || sizes[0].size || "Regular").trim());
    }
    if (category_id !== undefined) {
      updates.push("category_id = ?");
      params.push(category_id);
    }
    if (description !== undefined) {
      updates.push("description = ?");
      params.push(description);
    }
    if (kitchen_dept !== undefined) {
      updates.push("kitchen_dept = ?");
      params.push(kitchen_dept);
    }
    if (is_vegetarian !== undefined) {
      updates.push("is_vegetarian = ?");
      params.push(is_vegetarian ? 1 : 0);
    }
    if (is_spicy !== undefined) {
      updates.push("is_spicy = ?");
      params.push(is_spicy ? 1 : 0);
    }
    if (is_active !== undefined) {
      updates.push("is_active = ?");
      params.push(is_active ? 1 : 0);
    }
    if (image_url !== undefined) {
      updates.push("image_url = ?");
      params.push(image_url);
    }

    if (updates.length > 0) {
      params.push(item_id);
      await pool.query(
        `UPDATE items SET ${updates.join(", ")} WHERE item_id = ?`,
        params
      );
    }

    // Update sizes and selling prices if provided
    if (Array.isArray(sizes) && sizes.length > 0) {
      // Mark old prices as not current
      await pool.query(
        "UPDATE item_prices SET is_current = 0, end_date = NOW() WHERE item_id = ? AND is_current = 1",
        [item_id]
      );
      // Insert new current prices for each size
      for (const sz of sizes) {
        const pNum = parseFloat(sz.selling_price ?? sz.price) || 0;
        const sName = (sz.size_name || sz.size || "Regular").trim();
        await pool.query(
          `INSERT INTO item_prices (item_id, selling_price, size_name, effective_date, is_current)
           VALUES (?, ?, ?, NOW(), 1)`,
          [item_id, pNum, sName]
        );
      }
    } else if (selling_price !== undefined) {
      const priceNum = parseFloat(selling_price) || 0;
      const sName = (item_size || "Regular").trim();
      // Mark old prices as not current
      await pool.query(
        "UPDATE item_prices SET is_current = 0, end_date = NOW() WHERE item_id = ? AND is_current = 1",
        [item_id]
      );
      // Insert new current price
      await pool.query(
        `INSERT INTO item_prices (item_id, selling_price, size_name, effective_date, is_current)
         VALUES (?, ?, ?, NOW(), 1)`,
        [item_id, priceNum, sName]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item updated successfully",
    });
  } catch (error: any) {
    console.error("PUT /api/items error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const item_id = searchParams.get("item_id") || searchParams.get("id");

    if (!item_id) {
      return NextResponse.json(
        { success: false, error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Soft delete / delete
    await pool.query("UPDATE items SET is_active = 0 WHERE item_id = ?", [item_id]);

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/items error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete item" },
      { status: 500 }
    );
  }
}
