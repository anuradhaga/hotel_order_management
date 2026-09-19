"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "@/core/common/data-table";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import ItemsModal, { ItemRecord } from "./itemsModal";
import Link from "next/link";
import type { TableData } from "@/core/data/interface";

export type ItemRow = TableData & {
  key: string;
  id: string | number;
  item_id: number;
  item: string;
  item_name: string;
  item_code: string;
  item_size?: string;
  sizes?: Array<{ price_id?: number; size_name: string; selling_price: number }>;
  category: string;
  category_name?: string;
  category_id?: number;
  description?: string;
  image?: string;
  kitchen_dept?: string;
  is_spicy?: number;
  is_vegetarian?: number;
  is_active?: number;
  Status: string;
  status: string;
  price: string;
  Price: string;
  price_raw?: number;
  Date: string;
  created_at?: string;
};

export interface ItemsComponentProps {
  initialData?: {
    items: any[];
    categories: any[];
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
}

const mapItemsToRows = (items: any[]): ItemRow[] =>
  items.map((item: any, idx: number) => ({
    ...item,
    key: String(item.item_id || item.id || idx),
    id: item.item_id || item.id || idx,
    item_id: item.item_id,
    item: item.item_name || item.item,
    item_name: item.item_name || item.item,
    item_code: item.item_code || "",
    item_size: item.item_size || "Regular",
    sizes: item.sizes || [
      {
        size_name: item.item_size || "Regular",
        selling_price: Number(item.selling_price || item.price_raw || 0),
      },
    ],
    category: item.category_name || item.category || "General",
    Status: item.is_active ? "Active" : "Inactive",
    status: item.is_active ? "Active" : "Inactive",
    price: item.price || `LKR ${Number(item.selling_price || 0).toFixed(2)}`,
    Price: item.price || `LKR ${Number(item.selling_price || 0).toFixed(2)}`,
    price_raw: Number(item.selling_price || 0),
    Date: item.Date || item.created_at || "—",
    image:
      item.image ||
      `assets/img/items/food-${String(((idx) % 16) + 1).padStart(2, "0")}.jpg`,
  }));

const ItemsComponent: React.FC<ItemsComponentProps> = ({ initialData }) => {
  const [rows, setRows] = useState<ItemRow[]>(() =>
    initialData?.items ? mapItemsToRows(initialData.items) : []
  );
  const [categories, setCategories] = useState<
    { category_id: number; category_name: string }[]
  >(() => initialData?.categories || []);
  const [currentPage, setCurrentPage] = useState<number>(initialData?.page || 1);
  const [pageSize, setPageSize] = useState<number>(initialData?.pageSize || 20);
  const [totalCount, setTotalCount] = useState<number>(initialData?.totalCount || 0);
  const [loading, setLoading] = useState<boolean>(!initialData?.items?.length);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [vegFilter, setVegFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("id_asc");
  const [sortLabel, setSortLabel] = useState<string>("Default");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [editingItem, setEditingItem] = useState<ItemRecord | null>(null);
  const [viewingItem, setViewingItem] = useState<ItemRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ItemRow | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Fetch items from API
  const fetchItems = useCallback(
    async (
      targetPage: number = currentPage,
      targetPageSize: number = pageSize,
      isRefresh = false
    ) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      try {
        const params = new URLSearchParams();
        params.append("page", String(targetPage));
        params.append("pageSize", String(targetPageSize));
        if (statusFilter && statusFilter !== "all") {
          params.append("status", statusFilter);
        }
        if (categoryFilter && categoryFilter !== "all") {
          params.append("category_id", categoryFilter);
        }
        if (vegFilter && vegFilter !== "all") {
          params.append("is_vegetarian", vegFilter === "veg" ? "1" : "0");
        }
        if (sortBy) {
          params.append("sortBy", sortBy);
        }
        if (searchText.trim()) {
          params.append("search", searchText.trim());
        }

        const res = await fetch(`/api/items?${params.toString()}`);
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setRows(mapItemsToRows(data.data));
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
          }
          if (data.totalCount !== undefined) {
            setTotalCount(Number(data.totalCount));
          }
          setCurrentPage(targetPage);
          setPageSize(targetPageSize);
        }
      } catch (err) {
        console.error("Failed to load items:", err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [currentPage, pageSize, statusFilter, categoryFilter, vegFilter, sortBy, searchText]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    fetchItems(1, pageSize);
  }, [statusFilter, categoryFilter, vegFilter, sortBy, searchText]);

  const handlePageChange = (newPage: number, newPageSize: number) => {
    fetchItems(newPage, newPageSize);
  };

  // Quick toggle Active/Inactive status
  const handleToggleStatus = async (record: ItemRow) => {
    const newActive = record.Status === "Active" ? 0 : 1;
    const newStatus = newActive === 1 ? "Active" : "Inactive";
    try {
      setRows((prev) =>
        prev.map((r) =>
          r.item_id === record.item_id
            ? { ...r, Status: newStatus, status: newStatus, is_active: newActive }
            : r
        )
      );

      await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: record.item_id,
          is_active: newActive,
        }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      fetchItems();
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!pendingDelete?.item_id) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/items?item_id=${pendingDelete.item_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setRows((prev) => prev.filter((r) => r.item_id !== pendingDelete.item_id));
        setPendingDelete(null);
      } else {
        alert(data.error || "Failed to delete item");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete item");
    } finally {
      setDeleting(false);
    }
  };

  // Export as CSV/Excel
  const handleExportExcel = () => {
    if (!rows.length) {
      alert("No data to export");
      return;
    }
    const headers = ["Item Name", "Item Code", "Category", "Size / Portion", "Dietary Type", "Price", "Status", "Date Added"];
    const csvRows = [headers.join(",")];

    rows.forEach((r) => {
      const type = r.is_vegetarian ? "Vegetarian" : "Non-Vegetarian";
      csvRows.push(
        [
          `"${(r.item_name || "").replace(/"/g, '""')}"`,
          `"${(r.item_code || "").replace(/"/g, '""')}"`,
          `"${(r.category || "").replace(/"/g, '""')}"`,
          `"${(r.item_size || "Regular").replace(/"/g, '""')}"`,
          `"${type}"`,
          `"${(r.price || "").replace(/"/g, '""')}"`,
          `"${r.Status || ""}"`,
          `"${r.Date || ""}"`,
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Items_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export as PDF / Print
  const handleExportPDF = () => {
    window.print();
  };

  // Base columns
  const baseColumns = useMemo(
    () => [
      {
        title: "Item",
        dataIndex: "item",
        render: (text: string, record: ItemRow) => {
          const imageSrc = record.image
            ? record.image.startsWith("assets/")
              ? record.image
              : `assets/img/items/${record.image}`
            : "assets/img/items/food-01.jpg";

          return (
            <div className="d-flex align-items-center">
              <span className="avatar avatar-md avatar-rounded flex-shrink-0 me-3 bg-light border overflow-hidden">
                <ImageWithBasePath
                  src={imageSrc}
                  alt={text}
                  className="img-fluid rounded"
                />
              </span>
              <div>
                <h6 className="fs-14 fw-semibold mb-0 text-dark">
                  <span
                    role="button"
                    className="cursor-pointer text-dark hover-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#items_details"
                    onClick={() => setViewingItem(record)}
                  >
                    {text}
                  </span>
                </h6>
                {record.item_code && (
                  <span className="badge bg-light text-muted border fs-11 mt-1">
                    {record.item_code}
                  </span>
                )}
              </div>
            </div>
          );
        },
        sorter: (a: ItemRow, b: ItemRow) => a.item.localeCompare(b.item),
      },
      {
        title: "Category",
        dataIndex: "category",
        render: (val: string) => (
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 fs-12">
            {val}
          </span>
        ),
        sorter: (a: ItemRow, b: ItemRow) => a.category.localeCompare(b.category),
      },
      {
        title: "Dietary",
        dataIndex: "is_vegetarian",
        render: (isVeg: number) => (
          <span className="d-inline-flex align-items-center fs-13">
            <i
              className={`icon-square-dot me-1 fs-15 ${
                isVeg ? "text-success" : "text-danger"
              }`}
            />
            {isVeg ? "Veg" : "Non-Veg"}
          </span>
        ),
        sorter: (a: ItemRow, b: ItemRow) =>
          Number(b.is_vegetarian || 0) - Number(a.is_vegetarian || 0),
      },
      {
        title: "Size / Portion",
        dataIndex: "item_size",
        render: (_: any, record: ItemRow) => {
          if (record.sizes && record.sizes.length > 1) {
            return (
              <div className="d-flex flex-wrap gap-1 align-items-center">
                {record.sizes.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="badge bg-light text-dark border fs-11"
                    title={`${s.size_name}: LKR ${Number(s.selling_price).toFixed(2)}`}
                  >
                    {s.size_name}
                  </span>
                ))}
              </div>
            );
          }
          return (
            <span className="badge bg-light text-dark border fs-12">
              {record.item_size || "Regular"}
            </span>
          );
        },
        sorter: (a: ItemRow, b: ItemRow) =>
          (a.item_size || "Regular").localeCompare(b.item_size || "Regular"),
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (val: string, record: ItemRow) => (
          <div>
            <span className="fw-bold text-dark font-monospace fs-14">{val}</span>
            {record.sizes && record.sizes.length > 1 && (
              <div className="fs-11 text-muted">
                {record.sizes.length} portion sizes
              </div>
            )}
          </div>
        ),
        sorter: (a: ItemRow, b: ItemRow) =>
          Number(a.price_raw || 0) - Number(b.price_raw || 0),
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (text: string, record: ItemRow) => {
          const isActive = (text || "").toLowerCase() === "active";
          return (
            <span
              onClick={() => handleToggleStatus(record)}
              title="Click to toggle status"
              className={`badge cursor-pointer user-select-none ${
                isActive ? "badge-soft-success" : "badge-soft-danger"
              }`}
              style={{ cursor: "pointer" }}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          );
        },
      },
      {
        title: "Actions",
        dataIndex: "Actions",
        render: (_: any, record: ItemRow) => (
          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className="btn btn-icon btn-sm btn-white rounded-circle shadow-xs"
              data-bs-toggle="modal"
              data-bs-target="#items_details"
              title="View Details"
              onClick={() => setViewingItem(record)}
            >
              <i className="icon-eye text-muted" />
            </button>
            <button
              type="button"
              className="btn btn-icon btn-sm btn-white rounded-circle shadow-xs"
              data-bs-toggle="modal"
              data-bs-target="#edit_item"
              title="Edit Item"
              onClick={() => setEditingItem(record)}
            >
              <i className="icon-pencil-line text-muted" />
            </button>
            <button
              type="button"
              className="btn btn-icon btn-sm btn-white rounded-circle shadow-xs text-danger"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              title="Delete Item"
              onClick={() => setPendingDelete(record)}
            >
              <i className="icon-trash-2 text-danger" />
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
    const columnMap = new Map(
      baseColumns.map((col) => [String(col.dataIndex || col.title), col])
    );
    return columnOrder
      .map((key) => columnMap.get(key))
      .filter(Boolean) as typeof baseColumns;
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
    () =>
      mappedColumns.filter((col) =>
        visibleColumnKeys.includes(String(col.dataIndex || col.key))
      ),
    [mappedColumns, visibleColumnKeys]
  );

  const handleSortChange = (key: string, label: string) => {
    setSortBy(key);
    setSortLabel(label);
  };

  return (
    <>
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Items{" "}
                <span className="badge bg-primary-subtle text-primary fs-12 ms-2 rounded-pill">
                  {totalCount || rows.length}
                </span>
                <button
                  type="button"
                  onClick={() => fetchItems(currentPage, pageSize, true)}
                  disabled={refreshing}
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 shadow-xs"
                  title="Refresh items"
                >
                  <i
                    className={`icon-refresh-ccw ${
                      refreshing ? "spin-animation" : ""
                    }`}
                  />
                </button>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              {/* View Mode Toggle (Table / Grid) */}
              <div className="btn-group shadow-xs rounded" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    viewMode === "table" ? "btn-primary" : "btn-white"
                  }`}
                  onClick={() => setViewMode("table")}
                  title="Table view"
                >
                  <i className="icon-list me-1" /> Table
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    viewMode === "grid" ? "btn-primary" : "btn-white"
                  }`}
                  onClick={() => setViewMode("grid")}
                  title="Grid cards view"
                >
                  <i className="icon-grid me-1" /> Grid
                </button>
              </div>

              {/* Export dropdown */}
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center shadow-xs"
                  data-bs-toggle="dropdown"
                >
                  <i className="icon-upload me-2" />
                  Export
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm">
                  <li>
                    <button
                      type="button"
                      onClick={handleExportPDF}
                      className="dropdown-item rounded d-flex align-items-center py-2"
                    >
                      <i className="icon-file-text me-2 text-danger" />
                      Export as PDF
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleExportExcel}
                      className="dropdown-item rounded d-flex align-items-center py-2"
                    >
                      <i className="icon-table me-2 text-success" />
                      Export as Excel (CSV)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Add New Button */}
              <button
                type="button"
                className="btn btn-primary d-inline-flex align-items-center shadow-sm"
                data-bs-toggle="modal"
                data-bs-target="#add_item"
              >
                <i className="icon-circle-plus me-1" />
                Add New
              </button>
            </div>
          </div>
          {/* End Page Header */}

          {/* Card Start */}
          <div className="card mb-0 shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center flex-wrap gap-3 justify-content-between mb-4">
                {/* Search Input */}
                <div className="search-input" style={{ minWidth: 260 }}>
                  <SearchInput
                    value={searchText}
                    onChange={(val: string) => setSearchText(val)}
                  />
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {/* Filter Button */}
                  <button
                    type="button"
                    className={`btn btn-white d-inline-flex align-items-center shadow-xs ${
                      statusFilter !== "all" || categoryFilter !== "all" || vegFilter !== "all"
                        ? "border-primary text-primary"
                        : ""
                    }`}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#items-filter-offcanvas"
                    aria-controls="items-filter-offcanvas"
                  >
                    <i className="icon-funnel me-2" />
                    Filter
                    {(statusFilter !== "all" || categoryFilter !== "all" || vegFilter !== "all") && (
                      <span className="badge bg-primary rounded-pill ms-2 fs-10">
                        Active
                      </span>
                    )}
                  </button>

                  {/* Column Visibility / Reorder */}
                  {viewMode === "table" && (
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-icon btn-white shadow-xs"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        title="Manage columns"
                      >
                        <i className="icon-columns-3" />
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-md dropdown-menu-end p-3 shadow"
                        style={{ width: 260 }}
                      >
                        <h6 className="mb-3 fw-bold">Display Columns</h6>
                        {isMounted ? (
                          <DragDropContext onDragEnd={handleColumnDragEnd}>
                            <Droppable droppableId="item-column-list">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  {mappedColumns.map((col, index) => {
                                    const key = String(col.dataIndex || col.key);
                                    const checked = visibleColumnKeys.includes(key);
                                    return (
                                      <Draggable
                                        key={key}
                                        draggableId={key}
                                        index={index}
                                      >
                                        {(dragProvided) => (
                                          <div
                                            className="mb-2"
                                            ref={dragProvided.innerRef}
                                            {...dragProvided.draggableProps}
                                          >
                                            <label className="d-flex align-items-center p-1 rounded hover-bg-light cursor-pointer">
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
                                              <span className="fs-13">{col.title}</span>
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
                        ) : (
                          <div className="text-muted fs-12 py-2">Loading column settings...</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Sort By Dropdown */}
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-white d-inline-flex align-items-center shadow-xs"
                      data-bs-toggle="dropdown"
                    >
                      Sort by : {sortLabel}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2 shadow-sm">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("id_asc", "Default")}
                        >
                          Default Order
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("name_asc", "Name (A - Z)")}
                        >
                          Name: A - Z
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("name_desc", "Name (Z - A)")}
                        >
                          Name: Z - A
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("price_asc", "Price: Low - High")}
                        >
                          Price: Low - High
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("price_desc", "Price: High - Low")}
                        >
                          Price: High - Low
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("newest", "Newest First")}
                        >
                          Newest First
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Table / Grid Content */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted fs-13">Loading items from database...</p>
                </div>
              ) : rows.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted fs-14 mb-2">No items found matching your filters.</p>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setStatusFilter("all");
                      setCategoryFilter("all");
                      setVegFilter("all");
                      setSearchText("");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === "table" ? (
                <div className="table-responsive table-nowrap">
                  <DataTable
                    columns={visibleColumns}
                    dataSource={rows}
                    Selection={false}
                    searchText=""
                    serverPagination={true}
                    defaultPageSize={20}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              ) : (
                /* Grid View */
                <div>
                  <div className="row g-3">
                    {rows.map((r) => (
                      <div key={r.item_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                        <div className="card h-100 border shadow-xs">
                          <div className="card-body p-3 d-flex flex-column">
                            <div className="position-relative mb-3 overflow-hidden rounded">
                              <span className="d-block ratio ratio-16x9">
                                <ImageWithBasePath
                                  src={r.image || "assets/img/items/food-01.jpg"}
                                  alt={r.item_name}
                                  className="img-fluid object-fit-cover rounded"
                                />
                              </span>
                              <span className="position-absolute top-0 end-0 m-2">
                                <span
                                  className={`badge ${
                                    r.Status === "Active" ? "bg-success" : "bg-danger"
                                  }`}
                                >
                                  {r.Status}
                                </span>
                              </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="badge bg-light text-primary border fs-11">
                                {r.category}
                              </span>
                              <span className="d-flex align-items-center fs-12 text-muted">
                                <i
                                  className={`icon-square-dot me-1 ${
                                    r.is_vegetarian ? "text-success" : "text-danger"
                                  }`}
                                />
                                {r.is_vegetarian ? "Veg" : "Non-Veg"}
                              </span>
                            </div>
                            <h6 className="fs-14 fw-bold mb-1 text-dark text-truncate">
                              <span
                                role="button"
                                className="cursor-pointer text-dark"
                                data-bs-toggle="modal"
                                data-bs-target="#items_details"
                                onClick={() => setViewingItem(r)}
                              >
                                {r.item_name}
                              </span>
                            </h6>
                            <p className="fs-12 text-muted mb-3 font-monospace">
                              {r.item_code}
                            </p>
                            <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
                              <div>
                                <span className="badge bg-light text-muted border fs-11 mb-1 d-inline-block">
                                  {r.item_size || "Regular"}
                                </span>
                                <div className="fw-bold text-dark fs-15 font-monospace">
                                  {r.price}
                                </div>
                              </div>
                              <div className="d-flex gap-1">
                                <button
                                  type="button"
                                  className="btn btn-icon btn-sm btn-light rounded-circle"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit_item"
                                  title="Edit Item"
                                  onClick={() => setEditingItem(r)}
                                >
                                  <i className="icon-pencil-line" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-icon btn-sm btn-light rounded-circle text-danger"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete_modal"
                                  title="Delete Item"
                                  onClick={() => setPendingDelete(r)}
                                >
                                  <i className="icon-trash-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Grid Pagination */}
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top flex-wrap gap-2">
                    <div className="text-muted fs-13">
                      Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to{" "}
                      {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries
                    </div>
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
                        <button
                          type="button"
                          className="page-link"
                          disabled={currentPage <= 1}
                          onClick={() => handlePageChange(currentPage - 1, pageSize)}
                        >
                          <i className="icon-chevron-left me-1" /> Prev
                        </button>
                      </li>
                      {Array.from(
                        { length: Math.ceil(totalCount / pageSize) || 1 },
                        (_, i) => i + 1
                      ).map((p) => (
                        <li
                          key={`grid-page-${p}`}
                          className={`page-item ms-1 ${currentPage === p ? "active" : ""}`}
                        >
                          <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePageChange(p, pageSize)}
                          >
                            {p}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ms-1 ${
                          currentPage >= Math.ceil(totalCount / pageSize) || totalCount === 0
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="page-link"
                          disabled={
                            currentPage >= Math.ceil(totalCount / pageSize) || totalCount === 0
                          }
                          onClick={() => handlePageChange(currentPage + 1, pageSize)}
                        >
                          Next <i className="icon-chevron-right ms-1" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {/* Content End */}
            </div>
          </div>
          {/* Card End */}
        </div>
        {/* End Content */}
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="delete_modal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow">
            <div className="modal-body text-center p-4">
              <div className="mb-4">
                <span className="avatar avatar-xxl rounded-circle bg-danger-subtle d-inline-flex align-items-center justify-content-center">
                  <ImageWithBasePath
                    src="assets/img/icons/trash-icon.svg"
                    alt="trash"
                    className="img-fluid w-auto h-auto"
                  />
                </span>
              </div>
              <h4 className="mb-2 fw-bold">Delete Item</h4>
              <p className="mb-4 text-muted fs-14">
                {pendingDelete ? (
                  <>
                    Are you sure you want to delete <br />
                    <strong className="text-dark">{pendingDelete.item_name}</strong>?
                  </>
                ) : (
                  "Select an item to delete."
                )}
              </p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-light w-100"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  data-bs-dismiss="modal"
                  onClick={handleConfirmDelete}
                  disabled={!pendingDelete || deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Filter Offcanvas */}
      <ItemsModal
        editingItem={editingItem}
        viewingItem={viewingItem}
        categories={categories}
        onSuccess={() => fetchItems(currentPage, pageSize, true)}
        currentFilter={{
          status: statusFilter,
          category: categoryFilter,
          veg: vegFilter,
        }}
        onApplyFilter={(filter) => {
          setStatusFilter(filter.status);
          setCategoryFilter(filter.category);
          setVegFilter(filter.veg);
        }}
        onResetFilter={() => {
          setStatusFilter("all");
          setCategoryFilter("all");
          setVegFilter("all");
        }}
      />
    </>
  );
};

export default ItemsComponent;
