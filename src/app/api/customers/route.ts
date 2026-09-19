import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== "all") {
      conditions.push("c.status = ?");
      params.push(status);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        `(c.customer_name LIKE ? OR 
          c.phone LIKE ? OR 
          c.email LIKE ? OR 
          c.customer_code LIKE ?)`
      );
      params.push(term, term, term, term);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        c.customer_id,
        c.customer_code,
        c.customer_name,
        c.phone,
        c.email,
        c.gender,
        c.status,
        c.avatar_img,
        c.created_at,
        DATE_FORMAT(c.created_at, '%d %b, %Y, %h:%i %p') AS created_at_formatted,
        COALESCE((
          SELECT COUNT(DISTINCT o.order_id)
          FROM orders o
          LEFT JOIN payments p ON o.order_id = p.order_id
          WHERE COALESCE(p.guest_name, '') = c.customer_name 
             OR (c.phone IS NOT NULL AND c.phone != '' AND o.customer_mobile = c.phone)
        ), 0) AS total_orders,
        COALESCE((
          SELECT SUM(o.net_payable)
          FROM orders o
          LEFT JOIN payments p ON o.order_id = p.order_id
          WHERE COALESCE(p.guest_name, '') = c.customer_name 
             OR (c.phone IS NOT NULL AND c.phone != '' AND o.customer_mobile = c.phone)
        ), 0) AS total_spent,
        CONCAT('$', FORMAT(COALESCE((
          SELECT SUM(o.net_payable)
          FROM orders o
          LEFT JOIN payments p ON o.order_id = p.order_id
          WHERE COALESCE(p.guest_name, '') = c.customer_name 
             OR (c.phone IS NOT NULL AND c.phone != '' AND o.customer_mobile = c.phone)
        ), 0), 2)) AS total_spent_formatted
      FROM customers c
      ${whereClause}
      ORDER BY c.customer_id DESC
    `;

    const [rows]: any[] = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      data: rows,
      totalCount: rows.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer_name, phone, email, gender, status } = body;

    if (!customer_name || !customer_name.trim()) {
      return NextResponse.json(
        { success: false, error: "Customer name is required" },
        { status: 400 }
      );
    }

    // Generate clean customer code like #CR4829
    const randomCode = `#CR${Math.floor(1000 + Math.random() * 9000)}`;

    const [result]: any = await pool.query(
      `INSERT INTO customers (customer_code, customer_name, phone, email, gender, status, avatar_img)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        randomCode,
        customer_name.trim(),
        phone ? phone.trim() : null,
        email ? email.trim() : null,
        gender || "Male",
        status || "Active",
        "avatar-32.jpg",
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Customer added successfully",
      customer_id: result.insertId,
      customer_code: randomCode,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create customer" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer_id, customer_name, phone, email, gender, status } = body;

    if (!customer_id) {
      return NextResponse.json(
        { success: false, error: "customer_id is required" },
        { status: 400 }
      );
    }

    await pool.query(
      `UPDATE customers 
       SET customer_name = ?, phone = ?, email = ?, gender = ?, status = ?
       WHERE customer_id = ?`,
      [
        customer_name ? customer_name.trim() : "Customer",
        phone ? phone.trim() : null,
        email ? email.trim() : null,
        gender || "Male",
        status || "Active",
        customer_id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Customer updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update customer" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const customer_id = searchParams.get("customer_id");

    if (!customer_id) {
      return NextResponse.json(
        { success: false, error: "customer_id query param is required" },
        { status: 400 }
      );
    }

    await pool.query("DELETE FROM customers WHERE customer_id = ?", [customer_id]);

    return NextResponse.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete customer" },
      { status: 500 }
    );
  }
}
