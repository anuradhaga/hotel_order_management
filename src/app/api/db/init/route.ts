import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [tables] = await pool.query<any[]>("SHOW TABLES;");
    const [outlets] = await pool.query<any[]>("SELECT COUNT(*) as count FROM outlets;");
    const [items] = await pool.query<any[]>("SELECT COUNT(*) as count FROM items;");
    const [restaurantTables] = await pool.query<any[]>("SELECT COUNT(*) as count FROM restaurant_tables;");

    return NextResponse.json({
      success: true,
      database: process.env.DB_NAME || "hotel_order_management",
      tablesCount: tables.length,
      counts: {
        outlets: outlets[0]?.count || 0,
        items: items[0]?.count || 0,
        tables: restaurantTables[0]?.count || 0,
      },
      message: "Database is connected and healthy.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const sqlPath = path.join(process.cwd(), "scripts", "init_db.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    // Execute queries using connection that allows multipleStatements
    const connection = await pool.getConnection();
    try {
      await connection.query(sql);
    } finally {
      connection.release();
    }

    return NextResponse.json({
      success: true,
      message: "Database schema and seed data re-initialized successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
