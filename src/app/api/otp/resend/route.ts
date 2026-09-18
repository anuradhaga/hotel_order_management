import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { generateOtpCode, hashOtpCode } from "@/lib/otpEngine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id } = body;

    if (!order_id) {
      return NextResponse.json(
        { success: false, error: "order_id is required" },
        { status: 400 }
      );
    }

    const [otpRows]: any[] = await pool.query(
      `SELECT * FROM otp_transactions 
       WHERE order_id = ? 
       ORDER BY otp_id DESC LIMIT 1`,
      [order_id]
    );

    if (!otpRows.length) {
      return NextResponse.json(
        { success: false, error: "Order OTP record not found" },
        { status: 404 }
      );
    }

    const lastOtp = otpRows[0];
    const createdTime = new Date(lastOtp.created_at).getTime();
    const nowTime = Date.now();

    // Check 60-second cooldown (FR-OUT-005)
    if (nowTime - createdTime < 60 * 1000) {
      const waitSec = Math.ceil((60 * 1000 - (nowTime - createdTime)) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${waitSec} seconds before requesting another OTP.`,
          cooldown: true,
          waitSec,
        },
        { status: 429 }
      );
    }

    // Check resend attempt limit (max 3)
    const [allAttempts]: any[] = await pool.query(
      "SELECT COUNT(*) as count FROM otp_transactions WHERE order_id = ?",
      [order_id]
    );
    if (allAttempts[0].count >= 4) {
      return NextResponse.json(
        {
          success: false,
          error: "Maximum OTP resend attempts exceeded. Please contact floor supervisor.",
        },
        { status: 403 }
      );
    }

    // Generate new OTP
    const newOtp = generateOtpCode();
    const newHash = hashOtpCode(newOtp);
    const newExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await pool.execute(
      `INSERT INTO otp_transactions (order_id, mobile_number, otp_code_plain, otp_code_hash, expiry_time, sms_status)
       VALUES (?, ?, ?, ?, ?, 'SENT')`,
      [order_id, lastOtp.mobile_number, newOtp, newHash, newExpiry]
    );

    return NextResponse.json({
      success: true,
      message: "New 6-digit OTP generated and dispatched via SMS.",
      simulated_otp: newOtp,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
