"use client";
import { useCallback, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import AddonsModal from "./addonsModal";
import Link from "next/link";
import DataTable from "@/core/common/data-table";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { TableData } from "@/core/data/interface";
import { AddonsData } from "@/core/data/json/addonsData";

type DataRow = TableData & {
  key: string;
  id?: string;
  Item: string;
  Addon: string;
  Price: string;
  Status: string;
  image?: string;
  Actions?: string;
};

const AddonsComponent = () => {
  const [rows, setRows] = useState<DataRow[]>(
    () =>
      (AddonsData as TableData[]).map((row, idx) => ({
        ...row,
        key: `${(row as { key?: string }).key ||
          (row as { id?: string }).id ||
          row.Invoice_ID ||
          idx
          }`,
      })) as DataRow[]
  );
  const [pendingDelete, setPendingDelete] = useState<DataRow | null>(null);
  const baseColumns = useMemo(
    () => [
      {
        title: "Item",
        dataIndex: "Item",
        sorter: (a: DataRow, b: DataRow) => a.Item.length - b.Item.length,
      },
      {
        title: "Addon",
        dataIndex: "Addon",
        sorter: (a: DataRow, b: DataRow) => a.Addon.length - b.Addon.length,
      },
      {
        title: "Price",
        dataIndex: "Price",
        sorter: (a: DataRow, b: DataRow) => a.Price.length - b.Price.length,
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (text: string) => (
          <span
            className={`badge ${text === "Active" ? "badge-soft-success" : "badge-soft-danger"
              } `}
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
            >
              <i className="icon-pencil-line" />
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              onClick={() =>
                setPendingDelete({
                  ...record,
                  key: record.key || record.Item || record.id || "",
                })
              }
            >
              <i className="icon-trash-2" />
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

  const handleConfirmDelete = useCallback(() => {
    if (!pendingDelete?.key) return;
    setRows((prev) => prev.filter((row) => row.key !== pendingDelete.key));
    setPendingDelete(null);
  }, [pendingDelete]);
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

  const [searchText, setSearchText] = useState<string>("");

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
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
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
              <Link href="#" className="btn btn-primary d-inline-flex align-items-center" data-bs-toggle="modal" data-bs-target="#add_modifier"><i className="icon-circle-plus me-1"></i>Add New</Link>

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
                      <h5 className="mb-3">Column</h5>
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
                                            className="me-2 d-flex align-items-center text-muted"
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
                  {/* sort by */}
                  <div className="dropdown">
                    <Link
                      href="#"
                      className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      Sort by : Newest
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Newest
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Oldest
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Ascending
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="dropdown-item rounded-1">
                          Descending
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* table start */}
              <div className="table-responsive table-nowrap">
                <DataTable
                  columns={visibleColumns}
                  dataSource={rows}
                  Selection={false}
                  searchText={searchText}
                />
              </div>
              {/* table end */}
            </div>
          </div>
          {/* card start */}
        </div>
        {/* End Content */}
      </div>

      {/* Start Modal  */}
      <div className="modal fade" id="delete_modal">
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
                {pendingDelete
                  ? <>Are you sure you want to delete <br /> {pendingDelete.Item}?</>
                  : "Select a row to delete."}
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Link
                  href="#"
                  className="btn btn-light w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </Link>
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  data-bs-dismiss="modal"
                  onClick={handleConfirmDelete}
                  disabled={!pendingDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal  */}
      <AddonsModal />
    </>
  );
};

export default AddonsComponent;
