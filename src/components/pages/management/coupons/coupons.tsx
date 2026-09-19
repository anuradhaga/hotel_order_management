"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import CouponsModal, { CouponRecord, CategoryOption } from "./couponsModal";
import { TableData } from "@/core/data/interface";
import Link from "next/link";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import DataTable from "@/core/common/data-table";
import ImageWithBasePath from "@/core/common/image-with-base-path";

type DataRow = TableData & CouponRecord & {
  key: string;
  id?: string | number;
  Coupon_Code: string;
  Valid_Category: string;
  Discount_Type: string;
  Discount_Amount: string;
  Duration: string;
  Status: string;
  Actions?: string;
};

const CouponsComponent = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewingCoupon, setViewingCoupon] = useState<CouponRecord | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<CouponRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<DataRow | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [searchText, setSearchText] = useState<string>("");
  const [currentFilter, setCurrentFilter] = useState<{
    categoryId: string;
    discountType: string;
    status: string;
  }>({
    categoryId: "all",
    discountType: "all",
    status: "all",
  });

  // Fetch coupons from API
  const fetchCoupons = useCallback(
    async (filterOverride?: { categoryId: string; discountType: string; status: string }) => {
      setLoading(true);
      try {
        const activeFilter = filterOverride || currentFilter;
        const params = new URLSearchParams();
        if (activeFilter.status && activeFilter.status !== "all") {
          params.append("status", activeFilter.status);
        }
        if (activeFilter.categoryId && activeFilter.categoryId !== "all") {
          params.append("category_id", activeFilter.categoryId);
        }
        if (activeFilter.discountType && activeFilter.discountType !== "all") {
          params.append("discount_type", activeFilter.discountType);
        }

        const res = await fetch(`/api/coupons?${params.toString()}`);
        const result = await res.json();
        if (result.success) {
          const formattedRows: DataRow[] = (result.data || []).map((row: any, idx: number) => ({
            ...row,
            key: String(row.coupon_id || row.id || idx),
            id: row.coupon_id || row.id,
            Coupon_Code: row.Coupon_Code || row.coupon_code || "",
            Valid_Category: row.Valid_Category || row.category_name || "All Categories",
            Discount_Type: row.Discount_Type || row.discount_type || "Percentage",
            Discount_Amount: row.Discount_Amount || String(row.discount_amount || ""),
            Duration:
              row.Duration ||
              `${row.start_date || ""} - ${row.end_date || ""}`,
            Status: row.Status || (row.is_active ? "Active" : "Expired"),
          }));
          setRows(formattedRows);

          if (result.categories && Array.isArray(result.categories)) {
            setCategories(result.categories);
          }
        } else {
          console.error("Failed to load coupons:", result.error);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    },
    [currentFilter]
  );

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleApplyFilter = useCallback(
    (filter: { categoryId: string; discountType: string; status: string }) => {
      setCurrentFilter(filter);
      fetchCoupons(filter);
    },
    [fetchCoupons]
  );

  const handleResetFilter = useCallback(() => {
    const defaultFilter = { categoryId: "all", discountType: "all", status: "all" };
    setCurrentFilter(defaultFilter);
    fetchCoupons(defaultFilter);
  }, [fetchCoupons]);

  const handleConfirmDelete = useCallback(async () => {
    if (!pendingDelete?.coupon_id && !pendingDelete?.id) return;
    const targetId = pendingDelete.coupon_id || pendingDelete.id;
    setDeleting(true);
    try {
      const res = await fetch(`/api/coupons?coupon_id=${targetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPendingDelete(null);
        await fetchCoupons();
      } else {
        alert(data.error || "Failed to delete coupon.");
      }
    } catch (err) {
      console.error("Failed to delete coupon:", err);
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete, fetchCoupons]);

  const baseColumns = useMemo(
    () => [
      {
        title: "Coupon Code",
        dataIndex: "Coupon_Code",
        sorter: (a: DataRow, b: DataRow) =>
          a.Coupon_Code.localeCompare(b.Coupon_Code),
        render: (text: string, record: DataRow) => (
          <div className="d-flex align-items-center">
            <span
              role="button"
              className="fw-bold font-monospace text-primary cursor-pointer text-decoration-underline"
              data-bs-toggle="modal"
              data-bs-target="#show_coupon"
              onClick={() => setViewingCoupon(record)}
              title="Click to view details"
            >
              {text}
            </span>
          </div>
        ),
      },
      {
        title: "Valid Category",
        dataIndex: "Valid_Category",
        sorter: (a: DataRow, b: DataRow) =>
          (a.Valid_Category || "").localeCompare(b.Valid_Category || ""),
        render: (text: string) => (
          <span className="badge bg-light text-dark border fs-12">
            {text || "All Categories"}
          </span>
        ),
      },
      {
        title: "Discount Type",
        dataIndex: "Discount_Type",
        sorter: (a: DataRow, b: DataRow) =>
          a.Discount_Type.localeCompare(b.Discount_Type),
        render: (text: string) => (
          <span
            className={`badge ${
              text === "Percentage"
                ? "badge-soft-primary"
                : "badge-soft-warning"
            }`}
          >
            {text}
          </span>
        ),
      },
      {
        title: "Discount Amount",
        dataIndex: "Discount_Amount",
        sorter: (a: DataRow, b: DataRow) =>
          Number(a.discount_amount_raw || 0) - Number(b.discount_amount_raw || 0),
        render: (text: string) => (
          <span className="fw-bold text-dark font-monospace fs-14">
            {text}
          </span>
        ),
      },
      {
        title: "Duration",
        dataIndex: "Duration",
        sorter: (a: DataRow, b: DataRow) =>
          (a.start_date || "").localeCompare(b.start_date || ""),
        render: (text: string) => (
          <span className="text-muted fs-13">{text}</span>
        ),
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (text: string) => (
          <span
            className={`badge ${
              text === "Active" ? "badge-soft-success" : "badge-soft-danger"
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
          <>
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle me-2"
              data-bs-toggle="modal"
              data-bs-target="#show_coupon"
              onClick={() => setViewingCoupon(record)}
              title="View Coupon"
            >
              <i className="icon-eye" />
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle me-2"
              data-bs-toggle="modal"
              data-bs-target="#edit_coupon"
              onClick={() => setEditingCoupon(record)}
              title="Edit Coupon"
            >
              <i className="icon-pencil-line" />
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              onClick={() => setPendingDelete(record)}
              title="Delete Coupon"
            >
              <i className="icon-trash-2 text-danger" />
            </Link>
          </>
        ),
      },
    ],
    []
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    baseColumns.map((c) => String(c.dataIndex || c.title))
  );
  const [visibleColumnKeys, setVisibleColumnKeys] =
    useState<string[]>(columnOrder);

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

  const columns = orderedColumns;

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const mappedColumns = useMemo(
    () =>
      columns.map((col: any, idx: number) => ({
        ...col,
        ID: idx.toString(),
        key: (col as any).dataIndex || idx.toString(),
      })),
    [columns]
  );

  const visibleColumns = useMemo(
    () =>
      mappedColumns.filter((col) =>
        visibleColumnKeys.includes(String(col.dataIndex || col.key))
      ),
    [mappedColumns, visibleColumnKeys]
  );

  // Sorted rows based on dropdown sort selection
  const sortedRows = useMemo(() => {
    const copy = [...rows];
    if (sortBy === "Newest") {
      return copy.sort(
        (a, b) => Number(b.coupon_id || 0) - Number(a.coupon_id || 0)
      );
    }
    if (sortBy === "Oldest") {
      return copy.sort(
        (a, b) => Number(a.coupon_id || 0) - Number(b.coupon_id || 0)
      );
    }
    if (sortBy === "Ascending") {
      return copy.sort((a, b) => a.Coupon_Code.localeCompare(b.Coupon_Code));
    }
    if (sortBy === "Descending") {
      return copy.sort((a, b) => b.Coupon_Code.localeCompare(a.Coupon_Code));
    }
    return copy;
  }, [rows, sortBy]);

  return (
    <>
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0">
                Coupons{" "}
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                  onClick={() => fetchCoupons()}
                  title="Refresh Coupons"
                  disabled={loading}
                >
                  <i className={`icon-refresh-ccw ${loading ? "spin text-primary" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="icon-upload me-2" />
                  Export
                </Link>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <Link href="#" className="dropdown-item rounded">
                      Export as PDF
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item rounded">
                      Export as Excel
                    </Link>
                  </li>
                </ul>
              </div>
              <Link
                href="#"
                className="btn btn-primary d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_coupon"
              >
                <i className="icon-circle-plus me-1"></i>Add New
              </Link>
            </div>
          </div>
          {/* End Page Header */}

          {/* card start */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="d-flex align-items-center flex-wrap gap-3 justify-content-between mb-4">
                <div className="search-input">
                  <SearchInput value={searchText} onChange={handleSearch} />
                </div>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  {/* filter */}
                  <Link
                    href="#"
                    className="btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#filter-offcanvas"
                    aria-controls="filter-offcanvas"
                  >
                    <i className="icon-funnel me-2" />
                    Filter
                    {(currentFilter.categoryId !== "all" ||
                      currentFilter.discountType !== "all" ||
                      currentFilter.status !== "all") && (
                      <span className="badge bg-primary ms-1">1</span>
                    )}
                  </Link>

                  {/* column */}
                  <div className="dropdown">
                    <Link
                      href="#"
                      className="btn btn-icon btn-white"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                    >
                      <i className="icon-columns-3" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-md dropdown-menu-end p-3">
                      <h5 className="mb-3">Columns</h5>
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
                                        className="mb-3"
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                      >
                                        <label className="d-flex align-items-center">
                                          <span
                                            className="me-2 d-flex align-items-center text-muted cursor-grab"
                                            {...dragProvided.dragHandleProps}
                                            aria-label={`Drag to reorder ${col.title}`}
                                          >
                                            <i className="icon-grip-vertical" />
                                          </span>
                                          <input
                                            className="form-check-input m-0 me-2"
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() =>
                                              handleToggleColumn(key)
                                            }
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

                  {/* sort by */}
                  <div className="dropdown">
                    <button
                      type="button"
                      className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      Sort by : {sortBy}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      {["Newest", "Oldest", "Ascending", "Descending"].map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            className={`dropdown-item rounded-1 ${
                              sortBy === opt ? "active" : ""
                            }`}
                            onClick={() => setSortBy(opt)}
                          >
                            {opt}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* table start */}
              <div className="table-responsive table-nowrap">
                <DataTable
                  columns={visibleColumns}
                  dataSource={sortedRows}
                  Selection={false}
                  searchText={searchText}
                />
              </div>
              {/* table end */}
            </div>
          </div>
          {/* card end */}
        </div>
        {/* End Content */}
      </div>

      {/* Delete Confirmation Modal */}
      <div className="modal fade" id="delete_modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="mb-4">
                <span className="avatar avatar-xxl rounded-circle bg-danger-subtle">
                  <ImageWithBasePath
                    src="assets/img/icons/trash-icon.svg"
                    alt="trash"
                    className="img-fluid w-auto h-auto"
                  />
                </span>
              </div>
              <h4 className="mb-1">Delete Confirmation</h4>
              <p className="mb-4">
                {pendingDelete ? (
                  <>
                    Are you sure you want to delete coupon{" "}
                    <strong>&ldquo;{pendingDelete.Coupon_Code}&rdquo;</strong>?
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
                  Close
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

      {/* Coupons Modals (Show, Add, Edit, Filter) */}
      <CouponsModal
        categories={categories}
        viewingCoupon={viewingCoupon}
        editingCoupon={editingCoupon}
        onSuccess={() => fetchCoupons()}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
    </>
  );
};

export default CouponsComponent;
