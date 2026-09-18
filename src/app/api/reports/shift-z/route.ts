import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { roundCurrency } from "@/lib/taxEngine";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const outlet_id = searchParams.get("outlet_id");
    const cashier_id = searchParams.get("cashier_id") || "1";
    const floatAmount = parseFloat(searchParams.get("float") || "10000.00");
    const countedCash = searchParams.get("counted") ? parseFloat(searchParams.get("counted")!) : null;

    let outletFilter = "";
    const params: any[] = [];
    if (outlet_id) {
      outletFilter = " AND o.outlet_id = ?";
      params.push(outlet_id);
    }

    // Aggregate totals for settled orders
    const [salesSummary]: any[] = await pool.query(
      `SELECT 
        COUNT(DISTINCT o.order_id) as total_orders,
        COALESCE(SUM(o.subtotal_amount), 0) as gross_sales,
        COALESCE(SUM(o.discount_amount), 0) as total_discounts,
        COALESCE(SUM(o.sc_amount), 0) as total_service_charge,
        COALESCE(SUM(o.vat_amount), 0) as total_vat,
        COALESCE(SUM(o.net_payable), 0) as net_sales_payable
       FROM orders o
       WHERE o.order_status = 'COMPLETED' ${outletFilter}`,
      params
    );

    // Aggregate payment tender breakdown
    const [tenders]: any[] = await pool.query(
      `SELECT 
        p.payment_method,
        COUNT(p.payment_id) as count,
        COALESCE(SUM(p.payable_amount), 0) as total_amount
       FROM payments p
       JOIN orders o ON p.order_id = o.order_id
       WHERE o.order_status = 'COMPLETED' ${outletFilter}
       GROUP BY p.payment_method`,
      params
    );

    let cashSales = 0;
    let cardSales = 0;
    let debitSales = 0;
    let roomChargeSales = 0;

    for (const t of tenders) {
      if (t.payment_method === "CASH") cashSales = Number(t.total_amount);
      else if (t.payment_method === "CREDIT_CARD") cardSales = Number(t.total_amount);
      else if (t.payment_method === "DEBIT_CARD") debitSales = Number(t.total_amount);
      else if (t.payment_method === "ROOM_CHARGE") roomChargeSales = Number(t.total_amount);
    }

    const expectedCashInDrawer = roundCurrency(floatAmount + cashSales);
    const variance = countedCash !== null ? roundCurrency(countedCash - expectedCashInDrawer) : null;

    return NextResponse.json({
      success: true,
      report: {
        hotel_name: "Grand Dilara Hotel & Suites",
        tax_reg_no: "VAT-2026-GDH-08819",
        report_title: "Shift End-of-Day Z-Report",
        generated_at: new Date().toISOString(),
        opening_float: floatAmount,
        gross_sales: Number(salesSummary[0].gross_sales),
        total_discounts: Number(salesSummary[0].total_discounts),
        total_service_charge: Number(salesSummary[0].total_service_charge),
        total_vat: Number(salesSummary[0].total_vat),
        net_sales_payable: Number(salesSummary[0].net_sales_payable),
        total_orders_settled: Number(salesSummary[0].total_orders),
        tenders: {
          cash: cashSales,
          credit_card: cardSales,
          debit_card: debitSales,
          room_charge: roomChargeSales,
        },
        drawer_reconciliation: {
          opening_float: floatAmount,
          cash_sales: cashSales,
          expected_cash: expectedCashInDrawer,
          physical_cash_counted: countedCash,
          over_short_variance: variance,
          is_balanced: variance === 0,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
