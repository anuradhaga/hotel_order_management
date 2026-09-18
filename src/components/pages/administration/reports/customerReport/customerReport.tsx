import { useCallback, useMemo, useState } from "react";
import type { TableData } from "@/core/data/interface";

import { CustomerReportData } from "@/core/data/json/customerReportData";

import Link from "next/link";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Reportstab from "../reportstab";
import CommonDatePicker from "@/core/common/common-date-picker/commonDatePicker";
import SearchInput from "@/core/common/data-table/dataTableSearch";
import DataTable from "@/core/common/data-table";
type DataRow = TableData & {
    key: string;
    id?: string;
    Customer_ID: string;
    customer: string;
    total_orders: string;
    total: string;
};

const CustomerReportComponent = () => {

    const [rows, _setRows] = useState<DataRow[]>(
        () =>
            (CustomerReportData as TableData[] | any).map((row: any, idx: any) => ({
                ...row,
                key: `${(row as { key?: string }).key ||
                    (row as { id?: string }).id ||
                    row.salesId ||
                    idx
                    }`,
            })) as DataRow[]
    );
    const baseColumns = useMemo(
        () => [
            {
                title: "Customer ID",
                dataIndex: "Customer_ID",

            },
            {
                title: "Customer",
                dataIndex: "customer",
                render: (text: string, record: any) => (
                    <div className="d-flex align-items-center">
                        <Link
                            href="#"
                            className="avatar avatar-sm avatar-rounded flex-shrink-0 me-2"
                        >
                            <ImageWithBasePath
                                src={`assets/img/profiles/${record.image}`}
                                alt="category"
                                className="img-fluid"
                            />
                        </Link>
                        <h6 className="fs-14 fw-normal mb-0">
                            <Link href="#">{text}</Link>
                        </h6>
                    </div>
                ),
            },
            {
                title: "Total Orders",
                dataIndex: "total_orders",
            },
            {
                title: "Grand Total",
                dataIndex: "total",
            },
        ],
        []
    );
    const [columnOrder, _setColumnOrder] = useState<string[]>(() =>
        baseColumns.map((c) => String(c.dataIndex || c.title))
    );
    const [visibleColumnKeys, _setVisibleColumnKeys] = useState<string[]>(
        columnOrder
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
            {/* ========================
			Start Page Content
		    ========================= */}
            {/* Start Content */}
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Header */}
                    <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
                        <div className="flex-grow-1">
                            <h3 className="mb-0">
                                Reports{" "}
                                <Link
                                    href="#"
                                    className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                                >
                                    <i className="icon-refresh-ccw" />
                                </Link>
                            </h3>
                        </div>
                        <div className="gap-3 d-flex align-items-center flex-wrap">
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
                        </div>
                    </div>
                    {/* End Page Header */}

                    {/* Tabs */}
                    <Reportstab />
                    {/* Tabs */}

                    {/* start row */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="border-bottom order-report-filter-wrap">
                                        <div className="report-filter">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Start Date<span className="text-danger ms-1">*</span>
                                                </label>
                                                <CommonDatePicker />
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="report-filter">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    End Date<span className="text-danger ms-1">*</span>
                                                </label>
                                                <CommonDatePicker />
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="report-filter">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Customer<span className="text-danger ms-1">*</span>
                                                </label>
                                                <div className="dropdown">
                                                    <Link
                                                        href="#"
                                                        className="dropdown-toggle btn btn-white d-flex align-items-center justify-content-between"
                                                        data-bs-toggle="dropdown"
                                                        data-bs-auto-close="outside"
                                                    >
                                                        Select
                                                    </Link>
                                                    <div className="dropdown-menu dropdown-menu-end p-3 w-100">
                                                        <h6 className="fs-14 fw-semibold mb-3">Customer</h6>
                                                        <div className="input-icon-end input-icon position-relative mb-3">
                                                            <span className="input-icon-addon">
                                                                <i className="icon-search text-dark" />
                                                            </span>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-md"
                                                                placeholder="Search"
                                                            />
                                                        </div>
                                                        <div className="vstack gap-2">
                                                            <div>
                                                                <label className="d-flex align-items-center">
                                                                    <input className="form-check-input m-0 me-2" type="checkbox" />
                                                                    Walk-in Customer
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <label className="d-flex align-items-center">
                                                                    <input className="form-check-input m-0 me-2" type="checkbox" />
                                                                    Sue Allen
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <label className="d-flex align-items-center">
                                                                    <input className="form-check-input m-0 me-2" type="checkbox" />
                                                                    Frank Barrett
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <label className="d-flex align-items-center">
                                                                    <input className="form-check-input m-0 me-2" type="checkbox" />
                                                                    Kelley Davis
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <label className="d-flex align-items-center">
                                                                    <input className="form-check-input m-0 me-2" type="checkbox" />
                                                                    Jim Vickers
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="report-filter">
                                            <div className="mb-3">
                                                <Link href="#" className="btn btn-primary d-inline-flex align-items-center">
                                                    Submit
                                                </Link>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                    </div>


                                    <div className="table-search d-flex align-items-center justify-content-between">
                                        <div className="search-input">
                                            <SearchInput value={searchText} onChange={handleSearch} />
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
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <DataTable
                                            columns={visibleColumns}
                                            dataSource={rows}
                                            Selection={false}
                                            searchText={searchText}
                                        />
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
            {/* End Content */}
            {/* ========================
			End Page Content
		    ========================= */}
        </>

    )
}

export default CustomerReportComponent