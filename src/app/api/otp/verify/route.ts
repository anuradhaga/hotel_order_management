import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { verifyOtpCode } from "@/lib/otpEngine";

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const body = await req.json();
    const { order_id, otp_code } = body;

    if (!order_id || !otp_code) {
      return NextResponse.json(
        { success: false, error: "order_id and otp_code are required" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const [otpRows]: any[] = await connection.execute(
      `SELECT * FROM otp_transactions 
       WHERE order_id = ? 
       ORDER BY otp_id DESC LIMIT 1 FOR UPDATE`,
      [order_id]
    );

    if (!otpRows.length) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "No OTP record found for this order" },
        { status: 404 }
      );
    }

    const otpRecord = otpRows[0];

    // Check expiry
    const now = new Date();
    const expiry = new Date(otpRecord.expiry_time);
    if (now > expiry) {
      await connection.rollback();
      return NextResponse.json(
        {
          success: false,
          error: "OTP code has expired (5-minute window exceeded). Please request a new OTP.",
          expired: true,
        },
        { status: 400 }
      );
    }

    // Verify hash
    const isValid = verifyOtpCode(otp_code, otpRecord.otp_code_hash);
    if (!isValid) {
      await connection.execute(
        "UPDATE otp_transactions SET attempt_count = attempt_count + 1 WHERE otp_id = ?",
        [otpRecord.otp_id]
      );
      await connection.commit();
      return NextResponse.json(
        { success: false, error: "Incorrect OTP code. Please verify and try again." },
        { status: 400 }
      );
    }

    // Mark verified
    await connection.execute(
      "UPDATE otp_transactions SET is_verified = 1, verified_at = NOW() WHERE otp_id = ?",
      [otpRecord.otp_id]
    );

    // Release order to KDS queue (FR-OUT-006)
    await connection.execute(
      "UPDATE orders SET order_status = 'QUEUED' WHERE order_id = ?",
      [order_id]
    );

    const [orderRows]: any[] = await connection.execute(
      "SELECT order_number, pickup_token, tracking_token FROM orders WHERE order_id = ?",
      [order_id]
    );

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Customer mobile OTP verified successfully. Ticket released to Kitchen Queue.",
      data: {
        order_id,
        order_number: orderRows[0]?.order_number,
        pickup_token: orderRows[0]?.pickup_token,
        tracking_token: orderRows[0]?.tracking_token,
        tracking_url: `/track/${orderRows[0]?.tracking_token}`,
      },
    });
  } catch (error: any) {
    await connection.rollback();
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}
