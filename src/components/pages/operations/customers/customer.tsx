"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Toast from "@/core/common/toast/toast";

interface CustomerItem {
  customer_id: number;
  customer_code: string;
  customer_name: string;
  phone: string | null;
  email: string | null;
  gender: string;
  status: string; // 'Active' | 'Disabled'
  avatar_img: string;
  created_at: string;
  created_at_formatted: string;
  total_orders?: number;
  total_spent?: number;
  total_spent_formatted?: string;
}

const CustomerComponent = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter state
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal & Drawer states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerItem | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<CustomerItem | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<CustomerItem | null>(null);

  // Form states for Add / Edit
  const [formName, setFormName] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formGender, setFormGender] = useState<string>("Male");
  const [formStatus, setFormStatus] = useState<string>("Active");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Toast notifications
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // Load customers from MySQL API
  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data || []);
      } else {
        setToast({ msg: data.error || "Failed to load customers", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to connect to customers API", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  // Reactive filtering
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (statusFilter !== "all") {
      result = result.filter(
        (c) => (c.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchText && searchText.trim()) {
      const term = searchText.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.customer_name.toLowerCase().includes(term) ||
          c.customer_code.toLowerCase().includes(term) ||
          (c.phone || "").toLowerCase().includes(term) ||
          (c.email || "").toLowerCase().includes(term) ||
          (c.gender || "").toLowerCase().includes(term)
      );
    }

    return result;
  }, [customers, statusFilter, searchText]);

  // Metric counts
  const metrics = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((c) => (c.status || "").toLowerCase() === "active").length;
    const disabled = customers.filter((c) => (c.status || "").toLowerCase() === "disabled").length;
    return { total, active, disabled };
  }, [customers]);

  // Open Add Modal
  const openAddModal = () => {
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormGender("Male");
    setFormStatus("Active");
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (c: CustomerItem) => {
    setEditingCustomer(c);
    setFormName(c.customer_name);
    setFormPhone(c.phone || "");
    setFormEmail(c.email || "");
    setFormGender(c.gender || "Male");
    setFormStatus(c.status || "Active");
  };

  // Quick toggle status
  const handleToggleStatus = async (c: CustomerItem) => {
    const newStatus = (c.status || "").toLowerCase() === "active" ? "Disabled" : "Active";
    try {
      const res = await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: c.customer_id,
          customer_name: c.customer_name,
          phone: c.phone,
          email: c.email,
          gender: c.gender,
          status: newStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: `${c.customer_name} marked as ${newStatus}`, type: "success" });
        loadCustomers();
      } else {
        setToast({ msg: data.error || "Failed to update status", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to update status", type: "danger" });
    }
  };

  // Submit Add Customer
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setToast({ msg: "Customer name is required", type: "warning" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formName.trim(),
          phone: formPhone.trim() || null,
          email: formEmail.trim() || null,
          gender: formGender,
          status: formStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Customer created successfully!", type: "success" });
        setIsAddModalOpen(false);
        loadCustomers();
      } else {
        setToast({ msg: data.error || "Failed to create customer", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to create customer", type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit Customer
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    if (!formName.trim()) {
      setToast({ msg: "Customer name is required", type: "warning" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: editingCustomer.customer_id,
          customer_name: formName.trim(),
          phone: formPhone.trim() || null,
          email: formEmail.trim() || null,
          gender: formGender,
          status: formStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Customer updated successfully!", type: "success" });
        setEditingCustomer(null);
        loadCustomers();
      } else {
        setToast({ msg: data.error || "Failed to update customer", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to update customer", type: "danger" });
    } finally {
      setSubmitting(false);
    }
  };

  // Confirm Delete Customer
  const handleDeleteConfirm = async () => {
    if (!deletingCustomer) return;
    try {
      const res = await fetch(`/api/customers?customer_id=${deletingCustomer.customer_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Customer deleted successfully!", type: "success" });
        setDeletingCustomer(null);
        loadCustomers();
      } else {
        setToast({ msg: data.error || "Failed to delete customer", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to delete customer", type: "danger" });
    }
  };

  // Get Initials for Avatar
  const getInitials = (name: string) => {
    if (!name) return "CU";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Customer{" "}
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 border shadow-sm"
                  onClick={() => loadCustomers()}
                  title="Refresh customers"
                  disabled={loading}
                >
                  <i className={`icon-refresh-ccw ${loading ? "spinner-border spinner-border-sm" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <div className="page-search">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search Customer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <i className="icon-search fs-14" />
              </div>
              <button
                type="button"
                className="btn btn-primary d-inline-flex align-items-center shadow-sm"
                onClick={openAddModal}
              >
                <i className="icon-circle-plus me-1" />
                Add New
              </button>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="d-flex align-items-center gap-2 mb-4 flex-wrap">
            <button
              type="button"
              className={`btn btn-sm ${statusFilter === "all" ? "btn-primary shadow-sm" : "btn-white border text-dark"}`}
              onClick={() => setStatusFilter("all")}
            >
              All Customers ({metrics.total})
            </button>
            <button
              type="button"
              className={`btn btn-sm d-flex align-items-center gap-1 ${statusFilter === "active" ? "btn-success text-white shadow-sm" : "btn-white border text-success"}`}
              onClick={() => setStatusFilter("active")}
            >
              <span className="badge bg-success rounded-circle p-1" />
              Active ({metrics.active})
            </button>
            <button
              type="button"
              className={`btn btn-sm d-flex align-items-center gap-1 ${statusFilter === "disabled" ? "btn-danger text-white shadow-sm" : "btn-white border text-danger"}`}
              onClick={() => setStatusFilter("disabled")}
            >
              <span className="badge bg-danger rounded-circle p-1" />
              Disabled ({metrics.disabled})
            </button>
          </div>

          {/* Customers Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="text-muted mt-2">Loading customer records...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-5 border rounded bg-white shadow-sm">
              <i className="icon-users text-muted fs-40 mb-2" />
              <h5 className="fw-bold">No Customers Found</h5>
              <p className="text-muted small mb-3">No customers match your search or filter.</p>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setStatusFilter("all");
                  setSearchText("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {filteredCustomers.map((c, idx) => {
                const isActive = (c.status || "").toLowerCase() === "active";
                return (
                  <div key={`customer-${c.customer_id}-${idx}`} className="col-xxl-4 col-xl-4 col-md-6 col-sm-6">
                    <div className="card border shadow-sm h-100 hover-shadow transition-all">
                      <div className="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                          {/* Card Header: Avatar, Name, Gender, Code */}
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <div
                                className="avatar avatar-md rounded-circle me-2 bg-light-primary text-primary border d-flex align-items-center justify-content-center fw-bold fs-13 cursor-pointer"
                                style={{ width: 44, height: 44, minWidth: 44 }}
                                onClick={() => setViewingCustomer(c)}
                                title="Click to view details"
                              >
                                {c.avatar_img && c.avatar_img.startsWith("avatar-") ? (
                                  <ImageWithBasePath
                                    src={`assets/img/profiles/${c.avatar_img}`}
                                    alt={c.customer_name}
                                    className="img-fluid rounded-circle"
                                  />
                                ) : (
                                  getInitials(c.customer_name)
                                )}
                              </div>
                              <div>
                                <h6
                                  className="fs-14 fw-semibold mb-0 cursor-pointer text-dark hover-primary"
                                  onClick={() => setViewingCustomer(c)}
                                  title="View customer profile"
                                >
                                  {c.customer_name}
                                </h6>
                                <p className="text-muted small mb-0">{c.gender || "Male"}</p>
                              </div>
                            </div>
                            <div>
                              <span className="badge bg-light text-dark border fw-medium fs-12">
                                {c.customer_code}
                              </span>
                            </div>
                          </div>

                          {/* Contact Details */}
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-2 small">
                              <span className="text-muted d-flex align-items-center">
                                <i className="icon-phone text-secondary me-2 fs-14" /> Phone Number
                              </span>
                              <span className="fw-medium text-dark">{c.phone || "Not Provided"}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2 small">
                              <span className="text-muted d-flex align-items-center">
                                <i className="icon-mail text-secondary me-2 fs-14" /> Email
                              </span>
                              <span className="fw-medium text-dark text-truncate" style={{ maxWidth: 170 }}>
                                {c.email || "Not Provided"}
                              </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between small">
                              <span className="text-muted d-flex align-items-center">
                                <i className="icon-calendar-fold text-secondary me-2 fs-14" /> Created at
                              </span>
                              <span className="fw-medium text-dark">
                                {c.created_at_formatted || new Date(c.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer: Status & Actions */}
                        <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-2">
                          <button
                            type="button"
                            className={`badge border-0 cursor-pointer ${
                              isActive ? "badge-soft-success" : "badge-soft-danger"
                            }`}
                            onClick={() => handleToggleStatus(c)}
                            title="Click to toggle status"
                          >
                            {c.status || "Active"}
                          </button>

                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-white border rounded-circle shadow-sm"
                              onClick={() => openEditModal(c)}
                              title="Edit Customer"
                            >
                              <i className="icon-pencil-line fs-14 text-secondary" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-white border rounded-circle shadow-sm"
                              onClick={() => setDeletingCustomer(c)}
                              title="Delete Customer"
                            >
                              <i className="icon-trash-2 fs-14 text-danger" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border shadow-lg">
              <div className="modal-header border-0 p-4 pb-2">
                <h4 className="modal-title fw-bold">Add New Customer</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsAddModalOpen(false)}
                />
              </div>
              <form onSubmit={handleAddSubmit}>
                <div className="modal-body p-4 pt-1">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Full Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Johnathan Smith"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. +1 555 123 4567"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold small">Gender</label>
                      <select
                        className="form-select"
                        value={formGender}
                        onChange={(e) => setFormGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold small">Status</label>
                      <select
                        className="form-select"
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-light w-100"
                      onClick={() => setIsAddModalOpen(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 shadow-sm"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Saving...
                        </>
                      ) : (
                        "Save Customer"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border shadow-lg">
              <div className="modal-header border-0 p-4 pb-2">
                <h4 className="modal-title fw-bold">Edit Customer</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingCustomer(null)}
                />
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body p-4 pt-1">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Full Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold small">Gender</label>
                      <select
                        className="form-select"
                        value={formGender}
                        onChange={(e) => setFormGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold small">Status</label>
                      <select
                        className="form-select"
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-light w-100"
                      onClick={() => setEditingCustomer(null)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 shadow-sm"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Saving...
                        </>
                      ) : (
                        "Update Customer"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCustomer && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border shadow-lg text-center p-4">
              <div className="mb-3">
                <span
                  className="avatar avatar-xl rounded-circle bg-danger-subtle text-danger d-inline-flex align-items-center justify-content-center"
                  style={{ width: 60, height: 60 }}
                >
                  <i className="icon-trash-2 fs-28" />
                </span>
              </div>
              <h5 className="fw-bold mb-1">Delete Customer</h5>
              <p className="text-muted small mb-4">
                Are you sure you want to delete <strong>{deletingCustomer.customer_name}</strong>?
              </p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light w-100"
                  onClick={() => setDeletingCustomer(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details Offcanvas / Drawer */}
      {viewingCustomer && (
        <div
          className="offcanvas offcanvas-end show d-block shadow-lg"
          tabIndex={-1}
          style={{ width: "380px" }}
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title fw-bold">Customer Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setViewingCustomer(null)}
            />
          </div>
          <div className="offcanvas-body p-4">
            <div className="text-center mb-4">
              <div
                className="avatar avatar-xxl rounded-circle mx-auto mb-2 bg-light-primary text-primary d-flex align-items-center justify-content-center fw-bold fs-22 border"
                style={{ width: 72, height: 72 }}
              >
                {getInitials(viewingCustomer.customer_name)}
              </div>
              <h5 className="fw-bold mb-0">{viewingCustomer.customer_name}</h5>
              <span className="badge bg-light text-dark border mt-1">
                {viewingCustomer.customer_code}
              </span>
            </div>

            <div className="card border bg-light mb-3">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Total Orders</span>
                  <span className="fw-bold text-dark">{viewingCustomer.total_orders || 0}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Total Spent</span>
                  <span className="fw-bold text-success">{viewingCustomer.total_spent_formatted || "$0.00"}</span>
                </div>
              </div>
            </div>

            <div className="vstack gap-3 small">
              <div>
                <span className="text-muted d-block mb-1">Phone</span>
                <span className="fw-medium text-dark">{viewingCustomer.phone || "Not Provided"}</span>
              </div>
              <div>
                <span className="text-muted d-block mb-1">Email</span>
                <span className="fw-medium text-dark">{viewingCustomer.email || "Not Provided"}</span>
              </div>
              <div>
                <span className="text-muted d-block mb-1">Gender</span>
                <span className="fw-medium text-dark">{viewingCustomer.gender}</span>
              </div>
              <div>
                <span className="text-muted d-block mb-1">Status</span>
                <span className={`badge ${
                  (viewingCustomer.status || "").toLowerCase() === "active" ? "badge-soft-success" : "badge-soft-danger"
                }`}>
                  {viewingCustomer.status}
                </span>
              </div>
              <div>
                <span className="text-muted d-block mb-1">Joined Date</span>
                <span className="fw-medium text-dark">{viewingCustomer.created_at_formatted}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={() => {
                  openEditModal(viewingCustomer);
                  setViewingCustomer(null);
                }}
              >
                <i className="icon-pencil-line me-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerComponent;
