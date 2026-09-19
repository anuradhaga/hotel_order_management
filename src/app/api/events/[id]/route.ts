import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/events/[id] - Get event details and menu summary
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);

    const [rows]: any = await pool.query(
      `SELECT 
        e.*,
        o.outlet_name,
        o.outlet_code,
        (SELECT COUNT(*) FROM event_menu_items WHERE event_id = e.event_id) as total_menu_items,
        (SELECT COUNT(*) FROM orders WHERE event_id = e.event_id) as total_orders
       FROM events e
       LEFT JOIN outlets o ON e.outlet_id = o.outlet_id
       WHERE e.event_id = ? AND e.is_active = 1`,
      [eventId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Special event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event details or change lifecycle status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);
    const body = await req.json();

    const {
      event_name,
      event_type,
      outlet_id,
      dedicated_kitchen_dept,
      expected_guests,
      location_name,
      start_datetime,
      end_datetime,
      organizer_name,
      organizer_contact,
      billing_type,
      status,
      notes,
    } = body;

    const [result]: any = await pool.execute(
      `UPDATE events SET 
        event_name = COALESCE(?, event_name),
        event_type = COALESCE(?, event_type),
        outlet_id = COALESCE(?, outlet_id),
        dedicated_kitchen_dept = COALESCE(?, dedicated_kitchen_dept),
        expected_guests = COALESCE(?, expected_guests),
        location_name = COALESCE(?, location_name),
        start_datetime = COALESCE(?, start_datetime),
        end_datetime = COALESCE(?, end_datetime),
        organizer_name = COALESCE(?, organizer_name),
        organizer_contact = COALESCE(?, organizer_contact),
        billing_type = COALESCE(?, billing_type),
        status = COALESCE(?, status),
        notes = COALESCE(?, notes)
       WHERE event_id = ?`,
      [
        event_name,
        event_type,
        outlet_id,
        dedicated_kitchen_dept,
        expected_guests,
        location_name,
        start_datetime,
        end_datetime,
        organizer_name,
        organizer_contact,
        billing_type,
        status,
        notes,
        eventId,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: "Event not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Special event updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Soft delete / cancel event
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = parseInt(id, 10);

    await pool.execute(
      "UPDATE events SET is_active = 0, status = 'CANCELLED' WHERE event_id = ?",
      [eventId]
    );

    return NextResponse.json({
      success: true,
      message: "Special event cancelled/deactivated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
