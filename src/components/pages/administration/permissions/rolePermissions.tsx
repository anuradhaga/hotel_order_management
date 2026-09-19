"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Toast from "@/core/common/toast/toast";

interface Role {
  role_id: number;
  role_code: string;
  role_name: string;
  description?: string;
}

interface PermissionRow {
  module_key: string;
  module_name: string;
  can_view: number | boolean;
  can_add: number | boolean;
  can_edit: number | boolean;
  can_delete: number | boolean;
  can_export: number | boolean;
  can_approve: number | boolean;
}

const DEFAULT_MODULES: PermissionRow[] = [
  { module_key: "dashboard", module_name: "Dashboard", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "pos", module_name: "POS", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "hold_resume", module_name: "Hold/Resume Sale", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "refund_return", module_name: "Refund / Return", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "products", module_name: "Products", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "categories", module_name: "Categories", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "customers", module_name: "Customers", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "reports", module_name: "Reports", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "settings", module_name: "Settings", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "orders", module_name: "Orders", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
  { module_key: "kitchen", module_name: "Kitchen", can_view: false, can_add: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
];

export default function RolesPermissionsComponent() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeRoleCode, setActiveRoleCode] = useState<string>("ADMIN");
  const [permissions, setPermissions] = useState<PermissionRow[]>(DEFAULT_MODULES);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // New role modal state
  const [newRoleName, setNewRoleName] = useState<string>("");
  const [newRoleDesc, setNewRoleDesc] = useState<string>("");
  const [creatingRole, setCreatingRole] = useState<boolean>(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState<boolean>(false);

  const showToast = (msg: string, type: "success" | "danger" | "warning" | "info" = "success") => {
    setToast({ msg, type });
  };

  // Fetch roles and permissions
  const fetchPermissions = async (roleCode?: string) => {
    setLoading(true);
    try {
      const targetRole = roleCode || activeRoleCode;
      const res = await fetch(`/api/permissions?role=${encodeURIComponent(targetRole)}`);
      const data = await res.json();

      if (data.success) {
        if (Array.isArray(data.roles) && data.roles.length > 0) {
          setRoles(data.roles);
        }
        if (data.activeRole) {
          setActiveRoleCode(data.activeRole);
        }

        // Merge incoming permissions with DEFAULT_MODULES to guarantee all modules exist
        const incoming = Array.isArray(data.permissions) ? data.permissions : [];
        const merged = DEFAULT_MODULES.map((def) => {
          const match = incoming.find((p: any) => p.module_key === def.module_key);
          if (match) {
            return {
              module_key: match.module_key,
              module_name: match.module_name || def.module_name,
              can_view: Boolean(match.can_view),
              can_add: Boolean(match.can_add),
              can_edit: Boolean(match.can_edit),
              can_delete: Boolean(match.can_delete),
              can_export: Boolean(match.can_export),
              can_approve: Boolean(match.can_approve),
            };
          }
          return { ...def };
        });

        setPermissions(merged);
        setHasChanges(false);
      } else {
        showToast(data.error || "Failed to load permissions.", "danger");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to load permissions.", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions("ADMIN");
  }, []);

  // Handle switching active role
  const handleRoleSelect = (roleCode: string) => {
    if (roleCode === activeRoleCode) return;
    setActiveRoleCode(roleCode);
    fetchPermissions(roleCode);
  };

  // Toggle single cell permission
  const handleToggle = (moduleKey: string, field: keyof Omit<PermissionRow, "module_key" | "module_name">) => {
    setPermissions((prev) =>
      prev.map((row) => {
        if (row.module_key === moduleKey) {
          const updatedVal = !row[field];
          return { ...row, [field]: updatedVal };
        }
        return row;
      })
    );
    setHasChanges(true);
  };

  // Toggle all permissions for an entire row
  const handleToggleRow = (moduleKey: string) => {
    setPermissions((prev) =>
      prev.map((row) => {
        if (row.module_key === moduleKey) {
          const allActive = Boolean(
            row.can_view && row.can_add && row.can_edit && row.can_delete && row.can_export && row.can_approve
          );
          const newVal = !allActive;
          return {
            ...row,
            can_view: newVal,
            can_add: newVal,
            can_edit: newVal,
            can_delete: newVal,
            can_export: newVal,
            can_approve: newVal,
          };
        }
        return row;
      })
    );
    setHasChanges(true);
  };

  // Toggle all permissions across all modules ("Revert All / Select All")
  const handleSelectAll = (checked: boolean) => {
    setPermissions((prev) =>
      prev.map((row) => ({
        ...row,
        can_view: checked,
        can_add: checked,
        can_edit: checked,
        can_delete: checked,
        can_export: checked,
        can_approve: checked,
      }))
    );
    setHasChanges(true);
  };

  // Check if all permissions are currently checked
  const isAllChecked = permissions.every(
    (p) => p.can_view && p.can_add && p.can_edit && p.can_delete && p.can_export && p.can_approve
  );

  // Save changes to database
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_code: activeRoleCode,
          permissions,
        }),
      });
      const data = await res.json();

      if (data.success) {
        showToast(`Permissions for ${activeRoleName} saved successfully!`, "success");
        setHasChanges(false);
      } else {
        showToast(data.error || "Failed to save permissions.", "danger");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to save permissions.", "danger");
    } finally {
      setSaving(false);
    }
  };

  // Add new role handler
  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) {
      showToast("Please enter a role name.", "warning");
      return;
    }

    setCreatingRole(true);
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_name: newRoleName.trim(),
          description: newRoleDesc.trim(),
        }),
      });
      const data = await res.json();

      if (data.success && data.role) {
        showToast(`Role '${data.role.role_name}' created successfully!`, "success");
        setNewRoleName("");
        setNewRoleDesc("");
        setShowAddRoleModal(false);
        // Add to roles list and switch to it
        setRoles((prev) => [...prev, data.role]);
        setActiveRoleCode(data.role.role_code);
        fetchPermissions(data.role.role_code);
      } else {
        showToast(data.error || "Failed to create role.", "danger");
      }
    } catch (err: any) {
      showToast(err.message || "Failed to create role.", "danger");
    } finally {
      setCreatingRole(false);
    }
  };

  const activeRoleObj = roles.find((r) => r.role_code.toUpperCase() === activeRoleCode.toUpperCase());
  const activeRoleName = activeRoleObj ? activeRoleObj.role_name : activeRoleCode;

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Permissions
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 border shadow-sm"
                  onClick={() => fetchPermissions(activeRoleCode)}
                  title="Refresh permissions from database"
                  disabled={loading}
                >
                  <i className={`icon-refresh-ccw ${loading ? "spinner-border spinner-border-sm" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-3 d-flex align-items-center flex-wrap">
              {hasChanges && (
                <button
                  type="button"
                  className="btn btn-outline-secondary d-inline-flex align-items-center btn-sm"
                  onClick={() => fetchPermissions(activeRoleCode)}
                >
                  Discard Changes
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary d-inline-flex align-items-center"
                onClick={handleSave}
                disabled={saving || loading}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="icon-check me-1 fs-16" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-dark d-inline-flex align-items-center"
                onClick={() => setShowAddRoleModal(true)}
              >
                <i className="icon-circle-plus me-1 fs-16" />
                Add New Role
              </button>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="row justify-content-center">
            {/* Roles Left Column */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
                  <h6 className="fs-16 fw-bold mb-0">Roles</h6>
                  <span className="badge bg-light text-dark">{roles.length} Roles</span>
                </div>
                <div className="card-body p-2">
                  <div className="nav flex-column nav-pills w-100">
                    {roles.map((r) => {
                      const isActive = r.role_code.toUpperCase() === activeRoleCode.toUpperCase();
                      return (
                        <button
                          key={r.role_code}
                          type="button"
                          className={`nav-link text-start py-2 px-3 mb-1 rounded d-flex align-items-center justify-content-between ${
                            isActive ? "active bg-primary text-white fw-bold shadow-sm" : "text-dark bg-transparent"
                          }`}
                          style={{ border: "none", cursor: "pointer", transition: "all 0.15s ease" }}
                          onClick={() => handleRoleSelect(r.role_code)}
                        >
                          <span className="text-truncate">{r.role_name}</span>
                          {isActive && <i className="icon-chevron-right fs-14" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions Matrix Right Column */}
            <div className="col-lg-9 col-md-8 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom py-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div>
                      <h5 className="mb-0 fw-bold">
                        Role : <span className="text-primary">{activeRoleName}</span>
                      </h5>
                      {activeRoleObj?.description && (
                        <p className="text-muted small mb-0 mt-1">{activeRoleObj.description}</p>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="form-check form-switch mb-0 d-flex align-items-center">
                        <input
                          className="form-check-input me-2 cursor-pointer"
                          type="checkbox"
                          id="revertAll"
                          checked={isAllChecked}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          style={{ cursor: "pointer" }}
                        />
                        <label className="form-check-label text-dark fw-semibold small cursor-pointer" htmlFor="revertAll">
                          {isAllChecked ? "Deselect All" : "Select All"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-0">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status" />
                      <p className="text-muted mt-2">Loading permissions...</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="fw-bold fs-13 py-3 ps-4" style={{ width: "26%" }}>Module</th>
                            <th className="text-center fw-bold fs-13 py-3" style={{ width: "12%" }}>View</th>
                            <th className="text-center fw-bold fs-13 py-3" style={{ width: "12%" }}>Add</th>
                            <th className="text-center fw-bold fs-13 py-3" style={{ width: "12%" }}>Edit</th>
                            <th className="text-center fw-bold fs-13 py-3" style={{ width: "12%" }}>Delete</th>
                            <th className="text-center fw-bold fs-13 py-3" style={{ width: "12%" }}>Export</th>
                            <th className="text-center fw-bold fs-13 py-3 pe-4" style={{ width: "14%" }}>Approved/Void</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissions.map((p) => {
                            const isRowFull = Boolean(
                              p.can_view && p.can_add && p.can_edit && p.can_delete && p.can_export && p.can_approve
                            );
                            return (
                              <tr key={p.module_key}>
                                <td className="ps-4">
                                  <button
                                    type="button"
                                    className="btn btn-link p-0 text-start text-dark fw-semibold text-decoration-none d-flex align-items-center"
                                    onClick={() => handleToggleRow(p.module_key)}
                                    title="Click to toggle all permissions for this module"
                                  >
                                    <span className="me-2">{p.module_name}</span>
                                    {isRowFull && <span className="badge bg-success-subtle text-success border border-success-subtle px-1" style={{ fontSize: "10px" }}>FULL</span>}
                                  </button>
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={Boolean(p.can_view)}
                                    onChange={() => handleToggle(p.module_key, "can_view")}
                                    style={{ cursor: "pointer", transform: "scale(1.15)" }}
                                  />
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={Boolean(p.can_add)}
                                    onChange={() => handleToggle(p.module_key, "can_add")}
                                    style={{ cursor: "pointer", transform: "scale(1.15)" }}
                                  />
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={Boolean(p.can_edit)}
                                    onChange={() => handleToggle(p.module_key, "can_edit")}
                                    style={{ cursor: "pointer", transform: "scale(1.15)" }}
                                  />
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={Boolean(p.can_delete)}
                                    onChange={() => handleToggle(p.module_key, "can_delete")}
                                    style={{ cursor: "pointer", transform: "scale(1.15)" }}
                                  />
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={Boolean(p.can_export)}
                                    onChange={() => handleToggle(p.module_key, "can_export")}
                                    style={{ cursor: "pointer", transform: "scale(1.15)" }}
                                  />
                                </td>
                                <td className="text-center pe-4">
                                  <input
                                    type="checkbox"
                                    className="form-check-input cursor-pointer"
                                    checked={Boolean(p.can_approve)}
                                    onChange={() => handleToggle(p.module_key, "can_approve")}
                                    style={{ cursor: "pointer", transform: "scale(1.15)" }}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="card-footer bg-white border-top py-3 d-flex align-items-center justify-content-between">
                  <span className="text-muted small">
                    {hasChanges ? "⚠️ You have unsaved changes." : "All changes saved to database."}
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm px-4 fw-bold shadow-sm"
                      onClick={handleSave}
                      disabled={saving || loading}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Role Modal */}
      {showAddRoleModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          role="dialog"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header border-0 p-4 pb-2">
                <h5 className="modal-title fw-bold">Add New Role</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddRoleModal(false)}
                  aria-label="Close"
                />
              </div>
              <form onSubmit={handleCreateRole}>
                <div className="modal-body p-4 pt-2">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Role Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      placeholder="e.g. Bartender, Floor Captain, Sommelier"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={newRoleDesc}
                      onChange={(e) => setNewRoleDesc(e.target.value)}
                      placeholder="Brief description of role responsibilities..."
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-end gap-2 pt-2 border-top">
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setShowAddRoleModal(false)}
                      disabled={creatingRole}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary fw-bold" disabled={creatingRole}>
                      {creatingRole ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Creating...
                        </>
                      ) : (
                        "Create Role"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}