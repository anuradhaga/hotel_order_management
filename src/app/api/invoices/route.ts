import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const invoiceNumber = searchParams.get("invoice_number");
    const search = searchParams.get("search");
    const customer = searchParams.get("customer");
    const orderType = searchParams.get("order_type");
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const sortBy = searchParams.get("sortBy") || "newest";

    // Single invoice request
    if (id || invoiceNumber) {
      const [invRows]: any[] = await pool.query(
        `SELECT 
          i.*, 
          DATE_FORMAT(i.invoice_date, '%d %b %Y') AS formatted_date,
          DATE_FORMAT(i.invoice_date, '%d %b, %Y, %h:%i %p') AS formatted_datetime
        FROM invoices i
        WHERE ${id ? "i.invoice_id = ?" : "i.invoice_number = ?"}`,
        [id || invoiceNumber]
      );

      if (invRows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Invoice not found" },
          { status: 404 }
        );
      }

      const invoice = invRows[0];

      // Fetch items for this invoice
      const [items]: any[] = await pool.query(
        `SELECT item_id, item_name, quantity, rate, amount 
         FROM invoice_items 
         WHERE invoice_id = ? 
         ORDER BY item_id ASC`,
        [invoice.invoice_id]
      );

      return NextResponse.json({
        success: true,
        data: {
          ...invoice,
          items,
        },
      });
    }

    // List invoices query
    const conditions: string[] = [];
    const params: any[] = [];

    if (status && status !== "all") {
      conditions.push("i.status = ?");
      params.push(status);
    }

    if (customer && customer !== "all") {
      const customers = customer.split(",").map((c) => c.trim()).filter(Boolean);
      if (customers.length > 0) {
        conditions.push(`i.customer_name IN (${customers.map(() => "?").join(",")})`);
        params.push(...customers);
      }
    }

    if (orderType && orderType !== "all") {
      const types = orderType.split(",").map((t) => t.trim()).filter(Boolean);
      if (types.length > 0) {
        conditions.push(`i.order_type IN (${types.map(() => "?").join(",")})`);
        params.push(...types);
      }
    }

    if (startDate) {
      conditions.push("DATE(i.invoice_date) >= ?");
      params.push(startDate);
    }

    if (endDate) {
      conditions.push("DATE(i.invoice_date) <= ?");
      params.push(endDate);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      conditions.push(
        `(i.invoice_number LIKE ? OR 
          i.customer_name LIKE ? OR 
          i.order_type LIKE ? OR 
          i.payment_method LIKE ? OR 
          i.status LIKE ?)`
      );
      params.push(term, term, term, term, term);
    }

    let orderClause = "ORDER BY i.invoice_date DESC";
    if (sortBy === "oldest") {
      orderClause = "ORDER BY i.invoice_date ASC";
    } else if (sortBy === "amount_asc") {
      orderClause = "ORDER BY i.total_amount ASC";
    } else if (sortBy === "amount_desc") {
      orderClause = "ORDER BY i.total_amount DESC";
    } else if (sortBy === "id_asc") {
      orderClause = "ORDER BY i.invoice_id ASC";
    } else if (sortBy === "id_desc") {
      orderClause = "ORDER BY i.invoice_id DESC";
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        i.invoice_id,
        i.invoice_id AS id,
        i.invoice_number,
        i.invoice_number AS Invoice_ID,
        i.order_id,
        i.customer_name,
        i.customer_name AS Customer,
        i.customer_image,
        COALESCE(i.customer_image, 'avatar-32.jpg') AS image,
        i.customer_email,
        i.customer_phone,
        i.customer_address,
        i.invoice_date,
        DATE_FORMAT(i.invoice_date, '%d %b %Y') AS Date,
        DATE_FORMAT(i.invoice_date, '%d %b, %Y, %h:%i %p') AS created_at_formatted,
        i.order_type,
        i.order_type AS Order_Type,
        i.subtotal,
        i.discount,
        i.tax_amount,
        i.total_amount,
        CONCAT('LKR ', FORMAT(i.total_amount, 2)) AS Amount,
        i.status,
        i.status AS Status,
        i.payment_method,
        i.notes,
        (SELECT COUNT(*) FROM invoice_items ii WHERE ii.invoice_id = i.invoice_id) AS item_count
      FROM invoices i
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
    console.error("GET /api/invoices error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const invoiceId = searchParams.get("invoice_id") || searchParams.get("id");
    const invoiceNumber = searchParams.get("invoice_number");

    if (!invoiceId && !invoiceNumber) {
      return NextResponse.json(
        { success: false, error: "Invoice ID or Invoice Number is required" },
        { status: 400 }
      );
    }

    if (invoiceId) {
      await pool.query("DELETE FROM invoices WHERE invoice_id = ?", [invoiceId]);
    } else {
      await pool.query("DELETE FROM invoices WHERE invoice_number = ?", [invoiceNumber]);
    }

    return NextResponse.json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/invoices error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete invoice" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      order_type = "Dine In",
      subtotal = 0,
      discount = 0,
      tax_amount = 0,
      total_amount = 0,
      status = "Paid",
      payment_method = "Cash",
      items = [],
    } = body;

    if (!customer_name) {
      return NextResponse.json(
        { success: false, error: "Customer name is required" },
        { status: 400 }
      );
    }

    // Generate Invoice Number #INVXXXX
    const [maxRows]: any[] = await pool.query(
      "SELECT MAX(invoice_id) as max_id FROM invoices"
    );
    const nextNum = (maxRows[0]?.max_id || 0) + 1;
    const invoice_number = `#INV${String(nextNum).padStart(4, "0")}`;

    const [insertRes]: any[] = await pool.query(
      `INSERT INTO invoices 
        (invoice_number, customer_name, customer_email, customer_phone, customer_address, invoice_date, order_type, subtotal, discount, tax_amount, total_amount, status, payment_method)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)`,
      [
        invoice_number,
        customer_name,
        customer_email || null,
        customer_phone || null,
        customer_address || null,
        order_type,
        subtotal,
        discount,
        tax_amount,
        total_amount,
        status,
        payment_method,
      ]
    );

    const invoice_id = insertRes.insertId;

    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        await pool.query(
          `INSERT INTO invoice_items (invoice_id, item_name, quantity, rate, amount)
           VALUES (?, ?, ?, ?, ?)`,
          [
            invoice_id,
            item.item_name,
            item.quantity || 1,
            item.rate || 0,
            item.amount || 0,
          ]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Invoice created successfully",
      invoice_id,
      invoice_number,
    });
  } catch (error: any) {
    console.error("POST /api/invoices error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create invoice" },
      { status: 500 }
    );
  }
}
