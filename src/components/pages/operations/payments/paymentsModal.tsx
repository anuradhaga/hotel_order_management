"use client";
import { useState, useEffect } from "react";

export interface PaymentRecord {
  id?: string | number;
  payment_id?: number;
  order_id?: number;
  Transaction_ID: string;
  Order_ID: string;
  Token_No: string;
  Customer: string;
  image?: string;
  Order_Type: string;
  Menus: string | number;
  Amount: string;
  total_amount?: number;
  payment_method?: string;
  payment_status?: string;
  Status?: string;
  Date?: string;
  created_at_formatted?: string;
}

interface PaymentsModalProps {
  selectedPayment?: PaymentRecord | null;
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

const PaymentsModal = ({
  selectedPayment,
  customersList = [],
  currentFilter = { customers: [], orderTypes: [], status: "all" },
  onApplyFilter,
  onResetFilter,
}: PaymentsModalProps) => {
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

  const filteredCustomersList = customersList.filter((c) =>
    c.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <>
      {/* Transaction Quick Detail Modal */}
      <div className="modal fade" id="view_transaction_modal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom py-3">
              <h5 className="modal-title fw-bold">
                <i className="icon-receipt me-2 text-primary" />
                Payment Details
              </h5>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <div className="modal-body p-4">
              {selectedPayment ? (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                    <div>
                      <span className="badge bg-primary-subtle text-primary fs-13 mb-1">
                        {selectedPayment.Order_Type}
                      </span>
                      <h4 className="mb-0 fw-bold text-dark">{selectedPayment.Transaction_ID}</h4>
                    </div>
                    <div className="text-end">
                      <span className="badge bg-success-subtle text-success fs-13">
                        {selectedPayment.Status || "SETTLED"}
                      </span>
                      <p className="text-muted fs-12 mb-0 mt-1">
                        Token: <strong className="text-dark">#{selectedPayment.Token_No}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <p className="text-muted fs-13 mb-1">Customer</p>
                      <p className="fw-semibold text-dark mb-0">{selectedPayment.Customer}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted fs-13 mb-1">Order Reference</p>
                      <p className="fw-semibold text-primary mb-0">{selectedPayment.Order_ID}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted fs-13 mb-1">Payment Method</p>
                      <p className="fw-semibold text-dark mb-0">
                        {selectedPayment.payment_method || "Cash"}
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted fs-13 mb-1">Menu Items</p>
                      <p className="fw-semibold text-dark mb-0">{selectedPayment.Menus} items</p>
                    </div>
                    <div className="col-12">
                      <p className="text-muted fs-13 mb-1">Date & Time</p>
                      <p className="fw-semibold text-dark mb-0">
                        {selectedPayment.created_at_formatted || selectedPayment.Date || "Recent"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-light p-3 rounded mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-dark fs-15">Grand Total Paid:</span>
                      <span className="fw-bold text-primary fs-20">{selectedPayment.Amount}</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => window.print()}
                    >
                      <i className="icon-printer me-1" />
                      Print Receipt
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted mb-0">No payment selected.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Start Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="filter-offcanvas"
        aria-labelledby="paymentsFilterLabel"
        style={{ width: 380 }}
      >
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold" id="paymentsFilterLabel">
            <i className="icon-funnel me-2 text-primary" />
            Filter Payments
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
              <label className="form-label fw-semibold fs-13">Payment Status</label>
              <div className="d-flex gap-2">
                {["all", "SETTLED", "PENDING"].map((st) => (
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
                style={{ maxHeight: 200, overflowY: "auto" }}
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

export default PaymentsModal;