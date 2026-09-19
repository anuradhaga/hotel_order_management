"use client";
import { useState, useEffect } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { all_routes } from "@/routes/all_routes";

export interface InvoiceItemDetail {
  item_id?: number;
  item_name: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceRecord {
  id?: string | number;
  invoice_id?: number;
  Invoice_ID: string;
  invoice_number?: string;
  Customer: string;
  customer_name?: string;
  image?: string;
  Date: string;
  invoice_date?: string;
  Order_Type: string;
  order_type?: string;
  Amount: string;
  total_amount?: number;
  subtotal?: number;
  discount?: number;
  tax_amount?: number;
  Status: string;
  status?: string;
  payment_method?: string;
  customer_phone?: string;
  customer_email?: string;
  customer_address?: string;
  items?: InvoiceItemDetail[];
}

interface InvoicesModalProps {
  selectedInvoice?: InvoiceRecord | null;
  customersList?: string[];
  currentFilter?: {
    customers: string[];
    orderTypes: string[];
    status: string;
  };
  onApplyFilter?: (filter: {
    customers: string[];
    orderTypes: string[];
    status: string;
  }) => void;
  onResetFilter?: () => void;
}

const InvoicesModal = ({
  selectedInvoice,
  customersList = [],
  currentFilter = { customers: [], orderTypes: [], status: "all" },
  onApplyFilter,
  onResetFilter,
}: InvoicesModalProps) => {
  // Local state for Filter offcanvas
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>(
    currentFilter.customers || []
  );
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<string[]>(
    currentFilter.orderTypes || []
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    currentFilter.status || "all"
  );
  const [customerSearch, setCustomerSearch] = useState<string>("");

  useEffect(() => {
    setSelectedCustomers(currentFilter.customers || []);
    setSelectedOrderTypes(currentFilter.orderTypes || []);
    setSelectedStatus(currentFilter.status || "all");
  }, [currentFilter]);

  const toggleCustomer = (cust: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(cust) ? prev.filter((c) => c !== cust) : [...prev, cust]
    );
  };

  const toggleOrderType = (type: string) => {
    setSelectedOrderTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    if (onApplyFilter) {
      onApplyFilter({
        customers: selectedCustomers,
        orderTypes: selectedOrderTypes,
        status: selectedStatus,
      });
    }
  };

  const handleReset = () => {
    setSelectedCustomers([]);
    setSelectedOrderTypes([]);
    setSelectedStatus("all");
    if (onResetFilter) {
      onResetFilter();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Fallback items if none attached
  const inv = selectedInvoice;
  const invNumber = inv?.invoice_number || inv?.Invoice_ID || "#INV0016";
  const custName = inv?.customer_name || inv?.Customer || "Adrian James";
  const invDate = inv?.Date || "01 Nov 2025";
  const custPhone = inv?.customer_phone || "+1 987 654 3210";
  const custAddress =
    inv?.customer_address || "15 Hodges Mews, High Wycombe HP12 3JL, UK";
  const isPaid = (inv?.Status || inv?.status || "Paid").toLowerCase() === "paid";

  const items: InvoiceItemDetail[] =
    inv?.items && inv.items.length > 0
      ? inv.items
      : [
          { item_name: "Grilled Salmon Steak", quantity: 2, rate: 350.0, amount: 700.0 },
          { item_name: "Mediterranean Salad Bowl", quantity: 1, rate: 120.0, amount: 120.0 },
          { item_name: "Fresh Coconut Refresher", quantity: 2, rate: 50.0, amount: 100.0 },
        ];

  const subtotal =
    inv?.subtotal !== undefined
      ? Number(inv.subtotal)
      : items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const discount = inv?.discount !== undefined ? Number(inv.discount) : 0;
  const tax =
    inv?.tax_amount !== undefined
      ? Number(inv.tax_amount)
      : Math.round(subtotal * 0.08);
  const total =
    inv?.total_amount !== undefined
      ? Number(inv.total_amount)
      : subtotal - discount + tax;

  const filteredCustomersList = customersList.filter((c) =>
    c.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <>
      {/* View Invoices Modal */}
      <div className="modal fade" id="view_invoices" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 p-4 pb-3">
              <div className="d-flex align-items-center gap-2">
                <h5 className="modal-title mb-0">Invoice Preview</h5>
                <span
                  className={`badge ${
                    isPaid ? "badge-soft-success" : "badge-soft-danger"
                  } ms-2`}
                >
                  {inv?.Status || inv?.status || "Paid"}
                </span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <div className="modal-body p-4 pt-1" id="printable-invoice">
              <div className="card mb-3 border">
                <div className="card-body">
                  <div className="mb-4">
                    <div className="row justify-content-between align-items-center border-bottom pb-4">
                      <div className="col-md-6">
                        <span className="badge bg-primary-subtle text-primary mb-2 px-3 py-1 fs-13">
                          {inv?.Order_Type || inv?.order_type || "Dine In"}
                        </span>
                        <h4 className="mb-1 fw-bold text-dark">{invNumber}</h4>
                        <p className="text-muted mb-0 fs-13">
                          Issued: <span className="fw-medium text-dark">{invDate}</span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-2 invoice-logo text-end">
                          <ImageWithBasePath
                            src="assets/img/logo.svg"
                            width={130}
                            className="img-fluid logo"
                            alt="logo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="row justify-content-between align-items-start border-bottom pb-4 g-3">
                      <div className="col-md-4">
                        <h6 className="mb-2 text-uppercase text-muted fs-12 fw-bold">
                          Invoice From
                        </h6>
                        <p className="text-dark fw-bold mb-1">Grand Dine Hotel POS</p>
                        <p className="text-muted mb-1 fs-13">
                          15 Hodges Mews, High Wycombe HP12 3JL, UK
                        </p>
                        <p className="text-muted mb-0 fs-13">
                          Phone: <span className="text-dark">+1 45659 96566</span>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <h6 className="mb-2 text-uppercase text-muted fs-12 fw-bold">
                          Billed To
                        </h6>
                        <p className="text-dark fw-bold mb-1">{custName}</p>
                        <p className="text-muted mb-1 fs-13">{custAddress}</p>
                        <p className="text-muted mb-0 fs-13">
                          Phone: <span className="text-dark">{custPhone}</span>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-center justify-content-md-end justify-content-start">
                          {isPaid ? (
                            <div style={{ maxHeight: 70 }}>
                              <ImageWithBasePath
                                src="assets/img/invoices/paid-invoices.svg"
                                alt="paid-invoices-img"
                                className="img-fluid"
                              />
                            </div>
                          ) : (
                            <div className="p-3 border border-danger border-2 text-danger rounded text-center fw-bold fs-14">
                              PAYMENT PENDING
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h6 className="mb-3 fw-bold text-dark">Order Items Summary</h6>
                    <div className="table-responsive table-nowrap border rounded">
                      <table className="table mb-0 align-middle">
                        <thead className="table-light">
                          <tr>
                            <th style={{ width: 50 }}>#</th>
                            <th>Item Details</th>
                            <th className="text-center">Qty</th>
                            <th className="text-end">Rate</th>
                            <th className="text-end">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td className="fw-medium text-dark">{item.item_name}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-end">LKR {Number(item.rate).toFixed(2)}</td>
                              <td className="text-end fw-semibold">
                                LKR {Number(item.amount).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="row justify-content-between align-items-center pb-4 border-bottom g-3">
                      <div className="col-md-6">
                        <h6 className="mb-2 fw-bold text-dark">Payment Information</h6>
                        <p className="mb-1 fs-13 text-muted">
                          Method:{" "}
                          <span className="fw-semibold text-dark">
                            {inv?.payment_method || "Cash"}
                          </span>
                        </p>
                        <p className="mb-3 fs-13 text-muted">
                          Status:{" "}
                          <span
                            className={`badge ${
                              isPaid ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"
                            }`}
                          >
                            {inv?.Status || inv?.status || "Paid"}
                          </span>
                        </p>
                        <div className="px-3 py-2 bg-light rounded">
                          <p className="mb-0 fs-12 text-muted">
                            Thank you for your business. For billing inquiries, contact accounting@granddine.com.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="bg-light p-3 rounded">
                          <div className="d-flex justify-content-between mb-2 fs-13">
                            <span className="text-muted">Subtotal:</span>
                            <span className="fw-semibold text-dark">LKR {subtotal.toFixed(2)}</span>
                          </div>
                          {discount > 0 && (
                            <div className="d-flex justify-content-between mb-2 fs-13">
                              <span className="text-success">Discount:</span>
                              <span className="fw-semibold text-success">-LKR {discount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="d-flex justify-content-between mb-2 fs-13">
                            <span className="text-muted">VAT / Tax:</span>
                            <span className="fw-semibold text-dark">LKR {tax.toFixed(2)}</span>
                          </div>
                          <hr className="my-2" />
                          <div className="d-flex justify-content-between fs-15">
                            <span className="fw-bold text-dark">Total Amount:</span>
                            <span className="fw-bold text-primary fs-16">LKR {total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center text-muted fs-12">
                    <p className="mb-0">Computer Generated Tax Invoice</p>
                    <p className="mb-0">Authorized Signatory</p>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <Link
                  href={`${all_routes.invoicesDetails}?invoice_number=${encodeURIComponent(invNumber)}`}
                  className="btn btn-primary d-flex align-items-center"
                  data-bs-dismiss="modal"
                >
                  <i className="icon-external-link me-1" />
                  Full Details Page
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-secondary d-flex align-items-center"
                  onClick={handlePrint}
                >
                  <i className="icon-printer me-1" />
                  Print / Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* View Invoices End */}

      {/* Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="filter-offcanvas"
        aria-labelledby="filterOffcanvasLabel"
        style={{ width: 380 }}
      >
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold" id="filterOffcanvasLabel">
            <i className="icon-funnel me-2 text-primary" />
            Filter Invoices
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="offcanvas-body d-flex flex-column pt-3">
          <div>
            {/* Status Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold fs-13">Invoice Status</label>
              <div className="d-flex gap-2">
                {["all", "Paid", "Unpaid", "Refunded"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`btn btn-sm flex-fill ${
                      selectedStatus.toLowerCase() === st.toLowerCase()
                        ? "btn-primary"
                        : "btn-light"
                    }`}
                    onClick={() => setSelectedStatus(st)}
                  >
                    {st === "all" ? "All" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Type Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold fs-13">Order Type</label>
              <div className="vstack gap-2 border p-2 rounded bg-light">
                {["Dine In", "Take Away", "Delivery"].map((type) => {
                  const checked = selectedOrderTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="d-flex align-items-center cursor-pointer mb-0 fs-13"
                    >
                      <input
                        className="form-check-input m-0 me-2"
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOrderType(type)}
                      />
                      {type}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Customer Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold fs-13">Customer</label>
              <div className="input-group input-group-sm mb-2">
                <span className="input-group-text bg-light">
                  <i className="icon-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search customer..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
              </div>
              <div
                className="vstack gap-2 border p-2 rounded bg-light"
                style={{ maxHeight: 180, overflowY: "auto" }}
              >
                {filteredCustomersList.length === 0 ? (
                  <p className="text-muted fs-12 mb-0 text-center py-2">No customers found</p>
                ) : (
                  filteredCustomersList.map((cust) => {
                    const checked = selectedCustomers.includes(cust);
                    return (
                      <label
                        key={cust}
                        className="d-flex align-items-center cursor-pointer mb-0 fs-13"
                      >
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCustomer(cust)}
                        />
                        {cust}
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-auto offcanvas-footer border-top pt-3">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              data-bs-dismiss="offcanvas"
              onClick={handleApply}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
      {/* End Filter */}
    </>
  );
};

export default InvoicesModal;