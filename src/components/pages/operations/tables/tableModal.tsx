"use client";
import CommonSelect from "@/core/common/common-select/commonSelect";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { Table_Floor, Table_Size, Table_Status } from "@/core/data/json/selectOption";
import Link from "next/link";


const TableModal = () => {
    return (
        <>
            {/* Add Category */}
            <div className="modal fade" id="add_table">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h4 className="modal-title">Add Table</h4>
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
                                <div className="mb-3">
                                    <label className="form-label">
                                        Table Name<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Floor<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Table_Floor}
                                        className="select"
                                        defaultValue={Table_Floor[0]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Table Size<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Table_Size}
                                        className="select"
                                        defaultValue={Table_Size[0]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        No of Guests<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Status<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Table_Status}
                                        className="select"
                                        defaultValue={Table_Status[0]}
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
            <div className="modal fade" id="edit_table">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h4 className="modal-title">Edit Table</h4>
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
                                <div className="mb-3">
                                    <label className="form-label">
                                        Table Name<span className="text-danger"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="Table 1"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Floor<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Table_Floor}
                                        className="select"
                                        defaultValue={Table_Floor[1]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Table Size<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Table_Size}
                                        className="select"
                                        defaultValue={Table_Size[1]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        No of Guests<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" defaultValue={6} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Status<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Table_Status}
                                        className="select"
                                        defaultValue={Table_Status[1]}
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
                                Category<span className="text-danger"> *</span>
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
                                    <h6 className="fs-14 fw-semibold mb-3">Category</h6>
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
                                                Sea Food
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Pizza
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Salads
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Tacos
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Burgers
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Status<span className="text-danger"> *</span>
                            </label>
                            <select className="select">
                                <option>Select</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-auto">
                        <Link href="#" className="btn btn-light w-100">
                            Reset
                        </Link>
                        <Link href="#" className="btn btn-primary w-100">
                            Apply
                        </Link>
                    </div>
                </div>
            </div>
            {/* End Filter */}
        </>

    );
};

export default TableModal;
