import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const DEFAULT_MODULES = [
  { key: "dashboard", name: "Dashboard" },
  { key: "pos", name: "POS" },
  { key: "hold_resume", name: "Hold/Resume Sale" },
  { key: "refund_return", name: "Refund / Return" },
  { key: "products", name: "Products" },
  { key: "categories", name: "Categories" },
  { key: "customers", name: "Customers" },
  { key: "reports", name: "Reports" },
  { key: "settings", name: "Settings" },
  { key: "orders", name: "Orders" },
  { key: "kitchen", name: "Kitchen" },
];

export async function GET() {
  try {
    const [roles]: any[] = await pool.query(
      "SELECT role_id, role_code, role_name, description, created_at FROM roles ORDER BY role_id ASC"
    );
    return NextResponse.json({ success: true, roles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch roles" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role_name, description } = body;

    if (!role_name || !String(role_name).trim()) {
      return NextResponse.json(
        { success: false, error: "Role name is required." },
        { status: 400 }
      );
    }

    const cleanName = String(role_name).trim();
    const roleCode = cleanName.toUpperCase().replace(/[^A-Z0-9]/g, "_");

    // Check if role code exists
    const [existing]: any[] = await pool.query(
      "SELECT role_id FROM roles WHERE role_code = ?",
      [roleCode]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Role '${cleanName}' already exists.` },
        { status: 400 }
      );
    }

    const [result]: any = await pool.execute(
      "INSERT INTO roles (role_code, role_name, description) VALUES (?, ?, ?)",
      [roleCode, cleanName, description?.trim() || null]
    );

    // Initialize default permissions (read-only by default for newly added roles)
    for (const m of DEFAULT_MODULES) {
      await pool.execute(
        `INSERT INTO role_permissions (role_code, module_key, module_name, can_view, can_add, can_edit, can_delete, can_export, can_approve)
         VALUES (?, ?, ?, 1, 0, 0, 0, 0, 0)
         ON DUPLICATE KEY UPDATE module_name = VALUES(module_name)`,
        [roleCode, m.key, m.name]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Role '${cleanName}' created successfully.`,
      role: {
        role_id: result.insertId,
        role_code: roleCode,
        role_name: cleanName,
        description,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create role" },
      { status: 500 }
    );
  }
}
