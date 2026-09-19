import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/events - List all events with statistics and filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const activeOnly = searchParams.get("active_only") === "true";

    let sql = `
      SELECT 
        e.*,
        o.outlet_name,
        o.outlet_code,
        (
          SELECT COUNT(*) 
          FROM event_menu_items emi 
          WHERE emi.event_id = e.event_id AND emi.is_available = 1
        ) as custom_menu_count,
        (
          SELECT COUNT(*) 
          FROM orders ord 
          WHERE ord.event_id = e.event_id
        ) as total_orders_count,
        COALESCE(
          (
            SELECT SUM(ord.net_payable) 
            FROM orders ord 
            WHERE ord.event_id = e.event_id AND ord.order_status NOT IN ('CANCELLED', 'DRAFT')
          ), 
          0.00
        ) as total_event_revenue
      FROM events e
      LEFT JOIN outlets o ON e.outlet_id = o.outlet_id
      WHERE e.is_active = 1
    `;
    const params: any[] = [];

    if (status) {
      sql += " AND e.status = ?";
      params.push(status);
    }
    if (activeOnly) {
      sql += " AND e.status = 'ACTIVE'";
    }

    sql += " ORDER BY e.start_datetime ASC";

    const [rows] = await pool.query(sql, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/events - Create a new special event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      event_code,
      event_name,
      event_type = "BANQUET",
      outlet_id,
      dedicated_kitchen_dept = "BANQUET_KITCHEN",
      expected_guests = 50,
      location_name,
      start_datetime,
      end_datetime,
      organizer_name,
      organizer_contact,
      billing_type = "PER_ORDER",
      status = "ACTIVE",
      notes,
    } = body;

    if (!event_name || !location_name || !start_datetime || !end_datetime) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: event_name, location_name, start_datetime, end_datetime",
        },
        { status: 400 }
      );
    }

    // Auto-generate event code if not provided
    const code =
      event_code?.trim() ||
      `EVT-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const [result]: any = await pool.execute(
      `INSERT INTO events 
        (event_code, event_name, event_type, outlet_id, dedicated_kitchen_dept, expected_guests, location_name, start_datetime, end_datetime, organizer_name, organizer_contact, billing_type, status, notes, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        code,
        event_name,
        event_type,
        outlet_id || null,
        dedicated_kitchen_dept,
        expected_guests,
        location_name,
        start_datetime,
        end_datetime,
        organizer_name || null,
        organizer_contact || null,
        billing_type,
        status,
        notes || null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Special event created successfully",
      data: { event_id: result.insertId, event_code: code },
    });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
