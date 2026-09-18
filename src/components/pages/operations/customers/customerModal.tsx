"use client";
import CommonDatePicker from "@/core/common/common-date-picker/commonDatePicker";
import CommonSelect from "@/core/common/common-select/commonSelect";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { Gender, Status_Disabled } from "@/core/data/json/selectOption";
import Link from "next/link";


const CustomerModal = () => {
    return (
        <>
            {/* Add Category */}
            <div className="modal fade" id="add_customer">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h4 className="modal-title">Add Customer</h4>
                            <button
                                type="button"
                                className="btn-close btn-close-modal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="icon-x" />
                            </button>
                        </div>
                        <form>
                            <div className="modal-body p-4 pt-1">
                                <div className="mb-3 d-flex align-items-center flex-wrap gap-3">
                                    <div className="avatar avatar-3xl border bg-light">
                                        <i className="icon-images fs-28 text-dark" />
                                    </div>
                                    <div>
                                        <label className="form-label">
                                            Customer Image<span className="text-danger"> *</span>
                                        </label>
                                        <p className="fs-13 mb-3">Image should be with in 5 MB</p>
                                        <div className="d-flex align-items-center">
                                            <div className="btn btn-icon btn-sm btn-white rounded-circle position-relative me-2">
                                                <input
                                                    type="file"
                                                    className="form-control position-absolute w-100 h-100 top-0 start-0 opacity-0"
                                                />
                                                <i className="icon-upload" />
                                            </div>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                            >
                                                <i className="icon-trash-2 text-danger" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Customer Name<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Phone<span className="text-danger"> *</span>
                                    </label>
                                    <input type="number" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email<span className="text-danger"> *</span>
                                    </label>
                                    <input type="mail" className="form-control" />
                                </div>
                                <div className="row algin-items-center justify-content-center">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Date Of Birth</label>
                                            <CommonDatePicker />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <CommonSelect
                                                options={Gender}
                                                className="select"
                                                defaultValue={Gender[0]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <CommonSelect
                                        options={Status_Disabled}
                                        className="select"
                                        defaultValue={Status_Disabled[0]}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between gap-2 pt-1">
                                    <button
                                        type="button"
                                        className="btn btn-light w-100"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Add Category End */}
            {/* Edit Category */}
            <div className="modal fade" id="edit_customer">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h4 className="modal-title">Edit Customer</h4>
                            <button
                                type="button"
                                className="btn-close btn-close-modal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="icon-x" />
                            </button>
                        </div>
                        <form>
                            <div className="modal-body p-4 pt-1">
                                <div className="mb-3 d-flex align-items-center flex-wrap gap-3">
                                    <div className="avatar avatar-3xl avatar-rounded border">
                                        <ImageWithBasePath
                                            src="assets/img/profiles/avatar-32.jpg"
                                            alt="category"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label">
                                            Customer Image<span className="text-danger"> *</span>
                                        </label>
                                        <p className="fs-13 mb-3">Image should be with in 5 MB</p>
                                        <div className="d-flex align-items-center">
                                            <div className="btn btn-icon btn-sm btn-white rounded-circle position-relative me-2">
                                                <input
                                                    type="file"
                                                    className="form-control position-absolute w-100 h-100 top-0 start-0 opacity-0"
                                                />
                                                <i className="icon-pencil-line" />
                                            </div>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Customer Name<span className="text-danger"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="Adrian James"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Phone<span className="text-danger"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="+1 56985 65895"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email<span className="text-danger"> *</span>
                                    </label>
                                    <input
                                        type="mail"
                                        className="form-control"
                                        defaultValue="adrian@example.com"
                                    />
                                </div>
                                <div className="row algin-items-center justify-content-center">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Date Of Birth</label>
                                            <CommonDatePicker />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <CommonSelect
                                                options={Gender}
                                                className="select"
                                                defaultValue={Gender[1]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <CommonSelect
                                        options={Status_Disabled}
                                        className="select"
                                        defaultValue={Status_Disabled[1]}
                                    />
                                </div>
                                <div className="d-flex align-items-center justify-content-between gap-2 pt-1">
                                    <button
                                        type="button"
                                        className="btn btn-light w-100"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Edit Category End */}
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
                                <Link
                                    href="#"
                                    className="btn btn-light w-100"
                                    data-bs-dismiss="modal"
                                >
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
            {/* Customer Details */}
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="view_details">
                <div className="offcanvas-header d-flex align-items-center justify-content-between border-bottom">
                <h4 className="offcanvas-title mb-0">Customer Details</h4>
                <button
                    type="button"
                    className="btn-close btn-close-modal"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <i className="icon-x" />
                </button>
                </div>
                <form className="d-flex flex-column overflow-y-auto h-100">
                <div className="offcanvas-body p-0">
                    <div className="border-bottom p-4">
                    <div className="mb-4 d-flex align-items-center justify-content-between gap-3">
                        <div className="d-flex align-items-center">
                        <span className="avatar avatar-xxl border me-3 flex-shrink-0">
                            <ImageWithBasePath
                            src="assets/img/profiles/avatar-09.jpg"
                            alt="customer"
                            className="img-fluid"
                            />
                        </span>
                        <div>
                            <h6 className="fs-14 fw-semibold mb-0">David Belcher</h6>
                            <p className="fs-13 mb-0">Last Login : 25 Jan 2025</p>
                        </div>
                        </div>
                        <span className="badge badge-soft-success">Active</span>
                    </div>
                    <div>
                        <div className="d-sm-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                        <span className="d-flex align-items-center">
                            <i className="icon-mail text-dark me-1" />
                            Email
                        </span>
                        <span className="text-dark">david@example.com</span>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                        <span className="d-flex align-items-center">
                            <i className="icon-phone text-dark me-1" />
                            Phone
                        </span>
                        <span className="text-dark">+1 14524 54595</span>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                        <span className="d-flex align-items-center">
                            <i className="icon-map-pin-check-inside text-dark me-1" />
                            Address
                        </span>
                        <span className="text-wrap-1 text-dark">
                            301 Market Street, Riverside Drive, FL 33128, USA
                        </span>
                        </div>
                        <div className="d-sm-flex align-items-center justify-content-between gap-2 flex-wrap">
                        <span className="d-flex align-items-center">
                            <i className="icon-user text-dark me-1" />
                            Gender
                        </span>
                        <span className="text-dark">Male</span>
                        </div>
                    </div>
                    </div>
                    <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5>Orders</h5>
                        <span className="badge bg-light text-dark fw-semibold">
                        Orders : 02
                        </span>
                    </div>
                    <div className="border p-3 rounded mb-3">
                        <div className="row align-items-center border-bottom flex-wrap g-3 pb-3 mb-3">
                        <div className="col-sm-4">
                            <h6 className="fs-14 fw-semibold mb-1">#56998</h6>
                            <span>15 Sep 2025</span>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-1">Order total</p>
                            <span className="text-dark fw-medium">$350</span>
                        </div>
                        <div className="col-sm-4 text-sm-end">
                            <span className="badge badge-soft-orange">Pending</span>
                        </div>
                        </div>
                        <div className="row g-3">
                        <div className="col-sm-4">
                            <p className="mb-1">Order Type</p>
                            <span className="text-dark fw-medium">Dine-In (T4)</span>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-1">No of Guests</p>
                            <span className="text-dark fw-medium">4</span>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-1">No of Items</p>
                            <span className="text-dark fw-medium">8</span>
                        </div>
                        </div>
                    </div>
                    <div className="border p-3 rounded">
                        <div className="row align-items-center border-bottom flex-wrap g-3 pb-3 mb-3">
                        <div className="col-sm-4">
                            <h6 className="fs-14 fw-semibold mb-1">#25654</h6>
                            <span>21 Sep 2025</span>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-1">Order total</p>
                            <span className="text-dark fw-medium">$620</span>
                        </div>
                        <div className="col-sm-4 text-sm-end">
                            <span className="badge badge-soft-success">Completed</span>
                        </div>
                        </div>
                        <div className="row g-3">
                        <div className="col-sm-4">
                            <p className="mb-1">Order Type</p>
                            <span className="text-dark fw-medium">Take Away</span>
                        </div>
                        <div className="col-sm-4">
                            <p className="mb-1">No of Guests</p>
                            <span className="text-dark fw-medium">8</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="offcanvas-footer d-flex align-items-center gap-2 pt-2 border-0">
                    <button
                    type="button"
                    className="btn btn-dark d-flex align-items-center w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#edit_customer"
                    >
                    <i className="icon-pencil-line me-1" />
                    Edit Customer
                    </button>
                </div>
                </form>
            </div>
            {/* End Customer Details */}
        </>

    );
};

export default CustomerModal;
