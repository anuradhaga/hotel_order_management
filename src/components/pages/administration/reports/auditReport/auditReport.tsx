"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Reportstab from "../reportstab";
import CommonDatePicker from "@/core/common/common-date-picker/commonDatePicker";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import DataTable from "@/core/common/data-table";
import Toast from "@/core/common/toast/toast";

interface AuditEvent {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  actor: string;
  role: string;
  action: string;
  actionType: "CREATE" | "UPDATE" | "DELETE" | "AUTH" | "PAYMENT" | "DISCOUNT" | "SYSTEM";
  module: "POS Terminal" | "Orders" | "Payments" | "Inventory" | "Settings" | "Security";
  entity: string;
  ipAddress: string;
  severity: "success" | "info" | "warning" | "danger" | "primary";
  icon: string;
  details: Record<string, any>;
  description: string;
}

const AuditReportComponent = () => {
  const [allRecords, setAllRecords] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modulesList, setModulesList] = useState<string[]>([]);
  const [usersList, setUsersList] = useState<string[]>([]);
  const [actionTypesList, setActionTypesList] = useState<string[]>([]);

  // View state: 'timeline' or 'table'
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline");

  // Filter states
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [selectedActionType, setSelectedActionType] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Expanded log IDs for accordion inspection in timeline view
  const [expandedLogIds, setExpandedLogIds] = useState<Set<string>>(new Set());

  // Modal inspection
  const [inspectedEvent, setInspectedEvent] = useState<AuditEvent | null>(null);

  // Toast notifications
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // Fetch audit logs data from API
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports/audit?sortBy=newest");
      const data = await res.json();

      if (data.success) {
        setAllRecords(data.data || []);
        if (data.filters) {
          if (Array.isArray(data.filters.modules)) setModulesList(data.filters.modules);
          if (Array.isArray(data.filters.users)) setUsersList(data.filters.users);
          if (Array.isArray(data.filters.actionTypes)) setActionTypesList(data.filters.actionTypes);
        }
      } else {
        setToast({ msg: data.error || "Failed to load audit logs", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to connect to audit API", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reactive client-side filtering + sorting for zero-lag instant responsiveness
  const filteredRows = useMemo(() => {
    let result = [...allRecords];

    // 1. Date Range
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      result = result.filter((r) => new Date(r.timestamp) >= start);
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((r) => new Date(r.timestamp) <= end);
    }

    // 2. Module Filter
    if (selectedModule && selectedModule !== "all") {
      result = result.filter((r) => r.module.toLowerCase() === selectedModule.toLowerCase());
    }

    // 3. Action Type Filter
    if (selectedActionType && selectedActionType !== "all") {
      result = result.filter((r) => r.actionType.toLowerCase() === selectedActionType.toLowerCase());
    }

    // 4. User Filter
    if (selectedUser && selectedUser !== "all") {
      result = result.filter((r) => r.actor.toLowerCase().includes(selectedUser.toLowerCase()));
    }

    // 5. Search text filter
    if (searchText && searchText.trim()) {
      const term = searchText.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(term) ||
          r.actor.toLowerCase().includes(term) ||
          r.role.toLowerCase().includes(term) ||
          r.action.toLowerCase().includes(term) ||
          r.module.toLowerCase().includes(term) ||
          r.entity.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.ipAddress.toLowerCase().includes(term) ||
          r.date.toLowerCase().includes(term)
      );
    }

    // 6. Sorting
    result.sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return result;
  }, [allRecords, startDate, endDate, selectedModule, selectedActionType, selectedUser, searchText, sortBy]);

  // Executive KPI summary metrics
  const summaryMetrics = useMemo(() => {
    const total = filteredRows.length;
    const financial = filteredRows.filter(
      (e) => e.actionType === "CREATE" || e.actionType === "PAYMENT" || e.actionType === "DISCOUNT"
    ).length;
    const security = filteredRows.filter((e) => e.actionType === "AUTH" || e.module === "Security").length;
    const critical = filteredRows.filter(
      (e) => e.actionType === "DELETE" || e.severity === "danger" || e.severity === "warning"
    ).length;

    return {
      total,
      financial,
      security,
      critical,
    };
  }, [filteredRows]);

  // Toggle log accordion inspection
  const toggleExpandLog = (id: string) => {
    setExpandedLogIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Quick preset helper
  const applyDatePreset = (preset: "all" | "today" | "sept2026" | "nov2025") => {
    if (preset === "all") {
      setStartDate("");
      setEndDate("");
    } else if (preset === "today") {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
      setEndDate(today);
    } else if (preset === "sept2026") {
      setStartDate("2026-09-01");
      setEndDate("2026-09-30");
    } else if (preset === "nov2025") {
      setStartDate("2025-11-01");
      setEndDate("2025-11-30");
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedModule("all");
    setSelectedActionType("all");
    setSelectedUser("all");
    setSearchText("");
    setSortBy("newest");
  };

  // Submit filter confirmation
  const handleFilterSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setToast({
      msg: `Filter applied: ${filteredRows.length} matching audit record(s).`,
      type: "info",
    });
  };

  // Export as CSV
  const handleExportCSV = () => {
    if (filteredRows.length === 0) {
      setToast({ msg: "No audit logs to export.", type: "warning" });
      return;
    }

    const headers = [
      "Event ID",
      "Date",
      "Time",
      "Operator",
      "Role",
      "Module",
      "Action Type",
      "Action Description",
      "Entity",
      "IP Address",
    ];
    const csvRows = [headers.join(",")];

    filteredRows.forEach((r) => {
      const values = [
        `"${r.id}"`,
        `"${r.date}"`,
        `"${r.time}"`,
        `"${r.actor}"`,
        `"${r.role}"`,
        `"${r.module}"`,
        `"${r.actionType}"`,
        `"${r.action.replace(/"/g, '""')}"`,
        `"${r.entity}"`,
        `"${r.ipAddress}"`,
      ];
      csvRows.push(values.join(","));
    });

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const timestamp = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `audit_logs_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ msg: "Audit logs exported successfully!", type: "success" });
  };

  // Helper to get initials
  const getInitials = (name: string) => {
    if (!name) return "SY";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Severity color maps
  const severityBadgeClass = (severity: string) => {
    switch (severity) {
      case "success":
        return "badge-soft-success text-success";
      case "info":
        return "badge-soft-info text-info";
      case "warning":
        return "badge-soft-warning text-warning";
      case "danger":
        return "badge-soft-danger text-danger";
      case "primary":
      default:
        return "badge-soft-primary text-primary";
    }
  };

  const severityIconBg = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-soft-success text-success border-success";
      case "info":
        return "bg-soft-info text-info border-info";
      case "warning":
        return "bg-soft-warning text-warning border-warning";
      case "danger":
        return "bg-soft-danger text-danger border-danger";
      case "primary":
      default:
        return "bg-soft-primary text-primary border-primary";
    }
  };

  // Data Table Columns
  const tableColumns = useMemo(
    () => [
      {
        title: "Event ID",
        dataIndex: "id",
        render: (text: string, row: AuditEvent) => (
          <div>
            <span className="fw-bold text-primary fs-12">{text}</span>
            <div className="text-muted fs-11">{row.date} {row.time}</div>
          </div>
        ),
      },
      {
        title: "Operator",
        dataIndex: "actor",
        render: (text: string, row: AuditEvent) => (
          <div className="d-flex align-items-center">
            <div
              className="avatar avatar-sm rounded-circle me-2 bg-light text-primary d-flex align-items-center justify-content-center fw-bold fs-11 border"
              style={{ width: 32, height: 32, minWidth: 32 }}
            >
              {getInitials(text)}
            </div>
            <div>
              <span className="fw-semibold text-dark fs-13 d-block">{text}</span>
              <span className="badge bg-light text-secondary border fs-10 px-1 py-0">{row.role}</span>
            </div>
          </div>
        ),
      },
      {
        title: "Module",
        dataIndex: "module",
        render: (text: string) => (
          <span className="badge bg-light text-dark border px-2 py-1 fs-12">
            {text}
          </span>
        ),
      },
      {
        title: "Action Description",
        dataIndex: "action",
        render: (text: string, row: AuditEvent) => (
          <div>
            <span className="fw-medium text-dark d-block">{text}</span>
            <small className="text-muted fs-11">{row.entity}</small>
          </div>
        ),
      },
      {
        title: "Terminal / IP",
        dataIndex: "ipAddress",
        render: (text: string) => <span className="font-monospace text-muted small">{text}</span>,
      },
      {
        title: "Severity",
        dataIndex: "severity",
        render: (text: string, row: AuditEvent) => (
          <span className={`badge ${severityBadgeClass(text)}`}>
            {row.actionType}
          </span>
        ),
      },
      {
        title: "Inspect",
        dataIndex: "id",
        render: (_: any, row: AuditEvent) => (
          <button
            type="button"
            className="btn btn-sm btn-outline-primary py-1 px-2"
            onClick={() => setInspectedEvent(row)}
            title="Inspect audit payload"
          >
            <i className="icon-eye me-1" />
            Inspect
          </button>
        ),
      },
    ],
    []
  );

  const mappedTableColumns = useMemo(
    () =>
      tableColumns.map((col: any, idx: number) => ({
        ...col,
        ID: idx.toString(),
        key: col.dataIndex || idx.toString(),
      })),
    [tableColumns]
  );

  const hasActiveFilters = Boolean(
    startDate || endDate || selectedModule !== "all" || selectedActionType !== "all" || selectedUser !== "all" || searchText
  );

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-wrapper">
        <div className="content">
          {/* Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Reports
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 border shadow-sm"
                  onClick={() => loadData()}
                  title="Refresh audit logs from server"
                  disabled={loading}
                >
                  <i className={`icon-refresh-ccw ${loading ? "spinner-border spinner-border-sm" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-3 d-flex align-items-center flex-wrap">
              {/* View Mode Switcher Toggle */}
              <div className="btn-group shadow-sm border bg-white p-1 rounded">
                <button
                  type="button"
                  className={`btn btn-sm px-3 d-flex align-items-center gap-1 ${viewMode === "timeline" ? "btn-primary shadow-sm" : "btn-light text-muted"}`}
                  onClick={() => setViewMode("timeline")}
                  title="Timeline view"
                >
                  <i className="icon-list fs-14" />
                  Timeline
                </button>
                <button
                  type="button"
                  className={`btn btn-sm px-3 d-flex align-items-center gap-1 ${viewMode === "table" ? "btn-primary shadow-sm" : "btn-light text-muted"}`}
                  onClick={() => setViewMode("table")}
                  title="Data table view"
                >
                  <i className="icon-table fs-14" />
                  Data Table
                </button>
              </div>

              {/* Export Dropdown */}
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle btn btn-white border d-inline-flex align-items-center shadow-sm"
                  data-bs-toggle="dropdown"
                >
                  <i className="icon-upload me-2" />
                  Export
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2 shadow border">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded d-flex align-items-center"
                      onClick={() => window.print()}
                    >
                      <i className="icon-printer me-2 fs-14 text-secondary" />
                      Export as PDF / Print
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded d-flex align-items-center"
                      onClick={handleExportCSV}
                    >
                      <i className="icon-file-spreadsheet me-2 fs-14 text-success" />
                      Export as Excel / CSV
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Reportstab />

          {/* Executive KPI Metric Cards */}
          <div className="row mb-4">
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0 bg-primary text-white">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-white-50 fw-semibold">Total Audit Events</span>
                    <h3 className="text-white fw-bold mb-0 mt-1">{summaryMetrics.total}</h3>
                  </div>
                  <div className="avatar avatar-md bg-white text-primary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-hourglass fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Financial & POS Actions</span>
                    <h3 className="fw-bold mb-0 mt-1 text-success">{summaryMetrics.financial}</h3>
                  </div>
                  <div className="avatar avatar-md bg-soft-success text-success rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-badge-dollar-sign fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Security & Access</span>
                    <h3 className="fw-bold mb-0 mt-1 text-info">{summaryMetrics.security}</h3>
                  </div>
                  <div className="avatar avatar-md bg-soft-info text-info rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-shield-check fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Critical / Warnings</span>
                    <h3 className="fw-bold mb-0 mt-1 text-danger">{summaryMetrics.critical}</h3>
                  </div>
                  <div className="avatar avatar-md bg-soft-danger text-danger rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-alert-triangle fs-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Date Presets */}
          <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <span className="text-muted small fw-semibold">Quick Date:</span>
            <button
              type="button"
              className={`btn btn-sm ${!startDate && !endDate ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => applyDatePreset("all")}
            >
              All Time
            </button>
            <button
              type="button"
              className={`btn btn-sm ${startDate === "2026-09-01" && endDate === "2026-09-30" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => applyDatePreset("sept2026")}
            >
              Sep 2026
            </button>
            <button
              type="button"
              className={`btn btn-sm ${startDate === "2025-11-01" && endDate === "2025-11-30" ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => applyDatePreset("nov2025")}
            >
              Nov 2025
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => applyDatePreset("today")}
            >
              Today
            </button>
          </div>

          {/* Main Card */}
          <div className="card shadow-sm border mb-4">
            <div className="card-body">
              {/* Comprehensive Filter Form */}
              <form onSubmit={handleFilterSubmit}>
                <div className="row g-3 align-items-end pb-3 border-bottom mb-3">
                  {/* Start Date */}
                  <div className="col-lg-3 col-md-6">
                    <label className="form-label fw-semibold small mb-1">
                      Start Date
                    </label>
                    <CommonDatePicker
                      value={startDate ? dayjs(startDate) : null}
                      onChange={(d: any) => setStartDate(d ? d.format("YYYY-MM-DD") : "")}
                      placeholder="Start date"
                    />
                  </div>

                  {/* End Date */}
                  <div className="col-lg-3 col-md-6">
                    <label className="form-label fw-semibold small mb-1">
                      End Date
                    </label>
                    <CommonDatePicker
                      value={endDate ? dayjs(endDate) : null}
                      onChange={(d: any) => setEndDate(d ? d.format("YYYY-MM-DD") : "")}
                      placeholder="End date"
                    />
                  </div>

                  {/* Module Filter */}
                  <div className="col-lg-2 col-md-4">
                    <label className="form-label fw-semibold small mb-1">
                      Module
                    </label>
                    <select
                      className="form-select"
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                    >
                      <option value="all">All Modules</option>
                      {modulesList.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Type Filter */}
                  <div className="col-lg-2 col-md-4">
                    <label className="form-label fw-semibold small mb-1">
                      Action Type
                    </label>
                    <select
                      className="form-select"
                      value={selectedActionType}
                      onChange={(e) => setSelectedActionType(e.target.value)}
                    >
                      <option value="all">All Action Types</option>
                      {actionTypesList.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Operator Filter */}
                  <div className="col-lg-2 col-md-4">
                    <label className="form-label fw-semibold small mb-1">
                      Operator
                    </label>
                    <select
                      className="form-select"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      <option value="all">All Operators</option>
                      {usersList.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              {/* Active Filter Tags */}
              {hasActiveFilters && (
                <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                  <span className="text-muted small fw-semibold">Active filters:</span>
                  {startDate && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      From: {startDate}
                      <button
                        type="button"
                        className="btn-close ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setStartDate("")}
                      />
                    </span>
                  )}
                  {endDate && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      To: {endDate}
                      <button
                        type="button"
                        className="btn-close ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setEndDate("")}
                      />
                    </span>
                  )}
                  {selectedModule !== "all" && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      Module: {selectedModule}
                      <button
                        type="button"
                        className="btn-close ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setSelectedModule("all")}
                      />
                    </span>
                  )}
                  {selectedActionType !== "all" && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      Action: {selectedActionType}
                      <button
                        type="button"
                        className="btn-close ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setSelectedActionType("all")}
                      />
                    </span>
                  )}
                  {selectedUser !== "all" && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      User: {selectedUser}
                      <button
                        type="button"
                        className="btn-close ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setSelectedUser("all")}
                      />
                    </span>
                  )}
                  {searchText && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      Search: &quot;{searchText}&quot;
                      <button
                        type="button"
                        className="btn-close ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setSearchText("")}
                      />
                    </span>
                  )}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-danger small text-decoration-none ms-2"
                    onClick={handleResetFilters}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Search & Sort Bar */}
              <div className="table-search d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <div className="search-input" style={{ minWidth: 280 }}>
                  <SearchInput
                    value={searchText}
                    onChange={(val) => setSearchText(val)}
                  />
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Sort by :</span>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-white border d-inline-flex align-items-center shadow-sm"
                      data-bs-toggle="dropdown"
                    >
                      {sortBy === "newest" ? "Newest First" : "Oldest First"}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2 shadow border">
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item rounded ${sortBy === "newest" ? "active" : ""}`}
                          onClick={() => setSortBy("newest")}
                        >
                          Newest First
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item rounded ${sortBy === "oldest" ? "active" : ""}`}
                          onClick={() => setSortBy("oldest")}
                        >
                          Oldest First
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Content Render: Timeline View vs Table View */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="text-muted mt-2">Loading audit events...</p>
                </div>
              ) : filteredRows.length === 0 ? (
                <div className="text-center py-5 border rounded bg-light">
                  <i className="icon-hourglass text-muted fs-40 mb-2" />
                  <h6 className="fw-bold">No Audit Events Found</h6>
                  <p className="text-muted small mb-3">No log records match your current criteria.</p>
                  <button type="button" className="btn btn-sm btn-primary" onClick={handleResetFilters}>
                    Reset All Filters
                  </button>
                </div>
              ) : viewMode === "timeline" ? (
                /* Interactive Rich Timeline View */
                <div className="audit-timeline position-relative ps-2">
                  {filteredRows.map((event) => {
                    const isExpanded = expandedLogIds.has(event.id);
                    return (
                      <div
                        key={event.id}
                        className="timeline-item d-flex align-items-start mb-4 position-relative"
                        style={{ paddingLeft: "10px" }}
                      >
                        {/* Timeline Icon Node */}
                        <div
                          className={`avatar avatar-md rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm border ${severityIconBg(
                            event.severity
                          )}`}
                          style={{
                            width: 44,
                            height: 44,
                            zIndex: 2,
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <i className={`${event.icon} fs-18`} />
                        </div>

                        {/* Timeline Content Card */}
                        <div className="card border shadow-sm ms-3 mb-0 flex-grow-1">
                          <div className="card-body p-3">
                            <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-2">
                              <div>
                                <span className={`badge ${severityBadgeClass(event.severity)} me-2`}>
                                  {event.module}
                                </span>
                                <span className="badge bg-light text-secondary border me-2">
                                  {event.actionType}
                                </span>
                                <span className="font-monospace text-muted fs-11">
                                  {event.id}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2 text-muted small">
                                <i className="icon-clock fs-14" />
                                <span>{event.date} at {event.time}</span>
                              </div>
                            </div>

                            <h6 className="fs-15 fw-semibold text-dark mb-2">
                              {event.description}
                            </h6>

                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2 border-top">
                              <div className="d-flex align-items-center gap-3 text-muted small">
                                <span className="d-flex align-items-center">
                                  <i className="icon-user me-1 text-primary" />
                                  <strong className="text-dark me-1">{event.actor}</strong>
                                  ({event.role})
                                </span>
                                <span className="d-flex align-items-center font-monospace">
                                  <i className="icon-server me-1 text-secondary" />
                                  {event.ipAddress}
                                </span>
                              </div>

                              <div className="d-flex align-items-center gap-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-white border d-inline-flex align-items-center text-primary shadow-sm"
                                  onClick={() => toggleExpandLog(event.id)}
                                >
                                  <i className={`icon-chevron-${isExpanded ? "up" : "down"} me-1`} />
                                  {isExpanded ? "Hide Details" : "Inspect Details"}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-light border"
                                  onClick={() => setInspectedEvent(event)}
                                  title="Full audit modal inspection"
                                >
                                  <i className="icon-maximize-2" />
                                </button>
                              </div>
                            </div>

                            {/* Expandable Accordion Details Drawer */}
                            {isExpanded && (
                              <div className="mt-3 p-3 bg-light rounded border">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                  <span className="fw-semibold small text-uppercase text-secondary">
                                    Event Payload & Change Details
                                  </span>
                                  <span className="badge bg-white text-dark border font-monospace fs-11">
                                    Entity: {event.entity}
                                  </span>
                                </div>
                                <div className="row g-2 mb-2">
                                  {Object.entries(event.details).map(([key, value]) => (
                                    <div key={key} className="col-md-6 col-sm-12">
                                      <div className="p-2 bg-white rounded border d-flex justify-content-between">
                                        <span className="text-muted small text-capitalize">{key}:</span>
                                        <span className="fw-medium small text-dark">{String(value)}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className="p-2 bg-dark rounded text-light font-monospace fs-11 overflow-auto" style={{ maxHeight: 120 }}>
                                  <code>{JSON.stringify({ eventId: event.id, timestamp: event.timestamp, actor: event.actor, details: event.details }, null, 2)}</code>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* High-Density Data Table View */
                <div className="table-responsive">
                  <DataTable
                    columns={mappedTableColumns}
                    dataSource={
                      filteredRows.map((r, idx) => ({
                        ...r,
                        key: `audit-row-${r.id}-${idx}`,
                      })) as any
                    }
                    Selection={false}
                    searchText={""} // Search handled reactively in filteredRows
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Audit Event Inspection Modal */}
      {inspectedEvent && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
          onClick={() => setInspectedEvent(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border shadow-lg">
              <div className="modal-header bg-light py-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    className={`avatar avatar-sm rounded-circle d-flex align-items-center justify-content-center ${severityIconBg(
                      inspectedEvent.severity
                    )}`}
                    style={{ width: 34, height: 34 }}
                  >
                    <i className={`${inspectedEvent.icon} fs-16`} />
                  </div>
                  <div>
                    <h5 className="modal-title fs-16 fw-bold mb-0">Audit Record Inspection</h5>
                    <span className="font-monospace text-muted small">{inspectedEvent.id}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setInspectedEvent(null)}
                />
              </div>

              <div className="modal-body p-4">
                <div className="alert alert-light border mb-3">
                  <h6 className="fw-bold mb-1">{inspectedEvent.action}</h6>
                  <p className="text-muted small mb-0">{inspectedEvent.description}</p>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="text-muted small">Operator & Role</label>
                    <div className="fw-semibold text-dark">
                      {inspectedEvent.actor} ({inspectedEvent.role})
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small">Timestamp</label>
                    <div className="fw-semibold text-dark">
                      {inspectedEvent.date} at {inspectedEvent.time}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small">Target Entity</label>
                    <div className="fw-semibold text-dark">{inspectedEvent.entity}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-muted small">Terminal / IP Address</label>
                    <div className="font-monospace fw-semibold text-dark">{inspectedEvent.ipAddress}</div>
                  </div>
                </div>

                <h6 className="fw-bold fs-14 mb-2">Structured Event Parameters</h6>
                <div className="row g-2 mb-3">
                  {Object.entries(inspectedEvent.details).map(([k, v]) => (
                    <div key={k} className="col-sm-6">
                      <div className="p-2 bg-light rounded border d-flex justify-content-between">
                        <span className="text-muted small text-capitalize">{k}:</span>
                        <span className="fw-medium text-dark small">{String(v)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h6 className="fw-bold fs-14 mb-2">Audit Verification Payload</h6>
                <pre
                  className="bg-dark text-success p-3 rounded font-monospace small mb-0"
                  style={{ maxHeight: 180, overflowY: "auto" }}
                >
                  {JSON.stringify(inspectedEvent, null, 2)}
                </pre>
              </div>

              <div className="modal-footer bg-light py-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(inspectedEvent, null, 2));
                    setToast({ msg: "Audit log copied to clipboard!", type: "success" });
                  }}
                >
                  <i className="icon-copy me-1" />
                  Copy JSON
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-3"
                  onClick={() => setInspectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuditReportComponent;
