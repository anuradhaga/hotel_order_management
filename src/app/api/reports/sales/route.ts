import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "newest";

    const conditions: string[] = [];
    const params: any[] = [];

    if (startDate && startDate.trim()) {
      conditions.push("t.order_date >= ?");
      params.push(startDate.trim());
    }

    if (endDate && endDate.trim()) {
      conditions.push("t.order_date <= ?");
      params.push(endDate.trim());
    }

    if (category && category.trim() && category.trim().toLowerCase() !== "all" && category.trim().toLowerCase() !== "select") {
      conditions.push("LOWER(t.category_name) LIKE LOWER(?)");
      params.push(`%${category.trim()}%`);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        `(LOWER(t.category_name) LIKE LOWER(?) OR 
          DATE_FORMAT(t.order_date, '%d %b %Y') LIKE ?)`
      );
      params.push(term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let orderClause = "ORDER BY t.order_date DESC, totalAmount DESC";
    if (sortBy === "oldest") {
      orderClause = "ORDER BY t.order_date ASC, totalAmount DESC";
    } else if (sortBy === "highest") {
      orderClause = "ORDER BY totalAmount DESC, t.order_date DESC";
    } else if (sortBy === "lowest") {
      orderClause = "ORDER BY totalAmount ASC, t.order_date DESC";
    }

    const query = `
      SELECT 
        CONCAT(DATE_FORMAT(t.order_date, '%Y%m%d'), '_', t.category_id) AS rawId,
        DATE_FORMAT(t.order_date, '%d %b %Y') AS date,
        t.order_date AS rawDate,
        t.category_name AS category,
        t.category_id AS categoryId,
        CAST(SUM(t.quantity) AS SIGNED) AS itemsSold,
        CAST(COUNT(DISTINCT t.order_id) AS SIGNED) AS totalOrders,
        CAST(SUM(t.line_total) AS DECIMAL(10,2)) AS totalAmount,
        CONCAT('$', FORMAT(SUM(t.line_total), 2)) AS total,
        'Completed' AS status
      FROM (
        SELECT 
          DATE(o.created_at) AS order_date,
          c.category_id,
          c.category_name,
          oi.quantity,
          oi.line_total,
          oi.order_id
        FROM order_items oi
        JOIN items i ON oi.item_id = i.item_id
        JOIN item_categories c ON i.category_id = c.category_id
        JOIN orders o ON oi.order_id = o.order_id
      ) t
      ${whereClause}
      GROUP BY t.order_date, t.category_id, t.category_name
      ${orderClause}
    `;

    const [rows]: any[] = await pool.query(query, params);

    // Fetch all active categories for dropdown
    const [categoryRows]: any[] = await pool.query(`
      SELECT category_name 
      FROM item_categories 
      WHERE is_active = 1 
      ORDER BY display_order ASC
    `);

    // Assign sequential formatted salesId (#SA0016, #SA0015, etc.)
    const totalCount = rows.length;
    const formattedRows = rows.map((r: any, idx: number) => {
      const seq = Math.max(totalCount - idx, 1);
      return {
        ...r,
        salesId: `#SA${String(seq).padStart(4, "0")}`,
        itemsSold: String(r.itemsSold || 0),
        totalOrders: String(r.totalOrders || 0),
      };
    });

    const totalSalesAmount = rows.reduce((acc: number, r: any) => acc + Number(r.totalAmount || 0), 0);
    const totalItemsSold = rows.reduce((acc: number, r: any) => acc + Number(r.itemsSold || 0), 0);

    return NextResponse.json({
      success: true,
      data: formattedRows,
      totalCount: formattedRows.length,
      totalSalesFormatted: `$${totalSalesAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalItemsSold,
      categories: categoryRows.map((c: any) => c.category_name).filter(Boolean),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch sales report" },
      { status: 500 }
    );
  }
}
