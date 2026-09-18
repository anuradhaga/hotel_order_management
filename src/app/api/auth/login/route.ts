import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Please enter both username and password." },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(username).trim();
    const cleanPassword = String(password).trim();

    // Query user by username or full_name
    const [rows]: any[] = await pool.query(
      `SELECT 
        u.user_id,
        u.username,
        u.password_hash,
        u.full_name,
        u.phone,
        u.role_code,
        u.outlet_id,
        u.is_active,
        o.outlet_name,
        o.outlet_code
      FROM users u
      LEFT JOIN outlets o ON u.outlet_id = o.outlet_id
      WHERE LOWER(u.username) = LOWER(?) OR LOWER(u.full_name) = LOWER(?)
      LIMIT 1`,
      [cleanIdentifier, cleanIdentifier]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const user = rows[0];

    if (!user.is_active) {
      return NextResponse.json(
        { success: false, error: "Account is inactive. Please contact management." },
        { status: 403 }
      );
    }

    // Password comparison (plaintext or hashed check)
    const isPasswordValid = user.password_hash === cleanPassword;

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const userPayload = {
      user_id: user.user_id,
      username: user.username,
      full_name: user.full_name,
      role_code: user.role_code,
      phone: user.phone,
      outlet_id: user.outlet_id,
      outlet_name: user.outlet_name || "Grand Dilara Main",
      outlet_code: user.outlet_code || "REST-MAIN",
    };

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${user.full_name}!`,
      user: userPayload,
    });

    response.cookies.set("gdh_user", JSON.stringify(userPayload), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An internal error occurred" },
      { status: 500 }
    );
  }
}
