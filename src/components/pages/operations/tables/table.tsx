"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Toast from "@/core/common/toast/toast";

interface RestaurantTable {
  table_id: number;
  table_number: string;
  seating_capacity: number;
  dining_zone: string;
  current_status: string; // 'AVAILABLE' | 'BOOKED' | 'OCCUPIED' | 'RESERVED'
  active_order_id?: number | null;
  order_number?: string | null;
  guest_count?: number | null;
  net_payable?: string | null;
  waiter_name?: string | null;
}

const Table = () => {
  const router = useRouter();
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filter & Search states
  const [searchText, setSearchText] = useState<string>("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Active kebab menu state
  const [activeKebabId, setActiveKebabId] = useState<number | null>(null);
  const kebabRef = useRef<HTMLDivElement | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(null);
  const [deletingTable, setDeletingTable] = useState<RestaurantTable | null>(null);

  // Form states for Add / Edit
  const [formTableName, setFormTableName] = useState<string>("");
  const [formFloor, setFormFloor] = useState<string>("1st");
  const [formCapacity, setFormCapacity] = useState<number>(4);
  const [formStatus, setFormStatus] = useState<string>("AVAILABLE");
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Toast feedback
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // Close kebab menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setActiveKebabId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch tables from API
  const loadTables = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tables");
      const data = await res.json();
      if (data.success) {
        setTables(data.data || []);
      } else {
        setToast({ msg: data.error || "Failed to load tables", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Network error loading tables", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTables();
  }, [loadTables]);

  // Helper to format table name nicely (e.g. T-01 -> Table 1 if default, or keep custom name)
  const formatTableName = (t: RestaurantTable) => {
    if (!t.table_number) return `Table ${t.table_id}`;
    if (/^T-\d+$/i.test(t.table_number)) {
      const num = parseInt(t.table_number.replace(/T-/i, ""), 10);
      return `Table ${num}`;
    }
    return t.table_number;
  };

  // Helper to choose appropriate table SVG asset based on capacity
  const getTableSvg = (capacity: number) => {
    if (capacity <= 2) return "assets/img/tables/tables-02.svg";
    if (capacity <= 4) return "assets/img/tables/tables-02.svg";
    if (capacity <= 6) return "assets/img/tables/tables-01.svg";
    if (capacity <= 8) return "assets/img/tables/tables-06.svg";
    return "assets/img/tables/tables-04.svg";
  };

  // Helper for status badge styling
  const getStatusBadge = (status: string) => {
    const s = (status || "").toUpperCase();
    if (s === "AVAILABLE") {
      return <span className="badge badge-soft-success fw-medium fs-10 mb-0">Available</span>;
    }
    if (s === "BOOKED") {
      return <span className="badge badge-soft-danger fw-medium fs-10 mb-0">Booked</span>;
    }
    if (s === "OCCUPIED") {
      return <span className="badge badge-soft-info fw-medium fs-10 mb-0">Occupied</span>;
    }
    if (s === "RESERVED") {
      return <span className="badge badge-soft-warning fw-medium fs-10 mb-0">Reserved</span>;
    }
    return <span className="badge bg-light text-secondary fw-medium fs-10 mb-0">{status}</span>;
  };

  // Filtered tables based on search, zone, and status
  const filteredTables = useMemo(() => {
    let result = [...tables];

    // Status filter
    if (selectedStatus !== "all") {
      result = result.filter(
        (t) => (t.current_status || "").toUpperCase() === selectedStatus.toUpperCase()
      );
    }

    // Zone filter
    if (selectedZone !== "all") {
      result = result.filter(
        (t) => (t.dining_zone || "").toLowerCase() === selectedZone.toLowerCase()
      );
    }

    // Search query
    if (searchText && searchText.trim()) {
      const term = searchText.trim().toLowerCase();
      result = result.filter(
        (t) =>
          formatTableName(t).toLowerCase().includes(term) ||
          t.table_number.toLowerCase().includes(term) ||
          (t.dining_zone || "").toLowerCase().includes(term) ||
          (t.current_status || "").toLowerCase().includes(term) ||
          String(t.seating_capacity).includes(term)
      );
    }

    return result;
  }, [tables, selectedStatus, selectedZone, searchText]);

  // Distinct zones
  const distinctZones = useMemo(() => {
    const zones = new Set<string>();
    tables.forEach((t) => {
      if (t.dining_zone) zones.add(t.dining_zone);
    });
    return Array.from(zones);
  }, [tables]);

  // Metric counts
  const metrics = useMemo(() => {
    const total = tables.length;
    const available = tables.filter((t) => (t.current_status || "").toUpperCase() === "AVAILABLE").length;
    const booked = tables.filter((t) => (t.current_status || "").toUpperCase() === "BOOKED" || (t.current_status || "").toUpperCase() === "RESERVED").length;
    const occupied = tables.filter((t) => (t.current_status || "").toUpperCase() === "OCCUPIED").length;

    return { total, available, booked, occupied };
  }, [tables]);

  // Open Add Modal
  const openAddModal = () => {
    setFormTableName(`Table ${tables.length + 1}`);
    setFormFloor("1st");
    setFormCapacity(4);
    setFormStatus("AVAILABLE");
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (t: RestaurantTable) => {
    setEditingTable(t);
    setFormTableName(formatTableName(t));
    setFormFloor(t.dining_zone || "1st");
    setFormCapacity(t.seating_capacity || 4);
    setFormStatus((t.current_status || "AVAILABLE").toUpperCase());
    setActiveKebabId(null);
  };

  // Quick Change Status
  const handleQuickStatusChange = async (table_id: number, newStatus: string) => {
    setActiveKebabId(null);
    try {
      const res = await fetch("/api/tables", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table_id, current_status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: `Table status updated to ${newStatus}`, type: "success" });
        loadTables();
      } else {
        setToast({ msg: data.error || "Failed to update status", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to update status", type: "danger" });
    }
  };

  // Submit Add Table
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTableName.trim()) {
      setToast({ msg: "Table name is required", type: "warning" });
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_number: formTableName.trim(),
          seating_capacity: Number(formCapacity) || 4,
          dining_zone: formFloor,
          current_status: formStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Table added successfully!", type: "success" });
        setIsAddModalOpen(false);
        loadTables();
      } else {
        setToast({ msg: data.error || "Failed to add table", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to add table", type: "danger" });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Submit Edit Table
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTable) return;

    setFormSubmitting(true);
    try {
      const res = await fetch("/api/tables", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_id: editingTable.table_id,
          table_number: formTableName.trim(),
          seating_capacity: Number(formCapacity) || 4,
          dining_zone: formFloor,
          current_status: formStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Table updated successfully!", type: "success" });
        setEditingTable(null);
        loadTables();
      } else {
        setToast({ msg: data.error || "Failed to update table", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to update table", type: "danger" });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Confirm Delete Table
  const handleDeleteConfirm = async () => {
    if (!deletingTable) return;

    try {
      const res = await fetch(`/api/tables?table_id=${deletingTable.table_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Table deleted successfully!", type: "success" });
        setDeletingTable(null);
        loadTables();
      } else {
        setToast({ msg: data.error || "Failed to delete table", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to delete table", type: "danger" });
    }
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
                Tables{" "}
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 border shadow-sm"
                  onClick={() => loadTables()}
                  title="Refresh tables"
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
                  className="form-control"
                  placeholder="Search Tables"
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

          {/* Quick Status & Zone Filters Bar */}
          <div className="row g-2 mb-4 align-items-center">
            <div className="col-md-7 col-12 d-flex align-items-center gap-2 flex-wrap">
              <button
                type="button"
                className={`btn btn-sm ${selectedStatus === "all" ? "btn-primary shadow-sm" : "btn-white border text-dark"}`}
                onClick={() => setSelectedStatus("all")}
              >
                All Tables ({metrics.total})
              </button>
              <button
                type="button"
                className={`btn btn-sm d-flex align-items-center gap-1 ${selectedStatus === "AVAILABLE" ? "btn-success text-white shadow-sm" : "btn-white border text-success"}`}
                onClick={() => setSelectedStatus("AVAILABLE")}
              >
                <span className="badge bg-success rounded-circle p-1" />
                Available ({metrics.available})
              </button>
              <button
                type="button"
                className={`btn btn-sm d-flex align-items-center gap-1 ${selectedStatus === "BOOKED" ? "btn-danger text-white shadow-sm" : "btn-white border text-danger"}`}
                onClick={() => setSelectedStatus("BOOKED")}
              >
                <span className="badge bg-danger rounded-circle p-1" />
                Booked ({metrics.booked})
              </button>
              <button
                type="button"
                className={`btn btn-sm d-flex align-items-center gap-1 ${selectedStatus === "OCCUPIED" ? "btn-info text-white shadow-sm" : "btn-white border text-info"}`}
                onClick={() => setSelectedStatus("OCCUPIED")}
              >
                <span className="badge bg-info rounded-circle p-1" />
                Occupied ({metrics.occupied})
              </button>
            </div>

            <div className="col-md-5 col-12 d-flex justify-content-md-end align-items-center gap-2">
              <span className="text-muted small fw-semibold">Dining Zone:</span>
              <select
                className="form-select form-select-sm shadow-sm"
                style={{ width: "auto", minWidth: 160 }}
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option value="all">All Zones / Floors</option>
                {distinctZones.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Cards Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="text-muted mt-2">Loading restaurant tables...</p>
            </div>
          ) : filteredTables.length === 0 ? (
            <div className="text-center py-5 border rounded bg-white shadow-sm">
              <i className="icon-layout-grid text-muted fs-40 mb-2" />
              <h5 className="fw-bold">No Tables Found</h5>
              <p className="text-muted small mb-3">No tables match your current filter or search criteria.</p>
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setSelectedStatus("all");
                  setSelectedZone("all");
                  setSearchText("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-3">
              {filteredTables.map((t) => {
                const formattedName = formatTableName(t);
                const svgAsset = getTableSvg(t.seating_capacity);
                const isKebabOpen = activeKebabId === t.table_id;

                return (
                  <div key={t.table_id} className="col-lg-3 col-md-4 col-sm-6">
                    <div className="card border shadow-sm h-100 hover-shadow transition-all">
                      <div className="card-body p-3 d-flex flex-column justify-content-between">
                        {/* Table Seating SVG Preview */}
                        <div
                          className="bg-light rounded mb-3 p-3 tables-img d-flex align-items-center justify-content-center cursor-pointer"
                          style={{ minHeight: "130px" }}
                          onClick={() => router.push(`/pos?table_id=${t.table_id}`)}
                          title="Click to open table in POS"
                        >
                          <ImageWithBasePath
                            src={svgAsset}
                            alt={formattedName}
                            className="img-fluid custom-line-img"
                            height={100}
                          />
                        </div>

                        {/* Card Info & Actions */}
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <div>
                            <h6 className="fs-14 fw-semibold mb-1 d-flex align-items-center gap-1">
                              <span
                                className="text-dark cursor-pointer text-decoration-none hover-primary"
                                onClick={() => router.push(`/pos?table_id=${t.table_id}`)}
                              >
                                {formattedName}
                              </span>
                              {getStatusBadge(t.current_status)}
                            </h6>
                            <div className="d-flex align-items-center text-muted small">
                              <span className="border-end pe-2">
                                Floor : {t.dining_zone || "1st"}
                              </span>
                              <span className="ms-2">
                                Capacity : {t.seating_capacity}
                              </span>
                            </div>
                            {t.active_order_id && (
                              <div className="mt-1">
                                <span className="badge badge-soft-info fs-10">
                                  Active Order #{t.active_order_id}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Kebab Dropdown Menu */}
                          <div className="position-relative" ref={isKebabOpen ? kebabRef : null}>
                            <button
                              type="button"
                              className="btn btn-sm btn-icon btn-white border rounded-circle shadow-sm"
                              onClick={() => setActiveKebabId(isKebabOpen ? null : t.table_id)}
                              title="Table actions"
                            >
                              <i className="icon-ellipsis-vertical fs-14" />
                            </button>

                            {isKebabOpen && (
                              <div
                                className="dropdown-menu dropdown-menu-end show p-2 shadow-lg border"
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  right: 0,
                                  zIndex: 1050,
                                  minWidth: 175,
                                }}
                              >
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1"
                                    onClick={() => router.push(`/pos?table_id=${t.table_id}`)}
                                  >
                                    <i className="icon-shopping-cart me-2 text-primary fs-14" />
                                    Open POS Order
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1"
                                    onClick={() => openEditModal(t)}
                                  >
                                    <i className="icon-pencil-line me-2 text-secondary fs-14" />
                                    Edit Details
                                  </button>
                                </li>
                                <div className="dropdown-divider my-1" />
                                <li className="dropdown-header px-2 py-1 fs-11 text-uppercase text-muted fw-semibold">
                                  Change Status
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1 small"
                                    onClick={() => handleQuickStatusChange(t.table_id, "AVAILABLE")}
                                  >
                                    <span className="badge bg-success rounded-circle p-1 me-2" />
                                    Mark Available
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1 small"
                                    onClick={() => handleQuickStatusChange(t.table_id, "BOOKED")}
                                  >
                                    <span className="badge bg-danger rounded-circle p-1 me-2" />
                                    Mark Booked
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1 small"
                                    onClick={() => handleQuickStatusChange(t.table_id, "OCCUPIED")}
                                  >
                                    <span className="badge bg-info rounded-circle p-1 me-2" />
                                    Mark Occupied
                                  </button>
                                </li>
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1 small"
                                    onClick={() => handleQuickStatusChange(t.table_id, "RESERVED")}
                                  >
                                    <span className="badge bg-warning rounded-circle p-1 me-2" />
                                    Mark Reserved
                                  </button>
                                </li>
                                <div className="dropdown-divider my-1" />
                                <li>
                                  <button
                                    type="button"
                                    className="dropdown-item rounded d-flex align-items-center py-1 text-danger"
                                    onClick={() => {
                                      setActiveKebabId(null);
                                      setDeletingTable(t);
                                    }}
                                  >
                                    <i className="icon-trash-2 me-2 fs-14" />
                                    Delete Table
                                  </button>
                                </li>
                              </div>
                            )}
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

      {/* Add Table Modal */}
      {isAddModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border shadow-lg">
              <div className="modal-header border-0 p-4 pb-2">
                <h4 className="modal-title fw-bold">Add New Table</h4>
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
                      Table Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formTableName}
                      onChange={(e) => setFormTableName(e.target.value)}
                      placeholder="e.g. Table 13"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Floor / Dining Zone<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      value={formFloor}
                      onChange={(e) => setFormFloor(e.target.value)}
                    >
                      <option value="1st">1st Floor</option>
                      <option value="2nd">2nd Floor</option>
                      <option value="Indoor AC">Indoor AC</option>
                      <option value="Terrace">Terrace</option>
                      <option value="Balcony">Balcony</option>
                      <option value="VIP Dining">VIP Dining</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Seating Capacity (Guests)<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      value={formCapacity}
                      onChange={(e) => setFormCapacity(Number(e.target.value))}
                    >
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests</option>
                      <option value={8}>8 Guests</option>
                      <option value={10}>10 Guests</option>
                      <option value={12}>12 Guests</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Status<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="BOOKED">Booked</option>
                      <option value="OCCUPIED">Occupied</option>
                      <option value="RESERVED">Reserved</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-light w-100"
                      onClick={() => setIsAddModalOpen(false)}
                      disabled={formSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 shadow-sm"
                      disabled={formSubmitting}
                    >
                      {formSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Saving...
                        </>
                      ) : (
                        "Save Table"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {editingTable && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border shadow-lg">
              <div className="modal-header border-0 p-4 pb-2">
                <h4 className="modal-title fw-bold">Edit Table</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingTable(null)}
                />
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body p-4 pt-1">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Table Name<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formTableName}
                      onChange={(e) => setFormTableName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Floor / Dining Zone<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      value={formFloor}
                      onChange={(e) => setFormFloor(e.target.value)}
                    >
                      <option value="1st">1st Floor</option>
                      <option value="2nd">2nd Floor</option>
                      <option value="Indoor AC">Indoor AC</option>
                      <option value="Terrace">Terrace</option>
                      <option value="Balcony">Balcony</option>
                      <option value="VIP Dining">VIP Dining</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Seating Capacity (Guests)<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      value={formCapacity}
                      onChange={(e) => setFormCapacity(Number(e.target.value))}
                    >
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 Guests</option>
                      <option value={8}>8 Guests</option>
                      <option value={10}>10 Guests</option>
                      <option value={12}>12 Guests</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">
                      Status<span className="text-danger"> *</span>
                    </label>
                    <select
                      className="form-select"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="BOOKED">Booked</option>
                      <option value="OCCUPIED">Occupied</option>
                      <option value="RESERVED">Reserved</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                    <button
                      type="button"
                      className="btn btn-light w-100"
                      onClick={() => setEditingTable(null)}
                      disabled={formSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 shadow-sm"
                      disabled={formSubmitting}
                    >
                      {formSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Saving...
                        </>
                      ) : (
                        "Update Table"
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
      {deletingTable && (
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
              <h5 className="fw-bold mb-1">Delete Table</h5>
              <p className="text-muted small mb-4">
                Are you sure you want to delete <strong>{formatTableName(deletingTable)}</strong>? This action cannot be undone.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light w-100"
                  onClick={() => setDeletingTable(null)}
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
    </>
  );
};

export default Table;
