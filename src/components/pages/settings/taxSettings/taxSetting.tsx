"use client";

import DataTable from "@/core/common/data-table";
import { useCallback, useMemo, useState } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import type { TableData } from "@/core/data/interface";
import { TaxSettingsData } from "@/core/data/json/taxSettingsData";
import TaxSettingsModal from "./taxSettingsModal";
import Link from "next/link";

type DataRow = TableData & {
  key: string;
  id?: string;
  Tax_Name: string;
  Number: string;
  Rate: string;
  Type: string;
  Actions?: string;
};
const TaxSettingsComponent = () => {
  const [rows, setRows] = useState<DataRow[]>(
    () =>
      (TaxSettingsData as TableData[]).map((row, idx) => ({
        ...row,
        key: `${
          (row as { key?: string }).key ||
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
        title: "#",
        dataIndex: "Number",
      },
      {
        title: "Tax Name",
        dataIndex: "Tax_Name",
      },
      {
        title: "Rate",
        dataIndex: "Rate",
      },
      {
        title: "Type",
        dataIndex: "Type",
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
              data-bs-target="#edit_tax"
            >
              <i className="icon-pencil-line" />
            </Link>
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white text-danger rounded-circle"
              data-bs-toggle="modal"
              data-bs-target="#delete_modal"
              onClick={() =>
                setPendingDelete({
                  ...record,
                  key: record.key || record.Tax_Name || record.id || "",
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
  const [columnOrder, _setColumnOrder] = useState<string[]>(() =>
    baseColumns.map((c) => String(c.dataIndex || c.title))
  );
  const [visibleColumnKeys, _setVisibleColumnKeys] =
    useState<string[]>(columnOrder);

  const handleConfirmDelete = useCallback(() => {
    if (!pendingDelete?.key) return;
    setRows((prev) => prev.filter((row) => row.key !== pendingDelete.key));
    setPendingDelete(null);
  }, [pendingDelete]);

  const orderedColumns = useMemo(() => {
    const columnMap = new Map(
      baseColumns.map((col) => [String(col.dataIndex || col.title), col])
    );
    return columnOrder
      .map((key) => columnMap.get(key))
      .filter(Boolean) as typeof baseColumns;
  }, [baseColumns, columnOrder]);

  const columns = orderedColumns;

  const [searchText, _setSearchText] = useState<string>("");

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
                Tax Settings{" "}
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
              </h3>
            </div>
            <div className="gap-3 d-flex align-items-center flex-wrap">
              <Link
                href="#"
                className="btn btn-primary d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_tax"
              >
                <i className="icon-circle-plus me-1"></i>Add New
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* card start */}
          <div className="card mb-0">
            <div className="card-body">
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
                {pendingDelete ? (
                  <>
                    Are you sure you want to delete <br />{" "}
                    {pendingDelete.Tax_Name}?
                  </>
                ) : (
                  "Select a row to delete."
                )}
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
      <TaxSettingsModal />
    </>
  );
};

export default TaxSettingsComponent;
