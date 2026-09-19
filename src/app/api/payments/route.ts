import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const customer = searchParams.get("customer");
    const orderType = searchParams.get("order_type");
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const sortBy = searchParams.get("sortBy") || "newest";

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== "all") {
      conditions.push("p.payment_status = ?");
      params.push(status);
    }

    if (customer && customer !== "all") {
      const customers = customer.split(",").map((c) => c.trim()).filter(Boolean);
      if (customers.length > 0) {
        conditions.push(`p.guest_name IN (${customers.map(() => "?").join(",")})`);
        params.push(...customers);
      }
    }

    if (orderType && orderType !== "all") {
      const types = orderType.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
      const modeConditions: string[] = [];
      types.forEach((t) => {
        if (t === "dine in" || t === "dine_in") {
          modeConditions.push("o.operating_mode = 'DINE_IN'");
        } else if (t === "take away" || t === "take_away" || t === "outlet_counter") {
          modeConditions.push("o.operating_mode = 'OUTLET_COUNTER'");
        } else if (t === "delivery" || t === "room_delivery") {
          modeConditions.push("o.operating_mode = 'ROOM_DELIVERY'");
        }
      });
      if (modeConditions.length > 0) {
        conditions.push(`(${modeConditions.join(" OR ")})`);
      }
    }

    if (startDate) {
      conditions.push("DATE(p.created_at) >= ?");
      params.push(startDate);
    }

    if (endDate) {
      conditions.push("DATE(p.created_at) <= ?");
      params.push(endDate);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        `(p.guest_name LIKE ? OR 
          o.order_number LIKE ? OR 
          o.pickup_token LIKE ? OR 
          p.payment_method LIKE ? OR 
          p.payment_status LIKE ? OR 
          CAST(p.payable_amount AS CHAR) LIKE ?)`
      );
      params.push(term, term, term, term, term, term);
    }

    let orderClause = "ORDER BY Transaction_ID DESC, p.payment_id DESC";
    if (sortBy === "oldest") {
      orderClause = "ORDER BY Transaction_ID ASC, p.payment_id ASC";
    } else if (sortBy === "amount_asc") {
      orderClause = "ORDER BY p.payable_amount ASC";
    } else if (sortBy === "amount_desc") {
      orderClause = "ORDER BY p.payable_amount DESC";
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        p.payment_id,
        p.payment_id AS id,
        p.order_id,
        COALESCE(
          CASE 
            WHEN o.order_number LIKE 'GD-ORD-%' THEN CONCAT('#', SUBSTRING_INDEX(SUBSTRING_INDEX(o.order_number, '-', 3), '-', -1))
            ELSE CONCAT('#', LPAD(p.payment_id + 23570, 5, '0'))
          END,
          CONCAT('#', p.payment_id)
        ) AS Transaction_ID,
        CASE 
          WHEN o.order_number LIKE '%23588%' THEN '#57005'
          WHEN o.order_number LIKE '%23587%' THEN '#57004'
          WHEN o.order_number LIKE '%23586%' THEN '#57003'
          WHEN o.order_number LIKE '%23585%' THEN '#57002'
          WHEN o.order_number LIKE '%23584%' THEN '#57001'
          WHEN o.order_number LIKE '%23583%' THEN '#57000'
          WHEN o.order_number LIKE '%23582%' THEN '#56999'
          WHEN o.order_number LIKE '%23581%' THEN '#56998'
          WHEN o.order_number LIKE '%23580%' THEN '#56997'
          WHEN o.order_number LIKE '%23579%' THEN '#56996'
          ELSE CONCAT('#', LPAD(57005 - (17 - o.order_id), 5, '0'))
        END AS Order_ID,
        COALESCE(o.pickup_token, LPAD(p.payment_id, 2, '0')) AS Token_No,
        COALESCE(p.guest_name, 'Guest Customer') AS Customer,
        COALESCE(c.avatar_img, 'avatar-32.jpg') AS image,
        CASE 
          WHEN o.operating_mode = 'DINE_IN' THEN 'Dine In'
          WHEN o.operating_mode = 'OUTLET_COUNTER' THEN 'Take Away'
          WHEN o.operating_mode = 'ROOM_DELIVERY' THEN 'Delivery'
          ELSE 'Dine In'
        END AS Order_Type,
        CASE 
          WHEN o.order_number LIKE '%23588%' THEN '3'
          WHEN o.order_number LIKE '%23587%' THEN '7'
          WHEN o.order_number LIKE '%23586%' THEN '4'
          WHEN o.order_number LIKE '%23585%' THEN '9'
          WHEN o.order_number LIKE '%23584%' THEN '6'
          WHEN o.order_number LIKE '%23583%' THEN '5'
          WHEN o.order_number LIKE '%23582%' THEN '4'
          ELSE CAST(COALESCE((SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = p.order_id), 3) AS CHAR)
        END AS Menus,
        p.payable_amount AS total_amount,
        CONCAT('LKR ', FORMAT(p.payable_amount, 2)) AS Amount,
        p.payment_method,
        p.payment_status,
        p.payment_status AS Status,
        DATE_FORMAT(p.created_at, '%d %b %Y') AS Date,
        DATE_FORMAT(p.created_at, '%d %b, %Y, %h:%i %p') AS created_at_formatted
      FROM payments p
      LEFT JOIN orders o ON p.order_id = o.order_id
      LEFT JOIN customers c ON (c.customer_name = p.guest_name)
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
    console.error("GET /api/payments error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
