
"use client";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { Gender } from "@/core/data/json/selectOption";
import CommonSelect from "@/core/common/common-select/commonSelect";
import CommonDatePicker from "@/core/common/common-date-picker/commonDatePicker";
import UpgradeSlider from "./posPopupSlider";
import { useState } from "react";
import Link from "next/link";
import { all_routes } from "@/routes/all_routes";


const PosModals = () => {

    const [quantities, setQuantities] = useState<Record<string, number>>({});
const [active, setActive] = useState<string>('small');
    const updateQuantity = (id: string, getValue: (current: number) => number) => {
        setQuantities((prev) => {
            const current = prev[id] ?? 1;
            const next = Math.max(1, getValue(current));
            return { ...prev, [id]: next };
        });
    };

    const increment = (id: string) => updateQuantity(id, (current) => current + 1);
    const decrement = (id: string) => updateQuantity(id, (current) => current - 1);
    const handleInputChange = (id: string, value: string) => {
        const parsed = parseInt(value, 10);
        updateQuantity(id, () => (Number.isNaN(parsed) ? 1 : parsed));
    };

    const renderQuantityControl = (id: string) => {
        const value = quantities[id] ?? 1;
        return (
            <div className="quantity-control">
                <button type="button" className="minus-btn" onClick={() => decrement(id)}>
                    <i className="icon-minus" />
                </button>
                <input
                    type="text"
                    className="quantity-input"
                    value={value}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    aria-label="Quantity"
                />
                <button type="button" className="add-btn" onClick={() => increment(id)}>
                    <i className="icon-plus" />
                </button>
            </div>
        );
    };

    return (
        <>
            {/* Order Modal  */}
            <div className="modal fade" id="order_modal">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-body text-center p-4">
                            <div className="mb-4">
                                <span className="avatar avatar-xxl rounded-circle bg-danger-subtle shadow-lg">
                                    <ImageWithBasePath
                                        src="assets/img/icons/checked-img.svg"
                                        alt="trash"
                                        className="img-fluid w-auto h-auto"
                                    />
                                </span>
                            </div>
                            <h4 className="mb-1">Order Sent to Kitchen</h4>
                            <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
                                <p className="mb-0">
                                    {" "}
                                    Token No : <span className="text-dark">7</span>{" "}
                                </p>
                                <span className="even-line" />
                                <p className="mb-0">
                                    {" "}
                                    Order ID : <span className="text-dark">#26598</span>{" "}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between gap-2">
                                <Link href="#" className="btn btn-light w-100">
                                    Close
                                </Link>
                                <Link href="#" className="btn btn-primary w-100">
                                    Print Token
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Modal  */}
            {/* Add Note modal */}
            <div className="modal fade" id="add_notes">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title">Add Note</h4>
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
                            <div className="modal-body">
                                <label className="form-label">
                                    Notes<span className="text-danger"> *</span>
                                </label>
                                <textarea rows={4} className="form-control" defaultValue={""} />
                                <p className="fw-medium mb-0 mt-1">Add Minimum 200 Characters</p>
                            </div>
                            <div className="modal-footer d-flex align-items-center justify-content-between flex-nowrap gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light w-100 m-0"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary w-100 m-0">
                                    Add Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Add Details modal */}
            <div className="modal fade" id="items_details">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-body p-4">
                            {/* start row */}
                            <div className="row g-4">
                                <div className="col-lg-6">
                                    <div className="items-img p-3 border rounded bg-light">
                                        <ImageWithBasePath
                                            src="assets/img/food/food-img-1.png"
                                            alt="food"
                                            className="img-fluid img-1"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="items-content">
                                        <h4 className="mb-2">Chicken Taco</h4>
                                        <p className="mb-3">
                                            Tender grilled chicken wrapped in soft tortillas, topped with
                                            fresh lettuce, salsa, and creamy sauce.
                                        </p>
                                        <div className="items-info mb-4 pb-4 border-bottom">
                                            <h6 className="fw-semibold mb-3">Sizes</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2 size-group">
                                                <div className={`size-tab ${active === 'small' ? 'active' : ''}`} onClick={() => setActive('small')}>
                                                    <button className="tag d-flex align-items-center justify-content-between gap-3">
                                                        Small <span>$28</span>{" "}
                                                    </button>
                                                </div>
                                                <div className={`size-tab ${active === 'medium' ? 'active' : ''}`} onClick={() => setActive('medium')}>
                                                    <button className="tag d-flex align-items-center justify-content-between gap-3">
                                                        Medium <span>$28</span>
                                                    </button>
                                                </div>
                                                <div className={`size-tab ${active === 'large' ? 'active' : ''}`} onClick={() => setActive('large')}>
                                                    <button className="tag d-flex align-items-center justify-content-between gap-3">
                                                        Regular <span>$28</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 pb-4 border-bottom">
                                            <h6 className="fw-semibold mb-3">Add-ons &amp; Upgrades</h6>
                                            <UpgradeSlider />
                                        </div>
                                        <div>
                                            <h5 className="mb-4 d-flex align-items-center justify-content-between">
                                                Total <span>$274</span>
                                            </h5>
                                            <div className="d-flex align-items-center gap-3">
                                            <div className="price d-flex align-items-center justify-content-between flex gap-2">
                                                        <p className="mb-0 text-dark">$45</p>
                                                        {renderQuantityControl("chicken-noodle-soup2")}
                                                    </div>
                                                <Link
                                                    href="#"
                                                    className="btn btn-primary w-100 d-flex align-items-center gap-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#item_view"
                                                >
                                                    {" "}
                                                    <i className="icon-shopping-bag" /> Add to Cart
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end row */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Details modal */}
            <div className="modal fade" id="transactions_details">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title">Transactions</h4>
                            <button
                                type="button"
                                className="btn-close btn-close-modal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="icon-x" />
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <ul
                                className="nav nav-tabs nav-tabs-solid border-0 mb-3 pb-3 border-bottom align-items-center flex-wrap gap-3"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <Link
                                        href="#order-tab15"
                                        className="nav-link active shadow-sm fw-medium d-flex  gap-2 align-items-center"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="icon-circle-dollar-sign" />
                                        Sale
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href="#order-tab16"
                                        className="nav-link shadow-sm fw-medium d-flex align-items-center gap-2"
                                        data-bs-toggle="tab"
                                    >
                                        <i className="icon-file-scan" />
                                        Draft
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
                                <div className="page-search">
                                    <input
                                        type="search"
                                        className="form-control form-control-sm"
                                        placeholder="Search"
                                    />
                                    <i className="icon-search fs-14" />
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
                                            <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                            >
                                                Newest
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="dropdown-item rounded-1"
                                            >
                                                Oldest
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane show active" id="order-tab15">
                                    {/* table start */}
                                    <div className="table-responsive table-nowrap">
                                        <table className="table mb-0 border">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Ref</th>
                                                    <th>Customer</th>
                                                    <th>Grand Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23588</td>
                                                    <td>Walk-in Customer</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23587</td>
                                                    <td>Sue Allen</td>
                                                    <td>$78.20</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23586</td>
                                                    <td>Frank Barrett</td>
                                                    <td>$45.10</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23585</td>
                                                    <td>Kelley Davis</td>
                                                    <td>$92.80</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23584</td>
                                                    <td>Jim Vickers</td>
                                                    <td>$61.40</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23583</td>
                                                    <td>Nancy Chapman</td>
                                                    <td>$57.20</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23582</td>
                                                    <td>Ron Jude</td>
                                                    <td>$45.30</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>31 Oct 2025</td>
                                                    <td>#23581</td>
                                                    <td>Andrea Aponte</td>
                                                    <td>$72.60</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>31 Oct 2025</td>
                                                    <td>#23580</td>
                                                    <td>David Belcher</td>
                                                    <td>$32.10</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>31 Oct 2025</td>
                                                    <td>#23579</td>
                                                    <td>Julie Kangas</td>
                                                    <td>$40.30</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-trash-2" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* table end */}
                                </div>
                                <div className="tab-pane show" id="order-tab16">
                                    {/* table start */}
                                    <div className="table-responsive table-nowrap">
                                        <table className="table mb-0 border">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Ref</th>
                                                    <th>Customer</th>
                                                    <th>Grand Total</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01 Dec 2025</td>
                                                    <td>#23588</td>
                                                    <td>Walk-in Customer</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23588</td>
                                                    <td>Walk-in Customer</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23587</td>
                                                    <td>Sue Allen</td>
                                                    <td>$54.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23586</td>
                                                    <td>Frank Barrett</td>
                                                    <td>$94.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23584</td>
                                                    <td>Kelley Davis</td>
                                                    <td>$14.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23588</td>
                                                    <td>Walk-in Customer</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23588</td>
                                                    <td>Jim Vickers</td>
                                                    <td>$19.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23582</td>
                                                    <td>Nancy Chapman</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>31 Dec 2025</td>
                                                    <td>#23579</td>
                                                    <td>Ron Jude</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>01 Nov 2025</td>
                                                    <td>#23588</td>
                                                    <td>Walk-in Customer</td>
                                                    <td>$34.50</td>
                                                    <td>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                                                        >
                                                            <i className="icon-pencil-line" />
                                                        </Link>
                                                        <Link
                                                            href="#"
                                                            className="btn btn-icon btn-sm btn-white rounded-circle"
                                                        >
                                                            <i className="icon-printer" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* table end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Print details modal */}
            <div className="modal fade" id="print_reciept">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title">Print Reciept</h4>
                            <button
                                type="button"
                                className="btn-close btn-close-modal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="icon-x" />
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Item 1 */}
                            <div className="mb-3 pb-3 border-bottom">
                                <h5 className="mb-3 fs-16">Order Info</h5>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    Date &amp; Time{" "}
                                    <span className="fw-medium text-dark">25/11/2025 - 08:45 PM</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    {" "}
                                    Order No <span className="fw-medium text-dark"> #54654</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    {" "}
                                    Token No <span className="fw-medium text-dark"> 20</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    {" "}
                                    No of Items <span className="fw-medium text-dark"> 4</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                                    {" "}
                                    Order Type
                                    <span className="fw-medium text-dark">
                                        {" "}
                                        Dine In (TabIe 4){" "}
                                    </span>{" "}
                                </h6>
                            </div>
                            {/* Item 2 */}
                            <div className="mb-3 pb-3 border-bottom">
                                <h5 className="mb-3 fs-16">Ordered Menus</h5>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    Grilled Chicken ×1{" "}
                                    <span className="fw-medium text-dark">$49</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    {" "}
                                    Chicken Taco ×2 <span className="fw-medium text-dark">
                                        {" "}
                                        $66
                                    </span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    {" "}
                                    Lobster Thermidor ×1{" "}
                                    <span className="fw-medium text-dark"> $76</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                                    {" "}
                                    Grilled Chicken ×1{" "}
                                    <span className="fw-medium text-dark"> $62</span>{" "}
                                </h6>
                            </div>
                            {/* Item 3 */}
                            <div className="mb-3 pb-3 border-bottom">
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    Sub Total<span className="fw-medium text-dark">$267</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                                    {" "}
                                    Tax (10%)<span className="fw-medium text-dark"> $268</span>{" "}
                                </h6>
                                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                                    {" "}
                                    Service Charge <span className="fw-medium text-dark">
                                        {" "}
                                        $15
                                    </span>{" "}
                                </h6>
                            </div>
                            <h5 className="mb-0 d-flex align-items-center justify-content-between">
                                Total <span>$274</span>
                            </h5>
                        </div>
                        <div className="modal-footer d-flex align-items-center justify-content-between flex-nowrap gap-2">
                            <button
                                type="button"
                                className="btn btn-light w-100 m-0"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary w-100 m-0">
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Customer modal */}
            <div className="modal fade" id="add_customer">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
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
                            <div className="modal-body pt-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Customer Name <span className="text-danger"> *</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Phone <span className="text-danger"> *</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Email <span className="text-danger"> *</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Date Of Birth<span className="text-danger ms-1">*</span>
                                        </label>
                                        <CommonDatePicker />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Gneder<span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                        options={Gender}
                                        className="select"
                                        defaultValue={Gender[0]}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex align-items-center justify-content-between flex-nowrap gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light w-100 m-0"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary w-100 m-0">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Edit Customer modal */}
            <div className="modal fade" id="edit_customer">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
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
                            <div className="modal-body pt-0">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Customer Name <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="Steave Rogers"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Phone <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="+123456 87485"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Email <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue="suppoert@gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Date Of Birth<span className="text-danger ms-1">*</span>
                                        </label>
                                        <CommonDatePicker />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Gneder<span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                        options={Gender}
                                        className="select"
                                        defaultValue={Gender[0]}
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-flex align-items-center justify-content-between flex-nowrap gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light w-100 m-0"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary w-100 m-0">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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
                            <p className="mb-4">Are you sure you want to delete?</p>
                            <div className="d-flex justify-content-between gap-2">
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
                                        <div className="row g-4 justify-content-between align-items-center border-bottom pb-4">
                                            <div className="col-md-6">
                                                <h6 className="mb-2">#INV5465</h6>
                                                <h6>DreamsPOS</h6>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-2 invoice-logo d-flex align-items-center justify-content-md-end justify-content-start">
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
                                        <div className="row g-4 justify-content-between align-items-center border-bottom pb-4">
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
                                        <div className="row g-4 justify-content-center align-items-center pb-4 border-bottom">
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
                                                        <div className="col-6">
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
                                                        <div className="col-6 text-end">
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
                                <div className="d-flex justify-content-center algin-item-center flex-wrap gap-3">
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
   <>
  {/* Transactions Details modal */}
  <div className="modal fade" id="draft_details">
    <div className="modal-dialog modal-dialog-centered modal-xl">
      <div className="modal-content">
        <div className="modal-header border-0">
          <h4 className="modal-title">Draft</h4>
          <button
            type="button"
            className="btn-close btn-close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="modal-body p-4">
          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-3">
            <div className="input-group input-group-flat w-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <span className="input-group-text">
                <i className="icon-search text-dark" />
              </span>
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
                  <Link href="#" className="dropdown-item">
                    Newest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Oldest
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Ascending
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Descending
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* table start */}
          <div className="table-responsive table-nowrap">
            <table className="table mb-0 border">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ref</th>
                  <th>Customer</th>
                  <th>Grand Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01 Dec 2025</td>
                  <td>#23588</td>
                  <td>Walk-in Customer</td>
                  <td>$34.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23588</td>
                  <td>Walk-in Customer</td>
                  <td>$34.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23587</td>
                  <td>Sue Allen</td>
                  <td>$54.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23586</td>
                  <td>Frank Barrett</td>
                  <td>$94.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23584</td>
                  <td>Kelley Davis</td>
                  <td>$14.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23588</td>
                  <td>Walk-in Customer</td>
                  <td>$34.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23588</td>
                  <td>Jim Vickers</td>
                  <td>$19.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23582</td>
                  <td>Nancy Chapman</td>
                  <td>$34.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>31 Dec 2025</td>
                  <td>#23579</td>
                  <td>Ron Jude</td>
                  <td>$34.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>01 Nov 2025</td>
                  <td>#23588</td>
                  <td>Walk-in Customer</td>
                  <td>$34.50</td>
                  <td>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle me-2"
                    >
                      <i className="icon-pencil-line" />
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm btn-white rounded-circle"
                    >
                      <i className="icon-printer" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* table end */}
        </div>
      </div>
    </div>
  </div>
  <>
  {/* Start Modal  */}
  <div className="modal fade" id="item_view">
    <div className="modal-dialog modal-dialog-centered modal-sm">
      <div className="modal-content">
        <div className="modal-body text-center p-4">
          <div className="mb-4">
            <span className="avatar avatar-xxl rounded-circle bg-success-subtle">
              <img
                src="assets/img/icons/checked-img.svg"
                alt="trash"
                className="img-fluid w-auto h-auto"
              />
            </span>
          </div>
          <h4 className="mb-1">Item Added</h4>
          <p className="mb-0">Lobster Thermidor Added to the cart</p>
        </div>
      </div>
    </div>
  </div>
  {/* End Modal  */}
</>

</>


        </>

    );
};

export default PosModals;
