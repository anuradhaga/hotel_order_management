import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { calculateHospitalityTaxes, roundCurrency } from "@/lib/taxEngine";

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const body = await req.json();
    const {
      order_id,
      payment_method, // CASH, CREDIT_CARD, DEBIT_CARD, ROOM_CHARGE
      tendered_amount,
      card_auth_code,
      room_number,
      guest_name,
      cashier_user_id = 1,
      discount_amount,
    } = body;

    if (!order_id || !payment_method) {
      return NextResponse.json(
        { success: false, error: "order_id and payment_method are required" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const [orderRows]: any[] = await connection.execute(
      "SELECT * FROM orders WHERE order_id = ? FOR UPDATE",
      [order_id]
    );

    if (!orderRows.length) {
      await connection.rollback();
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const order = orderRows[0];

    // Recalculate if custom discount was provided
    let finalNetPayable = Number(order.net_payable);
    let finalDiscount = Number(order.discount_amount);
    let finalSc = Number(order.sc_amount);
    let finalVat = Number(order.vat_amount);

    if (discount_amount !== undefined && Number(discount_amount) !== Number(order.discount_amount)) {
      const taxes = calculateHospitalityTaxes({
        subtotal: Number(order.subtotal_amount),
        discountAmount: Number(discount_amount),
      });
      finalNetPayable = taxes.netPayable;
      finalDiscount = taxes.discountAmount;
      finalSc = taxes.serviceChargeAmount;
      finalVat = taxes.vatAmount;

      await connection.execute(
        `UPDATE orders 
         SET discount_amount = ?, sc_amount = ?, vat_amount = ?, net_payable = ?
         WHERE order_id = ?`,
        [finalDiscount, finalSc, finalVat, finalNetPayable, order_id]
      );
    }

    // Validate payment method specifics
    const tendered = Number(tendered_amount) || finalNetPayable;
    let changeAmount = 0.0;

    if (payment_method === "CASH") {
      if (tendered < finalNetPayable) {
        await connection.rollback();
        return NextResponse.json(
          {
            success: false,
            error: `Tendered amount (LKR ${tendered}) cannot be less than payable total (LKR ${finalNetPayable})`,
          },
          { status: 400 }
        );
      }
      changeAmount = roundCurrency(tendered - finalNetPayable);
    } else if (payment_method === "ROOM_CHARGE") {
      if (!room_number || !guest_name) {
        await connection.rollback();
        return NextResponse.json(
          { success: false, error: "Room number and guest surname are required for Room Charge settlement" },
          { status: 400 }
        );
      }
    }

    // Insert payment record
    const [paymentResult]: any = await connection.execute(
      `INSERT INTO payments 
       (order_id, payment_method, payable_amount, tendered_amount, change_amount, card_auth_code, room_number, guest_name, cashier_user_id, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'SETTLED')`,
      [
        order_id,
        payment_method,
        finalNetPayable,
        tendered,
        changeAmount,
        card_auth_code || null,
        room_number || null,
        guest_name || null,
        cashier_user_id,
      ]
    );

    // Update order status to COMPLETED
    await connection.execute(
      "UPDATE orders SET order_status = 'COMPLETED', cashier_user_id = ? WHERE order_id = ?",
      [cashier_user_id, order_id]
    );

    // Update order_items status to SERVED
    await connection.execute(
      "UPDATE order_items SET item_status = 'SERVED' WHERE order_id = ?",
      [order_id]
    );

    // Release table if Dine-In
    if (order.table_id) {
      await connection.execute(
        "UPDATE restaurant_tables SET current_status = 'AVAILABLE', active_order_id = NULL WHERE table_id = ?",
        [order.table_id]
      );
    }

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Order payment successfully settled. Receipt issued and table released.",
      data: {
        payment_id: paymentResult.insertId,
        order_id,
        order_number: order.order_number,
        payment_method,
        payable_amount: finalNetPayable,
        tendered_amount: tendered,
        change_amount: changeAmount,
        card_auth_code: card_auth_code || null,
        room_number: room_number || null,
        guest_name: guest_name || null,
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
