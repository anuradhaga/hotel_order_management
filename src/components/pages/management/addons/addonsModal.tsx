"use client";
import CommonSelect from "@/core/common/common-select/commonSelect";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { Food_Items } from "@/core/data/json/selectOption";
import Link from "next/link";


const AddonsModal = () => {
    return (
        <>
            {/* Add Addon */}
            <div className="modal fade" id="add_modifier">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h4 className="modal-title">Add Addon</h4>
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
                                            Category Image<span className="text-danger"> *</span>
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
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Item<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Food_Items}
                                        className="select"
                                        defaultValue={Food_Items[0]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Addon<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Price<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Description<span className="text-danger"> *</span>
                                    </label>
                                    <textarea rows={4} className="form-control" defaultValue={""} />
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
            {/* Add Addon End */}
            {/* Edit Addon */}
            <div className="modal fade" id="edit_modifier">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4 pb-3">
                            <h4 className="modal-title">Edit Addon</h4>
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
                                        <ImageWithBasePath
                                            src="assets/img/items/food-02.jpg"
                                            alt="addon"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label">
                                            Category Image<span className="text-danger"> *</span>
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
                                        Item<span className="text-danger"> *</span>
                                    </label>
                                    <CommonSelect
                                        options={Food_Items}
                                        className="select"
                                        defaultValue={Food_Items[1]}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Addon<span className="text-danger"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue="Extra Cheese"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Price<span className="text-danger"> *</span>
                                    </label>
                                    <input type="text" className="form-control" defaultValue="$10" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Description<span className="text-danger"> *</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="form-control"
                                        defaultValue={"Extra cheese for your pizza."}
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
            {/* Edit Addon End */}
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
                                Item<span className="text-danger"> *</span>
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
                                                Pizza
                                            </label>
                                        </div>
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
                                                Salad
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Sauce
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Topping
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Addon<span className="text-danger"> *</span>
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
                                                Extra Cheese
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Grilled Shrimp
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Avocado Slices
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Spicy Mayo
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Crispy Bacon Bits
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-0">
                            <label className="form-label">
                                Status<span className="text-danger"> *</span>
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
                                                Active
                                            </label>
                                        </div>
                                        <div>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    className="form-check-input m-0 me-2"
                                                    type="checkbox"
                                                />
                                                Expired
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            </div>
            {/* End Filter */}
        </>

    );
};

export default AddonsModal;
