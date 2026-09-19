import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const categoryId = searchParams.get("category_id");
    const discountType = searchParams.get("discount_type");

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== "all") {
      if (status.toLowerCase() === "active") {
        conditions.push("c.is_active = 1 AND c.end_date >= CURDATE()");
      } else if (status.toLowerCase() === "expired" || status.toLowerCase() === "inactive") {
        conditions.push("(c.is_active = 0 OR c.end_date < CURDATE())");
      }
    }

    if (categoryId && categoryId !== "all") {
      if (categoryId === "null" || categoryId === "0") {
        conditions.push("c.category_id IS NULL");
      } else {
        conditions.push("c.category_id = ?");
        params.push(Number(categoryId));
      }
    }

    if (discountType && discountType !== "all") {
      conditions.push("c.discount_type = ?");
      params.push(discountType);
    }

    if (search && String(search).trim()) {
      const term = `%${String(search).trim()}%`;
      conditions.push(
        "(c.coupon_code LIKE ? OR cat.category_name LIKE ? OR c.discount_type LIKE ?)"
      );
      params.push(term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        c.coupon_id,
        c.coupon_id AS id,
        c.coupon_id AS row_key,
        c.coupon_code,
        c.coupon_code AS Coupon_Code,
        c.category_id,
        COALESCE(cat.category_name, 'All Categories') AS Valid_Category,
        COALESCE(cat.category_name, 'All Categories') AS category_name,
        c.discount_type,
        c.discount_type AS Discount_Type,
        c.discount_amount,
        c.discount_amount AS discount_amount_raw,
        CASE 
          WHEN c.discount_type = 'Percentage' THEN CONCAT(TRIM(TRAILING '.00' FROM c.discount_amount), '%')
          ELSE CONCAT('LKR ', FORMAT(c.discount_amount, 2))
        END AS Discount_Amount,
        DATE_FORMAT(c.start_date, '%Y-%m-%d') AS start_date,
        DATE_FORMAT(c.end_date, '%Y-%m-%d') AS end_date,
        CONCAT(DATE_FORMAT(c.start_date, '%d %b %Y'), ' - ', DATE_FORMAT(c.end_date, '%d %b %Y')) AS Duration,
        c.is_active,
        CASE 
          WHEN c.is_active = 0 THEN 'Expired'
          WHEN c.end_date < CURDATE() THEN 'Expired'
          ELSE 'Active'
        END AS Status,
        DATE_FORMAT(c.created_at, '%d %b %Y') AS created_at
      FROM coupons c
      LEFT JOIN item_categories cat ON c.category_id = cat.category_id
      ${whereClause}
      ORDER BY c.coupon_id DESC
    `;

    const [rows]: any[] = await pool.query(query, params);

    // Fetch categories for category dropdown selector
    const [categories]: any[] = await pool.query(`
      SELECT category_id, category_name 
      FROM item_categories 
      ORDER BY category_name ASC
    `);

    return NextResponse.json({
      success: true,
      data: rows,
      categories,
      totalCount: rows.length,
    });
  } catch (error: any) {
    console.error("GET /api/coupons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      coupon_code,
      category_id,
      discount_type = "Percentage",
      discount_amount,
      start_date,
      end_date,
      is_active = 1,
    } = body;

    if (!coupon_code || !coupon_code.trim()) {
      return NextResponse.json(
        { success: false, error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const cleanCode = coupon_code.trim().toUpperCase();

    // Check unique coupon code
    const [existing]: any[] = await pool.query(
      "SELECT coupon_id FROM coupons WHERE coupon_code = ?",
      [cleanCode]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Coupon code '${cleanCode}' already exists.` },
        { status: 400 }
      );
    }

    const amount = parseFloat(discount_amount);
    if (isNaN(amount) || amount < 0) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid positive discount amount" },
        { status: 400 }
      );
    }

    if (discount_type === "Percentage" && amount > 100) {
      return NextResponse.json(
        { success: false, error: "Percentage discount cannot exceed 100%" },
        { status: 400 }
      );
    }

    if (!start_date || !end_date) {
      return NextResponse.json(
        { success: false, error: "Start date and Expiry date are required" },
        { status: 400 }
      );
    }

    const catId = category_id && category_id !== "all" && category_id !== "null"
      ? Number(category_id)
      : null;

    const [result]: any[] = await pool.query(
      `INSERT INTO coupons 
        (coupon_code, category_id, discount_type, discount_amount, start_date, end_date, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        cleanCode,
        catId,
        discount_type === "Fixed Amount" ? "Fixed Amount" : "Percentage",
        amount,
        start_date,
        end_date,
        is_active ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Coupon created successfully",
      coupon_id: result.insertId,
    });
  } catch (error: any) {
    console.error("POST /api/coupons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create coupon" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      coupon_id,
      id,
      coupon_code,
      category_id,
      discount_type,
      discount_amount,
      start_date,
      end_date,
      is_active,
    } = body;

    const targetId = coupon_id || id;
    if (!targetId) {
      return NextResponse.json(
        { success: false, error: "Coupon ID is required" },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (coupon_code !== undefined) {
      const cleanCode = coupon_code.trim().toUpperCase();
      // Check unique
      const [existing]: any[] = await pool.query(
        "SELECT coupon_id FROM coupons WHERE coupon_code = ? AND coupon_id != ?",
        [cleanCode, targetId]
      );
      if (existing.length > 0) {
        return NextResponse.json(
          { success: false, error: `Coupon code '${cleanCode}' already exists.` },
          { status: 400 }
        );
      }
      updates.push("coupon_code = ?");
      params.push(cleanCode);
    }

    if (category_id !== undefined) {
      const catId = category_id && category_id !== "all" && category_id !== "null"
        ? Number(category_id)
        : null;
      updates.push("category_id = ?");
      params.push(catId);
    }

    if (discount_type !== undefined) {
      updates.push("discount_type = ?");
      params.push(discount_type === "Fixed Amount" ? "Fixed Amount" : "Percentage");
    }

    if (discount_amount !== undefined) {
      const amount = parseFloat(discount_amount);
      if (isNaN(amount) || amount < 0) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid positive discount amount" },
          { status: 400 }
        );
      }
      updates.push("discount_amount = ?");
      params.push(amount);
    }

    if (start_date !== undefined) {
      updates.push("start_date = ?");
      params.push(start_date);
    }

    if (end_date !== undefined) {
      updates.push("end_date = ?");
      params.push(end_date);
    }

    if (is_active !== undefined) {
      updates.push("is_active = ?");
      params.push(is_active ? 1 : 0);
    }

    if (updates.length > 0) {
      params.push(targetId);
      await pool.query(
        `UPDATE coupons SET ${updates.join(", ")} WHERE coupon_id = ?`,
        params
      );
    }

    return NextResponse.json({
      success: true,
      message: "Coupon updated successfully",
    });
  } catch (error: any) {
    console.error("PUT /api/coupons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const couponId = searchParams.get("coupon_id") || searchParams.get("id");

    if (!couponId) {
      return NextResponse.json(
        { success: false, error: "Coupon ID is required" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM coupons WHERE coupon_id = ?", [couponId]);

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/coupons error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
