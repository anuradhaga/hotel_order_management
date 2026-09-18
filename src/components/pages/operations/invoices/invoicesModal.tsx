"use client";
import PredefinedDatePicker from "@/core/common/common-date-range-picker/PredefinedDatePicker"
import CommonSelect from "@/core/common/common-select/commonSelect"
import ImageWithBasePath from "@/core/common/image-with-base-path"
import { Status_Paid } from "@/core/data/json/selectOption"
import Link from "next/link"


const InvoicesModal = () => {

    return (
        <>
            {/* View Invoices */}
            <div className="modal fade" id="view_invoices">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h5 className="modal-title">Invoice</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-modal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="icon-x" />
                            </button>
                        </div>
                        <div className="modal-body p-4 pt-1">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <div className="row justify-content-between align-items-center border-bottom pb-4">
                                            <div className="col-md-6">
                                                <h6 className="mb-2">#INV5465</h6>
                                                <h6>DreamsPOS</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-2 invoice-logo text-end">
                                                    <ImageWithBasePath
                                                        src="assets/img/logo.svg"
                                                        width={130}
                                                        className="img-fluid logo"
                                                        alt="logo"
                                                    />
                                                    <ImageWithBasePath
                                                        src="assets/img/logo-white.svg"
                                                        width={130}
                                                        className="img-fluid logo-white d-none"
                                                        alt="logo"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="row justify-content-between align-items-center border-bottom pb-4">
                                            <div className="col-md-4">
                                                <h6 className="mb-2">Invoice From</h6>
                                                <p className="text-dark fw-semibold mb-2">DreamsPOS</p>
                                                <p className="mb-2">
                                                    15 Hodges Mews, High Wycombe HP12 3JL,United Kingdom
                                                </p>
                                                <p className="mb-0">Phone : +1 45659 96566</p>
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="mb-2">Bill To&nbsp;</h6>
                                                <p className="text-dark fw-semibold mb-2">
                                                    Andrew Fletcher
                                                </p>
                                                <p className="mb-2">
                                                    1147 Rohan Drive Suite,Burlington, VT / 8202115 United
                                                    Kingdom
                                                </p>
                                                <p className="mb-0">Phone : +1 45659 96566</p>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <ImageWithBasePath
                                                        src="assets/img/invoices/paid-invoices.svg"
                                                        alt="paid-invoices-img"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h6 className="mb-3">Items Details</h6>
                                        <div className="table-responsive table-nowrap">
                                            <table className="table mb-0 border ">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Item Details</th>
                                                        <th>Quantity</th>
                                                        <th>Rate</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Grilled Salmon Steak</td>
                                                        <td>2</td>
                                                        <td>$200.00</td>
                                                        <td>$396.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Crispy Bacon Bits</td>
                                                        <td>1</td>
                                                        <td>$350.00</td>
                                                        <td>$365.75</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Side Fries</td>
                                                        <td>1</td>
                                                        <td>$399.00</td>
                                                        <td>$398.90</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>Lemon Wedge</td>
                                                        <td>4</td>
                                                        <td>$100.00</td>
                                                        <td>$396.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="row justify-content-center align-items-center pb-4 border-bottom">
                                            <div className="col-md-6">
                                                <h6 className="mb-2">Terms and Conditions</h6>
                                                <div className="mb-4">
                                                    <p className="mb-0">
                                                        1. Goods once sold cannot be taken back or exchanged.
                                                    </p>
                                                    <p className="mb-0">
                                                        2. We are not the manufacturers the company provides
                                                        warranty
                                                    </p>
                                                </div>
                                                <div className="px-3 py-2 bg-light">
                                                    <p className="mb-0">
                                                        Note : Please ensure payment is made within 7 days of
                                                        invoice date.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <div className="row align-items-center pb-3 border-bottom">
                                                        <div className="col-md-6">
                                                            <p className="text-dark fw-semibold mb-3">Amount</p>
                                                            <p className="text-dark fw-semibold mb-3">
                                                                CGST (9%)
                                                            </p>
                                                            <p className="text-dark fw-semibold mb-3">
                                                                SGST (9%)
                                                            </p>
                                                            <p className="text-dark fw-semibold mb-3">
                                                                Discount (25%)
                                                            </p>
                                                        </div>
                                                        <div className="col-md-6 text-end">
                                                            <p className="text-dark fw-semibold mb-3">
                                                                $1,793.12
                                                            </p>
                                                            <p className="text-dark fw-semibold mb-3">$18</p>
                                                            <p className="text-dark fw-semibold mb-3">$18</p>
                                                            <p className="text-danger fw-semibold">- $18</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between algin-item-center">
                                                    <h6>Total ($)</h6>
                                                    <h6>$1,972.43</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-0">Authorized Sign</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center algin-item-center">
                                <div className="d-flex justify-content-center algin-item-center gap-3">
                                    <button
                                        type="button"
                                        className="btn btn-white d-flex align-items-center"
                                    >
                                        <i className="icon-download me-1" />
                                        Download PDF
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-white d-flex align-items-center"
                                    >
                                        <i className="icon-printer me-1" />
                                        Print Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* View Invoices End */}
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
                            <p className="mb-4">Are you sure you want to delete?</p>
                            <div className="d-flex justify-content-center gap-2">
                                <Link href="#" className="btn btn-light w-100" data-bs-dismiss="modal">
                                    Close
                                </Link>
                                <Link href="#" className="btn btn-danger w-100">
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Modal  */}
            {/* Start Filter */}
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="filter-offcanvas">
                <div className="offcanvas-header pb-0">
                    <div className="border-bottom d-flex align-items-center justify-content-between w-100 pb-3">
                        <h4 className="offcanvas-title mb-0">Filter</h4>
                        <button
                            type="button"
                            className="btn-close btn-close-modal"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        >
                            <i className="icon-x" />
                        </button>
                    </div>
                </div>
                <div className="offcanvas-body d-flex flex-column pt-3">
                    <div>
                        <div className="mb-3">
                            <label className="form-label">
                                Customer<span className="text-danger"> *</span>
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
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Adrian James
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Sue Allen
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Frank Barrett
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Kelley Davis
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Jim Vickers
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Order Type<span className="text-danger"> *</span>
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
                                    <h6 className="fs-14 fw-semibold mb-3">Order Type</h6>
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
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Dine In
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Take Away
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Delivery
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Date Range<span className="text-danger"> *</span>
                            </label>
                            <PredefinedDatePicker />
                        </div>
                    </div>
                    <div className="mb-0">
                        <label className="form-label">
                            Status<span className="text-danger"> *</span>
                        </label>
                        <CommonSelect
                            options={Status_Paid}
                            className="select"
                            defaultValue={Status_Paid[0]}
                        />
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mt-auto offcanvas-footer border-0">
                    <Link href="#" className="btn btn-light w-100">
                        Reset
                    </Link>
                    <Link href="#" className="btn btn-primary w-100">
                        Apply
                    </Link>
                </div>
            </div>
            {/* End Filter */}
        </>

    )
}

export default InvoicesModal