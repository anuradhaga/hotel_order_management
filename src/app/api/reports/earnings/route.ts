import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const customer = searchParams.get("customer");
    const paymentMethod = searchParams.get("paymentMethod");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "newest";

    const conditions: string[] = [];
    const params: any[] = [];

    if (startDate && startDate.trim()) {
      conditions.push("DATE(COALESCE(p.created_at, o.created_at)) >= ?");
      params.push(startDate.trim());
    }

    if (endDate && endDate.trim()) {
      conditions.push("DATE(COALESCE(p.created_at, o.created_at)) <= ?");
      params.push(endDate.trim());
    }

    if (customer && customer.trim() && customer.trim().toLowerCase() !== "all") {
      conditions.push(
        "LOWER(COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer')) LIKE LOWER(?)"
      );
      params.push(`%${customer.trim()}%`);
    }

    if (paymentMethod && paymentMethod.trim() && paymentMethod.trim().toLowerCase() !== "all") {
      conditions.push(
        "REPLACE(LOWER(COALESCE(p.payment_method, 'Cash')), '_', ' ') = REPLACE(LOWER(?), '_', ' ')"
      );
      params.push(paymentMethod.trim());
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        `(o.order_number LIKE ? OR 
          COALESCE(p.guest_name, '') LIKE ? OR 
          COALESCE(o.customer_mobile, '') LIKE ? OR 
          COALESCE(p.payment_method, '') LIKE ? OR
          CONCAT('#ERN', LPAD(COALESCE(p.payment_id, o.order_id), 4, '0')) LIKE ?)`
      );
      params.push(term, term, term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    let orderClause = "ORDER BY COALESCE(p.created_at, o.created_at) DESC";
    if (sortBy === "oldest") {
      orderClause = "ORDER BY COALESCE(p.created_at, o.created_at) ASC";
    } else if (sortBy === "highest") {
      orderClause = "ORDER BY COALESCE(p.payable_amount, o.net_payable, 0) DESC";
    } else if (sortBy === "lowest") {
      orderClause = "ORDER BY COALESCE(p.payable_amount, o.net_payable, 0) ASC";
    }

    const query = `
      SELECT 
        CONCAT('ord_', o.order_id, '_pay_', COALESCE(p.payment_id, 0)) AS id,
        CONCAT('#ERN', LPAD(COALESCE(p.payment_id, o.order_id + 50), 4, '0')) AS earningId,
        o.order_id AS orderIdNumber,
        CONCAT('#', o.order_id) AS orderIdFormatted,
        o.order_number AS orderNumber,
        DATE_FORMAT(COALESCE(p.created_at, o.created_at), '%d %b %Y') AS date,
        COALESCE(p.created_at, o.created_at) AS rawDate,
        CASE 
          WHEN o.operating_mode = 'DINE_IN' THEN 'Dine In'
          WHEN o.operating_mode = 'ROOM_DELIVERY' THEN 'Room Service'
          WHEN o.operating_mode = 'OUTLET_COUNTER' THEN 'Take Away'
          WHEN o.operating_mode = 'BANQUET_EVENT' THEN 'Banquet'
          ELSE 'Dine In'
        END AS type,
        COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer') AS customer,
        COALESCE(p.payment_method, 'Cash') AS payment,
        CAST(COALESCE(p.payable_amount, o.net_payable, 0) AS DECIMAL(10,2)) AS amount,
        CONCAT('$', FORMAT(COALESCE(p.payable_amount, o.net_payable, 0), 2)) AS total,
        CASE 
          WHEN p.payment_status = 'SETTLED' OR o.order_status = 'COMPLETED' THEN 'Completed'
          WHEN o.order_status = 'CANCELLED' THEN 'Cancelled'
          ELSE 'Pending'
        END AS status
      FROM orders o
      LEFT JOIN payments p ON o.order_id = p.order_id
      ${whereClause}
      ${orderClause}
    `;

    const [rows]: any[] = await pool.query(query, params);

    // Fetch distinct filter options from database (unfiltered by current search so user can always see options)
    const [customerRows]: any[] = await pool.query(`
      SELECT DISTINCT COALESCE(p.guest_name, o.customer_mobile, 'Walk-in Customer') AS customer_name
      FROM orders o
      LEFT JOIN payments p ON o.order_id = p.order_id
      WHERE COALESCE(p.guest_name, o.customer_mobile) IS NOT NULL
      ORDER BY customer_name ASC
    `);

    const [paymentRows]: any[] = await pool.query(`
      SELECT DISTINCT COALESCE(p.payment_method, 'Cash') AS method
      FROM orders o
      LEFT JOIN payments p ON o.order_id = p.order_id
      WHERE p.payment_method IS NOT NULL
      ORDER BY method ASC
    `);

    const totalSum = rows.reduce((acc: number, r: any) => acc + Number(r.amount || 0), 0);

    return NextResponse.json({
      success: true,
      data: rows,
      totalCount: rows.length,
      totalEarningsFormatted: `$${totalSum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      customers: customerRows.map((c: any) => c.customer_name).filter(Boolean),
      paymentMethods: paymentRows.map((p: any) => p.method).filter(Boolean),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch earnings report" },
      { status: 500 }
    );
  }
}
