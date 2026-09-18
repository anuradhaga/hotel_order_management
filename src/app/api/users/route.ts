import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows]: any[] = await pool.query(`
      SELECT 
        u.user_id,
        u.username,
        u.full_name,
        u.phone,
        u.role_code,
        u.outlet_id,
        u.is_active,
        u.created_at,
        o.outlet_name,
        o.outlet_code
      FROM users u
      LEFT JOIN outlets o ON u.outlet_id = o.outlet_id
      ORDER BY u.user_id ASC
    `);

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      username,
      full_name,
      phone = "",
      password = "password123",
      role_code = "WAITER",
      outlet_id = 1,
    } = body;

    if (!username || !full_name) {
      return NextResponse.json(
        { success: false, error: "username and full_name are required" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const [existing]: any[] = await pool.query(
      "SELECT user_id FROM users WHERE username = ?",
      [username.trim()]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Username '${username}' is already taken.` },
        { status: 400 }
      );
    }

    const [result]: any = await pool.execute(
      `INSERT INTO users (username, password_hash, full_name, phone, role_code, outlet_id, is_active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [username.trim(), password, full_name.trim(), phone?.trim() || null, role_code, outlet_id || null]
    );

    return NextResponse.json({
      success: true,
      message: "User successfully created in database.",
      data: {
        user_id: result.insertId,
        username,
        full_name,
        phone,
        role_code,
        outlet_id,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, full_name, phone, role_code, is_active, password } = body;

    if (!user_id) {
      return NextResponse.json(
        { success: false, error: "user_id is required" },
        { status: 400 }
      );
    }

    let query = `
      UPDATE users 
      SET full_name = COALESCE(?, full_name),
          phone = COALESCE(?, phone),
          role_code = COALESCE(?, role_code),
          is_active = COALESCE(?, is_active)
    `;
    const params: any[] = [
      full_name || null,
      phone || null,
      role_code || null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
    ];

    if (password && String(password).trim()) {
      query += `, password_hash = ?`;
      params.push(String(password).trim());
    }

    query += ` WHERE user_id = ?`;
    params.push(user_id);

    await pool.execute(query, params);

    return NextResponse.json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User id is required" },
        { status: 400 }
      );
    }

    await pool.execute("DELETE FROM users WHERE user_id = ?", [userId]);

    return NextResponse.json({
      success: true,
      message: "User successfully removed from database.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

