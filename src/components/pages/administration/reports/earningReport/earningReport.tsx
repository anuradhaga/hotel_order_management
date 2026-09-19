"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Reportstab from "../reportstab";
import DataTable from "@/core/common/data-table";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import Toast from "@/core/common/toast/toast";

interface EarningRecord {
  id: number;
  earningId: string;
  orderIdFormatted: string;
  orderNumber: string;
  date: string;
  rawDate: string;
  type: string;
  customer: string;
  payment: string;
  amount: number;
  total: string;
  status: string;
}

export default function EarningReportComponent() {
  const [allRecords, setAllRecords] = useState<EarningRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [customersList, setCustomersList] = useState<string[]>([]);
  const [paymentMethodsList, setPaymentMethodsList] = useState<string[]>([]);

  // Filter states
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // Fetch all earnings data from live MySQL database
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports/earnings?sortBy=newest");
      const data = await res.json();

      if (data.success) {
        setAllRecords(data.data || []);
        if (Array.isArray(data.customers)) setCustomersList(data.customers);
        if (Array.isArray(data.paymentMethods)) setPaymentMethodsList(data.paymentMethods);
      } else {
        setToast({ msg: data.error || "Failed to load report data", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to connect to reports API", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Instant reactive client-side filtering + sorting for ultra-fast, zero-lag experience
  const filteredRows = useMemo(() => {
    let result = [...allRecords];

    // 1. Date filter
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      result = result.filter((r) => {
        const d = new Date(r.rawDate);
        return d >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((r) => {
        const d = new Date(r.rawDate);
        return d <= end;
      });
    }

    // 2. Customer filter
    if (selectedCustomer && selectedCustomer !== "all") {
      const normCustomer = selectedCustomer.toLowerCase();
      result = result.filter((r) => r.customer?.toLowerCase().includes(normCustomer));
    }

    // 3. Payment Method filter
    if (selectedPaymentMethod && selectedPaymentMethod !== "all") {
      const normMethod = selectedPaymentMethod.toLowerCase().replace(/_/g, " ");
      result = result.filter((r) => r.payment?.toLowerCase().replace(/_/g, " ") === normMethod);
    }

    // 4. Search text filter
    if (searchText && searchText.trim()) {
      const term = searchText.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.earningId?.toLowerCase().includes(term) ||
          r.orderNumber?.toLowerCase().includes(term) ||
          r.orderIdFormatted?.toLowerCase().includes(term) ||
          r.customer?.toLowerCase().includes(term) ||
          r.payment?.toLowerCase().includes(term) ||
          r.type?.toLowerCase().includes(term) ||
          r.status?.toLowerCase().includes(term) ||
          r.total?.toLowerCase().includes(term) ||
          r.date?.toLowerCase().includes(term)
      );
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
      if (sortBy === "oldest") return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
      if (sortBy === "highest") return Number(b.amount || 0) - Number(a.amount || 0);
      if (sortBy === "lowest") return Number(a.amount || 0) - Number(b.amount || 0);
      return 0;
    });

    return result;
  }, [allRecords, startDate, endDate, selectedCustomer, selectedPaymentMethod, searchText, sortBy]);

  // Computed summary metrics
  const totalEarningsFormatted = useMemo(() => {
    const sum = filteredRows.reduce((acc, r) => acc + Number(r.amount || 0), 0);
    return `$${sum.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [filteredRows]);

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
    setSelectedCustomer("all");
    setSelectedPaymentMethod("all");
    setSearchText("");
    setSortBy("newest");
  };

  // Manual Submit button also re-syncs fresh from server
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
    setToast({ msg: `Filter applied: ${filteredRows.length} matching transaction(s).`, type: "info" });
  };

  // Export as CSV
  const handleExportCSV = () => {
    if (filteredRows.length === 0) {
      setToast({ msg: "No records to export.", type: "warning" });
      return;
    }

    const headers = ["Earning ID", "Date", "Order ID", "Customer", "Type", "Payment Method", "Grand Total", "Status"];
    const csvRows = [headers.join(",")];

    filteredRows.forEach((r) => {
      const values = [
        `"${r.earningId}"`,
        `"${r.date}"`,
        `"${r.orderNumber || r.orderIdFormatted}"`,
        `"${r.customer}"`,
        `"${r.type}"`,
        `"${r.payment}"`,
        `"${r.total}"`,
        `"${r.status}"`,
      ];
      csvRows.push(values.join(","));
    });

    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const timestamp = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `earnings_report_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ msg: "Earnings report exported successfully!", type: "success" });
  };

  // Table columns definition
  const baseColumns = useMemo(
    () => [
      {
        title: "Earning ID",
        dataIndex: "earningId",
        render: (text: string) => <span className="fw-semibold text-primary">{text}</span>,
      },
      {
        title: "Date",
        dataIndex: "date",
      },
      {
        title: "Order ID",
        dataIndex: "orderNumber",
        render: (text: string, row: EarningRecord) => (
          <span className="fw-medium text-dark">{text || row.orderIdFormatted}</span>
        ),
      },
      {
        title: "Customer",
        dataIndex: "customer",
      },
      {
        title: "Type",
        dataIndex: "type",
        render: (text: string) => (
          <span className="badge bg-light text-dark border">{text}</span>
        ),
      },
      {
        title: "Payment Method",
        dataIndex: "payment",
      },
      {
        title: "Grand Total",
        dataIndex: "total",
        render: (text: string) => <p className="fw-bold text-dark mb-0">{text}</p>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (text: string) => (
          <span
            className={`badge ${
              text === "Completed"
                ? "badge-soft-success"
                : text === "Cancelled"
                ? "badge-soft-danger"
                : "badge-soft-warning"
            }`}
          >
            {text}
          </span>
        ),
      },
    ],
    []
  );

  const mappedColumns = useMemo(
    () =>
      baseColumns.map((col: any, idx: number) => ({
        ...col,
        ID: idx.toString(),
        key: col.dataIndex || idx.toString(),
      })),
    [baseColumns]
  );

  const hasActiveFilters = Boolean(
    startDate || endDate || selectedCustomer !== "all" || selectedPaymentMethod !== "all" || searchText
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
                  title="Refresh data from database"
                  disabled={loading}
                >
                  <i className={`icon-refresh-ccw ${loading ? "spinner-border spinner-border-sm" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-3 d-flex align-items-center flex-wrap">
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

          {/* Quick Metrics Bar */}
          <div className="row mb-4">
            <div className="col-md-4 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0 bg-primary text-white">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-white-50 fw-semibold">Filtered Gross Earnings</span>
                    <h3 className="text-white fw-bold mb-0 mt-1">{totalEarningsFormatted}</h3>
                  </div>
                  <div className="avatar avatar-md bg-white text-primary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-badge-dollar-sign fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Transactions Matched</span>
                    <h3 className="fw-bold mb-0 mt-1 text-dark">
                      {filteredRows.length}{" "}
                      <span className="fs-13 fw-normal text-muted">of {allRecords.length}</span>
                    </h3>
                  </div>
                  <div className="avatar avatar-md bg-light text-success rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-receipt fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Quick Date Presets</span>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      <button
                        type="button"
                        className="btn btn-xs btn-outline-secondary py-0 px-2"
                        style={{ fontSize: "11px" }}
                        onClick={() => applyDatePreset("all")}
                      >
                        All Time
                      </button>
                      <button
                        type="button"
                        className="btn btn-xs btn-outline-primary py-0 px-2"
                        style={{ fontSize: "11px" }}
                        onClick={() => applyDatePreset("sept2026")}
                      >
                        Sep 2026
                      </button>
                      <button
                        type="button"
                        className="btn btn-xs btn-outline-info py-0 px-2"
                        style={{ fontSize: "11px" }}
                        onClick={() => applyDatePreset("nov2025")}
                      >
                        Nov 2025
                      </button>
                    </div>
                  </div>
                  <div className="avatar avatar-md bg-light text-info rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-calendar fs-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="card mb-0 shadow-sm border-0">
            <div className="card-body">
              {/* Interactive Filter Bar */}
              <form onSubmit={handleFilterSubmit}>
                <div className="border-bottom pb-3 mb-3 d-flex flex-wrap gap-3 align-items-end">
                  {/* Start Date */}
                  <div style={{ minWidth: 150, flex: 1 }}>
                    <label className="form-label fw-semibold small mb-1">
                      Start Date<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-md"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  {/* End Date */}
                  <div style={{ minWidth: 150, flex: 1 }}>
                    <label className="form-label fw-semibold small mb-1">
                      End Date<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-md"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  {/* Customer Dropdown */}
                  <div style={{ minWidth: 200, flex: 1.2 }}>
                    <label className="form-label fw-semibold small mb-1">
                      Customer<span className="text-danger ms-1">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={selectedCustomer}
                      onChange={(e) => setSelectedCustomer(e.target.value)}
                    >
                      <option value="all">All Customers</option>
                      {customersList.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Method Dropdown */}
                  <div style={{ minWidth: 180, flex: 1 }}>
                    <label className="form-label fw-semibold small mb-1">
                      Payment Method<span className="text-danger ms-1">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                      <option value="all">All Payment Methods</option>
                      {paymentMethodsList.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit & Reset Buttons */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary d-inline-flex align-items-center" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <i className="icon-check me-1" />
                          Submit
                        </>
                      )}
                    </button>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleResetFilters}
                        title="Reset all filters"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Active Filter Badges Pills */}
              {hasActiveFilters && (
                <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                  <span className="text-muted small fw-semibold">Active filters:</span>
                  {startDate && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      From: {startDate}
                      <button
                        type="button"
                        className="btn-close btn-close-xs ms-1"
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
                        className="btn-close btn-close-xs ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setEndDate("")}
                      />
                    </span>
                  )}
                  {selectedCustomer !== "all" && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      Customer: {selectedCustomer}
                      <button
                        type="button"
                        className="btn-close btn-close-xs ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setSelectedCustomer("all")}
                      />
                    </span>
                  )}
                  {selectedPaymentMethod !== "all" && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      Payment: {selectedPaymentMethod}
                      <button
                        type="button"
                        className="btn-close btn-close-xs ms-1"
                        style={{ fontSize: "8px" }}
                        onClick={() => setSelectedPaymentMethod("all")}
                      />
                    </span>
                  )}
                  {searchText && (
                    <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                      Search: &quot;{searchText}&quot;
                      <button
                        type="button"
                        className="btn-close btn-close-xs ms-1"
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

              {/* Search and Sort Toolbar */}
              <div className="table-search d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="search-input" style={{ minWidth: 260 }}>
                  <SearchInput value={searchText} onChange={(val) => setSearchText(val)} />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Sort by:</span>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-white border d-inline-flex align-items-center btn-sm shadow-sm"
                      data-bs-toggle="dropdown"
                    >
                      {sortBy === "newest"
                        ? "Newest"
                        : sortBy === "oldest"
                        ? "Oldest"
                        : sortBy === "highest"
                        ? "Highest Amount"
                        : "Lowest Amount"}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow border p-1">
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item rounded ${sortBy === "newest" ? "active" : ""}`}
                          onClick={() => setSortBy("newest")}
                        >
                          Newest
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item rounded ${sortBy === "oldest" ? "active" : ""}`}
                          onClick={() => setSortBy("oldest")}
                        >
                          Oldest
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item rounded ${sortBy === "highest" ? "active" : ""}`}
                          onClick={() => setSortBy("highest")}
                        >
                          Highest Amount
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`dropdown-item rounded ${sortBy === "lowest" ? "active" : ""}`}
                          onClick={() => setSortBy("lowest")}
                        >
                          Lowest Amount
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="table-responsive">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="text-muted mt-2">Loading earnings records...</p>
                  </div>
                ) : filteredRows.length === 0 ? (
                  <div className="text-center py-5 border rounded bg-light">
                    <i className="icon-file-x text-muted fs-40 mb-2" />
                    <h6 className="fw-bold">No Earnings Found</h6>
                    <p className="text-muted small mb-3">No transactions match your current filters.</p>
                    <button type="button" className="btn btn-sm btn-primary" onClick={handleResetFilters}>
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <DataTable
                    columns={mappedColumns}
                    dataSource={
                      filteredRows.map((r, idx) => ({
                        ...r,
                        key: `earning-row-${r.orderNumber || r.id || 'rec'}-${idx}`,
                      })) as any
                    }
                    Selection={false}
                    searchText={""} // Search handled reactively in filteredRows
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
