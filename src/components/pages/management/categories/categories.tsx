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
import CategoryModal, { CategoryItem } from "./categoryModal";
import Link from "next/link";

import type { TableData } from "@/core/data/interface";

type CategoryRow = TableData & {
  key: string;
  id: string | number;
  category_id: number;
  category: string;
  category_name?: string;
  category_code?: string;
  No_Items: string;
  items_count?: number;
  Date: string;
  Status: string;
  status?: string;
  image?: string;
  created_at?: string;
};

const CategoriesComponent = () => {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("order_asc");
  const [sortLabel, setSortLabel] = useState<string>("Default");

  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CategoryRow | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // Fetch categories from API
  const fetchCategories = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (sortBy) {
        params.append("sortBy", sortBy);
      }
      if (searchText.trim()) {
        params.append("search", searchText.trim());
      }

      const res = await fetch(`/api/categories?${params.toString()}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const mapped: CategoryRow[] = data.data.map((item: any, idx: number) => ({
          ...item,
          key: String(item.category_id || item.id || idx),
          id: item.category_id || item.id || idx,
          category_id: item.category_id,
          category: item.category_name || item.category,
          No_Items: String(item.No_Items ?? item.items_count ?? 0),
          Date: item.Date || "—",
          Status: item.status || item.Status || "Active",
          image: item.image || "category-01.png",
        }));
        setRows(mapped);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [statusFilter, sortBy, searchText]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Quick toggle Active/Expired
  const handleToggleStatus = async (record: CategoryRow) => {
    const newStatus = record.Status === "Active" ? "Expired" : "Active";
    try {
      // Optimistic update
      setRows((prev) =>
        prev.map((r) =>
          r.category_id === record.category_id
            ? { ...r, Status: newStatus, status: newStatus }
            : r
        )
      );

      await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: record.category_id,
          status: newStatus,
        }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      fetchCategories();
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!pendingDelete?.category_id) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/categories?category_id=${pendingDelete.category_id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (data.success) {
        setRows((prev) =>
          prev.filter((r) => r.category_id !== pendingDelete.category_id)
        );
        setPendingDelete(null);
      } else {
        alert(data.error || "Failed to delete category");
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete category");
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
    const headers = ["Category Name", "Category Code", "No of Items", "Date Created", "Status"];
    const csvRows = [headers.join(",")];

    rows.forEach((r) => {
      const code = r.category_code || "";
      csvRows.push(
        [
          `"${(r.category || "").replace(/"/g, '""')}"`,
          `"${code.replace(/"/g, '""')}"`,
          `"${r.No_Items || 0}"`,
          `"${r.Date || ""}"`,
          `"${r.Status || ""}"`,
        ].join(",")
      );
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Categories_${new Date().toISOString().slice(0, 10)}.csv`);
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
        title: "Category",
        dataIndex: "category",
        render: (text: string, record: CategoryRow) => {
          const imageSrc = record.image
            ? record.image.startsWith("assets/")
              ? record.image
              : `assets/img/category/${record.image}`
            : "assets/img/category/category-01.png";

          return (
            <div className="d-flex align-items-center">
              <span className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2 bg-light border">
                <ImageWithBasePath
                  src={imageSrc}
                  alt={text}
                  className="img-fluid rounded-circle"
                />
              </span>
              <div>
                <h6 className="fs-14 fw-semibold mb-0 text-dark">{text}</h6>
                {record.category_code && (
                  <span className="text-muted fs-11">{record.category_code}</span>
                )}
              </div>
            </div>
          );
        },
        sorter: (a: CategoryRow, b: CategoryRow) =>
          a.category.localeCompare(b.category),
      },
      {
        title: "No of Items",
        dataIndex: "No_Items",
        render: (val: string) => (
          <span className="fw-semibold text-secondary">{val}</span>
        ),
        sorter: (a: CategoryRow, b: CategoryRow) =>
          Number(a.No_Items || 0) - Number(b.No_Items || 0),
      },
      {
        title: "Date",
        dataIndex: "Date",
        render: (val: string) => <span className="text-muted">{val}</span>,
        sorter: (a: CategoryRow, b: CategoryRow) =>
          new Date(a.Date).getTime() - new Date(b.Date).getTime(),
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (text: string, record: CategoryRow) => {
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
              {isActive ? "Active" : "Expired"}
            </span>
          );
        },
      },
      {
        title: "Actions",
        dataIndex: "Actions",
        render: (_: any, record: CategoryRow) => (
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-icon btn-sm btn-white rounded-circle shadow-xs"
              data-bs-toggle="modal"
              data-bs-target="#edit_category"
              title="Edit Category"
              onClick={() => {
                setEditingCategory({
                  category_id: record.category_id,
                  id: record.id,
                  category: record.category,
                  category_name: record.category,
                  category_code: record.category_code,
                  No_Items: record.No_Items,
                  Date: record.Date,
                  Status: record.Status,
                  status: record.Status,
                  image: record.image,
                });
              }}
            >
              <i className="icon-pencil-line text-muted" />
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
                Categories{" "}
                <button
                  type="button"
                  onClick={() => fetchCategories(true)}
                  disabled={refreshing}
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 shadow-xs"
                  title="Refresh categories"
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
                data-bs-target="#add_category"
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
                      statusFilter !== "all" ? "border-primary text-primary" : ""
                    }`}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#filter-offcanvas"
                    aria-controls="filter-offcanvas"
                  >
                    <i className="icon-funnel me-2" />
                    Filter
                    {statusFilter !== "all" && (
                      <span className="badge bg-primary rounded-pill ms-2 fs-10">
                        {statusFilter}
                      </span>
                    )}
                  </button>

                  {/* Column Visibility / Reorder */}
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
                      <DragDropContext onDragEnd={handleColumnDragEnd}>
                        <Droppable droppableId="column-list">
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
                    </div>
                  </div>

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
                          onClick={() => handleSortChange("order_asc", "Default")}
                        >
                          Default Order
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("newest", "Newest")}
                        >
                          Newest First
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("oldest", "Oldest")}
                        >
                          Oldest First
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("name_asc", "Name (A - Z)")}
                        >
                          Category Name: A - Z
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("name_desc", "Name (Z - A)")}
                        >
                          Category Name: Z - A
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item rounded-1"
                          onClick={() => handleSortChange("items_desc", "Most Items")}
                        >
                          No of Items: High - Low
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Table Start */}
              <div className="table-responsive table-nowrap">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted fs-13">Loading categories...</p>
                  </div>
                ) : (
                  <DataTable
                    columns={visibleColumns}
                    dataSource={rows}
                    Selection={false}
                    searchText={searchText}
                  />
                )}
              </div>
              {/* Table End */}
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
              <h4 className="mb-2 fw-bold">Delete Confirmation</h4>
              <p className="mb-4 text-muted fs-14">
                {pendingDelete ? (
                  <>
                    Are you sure you want to delete <br />
                    <strong className="text-dark">{pendingDelete.category}</strong>?
                  </>
                ) : (
                  "Select a row to delete."
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

      {/* Add & Edit Modals and Filter Offcanvas */}
      <CategoryModal
        editingCategory={editingCategory}
        onSuccess={() => fetchCategories()}
        currentFilterStatus={statusFilter}
        onApplyFilter={(status) => setStatusFilter(status)}
        onResetFilter={() => setStatusFilter("all")}
      />
    </>
  );
};

export default CategoriesComponent;
