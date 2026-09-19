"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import InvoicesModal, { InvoiceRecord } from "./invoicesModal";
import Link from "next/link";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { TableData } from "@/core/data/interface";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import DataTable from "@/core/common/data-table";
import { all_routes } from "@/routes/all_routes";
import Toast from "@/core/common/toast/toast";

type DataRow = TableData & {
  key: string;
  id?: string | number;
  invoice_id?: number;
  Invoice_ID: string;
  invoice_number?: string;
  Customer: string;
  customer_name?: string;
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
  image?: string;
  Actions?: string;
  items?: any[];
};

const InvoicesComponent = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // Filter state
  const [appliedFilters, setAppliedFilters] = useState<{
    customers: string[];
    orderTypes: string[];
    status: string;
  }>({
    customers: [],
    orderTypes: [],
    status: "all",
  });

  const [searchText, setSearchText] = useState<string>("");

  // Load invoices from API
  const loadInvoices = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/invoices");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const mapped: DataRow[] = json.data.map((inv: any, idx: number) => ({
          ...inv,
          key: `inv-${inv.invoice_id || inv.Invoice_ID || idx}`,
          id: inv.invoice_id || inv.id || idx,
          Invoice_ID: inv.invoice_number || inv.Invoice_ID,
          Customer: inv.customer_name || inv.Customer,
          Date: inv.Date || inv.created_at_formatted,
          Order_Type: inv.order_type || inv.Order_Type,
          Amount: inv.Amount || `$${Number(inv.total_amount || 0).toLocaleString()}`,
          Status: inv.status || inv.Status,
          image: inv.image || inv.customer_image || "avatar-32.jpg",
        }));
        setRows(mapped);
      } else {
        setToast({ msg: json.error || "Failed to load invoices", type: "danger" });
      }
    } catch (err: any) {
      console.error("Error loading invoices:", err);
      setToast({ msg: err.message || "Failed to connect to invoices API", type: "danger" });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  // Open invoice preview and fetch its items
  const handleOpenPreview = async (inv: DataRow) => {
    setSelectedInvoice(inv);
    try {
      const invNum = inv.Invoice_ID || inv.invoice_number || "";
      if (!invNum) return;
      const res = await fetch(`/api/invoices?invoice_number=${encodeURIComponent(invNum)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setSelectedInvoice({
          ...inv,
          ...data.data,
        });
      }
    } catch (err) {
      console.error("Failed to load invoice items:", err);
    }
  };

  // Customers list for filter offcanvas
  const customersList = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      if (r.Customer) set.add(r.Customer);
    });
    return Array.from(set);
  }, [rows]);

  // Filter and sort rows
  const filteredAndSortedRows = useMemo(() => {
    let result = [...rows];

    // Status filter
    if (appliedFilters.status && appliedFilters.status !== "all") {
      result = result.filter(
        (r) => (r.Status || "").toLowerCase() === appliedFilters.status.toLowerCase()
      );
    }

    // Customer filter
    if (appliedFilters.customers.length > 0) {
      result = result.filter((r) => appliedFilters.customers.includes(r.Customer));
    }

    // Order Type filter
    if (appliedFilters.orderTypes.length > 0) {
      result = result.filter((r) => appliedFilters.orderTypes.includes(r.Order_Type));
    }

    // Search text filter
    if (searchText && searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      result = result.filter(
        (r) =>
          (r.Invoice_ID && r.Invoice_ID.toLowerCase().includes(q)) ||
          (r.Customer && r.Customer.toLowerCase().includes(q)) ||
          (r.Date && r.Date.toLowerCase().includes(q)) ||
          (r.Order_Type && r.Order_Type.toLowerCase().includes(q)) ||
          (r.Amount && r.Amount.toLowerCase().includes(q)) ||
          (r.Status && r.Status.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "Newest") {
      result.sort((a, b) => {
        const dateA = a.invoice_date ? new Date(a.invoice_date).getTime() : 0;
        const dateB = b.invoice_date ? new Date(b.invoice_date).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "Oldest") {
      result.sort((a, b) => {
        const dateA = a.invoice_date ? new Date(a.invoice_date).getTime() : 0;
        const dateB = b.invoice_date ? new Date(b.invoice_date).getTime() : 0;
        return dateA - dateB;
      });
    } else if (sortBy === "Ascending") {
      result.sort((a, b) => {
        const amtA = Number(a.total_amount || a.Amount.replace(/[^0-9.]/g, "") || 0);
        const amtB = Number(b.total_amount || b.Amount.replace(/[^0-9.]/g, "") || 0);
        return amtA - amtB;
      });
    } else if (sortBy === "Descending") {
      result.sort((a, b) => {
        const amtA = Number(a.total_amount || a.Amount.replace(/[^0-9.]/g, "") || 0);
        const amtB = Number(b.total_amount || b.Amount.replace(/[^0-9.]/g, "") || 0);
        return amtB - amtA;
      });
    }

    return result;
  }, [rows, appliedFilters, searchText, sortBy]);

  // Export as Excel / CSV
  const handleExportExcel = () => {
    if (filteredAndSortedRows.length === 0) {
      setToast({ msg: "No invoice records to export", type: "warning" });
      return;
    }

    const headers = ["Invoice ID", "Customer", "Date", "Order Type", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedRows.map((r) =>
        [
          `"${r.Invoice_ID}"`,
          `"${r.Customer}"`,
          `"${r.Date}"`,
          `"${r.Order_Type}"`,
          `"${r.Amount}"`,
          `"${r.Status}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoices_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ msg: "Invoices exported to CSV successfully!", type: "success" });
  };

  // Export as PDF / Print
  const handleExportPDF = () => {
    window.print();
  };

  const baseColumns = useMemo(
    () => [
      {
        title: "Invoice ID",
        dataIndex: "Invoice_ID",
        render: (text: string) => (
          <Link
            href={`${all_routes.invoicesDetails}?invoice_number=${encodeURIComponent(text)}`}
            className="fw-bold text-primary"
          >
            {text}
          </Link>
        ),
        sorter: (a: DataRow, b: DataRow) => a.Invoice_ID.localeCompare(b.Invoice_ID),
      },
      {
        title: "Customer",
        dataIndex: "Customer",
        render: (text: string, record: any) => (
          <div className="d-flex align-items-center">
            <span className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2 bg-light-primary text-primary fw-bold fs-13 d-flex align-items-center justify-content-center">
              {record.image && record.image.startsWith("avatar-") ? (
                <ImageWithBasePath
                  src={`assets/img/profiles/${record.image}`}
                  alt={text}
                  className="img-fluid rounded-circle"
                />
              ) : (
                text?.charAt(0) || "C"
              )}
            </span>
            <h6 className="fs-14 fw-normal mb-0">
              <span className="text-dark fw-medium">{text}</span>
            </h6>
          </div>
        ),
        sorter: (a: DataRow, b: DataRow) => a.Customer.localeCompare(b.Customer),
      },
      {
        title: "Date",
        dataIndex: "Date",
        sorter: (a: DataRow, b: DataRow) => {
          const dateA = a.invoice_date ? new Date(a.invoice_date).getTime() : 0;
          const dateB = b.invoice_date ? new Date(b.invoice_date).getTime() : 0;
          return dateA - dateB;
        },
      },
      {
        title: "Order Type",
        dataIndex: "Order_Type",
        render: (text: string) => (
          <span className="badge bg-light text-dark border px-2 py-1 fs-12">
            {text}
          </span>
        ),
        sorter: (a: DataRow, b: DataRow) => a.Order_Type.localeCompare(b.Order_Type),
      },
      {
        title: "Amount",
        dataIndex: "Amount",
        render: (text: string) => <span className="fw-bold text-dark">{text}</span>,
        sorter: (a: DataRow, b: DataRow) => {
          const amtA = Number(a.total_amount || a.Amount.replace(/[^0-9.]/g, "") || 0);
          const amtB = Number(b.total_amount || b.Amount.replace(/[^0-9.]/g, "") || 0);
          return amtA - amtB;
        },
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (text: string) => (
          <span
            className={`badge ${
              text.toLowerCase() === "paid" ? "badge-soft-success" : "badge-soft-danger"
            }`}
          >
            {text}
          </span>
        ),
      },
      {
        title: "Actions",
        dataIndex: "Actions",
        render: (_: string, record: DataRow) => (
          <div className="d-flex align-items-center">
            {/* Quick print / download */}
            <button
              type="button"
              className="btn btn-icon btn-sm btn-white rounded-circle me-2"
              title="Print / Download Invoice"
              data-bs-toggle="modal"
              data-bs-target="#view_invoices"
              onClick={() => handleOpenPreview(record)}
            >
              <i className="icon-download" />
            </button>
            {/* Eye: Preview Modal */}
            <button
              type="button"
              className="btn btn-icon btn-sm btn-white rounded-circle"
              title="Quick View Invoice"
              data-bs-toggle="modal"
              data-bs-target="#view_invoices"
              onClick={() => handleOpenPreview(record)}
            >
              <i className="icon-eye" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    baseColumns.map((c) => String(c.dataIndex || c.title))
  );
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(columnOrder);

  const handleToggleColumn = useCallback((key: string) => {
    setVisibleColumnKeys((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  }, []);

  const handleColumnDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    setColumnOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(result.source.index, 1);
      next.splice(result.destination!.index, 0, moved);
      return next;
    });
  }, []);

  const orderedColumns = useMemo(() => {
    const columnMap = new Map(baseColumns.map((col) => [String(col.dataIndex || col.title), col]));
    return columnOrder.map((key) => columnMap.get(key)).filter(Boolean) as typeof baseColumns;
  }, [baseColumns, columnOrder]);

  const mappedColumns = useMemo(
    () =>
      orderedColumns.map((col: any, idx: number) => ({
        ...col,
        ID: idx.toString(),
        key: (col as any).dataIndex || idx.toString(),
      })),
    [orderedColumns]
  );

  const visibleColumns = useMemo(
    () => mappedColumns.filter((col) => visibleColumnKeys.includes(String(col.dataIndex || col.key))),
    [mappedColumns, visibleColumnKeys]
  );

  return (
    <>
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Invoices
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                  title="Reload Invoices"
                  onClick={loadInvoices}
                  disabled={refreshing}
                >
                  <i className={`icon-refresh-ccw ${refreshing ? "fa-spin" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="icon-upload me-2" />
                  Export
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm border">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded d-flex align-items-center py-2"
                      onClick={handleExportPDF}
                    >
                      <i className="icon-file-text me-2 text-danger" />
                      Export as PDF / Print
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item rounded d-flex align-items-center py-2"
                      onClick={handleExportExcel}
                    >
                      <i className="icon-file-spreadsheet me-2 text-success" />
                      Export as Excel (CSV)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End Page Header */}

          {/* Active Filter Indicators */}
          {(appliedFilters.status !== "all" ||
            appliedFilters.customers.length > 0 ||
            appliedFilters.orderTypes.length > 0 ||
            searchText) && (
            <div className="alert bg-light border p-2 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center flex-wrap gap-2 fs-13">
                <span className="fw-semibold text-dark">Active Filters:</span>
                {appliedFilters.status !== "all" && (
                  <span className="badge bg-primary">Status: {appliedFilters.status}</span>
                )}
                {appliedFilters.orderTypes.length > 0 && (
                  <span className="badge bg-info">Types: {appliedFilters.orderTypes.join(", ")}</span>
                )}
                {appliedFilters.customers.length > 0 && (
                  <span className="badge bg-secondary">
                    Customers: {appliedFilters.customers.join(", ")}
                  </span>
                )}
                {searchText && (
                  <span className="badge bg-warning text-dark">Search: &quot;{searchText}&quot;</span>
                )}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link text-danger p-0 fs-13 text-decoration-none fw-semibold"
                onClick={() => {
                  setAppliedFilters({ customers: [], orderTypes: [], status: "all" });
                  setSearchText("");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Table Card */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center flex-wrap gap-3 justify-content-between mb-4">
                <div className="search-input">
                  <SearchInput value={searchText} onChange={(val) => setSearchText(val)} />
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {/* Filter Button */}
                  <button
                    type="button"
                    className={`btn btn-white d-inline-flex align-items-center ${
                      appliedFilters.status !== "all" ||
                      appliedFilters.customers.length > 0 ||
                      appliedFilters.orderTypes.length > 0
                        ? "border-primary text-primary fw-bold"
                        : ""
                    }`}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#filter-offcanvas"
                    aria-controls="filter-offcanvas"
                  >
                    <i className="icon-funnel me-2" />
                    Filter
                    {(appliedFilters.customers.length > 0 ||
                      appliedFilters.orderTypes.length > 0 ||
                      appliedFilters.status !== "all") && (
                      <span className="badge bg-primary ms-2 rounded-pill">
                        {appliedFilters.customers.length +
                          appliedFilters.orderTypes.length +
                          (appliedFilters.status !== "all" ? 1 : 0)}
                      </span>
                    )}
                  </button>

                  {/* Column Visibility */}
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-icon btn-white"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      title="Manage Columns"
                    >
                      <i className="icon-columns-3" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-end p-3 shadow border">
                      <h6 className="fw-bold mb-3">Visible Columns</h6>
                      <DragDropContext onDragEnd={handleColumnDragEnd}>
                        <Droppable droppableId="column-list">
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                              {mappedColumns.map((col, index) => {
                                const key = String(col.dataIndex || col.key);
                                const checked = visibleColumnKeys.includes(key);
                                return (
                                  <Draggable key={key} draggableId={key} index={index}>
                                    {(dragProvided) => (
                                      <div
                                        className="mb-2"
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                      >
                                        <label className="d-flex align-items-center cursor-pointer fs-13">
                                          <span
                                            className="me-2 d-flex align-items-center text-muted"
                                            {...dragProvided.dragHandleProps}
                                          >
                                            <i className="icon-grip-vertical" />
                                          </span>
                                          <input
                                            className="form-check-input m-0 me-2"
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => handleToggleColumn(key)}
                                          />
                                          {col.title}
                                        </label>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </div>

                  {/* Sort by Dropdown */}
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      Sort by : {sortBy}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm border">
                      {["Newest", "Oldest", "Ascending", "Descending"].map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            className={`dropdown-item rounded-1 ${sortBy === opt ? "active" : ""}`}
                            onClick={() => setSortBy(opt)}
                          >
                            {opt === "Ascending"
                              ? "Amount: Low to High"
                              : opt === "Descending"
                              ? "Amount: High to Low"
                              : opt}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive table-nowrap">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-2">Loading invoices from database...</p>
                  </div>
                ) : (
                  <DataTable
                    columns={visibleColumns}
                    dataSource={filteredAndSortedRows}
                    Selection={false}
                    searchText={searchText}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Invoices Modal & Filter Offcanvas */}
      <InvoicesModal
        selectedInvoice={selectedInvoice}
        customersList={customersList}
        currentFilter={appliedFilters}
        onApplyFilter={(filters) => setAppliedFilters(filters)}
        onResetFilter={() =>
          setAppliedFilters({ customers: [], orderTypes: [], status: "all" })
        }
      />
    </>
  );
};

export default InvoicesComponent;
