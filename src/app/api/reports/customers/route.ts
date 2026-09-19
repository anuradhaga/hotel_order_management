import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const customer = searchParams.get("customer");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "highest";

    const conditions: string[] = [];
    const params: any[] = [];

    if (startDate && startDate.trim()) {
      conditions.push("DATE(o.created_at) >= ?");
      params.push(startDate.trim());
    }

    if (endDate && endDate.trim()) {
      conditions.push("DATE(o.created_at) <= ?");
      params.push(endDate.trim());
    }

    if (customer && customer.trim() && customer.trim().toLowerCase() !== "all" && customer.trim().toLowerCase() !== "select") {
      conditions.push("LOWER(COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer')) LIKE LOWER(?)");
      params.push(`%${customer.trim()}%`);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        `(LOWER(COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer')) LIKE LOWER(?) OR 
          COALESCE(o.customer_mobile, '') LIKE ?)`
      );
      params.push(term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let orderClause = "ORDER BY totalSpent DESC";
    if (sortBy === "lowest") {
      orderClause = "ORDER BY totalSpent ASC";
    } else if (sortBy === "most_orders") {
      orderClause = "ORDER BY totalOrders DESC, totalSpent DESC";
    } else if (sortBy === "newest") {
      orderClause = "ORDER BY lastOrderDate DESC";
    } else if (sortBy === "name") {
      orderClause = "ORDER BY customerName ASC";
    }

    const query = `
      SELECT 
        t.customerName AS customer,
        t.customerMobile AS mobile,
        COUNT(DISTINCT t.order_id) AS totalOrders,
        CAST(SUM(t.net_payable) AS DECIMAL(10,2)) AS totalSpent,
        CONCAT('$', FORMAT(SUM(t.net_payable), 2)) AS total,
        MAX(t.created_at) AS lastOrderDate,
        DATE_FORMAT(MAX(t.created_at), '%d %b %Y') AS lastOrderFormatted
      FROM (
        SELECT 
          o.order_id,
          o.created_at,
          COALESCE(o.net_payable, 0) AS net_payable,
          COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer') AS customerName,
          COALESCE(o.customer_mobile, '') AS customerMobile
        FROM orders o
        LEFT JOIN payments p ON o.order_id = p.order_id
        ${whereClause}
      ) t
      GROUP BY t.customerName, t.customerMobile
      ${orderClause}
    `;

    const [rows]: any[] = await pool.query(query, params);

    // Assign sequential customer IDs (#CUS0016, #CUS0015, etc.)
    const totalCount = rows.length;
    const formattedRows = rows.map((r: any, idx: number) => {
      const seq = Math.max(totalCount - idx, 1);
      const ordersNum = Number(r.totalOrders || 0);
      return {
        id: String(idx + 1),
        Customer_ID: `#CUS${String(seq).padStart(4, "0")}`,
        customer: r.customer,
        mobile: r.mobile,
        ordersCount: ordersNum,
        total_orders: ordersNum === 1 ? "1 Order" : `${ordersNum} Orders`,
        total: r.total,
        totalSpent: Number(r.totalSpent || 0),
        rawDate: r.lastOrderDate,
        lastOrderDate: r.lastOrderFormatted,
      };
    });

    // Distinct customer names for filter dropdown
    const [customerListRows]: any[] = await pool.query(`
      SELECT DISTINCT COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer') AS customer_name
      FROM orders o
      LEFT JOIN payments p ON o.order_id = p.order_id
      WHERE COALESCE(p.guest_name, o.customer_mobile) IS NOT NULL
      ORDER BY customer_name ASC
    `);

    const totalRevenue = rows.reduce((acc: number, r: any) => acc + Number(r.totalSpent || 0), 0);
    const totalOrdersCount = rows.reduce((acc: number, r: any) => acc + Number(r.totalOrders || 0), 0);

    return NextResponse.json({
      success: true,
      data: formattedRows,
      totalCount: formattedRows.length,
      totalRevenueFormatted: `$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalOrdersCount,
      customers: customerListRows.map((c: any) => c.customer_name).filter(Boolean),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch customer report" },
      { status: 500 }
    );
  }
}
