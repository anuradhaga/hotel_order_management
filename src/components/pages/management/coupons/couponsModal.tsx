"use client";
import React, { useState, useEffect } from "react";

export interface CategoryOption {
  category_id: number;
  category_name: string;
}

export interface CouponRecord {
  coupon_id?: number;
  id?: string | number;
  key?: string;
  coupon_code: string;
  Coupon_Code?: string;
  category_id?: number | null;
  Valid_Category?: string;
  category_name?: string;
  discount_type: string;
  Discount_Type?: string;
  discount_amount: number | string;
  discount_amount_raw?: number;
  Discount_Amount?: string;
  start_date: string;
  end_date: string;
  Duration?: string;
  is_active: number;
  Status?: string;
  status?: string;
  created_at?: string;
}

interface CouponsModalProps {
  categories: CategoryOption[];
  viewingCoupon?: CouponRecord | null;
  editingCoupon?: CouponRecord | null;
  onSuccess: () => void;
  onApplyFilter?: (filter: { categoryId: string; discountType: string; status: string }) => void;
  onResetFilter?: () => void;
}

const CouponsModal: React.FC<CouponsModalProps> = ({
  categories,
  viewingCoupon,
  editingCoupon,
  onSuccess,
  onApplyFilter,
  onResetFilter,
}) => {
  // ----------------------------------------------------
  // Copy to clipboard state
  // ----------------------------------------------------
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ----------------------------------------------------
  // Add Coupon Form State
  // ----------------------------------------------------
  const [addCode, setAddCode] = useState("");
  const [addCategoryId, setAddCategoryId] = useState<string>("all");
  const [addDiscountType, setAddDiscountType] = useState<string>("Percentage");
  const [addDiscountAmount, setAddDiscountAmount] = useState<string>("");
  const [addStartDate, setAddStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [addEndDate, setAddEndDate] = useState<string>(() => {
    const future = new Date();
    future.setMonth(future.getMonth() + 3);
    return future.toISOString().split("T")[0];
  });
  const [addIsActive, setAddIsActive] = useState<number>(1);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addCode.trim()) {
      setAddError("Coupon code is required.");
      return;
    }
    const amt = parseFloat(addDiscountAmount);
    if (isNaN(amt) || amt < 0) {
      setAddError("Please provide a valid positive discount amount.");
      return;
    }
    if (addDiscountType === "Percentage" && amt > 100) {
      setAddError("Percentage discount cannot exceed 100%.");
      return;
    }
    if (!addStartDate || !addEndDate) {
      setAddError("Start date and Expiry date are required.");
      return;
    }
    if (addStartDate > addEndDate) {
      setAddError("Expiry date must be after or equal to Start date.");
      return;
    }

    setAdding(true);
    setAddError(null);

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon_code: addCode.trim().toUpperCase(),
          category_id: addCategoryId === "all" ? null : Number(addCategoryId),
          discount_type: addDiscountType,
          discount_amount: amt,
          start_date: addStartDate,
          end_date: addEndDate,
          is_active: addIsActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Reset
        setAddCode("");
        setAddCategoryId("all");
        setAddDiscountType("Percentage");
        setAddDiscountAmount("");
        setAddIsActive(1);
        document.getElementById("close_add_coupon_btn")?.click();
        onSuccess();
      } else {
        setAddError(data.error || "Failed to create coupon.");
      }
    } catch (err: any) {
      setAddError(err.message || "Failed to submit request.");
    } finally {
      setAdding(false);
    }
  };

  // ----------------------------------------------------
  // Edit Coupon Form State
  // ----------------------------------------------------
  const [editId, setEditId] = useState<number | null>(null);
  const [editCode, setEditCode] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<string>("all");
  const [editDiscountType, setEditDiscountType] = useState<string>("Percentage");
  const [editDiscountAmount, setEditDiscountAmount] = useState<string>("");
  const [editStartDate, setEditStartDate] = useState<string>("");
  const [editEndDate, setEditEndDate] = useState<string>("");
  const [editIsActive, setEditIsActive] = useState<number>(1);
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  useEffect(() => {
    if (editingCoupon) {
      setEditId(Number(editingCoupon.coupon_id || editingCoupon.id) || null);
      setEditCode(editingCoupon.coupon_code || editingCoupon.Coupon_Code || "");
      setEditCategoryId(
        editingCoupon.category_id !== null && editingCoupon.category_id !== undefined
          ? String(editingCoupon.category_id)
          : "all"
      );
      setEditDiscountType(editingCoupon.discount_type || editingCoupon.Discount_Type || "Percentage");
      const rawAmt =
        editingCoupon.discount_amount_raw ?? editingCoupon.discount_amount ?? "";
      setEditDiscountAmount(rawAmt !== undefined && rawAmt !== null ? String(rawAmt) : "");
      setEditStartDate(editingCoupon.start_date || "");
      setEditEndDate(editingCoupon.end_date || "");
      setEditIsActive(editingCoupon.is_active !== undefined ? Number(editingCoupon.is_active) : 1);
      setEditError(null);
    }
  }, [editingCoupon]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) {
      setEditError("No coupon selected for editing.");
      return;
    }
    if (!editCode.trim()) {
      setEditError("Coupon code is required.");
      return;
    }
    const amt = parseFloat(editDiscountAmount);
    if (isNaN(amt) || amt < 0) {
      setEditError("Please provide a valid positive discount amount.");
      return;
    }
    if (editDiscountType === "Percentage" && amt > 100) {
      setEditError("Percentage discount cannot exceed 100%.");
      return;
    }
    if (!editStartDate || !editEndDate) {
      setEditError("Start date and Expiry date are required.");
      return;
    }
    if (editStartDate > editEndDate) {
      setEditError("Expiry date must be after or equal to Start date.");
      return;
    }

    setEditing(true);
    setEditError(null);

    try {
      const res = await fetch("/api/coupons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon_id: editId,
          coupon_code: editCode.trim().toUpperCase(),
          category_id: editCategoryId === "all" ? null : Number(editCategoryId),
          discount_type: editDiscountType,
          discount_amount: amt,
          start_date: editStartDate,
          end_date: editEndDate,
          is_active: editIsActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        document.getElementById("close_edit_coupon_btn")?.click();
        onSuccess();
      } else {
        setEditError(data.error || "Failed to update coupon.");
      }
    } catch (err: any) {
      setEditError(err.message || "Failed to submit update.");
    } finally {
      setEditing(false);
    }
  };

  // ----------------------------------------------------
  // Filter State
  // ----------------------------------------------------
  const [filterCategoryId, setFilterCategoryId] = useState<string>("all");
  const [filterDiscountType, setFilterDiscountType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleApplyFilter = () => {
    onApplyFilter?.({
      categoryId: filterCategoryId,
      discountType: filterDiscountType,
      status: filterStatus,
    });
  };

  const handleResetFilter = () => {
    setFilterCategoryId("all");
    setFilterDiscountType("all");
    setFilterStatus("all");
    onResetFilter?.();
  };

  return (
    <>
      {/* ==================================================== */}
      {/* 1. VIEW / SHOW COUPON MODAL                          */}
      {/* ==================================================== */}
      <div className="modal fade" id="show_coupon" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 p-4 pb-2">
              <h4 className="modal-title fw-bold">Coupon Details</h4>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <div className="modal-body p-4 pt-1">
              {viewingCoupon ? (
                <div>
                  {/* Coupon Code Banner with Copy Action */}
                  <div className="p-3 bg-light border rounded border-dashed d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <span className="text-muted fs-12 d-block mb-1">Coupon Code:</span>
                      <h5 className="mb-0 fw-bold font-monospace text-primary fs-18">
                        {viewingCoupon.coupon_code || viewingCoupon.Coupon_Code}
                      </h5>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-white border shadow-xs d-inline-flex align-items-center"
                      onClick={() =>
                        handleCopyCode(
                          viewingCoupon.coupon_code || viewingCoupon.Coupon_Code || ""
                        )
                      }
                      title="Copy code to clipboard"
                    >
                      <i className="icon-copy me-1" />
                      {copied ? "Copied!" : "Copy Code"}
                    </button>
                  </div>

                  {/* Details Grid */}
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded border">
                        <span className="text-muted fs-12 d-block mb-1">Valid Category</span>
                        <span className="fw-semibold text-dark fs-14">
                          {viewingCoupon.Valid_Category || viewingCoupon.category_name || "All Categories"}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded border">
                        <span className="text-muted fs-12 d-block mb-1">Discount</span>
                        <span className="fw-bold text-success fs-15">
                          {viewingCoupon.Discount_Amount ||
                            (viewingCoupon.discount_type === "Percentage"
                              ? `${viewingCoupon.discount_amount}%`
                              : `LKR ${Number(viewingCoupon.discount_amount).toFixed(2)}`)}
                        </span>
                        <span className="badge bg-light text-muted border fs-11 ms-2">
                          {viewingCoupon.discount_type || viewingCoupon.Discount_Type}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded border">
                        <span className="text-muted fs-12 d-block mb-1">Duration</span>
                        <span className="fw-semibold text-dark fs-13">
                          {viewingCoupon.Duration ||
                            `${viewingCoupon.start_date} - ${viewingCoupon.end_date}`}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="p-3 bg-light rounded border">
                        <span className="text-muted fs-12 d-block mb-1">Status</span>
                        <span
                          className={`badge ${
                            (viewingCoupon.Status || viewingCoupon.status) === "Active"
                              ? "badge-soft-success"
                              : "badge-soft-danger"
                          }`}
                        >
                          {viewingCoupon.Status || viewingCoupon.status || "Active"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted my-3">No coupon selected.</p>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  className="btn btn-light w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. ADD COUPON MODAL                                  */}
      {/* ==================================================== */}
      <div className="modal fade" id="add_coupon" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 p-4 pb-2">
              <h4 className="modal-title fw-bold">Add New Coupon</h4>
              <button
                id="close_add_coupon_btn"
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body p-4 pt-1">
                {addError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3" role="alert">
                    <i className="icon-alert-circle me-1" />
                    {addError}
                  </div>
                )}

                {/* Coupon Code */}
                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">
                    Coupon Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control font-monospace text-uppercase"
                    placeholder="e.g. SEAFOOD10, SUMMER25"
                    value={addCode}
                    onChange={(e) => setAddCode(e.target.value.toUpperCase())}
                    required
                  />
                  <small className="text-muted fs-11">
                    Enter uppercase code customers will enter at checkout.
                  </small>
                </div>

                {/* Valid Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">
                    Valid Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={addCategoryId}
                    onChange={(e) => setAddCategoryId(e.target.value)}
                  >
                    <option value="all">All Categories (Storewide)</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row g-3 mb-3">
                  {/* Discount Type */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Discount Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={addDiscountType}
                      onChange={(e) => setAddDiscountType(e.target.value)}
                    >
                      <option value="Percentage">Percentage (%)</option>
                      <option value="Fixed Amount">Fixed Amount (LKR)</option>
                    </select>
                  </div>

                  {/* Discount Amount */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Discount Amount <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text fw-semibold fs-12">
                        {addDiscountType === "Percentage" ? "%" : "LKR"}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={addDiscountType === "Percentage" ? 100 : undefined}
                        className="form-control font-monospace"
                        placeholder={addDiscountType === "Percentage" ? "10" : "150.00"}
                        value={addDiscountAmount}
                        onChange={(e) => setAddDiscountAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={addStartDate}
                      onChange={(e) => setAddStartDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Expiry Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={addEndDate}
                      onChange={(e) => setAddEndDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="col-12">
                    <label className="form-label fw-semibold fs-13">Status</label>
                    <select
                      className="form-select"
                      value={addIsActive}
                      onChange={(e) => setAddIsActive(Number(e.target.value))}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive / Disabled</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center"
                    disabled={adding}
                  >
                    {adding ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Coupon"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. EDIT COUPON MODAL                                 */}
      {/* ==================================================== */}
      <div className="modal fade" id="edit_coupon" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-0 p-4 pb-2">
              <h4 className="modal-title fw-bold">Edit Coupon</h4>
              <button
                id="close_edit_coupon_btn"
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body p-4 pt-1">
                {editError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3" role="alert">
                    <i className="icon-alert-circle me-1" />
                    {editError}
                  </div>
                )}

                {/* Coupon Code */}
                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">
                    Coupon Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control font-monospace text-uppercase"
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                {/* Valid Category */}
                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">
                    Valid Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={editCategoryId}
                    onChange={(e) => setEditCategoryId(e.target.value)}
                  >
                    <option value="all">All Categories (Storewide)</option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row g-3 mb-3">
                  {/* Discount Type */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Discount Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={editDiscountType}
                      onChange={(e) => setEditDiscountType(e.target.value)}
                    >
                      <option value="Percentage">Percentage (%)</option>
                      <option value="Fixed Amount">Fixed Amount (LKR)</option>
                    </select>
                  </div>

                  {/* Discount Amount */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Discount Amount <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text fw-semibold fs-12">
                        {editDiscountType === "Percentage" ? "%" : "LKR"}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={editDiscountType === "Percentage" ? 100 : undefined}
                        className="form-control font-monospace"
                        value={editDiscountAmount}
                        onChange={(e) => setEditDiscountAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={editStartDate}
                      onChange={(e) => setEditStartDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="col-sm-6">
                    <label className="form-label fw-semibold fs-13">
                      Expiry Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={editEndDate}
                      onChange={(e) => setEditEndDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="col-12">
                    <label className="form-label fw-semibold fs-13">Status</label>
                    <select
                      className="form-select"
                      value={editIsActive}
                      onChange={(e) => setEditIsActive(Number(e.target.value))}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive / Disabled</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center"
                    disabled={editing}
                  >
                    {editing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving Changes...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 4. FILTER OFFCANVAS                                  */}
      {/* ==================================================== */}
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="filter-offcanvas">
        <div className="offcanvas-header pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between w-100 pb-3">
            <h4 className="offcanvas-title mb-0">Filter Coupons</h4>
            <button
              type="button"
              className="btn-close btn-close-modal"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="icon-x" />
            </button>
          </div>
        </div>
        <div className="offcanvas-body d-flex flex-column pt-3">
          <div>
            {/* Category Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Valid Category</label>
              <select
                className="form-select"
                value={filterCategoryId}
                onChange={(e) => setFilterCategoryId(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Discount Type Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Discount Type</label>
              <select
                className="form-select"
                value={filterDiscountType}
                onChange={(e) => setFilterDiscountType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed Amount">Fixed Amount</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-auto offcanvas-footer border-0 pt-3">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={handleResetFilter}
              data-bs-dismiss="offcanvas"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleApplyFilter}
              data-bs-dismiss="offcanvas"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponsModal;
