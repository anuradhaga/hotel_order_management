"use client";
import { useEffect, useState, useCallback } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/routes/all_routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface InvoiceItem {
  item_id?: number;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoice_id: number;
  invoice_number: string;
  customer_name: string;
  customer_image?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_address?: string;
  formatted_date?: string;
  formatted_datetime?: string;
  order_type: string;
  subtotal: number;
  discount: number;
  tax_amount: number;
  total_amount: number;
  status: string;
  payment_method?: string;
  notes?: string;
  items: InvoiceItem[];
}

const InvoiceDetailsComponent = () => {
  const searchParams = useSearchParams();
  const invoiceNumberParam = searchParams.get("invoice_number");
  const invoiceIdParam = searchParams.get("id");

  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchInvoice = useCallback(async () => {
    setRefreshing(true);
    try {
      let url = "/api/invoices";
      if (invoiceNumberParam) {
        url += `?invoice_number=${encodeURIComponent(invoiceNumberParam)}`;
      } else if (invoiceIdParam) {
        url += `?id=${encodeURIComponent(invoiceIdParam)}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.success) {
        if (invoiceNumberParam || invoiceIdParam) {
          setInvoice(json.data);
        } else if (Array.isArray(json.data) && json.data.length > 0) {
          // Fetch the first invoice's full details
          const firstNum = json.data[0].invoice_number || json.data[0].Invoice_ID;
          const detRes = await fetch(`/api/invoices?invoice_number=${encodeURIComponent(firstNum)}`);
          const detJson = await detRes.json();
          if (detJson.success) {
            setInvoice(detJson.data);
          }
        }
      } else {
        setError(json.error || "Failed to load invoice");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to API");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [invoiceNumberParam, invoiceIdParam]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!invoice) return;
    const headers = ["Invoice Number", "Customer", "Date", "Item Name", "Quantity", "Rate", "Amount"];
    const rows = (invoice.items || []).map((it) => [
      `"${invoice.invoice_number}"`,
      `"${invoice.customer_name}"`,
      `"${invoice.formatted_date || ""}"`,
      `"${it.item_name}"`,
      it.quantity,
      it.rate,
      it.amount,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${invoice.invoice_number.replace("#", "")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isPaid = (invoice?.status || "").toLowerCase() === "paid";
  const subtotal = Number(invoice?.subtotal || 0);
  const discount = Number(invoice?.discount || 0);
  const tax = Number(invoice?.tax_amount || 0);
  const total = Number(invoice?.total_amount || 0);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Invoices Details
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                  onClick={fetchInvoice}
                  disabled={refreshing}
                  title="Refresh"
                >
                  <i className={`icon-refresh-ccw ${refreshing ? "fa-spin" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="icon-upload me-1" />
                  Export
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm border">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded d-flex align-items-center py-2"
                      onClick={handlePrint}
                    >
                      <i className="icon-file-text me-2 text-danger" />
                      Export as PDF / Print
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded d-flex align-items-center py-2"
                      onClick={handleExportCSV}
                    >
                      <i className="icon-file-spreadsheet me-2 text-success" />
                      Export as Excel (CSV)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link href={all_routes.invoices} className="d-inline-flex align-items-center mb-4 text-decoration-none fw-medium text-dark">
            <i className="icon-arrow-left me-2" />
            Back to Invoices
          </Link>

          {loading ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-2">Loading invoice details...</p>
              </div>
            </div>
          ) : error || !invoice ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="icon-alert-circle text-danger fs-32 mb-2 d-block" />
                <h5>{error || "Invoice Not Found"}</h5>
                <p className="text-muted">The requested invoice could not be located.</p>
                <Link href={all_routes.invoices} className="btn btn-primary mt-2">
                  Return to Invoices List
                </Link>
              </div>
            </div>
          ) : (
            <div className="card mb-0 shadow-sm border" id="printable-invoice-details">
              <div className="card-body p-4">
                {/* Header info */}
                <div className="mb-4">
                  <div className="row justify-content-between align-items-center border-bottom pb-4 g-3">
                    <div className="col-md-6">
                      <span className="badge bg-primary-subtle text-primary mb-2 px-3 py-1 fs-13">
                        {invoice.order_type}
                      </span>
                      <h3 className="mb-1 fw-bold text-dark">{invoice.invoice_number}</h3>
                      <p className="text-muted mb-0 fs-13">
                        Issued:{" "}
                        <span className="fw-medium text-dark">
                          {invoice.formatted_datetime || invoice.formatted_date}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <div className="invoice-logo d-flex align-items-center justify-content-md-end justify-content-start">
                        <ImageWithBasePath
                          src="assets/img/logo.svg"
                          width={140}
                          className="img-fluid logo"
                          alt="logo"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* From / To */}
                <div className="mb-4">
                  <div className="row g-3 justify-content-between align-items-start border-bottom pb-4">
                    <div className="col-md-4">
                      <h6 className="mb-2 text-uppercase text-muted fs-12 fw-bold">Invoice From</h6>
                      <p className="text-dark fw-bold mb-1">Grand Dine Hotel POS</p>
                      <p className="mb-1 text-muted fs-13">
                        15 Hodges Mews, High Wycombe HP12 3JL, UK
                      </p>
                      <p className="mb-0 text-muted fs-13">
                        Phone: <span className="text-dark">+1 45659 96566</span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h6 className="mb-2 text-uppercase text-muted fs-12 fw-bold">Billed To</h6>
                      <p className="text-dark fw-bold mb-1">{invoice.customer_name}</p>
                      <p className="mb-1 text-muted fs-13">
                        {invoice.customer_address || "1147 Rohan Drive, UK"}
                      </p>
                      <p className="mb-0 text-muted fs-13">
                        Phone:{" "}
                        <span className="text-dark">
                          {invoice.customer_phone || "+1 45659 96566"}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center justify-content-md-center justify-content-start">
                        {isPaid ? (
                          <div style={{ maxHeight: 80 }}>
                            <ImageWithBasePath
                              src="assets/img/invoices/paid-invoices.svg"
                              alt="paid-invoices-img"
                              className="img-fluid"
                            />
                          </div>
                        ) : (
                          <div className="p-3 border border-danger border-2 text-danger rounded text-center fw-bold fs-15">
                            PAYMENT PENDING
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-4">
                  <h6 className="mb-3 fw-bold text-dark">Items Details</h6>
                  <div className="table-responsive table-nowrap border rounded">
                    <table className="table mb-0 align-middle">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: 50 }}>#</th>
                          <th>Item Details</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-end">Rate</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(!invoice.items || invoice.items.length === 0) ? (
                          <tr>
                            <td colSpan={5} className="text-center text-muted py-3">
                              No items recorded for this invoice.
                            </td>
                          </tr>
                        ) : (
                          invoice.items.map((item, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td className="fw-medium text-dark">{item.item_name}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-end">${Number(item.rate).toFixed(2)}</td>
                              <td className="text-end fw-semibold text-dark">
                                ${Number(item.amount).toFixed(2)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals and Terms */}
                <div className="mb-4">
                  <div className="row g-3 justify-content-between align-items-center pb-4 border-bottom">
                    <div className="col-md-6">
                      <h6 className="mb-2 fw-bold text-dark">Terms and Conditions</h6>
                      <div className="mb-3 fs-13 text-muted">
                        <p className="mb-1">1. Goods once sold cannot be taken back or exchanged.</p>
                        <p className="mb-1">2. All taxes and government surcharges included as applicable.</p>
                      </div>
                      <div className="px-3 py-2 bg-light rounded fs-13 text-muted">
                        Payment Method:{" "}
                        <span className="fw-semibold text-dark">
                          {invoice.payment_method || "Cash"}
                        </span>{" "}
                        | Status:{" "}
                        <span
                          className={`badge ${
                            isPaid ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="bg-light p-3 rounded">
                        <div className="d-flex justify-content-between mb-2 fs-13">
                          <span className="text-muted">Subtotal</span>
                          <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="d-flex justify-content-between mb-2 fs-13">
                            <span className="text-success">Discount</span>
                            <span className="fw-semibold text-success">-${discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="d-flex justify-content-between mb-2 fs-13">
                          <span className="text-muted">VAT / Tax</span>
                          <span className="fw-semibold text-dark">${tax.toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between fs-16">
                          <span className="fw-bold text-dark">Total</span>
                          <span className="fw-bold text-primary fs-18">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center text-muted fs-12 mb-4">
                  <p className="mb-0">Authorized Representative Signature: __________________</p>
                  <p className="mb-0">Thank you for dining with Grand Dine Hotel</p>
                </div>

                {/* Print/Download Actions */}
                <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary d-flex align-items-center px-4"
                    onClick={handleExportCSV}
                  >
                    <i className="icon-download me-2" />
                    Download CSV
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center px-4"
                    onClick={handlePrint}
                  >
                    <i className="icon-printer me-2" />
                    Print Invoice / PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InvoiceDetailsComponent;