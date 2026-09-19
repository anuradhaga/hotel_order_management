"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import AddonsModal, { AddonRecord, FoodItemOption } from "./addonsModal";
import Link from "next/link";
import DataTable from "@/core/common/data-table";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { TableData } from "@/core/data/interface";

type DataRow = TableData & AddonRecord & {
  key: string;
  id?: string | number;
  Item: string;
  Addon: string;
  Price: string;
  Status: string;
};

const AddonsComponent = () => {
  const [rows, setRows] = useState<DataRow[]>([]);
  const [itemsList, setItemsList] = useState<FoodItemOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingAddon, setEditingAddon] = useState<AddonRecord | null>(null);
  const [pendingDelete, setPendingDelete] = useState<DataRow | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [searchText, setSearchText] = useState<string>("" );
  const [currentFilter, setCurrentFilter] = useState<{ itemId: string; status: string }>({
    itemId: "all",
    status: "all",
  });

  // Fetch addons from the API
  const fetchAddons = useCallback(async (filterOverride?: { itemId: string; status: string }) => {
    setLoading(true);
    try {
      const activeFilter = filterOverride || currentFilter;
      const params = new URLSearchParams();
      if (activeFilter.status && activeFilter.status !== "all") {
        params.append("status", activeFilter.status);
      }
      if (activeFilter.itemId && activeFilter.itemId !== "all") {
        params.append("item_id", activeFilter.itemId);
      }

      const res = await fetch(`/api/addons?${params.toString()}`);
      const result = await res.json();
      if (result.success) {
        const formattedRows: DataRow[] = (result.data || []).map((row: any, idx: number) => ({
          ...row,
          key: String(row.addon_id || row.id || idx),
          id: row.addon_id || row.id,
          Item: row.Item || row.item_name || "General Item",
          Addon: row.Addon || row.addon_name || "",
          Price: row.Price || `LKR ${Number(row.price || 0).toFixed(2)}`,
          Status: row.Status || (row.is_active ? "Active" : "Inactive"),
        }));
        setRows(formattedRows);

        if (result.items && Array.isArray(result.items)) {
          setItemsList(result.items);
        }
      } else {
        console.error("Failed to load addons:", result.error);
      }
    } catch (error) {
      console.error("Error fetching addons:", error);
    } finally {
      setLoading(false);
    }
  }, [currentFilter]);

  useEffect(() => {
    fetchAddons();
  }, [fetchAddons]);

  const handleApplyFilter = useCallback((filter: { itemId: string; status: string }) => {
    setCurrentFilter(filter);
    fetchAddons(filter);
  }, [fetchAddons]);

  const handleResetFilter = useCallback(() => {
    const defaultFilter = { itemId: "all", status: "all" };
    setCurrentFilter(defaultFilter);
    fetchAddons(defaultFilter);
  }, [fetchAddons]);

  const handleConfirmDelete = useCallback(async () => {
    if (!pendingDelete?.addon_id && !pendingDelete?.id) return;
    const targetId = pendingDelete.addon_id || pendingDelete.id;
    setDeleting(true);
    try {
      const res = await fetch(`/api/addons?addon_id=${targetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setPendingDelete(null);
        await fetchAddons();
      } else {
        alert(data.error || "Failed to delete addon.");
      }
    } catch (err) {
      console.error("Failed to delete addon:", err);
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete, fetchAddons]);

  const baseColumns = useMemo(
    () => [
      {
        title: "Item",
        dataIndex: "Item",
        sorter: (a: DataRow, b: DataRow) => (a.Item || "").localeCompare(b.Item || ""),
        render: (text: string, record: DataRow) => (
          <div className="d-flex align-items-center">
            <div className="avatar avatar-md bg-light rounded me-2 flex-shrink-0">
              <ImageWithBasePath
                src={record.item_image || "assets/img/items/default-food.svg"}
                alt={text}
                className="img-fluid rounded"
              />
            </div>
            <div>
              <h6 className="fs-14 fw-medium mb-0">{text}</h6>
              {record.item_code && (
                <span className="badge bg-light text-muted fs-11 mt-1 border">
                  {record.item_code}
                </span>
              )}
            </div>
          </div>
        ),
      },
      {
        title: "Addon",
        dataIndex: "Addon",
        sorter: (a: DataRow, b: DataRow) => (a.Addon || "").localeCompare(b.Addon || ""),
        render: (text: string, record: DataRow) => (
          <div className="d-flex align-items-center">
            {record.image_url && (
              <div className="avatar avatar-sm bg-light rounded me-2 flex-shrink-0">
                <ImageWithBasePath
                  src={record.image_url}
                  alt={text}
                  className="img-fluid rounded"
                />
              </div>
            )}
            <div>
              <span className="fw-semibold text-dark">{text}</span>
              {record.description && (
                <p className="fs-12 text-muted mb-0 text-truncate" style={{ maxWidth: "240px" }}>
                  {record.description}
                </p>
              )}
            </div>
          </div>
        ),
      },
      {
        title: "Price",
        dataIndex: "Price",
        sorter: (a: DataRow, b: DataRow) =>
          (Number(a.price_raw || a.price) || 0) - (Number(b.price_raw || b.price) || 0),
        render: (text: string, record: DataRow) => (
          <span className="fw-semibold text-dark">
            {text || `LKR ${Number(record.price || 0).toFixed(2)}`}
          </span>
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
              data-bs-target="#edit_modifier"
              onClick={() => setEditingAddon(record)}
              title="Edit Addon"
            >
              <i className="icon-pencil-line" />
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              onClick={() => setPendingDelete(record)}
              title="Delete Addon"
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
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    columnOrder
  );

  const handleToggleColumn = useCallback((key: string) => {
    setVisibleColumnKeys((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  }, []);

  const handleColumnDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      setColumnOrder((prev) => {
        const next = [...prev];
        const [moved] = next.splice(result.source.index, 1);
        next.splice(result.destination!.index, 0, moved);
        return next;
      });
    },
    []
  );

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
      return copy.sort((a, b) => Number(b.addon_id || 0) - Number(a.addon_id || 0));
    }
    if (sortBy === "Oldest") {
      return copy.sort((a, b) => Number(a.addon_id || 0) - Number(b.addon_id || 0));
    }
    if (sortBy === "Ascending") {
      return copy.sort((a, b) => (a.Addon || "").localeCompare(b.Addon || ""));
    }
    if (sortBy === "Descending") {
      return copy.sort((a, b) => (b.Addon || "").localeCompare(a.Addon || ""));
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
                Addons{" "}
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                  onClick={() => fetchAddons()}
                  title="Refresh Addons"
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
                data-bs-target="#add_modifier"
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
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {/* Filter trigger */}
                  <Link
                    href="#"
                    className="btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#filter-offcanvas"
                    aria-controls="filter-offcanvas"
                  >
                    <i className="icon-funnel me-2" />
                    Filter
                    {(currentFilter.itemId !== "all" || currentFilter.status !== "all") && (
                      <span className="badge bg-primary ms-1">1</span>
                    )}
                  </Link>

                  {/* Column reorder / toggle */}
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

                  {/* Sort dropdown */}
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
                            className={`dropdown-item rounded-1 ${sortBy === opt ? "active" : ""}`}
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

              {/* Table */}
              <div className="table-responsive table-nowrap">
                <DataTable
                  columns={visibleColumns}
                  dataSource={sortedRows}
                  Selection={false}
                  searchText={searchText}
                />
              </div>
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
                    Are you sure you want to delete addon{" "}
                    <strong>&ldquo;{pendingDelete.Addon}&rdquo;</strong>
                    {pendingDelete.Item && <> for <strong>{pendingDelete.Item}</strong></>}?
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

      {/* Addons Modal (Add, Edit, and Filter) */}
      <AddonsModal
        items={itemsList}
        editingAddon={editingAddon}
        onSuccess={() => fetchAddons()}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
      />
    </>
  );
};

export default AddonsComponent;
