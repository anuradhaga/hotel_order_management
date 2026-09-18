"use client";
import React, { useState, useEffect } from "react";
import CommonSelect from "@/core/common/common-select/commonSelect";
import { Role, Status_Inactive } from "@/core/data/json/selectOption";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";

interface UsersModalProps {
  onUserAdded?: () => void;
  selectedUser?: any;
}

const UsersModal: React.FC<UsersModalProps> = ({ onUserAdded, selectedUser }) => {
  // Add User State
  const [addFirstName, setAddFirstName] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [addRole, setAddRole] = useState("WAITER");
  const [addPhone, setAddPhone] = useState("");
  const [addStatus, setAddStatus] = useState("Active");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  // Edit User State
  const [editFullName, setEditFullName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [editRole, setEditRole] = useState("WAITER");
  const [editPhone, setEditPhone] = useState("");
  const [editStatus, setEditStatus] = useState("Active");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setEditFullName(selectedUser.Customer || "");
      setEditRole(selectedUser.Role || "WAITER");
      setEditPhone(selectedUser.Phone_Number === "—" ? "" : selectedUser.Phone_Number || "");
      setEditStatus(selectedUser.Status || "Active");
      setEditPassword("");
      setShowEditPassword(false);
      setEditError(null);
      setEditSuccess(null);
    }
  }, [selectedUser]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(null);

    const fullName = `${addFirstName.trim()} ${addLastName.trim()}`.trim();
    if (!fullName) {
      setAddError("Please enter First Name.");
      return;
    }

    let username = addUsername.trim();
    if (!username) {
      const cleanBase = addFirstName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      username = `${cleanBase || "user"}_${Math.floor(100 + Math.random() * 900)}`;
    }

    setAddLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          full_name: fullName,
          password: addPassword.trim() || "password123",
          phone: addPhone.trim(),
          role_code: addRole,
          outlet_id: 1,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setAddError(data.error || "Failed to add user");
      } else {
        setAddSuccess("User successfully created in database!");
        setAddFirstName("");
        setAddLastName("");
        setAddUsername("");
        setAddPassword("");
        setAddPhone("");
        onUserAdded?.();
        setTimeout(() => {
          document.getElementById("close-add-user-modal")?.click();
          setAddSuccess(null);
        }, 800);
      }
    } catch (err: any) {
      setAddError(err.message || "Network error occurred");
    } finally {
      setAddLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser?.user_id && !selectedUser?.id) {
      setEditError("No user selected for update.");
      return;
    }
    setEditError(null);
    setEditSuccess(null);
    setEditLoading(true);

    try {
      const payload: any = {
        user_id: Number(selectedUser.user_id || selectedUser.id),
        full_name: editFullName.trim(),
        phone: editPhone.trim(),
        role_code: editRole,
        is_active: editStatus === "Active" ? 1 : 0,
      };

      if (editPassword.trim()) {
        payload.password = editPassword.trim();
      }

      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setEditError(data.error || "Failed to update user");
      } else {
        setEditSuccess("User updated successfully!");
        setEditPassword("");
        onUserAdded?.();
        setTimeout(() => {
          document.getElementById("close-edit-user-modal")?.click();
          setEditSuccess(null);
        }, 800);
      }
    } catch (err: any) {
      setEditError(err.message || "Network error occurred");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <>
      {/* Add users */}
      <div className="modal fade" id="add_users">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom p-4 pb-3">
              <h4 className="modal-title fw-bold">Add New User to System</h4>
              <button
                type="button"
                id="close-add-user-modal"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body p-4 pt-3">
                {addError && (
                  <div className="alert alert-danger py-2 small mb-3">
                    <i className="icon-alert-triangle me-1" />
                    {addError}
                  </div>
                )}
                {addSuccess && (
                  <div className="alert alert-success py-2 small mb-3">
                    <i className="icon-check-circle me-1" />
                    {addSuccess}
                  </div>
                )}

                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        First Name<span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Sunil"
                        value={addFirstName}
                        onChange={(e) => setAddFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Fernando"
                        value={addLastName}
                        onChange={(e) => setAddLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. sunil_f (auto if blank)"
                        value={addUsername}
                        onChange={(e) => setAddUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Role<span className="text-danger"> *</span>
                      </label>
                      <select
                        className="form-select"
                        value={addRole}
                        onChange={(e) => setAddRole(e.target.value)}
                      >
                        <option value="WAITER">WAITER (Floor Server)</option>
                        <option value="CASHIER">CASHIER (Billing & OTP)</option>
                        <option value="CHEF">CHEF (Kitchen Display)</option>
                        <option value="EXPEDITER">EXPEDITER (Packing & Dispatch)</option>
                        <option value="ADMIN">ADMIN / OWNER</option>
                        <option value="MANAGER">MANAGER</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="e.g. +94 77 123 4567"
                        value={addPhone}
                        onChange={(e) => setAddPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Status</label>
                      <select
                        className="form-select"
                        value={addStatus}
                        onChange={(e) => setAddStatus(e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="form-label fw-semibold mb-0">Password</label>
                        <span className="badge bg-light text-muted fw-normal" style={{ fontSize: 11 }}>
                          Optional • Defaults to: <code>password123</code>
                        </span>
                      </div>
                      <div className="input-group">
                        <input
                          type={showAddPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Set custom password (or leave empty for default)"
                          value={addPassword}
                          onChange={(e) => setAddPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowAddPassword(!showAddPassword)}
                          title={showAddPassword ? "Hide password" : "Show password"}
                        >
                          <i className={showAddPassword ? "icon-eye-off" : "icon-eye"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-2 pt-2 border-top mt-2">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                    disabled={addLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                    disabled={addLoading}
                  >
                    {addLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Saving...
                      </>
                    ) : (
                      "Save to Database"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add users End */}

      {/* Edit users */}
      <div className="modal fade" id="edit_users">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom p-4 pb-3">
              <h4 className="modal-title fw-bold">Edit User Details</h4>
              <button
                type="button"
                id="close-edit-user-modal"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body p-4 pt-3">
                {editError && (
                  <div className="alert alert-danger py-2 small mb-3">
                    <i className="icon-alert-triangle me-1" />
                    {editError}
                  </div>
                )}
                {editSuccess && (
                  <div className="alert alert-success py-2 small mb-3">
                    <i className="icon-check-circle me-1" />
                    {editSuccess}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Role<span className="text-danger"> *</span>
                      </label>
                      <select
                        className="form-select"
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                      >
                        <option value="WAITER">WAITER (Floor Server)</option>
                        <option value="CASHIER">CASHIER (Billing & OTP)</option>
                        <option value="CHEF">CHEF (Kitchen Display)</option>
                        <option value="EXPEDITER">EXPEDITER (Packing & Dispatch)</option>
                        <option value="ADMIN">ADMIN / OWNER</option>
                        <option value="MANAGER">MANAGER</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Status</label>
                  <select
                    className="form-select"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label fw-semibold mb-0">Reset / Change Password</label>
                    <span className="badge bg-light text-muted fw-normal" style={{ fontSize: 11 }}>
                      Leave blank to keep current password
                    </span>
                  </div>
                  <div className="input-group">
                    <input
                      type={showEditPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter new password (optional)"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowEditPassword(!showEditPassword)}
                      title={showEditPassword ? "Hide password" : "Show password"}
                    >
                      <i className={showEditPassword ? "icon-eye-off" : "icon-eye"} />
                    </button>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-2 pt-2 border-top mt-2">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                    disabled={editLoading}
                  >
                    {editLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Updating...
                      </>
                    ) : (
                      "Update User"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edit users End */}
      {/* Start Filter */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="filter-offcanvas"
      >
        <div className="offcanvas-header pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between w-100 pb-3">
            <h4 className="offcanvas-title mb-0">Filter</h4>
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
            <div className="mb-3">
              <label className="form-label">
                Name<span className="text-danger"> *</span>
              </label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white d-flex align-items-center justify-content-between"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Select
                </Link>
                <div className="dropdown-menu dropdown-menu-end p-3 w-100">
                  <h6 className="fs-14 fw-semibold mb-3">Name</h6>
                  <div className="input-icon-end input-icon position-relative mb-3">
                    <span className="input-icon-addon">
                      <i className="icon-search text-dark" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-md"
                      placeholder="Search"
                    />
                  </div>
                  <div className="vstack gap-2">
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        John Smith
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Emily Johnson
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        David Williams
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Ashley Brown
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Michael Davis
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Role<span className="text-danger"> *</span>
              </label>
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white d-flex align-items-center justify-content-between"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  Select
                </Link>
                <div className="dropdown-menu dropdown-menu-end p-3 w-100">
                  <h6 className="fs-14 fw-semibold mb-3">Role</h6>
                  <div className="input-icon-end input-icon position-relative mb-3">
                    <span className="input-icon-addon">
                      <i className="icon-search text-dark" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-md"
                      placeholder="Search"
                    />
                  </div>
                  <div className="vstack gap-2">
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Admin / Owner
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Supervisor
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Cashier
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Chef
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Waiter
                      </label>
                    </div>
                    <div>
                      <label className="d-flex align-items-center">
                        <input
                          className="form-check-input m-0 me-2"
                          type="checkbox"
                        />
                        Delivery
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-0">
              <label className="form-label">
                Status<span className="text-danger"> *</span>
              </label>
              <CommonSelect
                options={Status_Inactive}
                className="select"
                defaultValue={Status_Inactive[0]}
              />
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 mt-auto offcanvas-footer border-0">
            <Link href="#" className="btn btn-light w-100">
              Reset
            </Link>
            <Link href="#" className="btn btn-primary w-100">
              Apply
            </Link>
          </div>
        </div>
      </div>
      {/* End Filter */}
      <>
        {/* User Permission */}
        <div className="modal fade" id="user_permission">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0 p-4 pb-3">
                <h4 className="modal-title">Permissions</h4>
                <button
                  type="button"
                  className="btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="icon-x" />
                </button>
              </div>
              <form>
                <div className="modal-body p-4 pt-1">
                  <div className="d-flex justify-content-end mb-3">
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="table-responsive mb-3">
                    <table className="table m-0 table-nowrap bg-white border">
                      <thead>
                        <tr>
                          <th>Module</th>
                          <th>View</th>
                          <th>Add</th>
                          <th>Edit</th>
                          <th>Delete</th>
                          <th>Export</th>
                          <th>Approved/Void</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-dark fw-medium">Dashboard</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">POS</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">
                            Hold/Resume Sale
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">
                            Refund / Return
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">Products</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">Categories</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">Customers</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">Reports</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-medium">Settings</td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="form-check form-check-md ps-0">
                              <input
                                className="form-check-input ms-0"
                                type="checkbox"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2 pt-1">
                    <button
                      type="button"
                      className="btn btn-light w-100"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary w-100">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default UsersModal;
