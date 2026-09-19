import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roleParam = searchParams.get("role");

    // Fetch all active roles
    const [roles]: any[] = await pool.query(
      "SELECT role_id, role_code, role_name, description FROM roles ORDER BY role_id ASC"
    );

    const activeRole = (roleParam || (roles.length > 0 ? roles[0].role_code : "ADMIN")).toUpperCase();

    // Fetch permissions for the active role
    const [perms]: any[] = await pool.query(
      `SELECT module_key, module_name, can_view, can_add, can_edit, can_delete, can_export, can_approve
       FROM role_permissions
       WHERE UPPER(role_code) = ?
       ORDER BY id ASC`,
      [activeRole]
    );

    return NextResponse.json({
      success: true,
      roles,
      activeRole,
      permissions: perms,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch permissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role_code, permissions } = body;

    if (!role_code || !Array.isArray(permissions)) {
      return NextResponse.json(
        { success: false, error: "Invalid payload. 'role_code' and 'permissions' array are required." },
        { status: 400 }
      );
    }

    const normalizedRole = role_code.trim().toUpperCase();

    // Upsert permissions
    for (const p of permissions) {
      await pool.execute(
        `INSERT INTO role_permissions
           (role_code, module_key, module_name, can_view, can_add, can_edit, can_delete, can_export, can_approve)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           module_name = VALUES(module_name),
           can_view = VALUES(can_view),
           can_add = VALUES(can_add),
           can_edit = VALUES(can_edit),
           can_delete = VALUES(can_delete),
           can_export = VALUES(can_export),
           can_approve = VALUES(can_approve)`,
        [
          normalizedRole,
          p.module_key,
          p.module_name || p.module_key,
          p.can_view ? 1 : 0,
          p.can_add ? 1 : 0,
          p.can_edit ? 1 : 0,
          p.can_delete ? 1 : 0,
          p.can_export ? 1 : 0,
          p.can_approve ? 1 : 0,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Permissions for ${normalizedRole} saved successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save permissions" },
      { status: 500 }
    );
  }
}
