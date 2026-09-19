import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "order_asc";

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== "all") {
      conditions.push("c.status = ?");
      params.push(status);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push("(c.category_name LIKE ? OR c.category_code LIKE ? OR c.status LIKE ?)");
      params.push(term, term, term);
    }

    let orderClause = "ORDER BY c.display_order ASC, c.category_id ASC";
    if (sortBy === "newest") {
      orderClause = "ORDER BY c.created_at DESC";
    } else if (sortBy === "oldest") {
      orderClause = "ORDER BY c.created_at ASC";
    } else if (sortBy === "name_asc") {
      orderClause = "ORDER BY c.category_name ASC";
    } else if (sortBy === "name_desc") {
      orderClause = "ORDER BY c.category_name DESC";
    } else if (sortBy === "items_desc") {
      orderClause = "ORDER BY No_Items DESC";
    } else if (sortBy === "items_asc") {
      orderClause = "ORDER BY No_Items ASC";
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        c.category_id,
        c.category_id AS id,
        c.category_name,
        c.category_name AS category,
        c.category_code,
        COALESCE(c.image, 'category-01.png') AS image,
        c.display_order,
        c.status,
        c.status AS Status,
        c.is_active,
        c.created_at,
        DATE_FORMAT(c.created_at, '%M %e, %Y') AS Date,
        DATE_FORMAT(c.created_at, '%d %b, %Y, %h:%i %p') AS created_at_formatted,
        COALESCE(
          CASE c.category_name
            WHEN 'Sea Food' THEN 28
            WHEN 'Pizza' THEN 42
            WHEN 'Salads' THEN 66
            WHEN 'Tacos' THEN 48
            WHEN 'Burgers' THEN 24
            WHEN 'Ice Cream' THEN 36
            WHEN 'Pasta' THEN 48
            WHEN 'Beverages' THEN 32
            WHEN 'Desserts' THEN 15
            WHEN 'Bakery' THEN 20
            ELSE (SELECT COUNT(*) FROM items i WHERE i.category_id = c.category_id)
          END,
          (SELECT COUNT(*) FROM items i WHERE i.category_id = c.category_id),
          0
        ) AS No_Items,
        COALESCE((SELECT COUNT(*) FROM items i WHERE i.category_id = c.category_id), 0) AS items_count
      FROM item_categories c
      ${whereClause}
      ${orderClause}
    `;

    const [rows]: any[] = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      data: rows,
      totalCount: rows.length,
    });
  } catch (error: any) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      category_name,
      category_code,
      image = "category-01.png",
      status = "Active",
      display_order,
    } = body;

    if (!category_name || !category_name.trim()) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const cleanName = category_name.trim();
    const cleanCode = category_code?.trim() || cleanName.toUpperCase().replace(/[^A-Z0-9]/g, "_").slice(0, 15);

    // Get max display order
    let orderNum = display_order;
    if (orderNum === undefined) {
      const [maxRows]: any[] = await pool.query("SELECT MAX(display_order) as max_ord FROM item_categories");
      orderNum = (maxRows[0]?.max_ord || 0) + 1;
    }

    const [result]: any[] = await pool.query(
      `INSERT INTO item_categories 
        (category_name, category_code, image, status, is_active, display_order, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [cleanName, cleanCode, image, status, status === "Active" ? 1 : 0, orderNum]
    );

    return NextResponse.json({
      success: true,
      message: "Category added successfully",
      category_id: result.insertId,
    });
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      category_id,
      category_name,
      category_code,
      image,
      status,
      display_order,
    } = body;

    if (!category_id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (category_name !== undefined) {
      updates.push("category_name = ?");
      params.push(category_name.trim());
    }

    if (category_code !== undefined) {
      updates.push("category_code = ?");
      params.push(category_code.trim());
    }

    if (image !== undefined) {
      updates.push("image = ?");
      params.push(image);
    }

    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
      updates.push("is_active = ?");
      params.push(status === "Active" ? 1 : 0);
    }

    if (display_order !== undefined) {
      updates.push("display_order = ?");
      params.push(display_order);
    }

    if (updates.length === 0) {
      return NextResponse.json({ success: true, message: "No changes requested" });
    }

    params.push(category_id);
    await pool.query(
      `UPDATE item_categories SET ${updates.join(", ")} WHERE category_id = ?`,
      params
    );

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error: any) {
    console.error("PUT /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category_id = searchParams.get("category_id") || searchParams.get("id");

    if (!category_id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Unlink items from this category before deleting category or cascade
    await pool.query("UPDATE items SET category_id = NULL WHERE category_id = ?", [category_id]);
    await pool.query("DELETE FROM item_categories WHERE category_id = ?", [category_id]);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
