"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Reportstab from "../reportstab";
import CommonDatePicker from "@/core/common/common-date-picker/commonDatePicker";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import DataTable from "@/core/common/data-table";
import Toast from "@/core/common/toast/toast";

interface OrderRecord {
  id: number;
  orderId: string;
  orderNumber: string;
  date: string;
  rawDate: string;
  customer: string;
  token: string;
  type: string;
  menus: number | string;
  amount: number;
  total: string;
  status: string;
}

const OrderReportComponent = () => {
  const [allRecords, setAllRecords] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [customersList, setCustomersList] = useState<string[]>([]);

  // Filter states
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("all");
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [customerDropdownOpen, setCustomerDropdownOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  const customerDropdownRef = useRef<HTMLDivElement>(null);

  // Close customer dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (customerDropdownRef.current && !customerDropdownRef.current.contains(e.target as Node)) {
        setCustomerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch orders report data from MySQL API
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports/orders?sortBy=newest");
      const data = await res.json();

      if (data.success) {
        setAllRecords(data.data || []);
        if (Array.isArray(data.customers)) {
          setCustomersList(data.customers);
        }
      } else {
        setToast({ msg: data.error || "Failed to load orders report data", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to connect to orders report API", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reactive client-side filtering + sorting for instant, zero-lag updates
  const filteredRows = useMemo(() => {
    let result = [...allRecords];

    // 1. Date Range
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

    // 2. Customer
    if (selectedCustomer && selectedCustomer !== "all") {
      const normCustomer = selectedCustomer.toLowerCase();
      result = result.filter((r) => r.customer?.toLowerCase().includes(normCustomer));
    }

    // 3. Search query
    if (searchText && searchText.trim()) {
      const term = searchText.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.orderId?.toLowerCase().includes(term) ||
          r.orderNumber?.toLowerCase().includes(term) ||
          r.customer?.toLowerCase().includes(term) ||
          String(r.token)?.toLowerCase().includes(term) ||
          r.type?.toLowerCase().includes(term) ||
          String(r.menus)?.toLowerCase().includes(term) ||
          r.total?.toLowerCase().includes(term) ||
          r.status?.toLowerCase().includes(term) ||
          r.date?.toLowerCase().includes(term)
      );
    }

    // 4. Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
      if (sortBy === "oldest") return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
      if (sortBy === "highest") return Number(b.amount || 0) - Number(a.amount || 0);
      if (sortBy === "lowest") return Number(a.amount || 0) - Number(b.amount || 0);
      return 0;
    });

    return result;
  }, [allRecords, startDate, endDate, selectedCustomer, searchText, sortBy]);

  // Metrics summary
  const summaryMetrics = useMemo(() => {
    const totalOrders = filteredRows.length;
    const grossTotal = filteredRows.reduce((acc, r) => acc + Number(r.amount || 0), 0);
    const paidCount = filteredRows.filter((r) => r.status === "Paid").length;
    const dineInCount = filteredRows.filter((r) => r.type === "Dine In").length;
    const takeAwayCount = filteredRows.filter((r) => r.type === "Take Away").length;

    return {
      totalOrders,
      grossFormatted: `$${grossTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      paidCount,
      dineInCount,
      takeAwayCount,
    };
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
    setCustomerSearch("");
    setSearchText("");
    setSortBy("newest");
  };

  // Submit button re-sync & confirms filtering
  const handleFilterSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCustomerDropdownOpen(false);
    setToast({
      msg: `Filter applied: ${filteredRows.length} matching order(s).`,
      type: "info",
    });
  };

  // Export as CSV
  const handleExportCSV = () => {
    if (filteredRows.length === 0) {
      setToast({ msg: "No orders to export.", type: "warning" });
      return;
    }

    const headers = ["Order ID", "Order Number", "Date", "Customer", "Token No", "Type", "Menus", "Grand Total", "Status"];
    const csvRows = [headers.join(",")];

    filteredRows.forEach((r) => {
      const values = [
        `"${r.orderId}"`,
        `"${r.orderNumber}"`,
        `"${r.date}"`,
        `"${r.customer}"`,
        `"${r.token}"`,
        `"${r.type}"`,
        `"${r.menus}"`,
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
    link.setAttribute("download", `orders_report_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ msg: "Order report exported successfully!", type: "success" });
  };

  // Base columns matching exactly the screenshot
  const baseColumns = useMemo(
    () => [
      {
        title: "Order ID",
        dataIndex: "orderId",
        render: (text: string, row: OrderRecord) => (
          <span className="fw-bold text-primary">{text || row.orderNumber}</span>
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
      },
      {
        title: "Customer",
        dataIndex: "customer",
        render: (text: string) => <span className="fw-medium text-dark">{text}</span>,
      },
      {
        title: "Token No",
        dataIndex: "token",
        render: (text: string) => (
          <span className="badge bg-light text-dark border px-2 py-1">{text}</span>
        ),
      },
      {
        title: "Type",
        dataIndex: "type",
        render: (text: string) => (
          <span
            className={`badge ${
              text === "Dine In"
                ? "badge-soft-info"
                : text === "Take Away"
                ? "badge-soft-warning"
                : text === "Room Service"
                ? "badge-soft-purple"
                : "badge-soft-secondary"
            }`}
          >
            {text}
          </span>
        ),
      },
      {
        title: "Menus",
        dataIndex: "menus",
        render: (text: string | number) => <span className="fw-medium text-dark">{text}</span>,
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
              text === "Paid"
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

  // Filtered customer list for inside the dropdown search
  const filteredCustomersList = useMemo(() => {
    if (!customerSearch.trim()) return customersList;
    const term = customerSearch.trim().toLowerCase();
    return customersList.filter((c) => c.toLowerCase().includes(term));
  }, [customersList, customerSearch]);

  const hasActiveFilters = Boolean(
    startDate || endDate || selectedCustomer !== "all" || searchText
  );

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
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

          {/* Summary Metric Cards */}
          <div className="row mb-4">
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0 bg-primary text-white">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-white-50 fw-semibold">Filtered Gross Total</span>
                    <h3 className="text-white fw-bold mb-0 mt-1">{summaryMetrics.grossFormatted}</h3>
                  </div>
                  <div className="avatar avatar-md bg-white text-primary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-badge-dollar-sign fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Total Orders</span>
                    <h3 className="fw-bold mb-0 mt-1 text-dark">{summaryMetrics.totalOrders}</h3>
                  </div>
                  <div className="avatar avatar-md bg-light text-secondary rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-list-todo fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Paid Orders</span>
                    <h3 className="fw-bold mb-0 mt-1 text-success">{summaryMetrics.paidCount}</h3>
                  </div>
                  <div className="avatar avatar-md bg-soft-success text-success rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-circle-check fs-20" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-3">
              <div className="card shadow-sm border-0 mb-0">
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fs-12 text-uppercase text-muted fw-semibold">Dine In / Take Away</span>
                    <h3 className="fw-bold mb-0 mt-1 text-info">
                      {summaryMetrics.dineInCount} / {summaryMetrics.takeAwayCount}
                    </h3>
                  </div>
                  <div className="avatar avatar-md bg-soft-info text-info rounded-circle d-flex align-items-center justify-content-center">
                    <i className="icon-utensils fs-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Date Filter Presets */}
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
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-0 shadow-sm border">
                <div className="card-body">
                  {/* Filter Section */}
                  <form onSubmit={handleFilterSubmit}>
                    <div className="border-bottom order-report-filter-wrap pb-3 mb-3">
                      {/* Start Date */}
                      <div className="report-filter">
                        <div className="mb-3">
                          <label className="form-label fw-semibold small">
                            Start Date<span className="text-danger ms-1">*</span>
                          </label>
                          <CommonDatePicker
                            value={startDate ? dayjs(startDate) : null}
                            onChange={(d: any) => {
                              setStartDate(d ? d.format("YYYY-MM-DD") : "");
                            }}
                            placeholder="Select Start Date"
                          />
                        </div>
                      </div>

                      {/* End Date */}
                      <div className="report-filter">
                        <div className="mb-3">
                          <label className="form-label fw-semibold small">
                            End Date<span className="text-danger ms-1">*</span>
                          </label>
                          <CommonDatePicker
                            value={endDate ? dayjs(endDate) : null}
                            onChange={(d: any) => {
                              setEndDate(d ? d.format("YYYY-MM-DD") : "");
                            }}
                            placeholder="Select End Date"
                          />
                        </div>
                      </div>

                      {/* Customer Dropdown */}
                      <div className="report-filter">
                        <div className="mb-3" ref={customerDropdownRef}>
                          <label className="form-label fw-semibold small">
                            Customer<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="dropdown position-relative">
                            <button
                              type="button"
                              className="btn btn-white border d-flex align-items-center justify-content-between w-100 text-truncate shadow-sm"
                              onClick={() => setCustomerDropdownOpen((prev) => !prev)}
                            >
                              <span className="text-truncate">
                                {selectedCustomer === "all" ? "Select" : selectedCustomer}
                              </span>
                              <i className="icon-chevron-down ms-1 fs-12 text-muted" />
                            </button>

                            {customerDropdownOpen && (
                              <div
                                className="dropdown-menu dropdown-menu-end p-3 w-100 show shadow-lg border"
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  left: 0,
                                  zIndex: 1050,
                                  maxHeight: "300px",
                                  overflowY: "auto",
                                }}
                              >
                                <h6 className="fs-14 fw-semibold mb-2">Customer</h6>
                                <div className="input-icon-end input-icon position-relative mb-3">
                                  <span className="input-icon-addon">
                                    <i className="icon-search text-dark" />
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control form-control-md"
                                    placeholder="Search customer..."
                                    value={customerSearch}
                                    onChange={(e) => setCustomerSearch(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                <div className="vstack gap-2">
                                  <div>
                                    <label
                                      className="d-flex align-items-center p-1 rounded hover-bg-light cursor-pointer"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setSelectedCustomer("all");
                                        setCustomerDropdownOpen(false);
                                      }}
                                    >
                                      <input
                                        className="form-check-input m-0 me-2"
                                        type="radio"
                                        name="customer_radio"
                                        checked={selectedCustomer === "all"}
                                        readOnly
                                      />
                                      <span className="fw-semibold small">All Customers</span>
                                    </label>
                                  </div>
                                  {filteredCustomersList.map((c) => (
                                    <div key={c}>
                                      <label
                                        className="d-flex align-items-center p-1 rounded hover-bg-light cursor-pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          setSelectedCustomer(c);
                                          setCustomerDropdownOpen(false);
                                        }}
                                      >
                                        <input
                                          className="form-check-input m-0 me-2"
                                          type="radio"
                                          name="customer_radio"
                                          checked={selectedCustomer === c}
                                          readOnly
                                        />
                                        <span className="small text-truncate">{c}</span>
                                      </label>
                                    </div>
                                  ))}
                                  {filteredCustomersList.length === 0 && (
                                    <p className="text-muted small mb-0 py-1">No customers match</p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="report-filter">
                        <div className="mb-3 d-flex gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary d-inline-flex align-items-center justify-content-center w-100 shadow-sm"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1" role="status" />
                                Loading...
                              </>
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Active Filter Pills */}
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
                      {selectedCustomer !== "all" && (
                        <span className="badge bg-light text-dark border d-flex align-items-center gap-1">
                          Customer: {selectedCustomer}
                          <button
                            type="button"
                            className="btn-close ms-1"
                            style={{ fontSize: "8px" }}
                            onClick={() => setSelectedCustomer("all")}
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

                  {/* Search and Sort Bar */}
                  <div className="table-search d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                    <div className="search-input" style={{ minWidth: 260 }}>
                      <SearchInput value={searchText} onChange={(val) => setSearchText(val)} />
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted small">Sort by :</span>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="dropdown-toggle btn btn-white border d-inline-flex align-items-center shadow-sm"
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
                        <ul className="dropdown-menu dropdown-menu-end p-2 shadow border">
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

                  {/* Data Table */}
                  <div className="table-responsive">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="text-muted mt-2">Loading orders report data...</p>
                      </div>
                    ) : filteredRows.length === 0 ? (
                      <div className="text-center py-5 border rounded bg-light">
                        <i className="icon-file-x text-muted fs-40 mb-2" />
                        <h6 className="fw-bold">No Orders Found</h6>
                        <p className="text-muted small mb-3">No orders match your current filters.</p>
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
                            key: `order-row-${r.orderNumber || r.id || 'ord'}-${idx}`,
                          })) as any
                        }
                        Selection={false}
                        searchText={""} // Search handled reactively in filteredRows
                      />
                    )}
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>
    </>
  );
};

export default OrderReportComponent;
