"use client";

import Link from "next/link";
import KitchenModal from "./kitchenModal";
import TimerButton from "./timerButton";

const KitchenComponent = () => {
    return (
        <>
            {/* ========================
			Start Page Content
		    ========================= */}
            <div className="page-wrapper">
                {/* Start Content */}
                <div className="content">
                    {/* Page Header */}
                    <div className="d-flex align-items-sm-center justify-content-between flex-sm-row flex-column flex-wrap gap-3 mb-4">
                        <div>
                            <h3 className="mb-0">
                                Kitchen{" "}
                                <Link
                                    href="#"
                                    className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                                >
                                    <i className="icon-refresh-ccw" />
                                </Link>
                            </h3>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                            {/* Item 1 */}
                            <div className="d-inline-flex align-items-center justify-content-between rounded-pill bg-white ps-2 pe-3 py-2 gap-3 border">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="avatar avatar-sm rounded-circle bg-gray">
                                        <i className="icon-newspaper fs-14" />
                                    </div>
                                    <p className="mb-0 text-dark fw-medium">New Order</p>
                                </div>
                                <h5 className="fs-18px fw-semibold mb-0">02</h5>
                            </div>
                            {/* Item 2 */}
                            <div className="d-inline-flex align-items-center justify-content-between rounded-pill bg-white ps-2 pe-3 py-2 gap-3 border">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="avatar avatar-sm rounded-circle bg-secondary">
                                        <i className="icon-package-2 fs-14" />
                                    </div>
                                    <p className="mb-0 text-dark fw-medium">In Kitchen</p>
                                </div>
                                <h5 className="fs-18px fw-semibold mb-0">03</h5>
                            </div>
                            {/* Item 3 */}
                            <div className="d-inline-flex align-items-center justify-content-between rounded-pill bg-white ps-2 pe-3 py-2 gap-3 border">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="avatar avatar-sm rounded-circle bg-danger">
                                        <i className="icon-clock-alert fs-14" />
                                    </div>
                                    <p className="mb-0 text-dark fw-medium">Delayed</p>
                                </div>
                                <h5 className="fs-18px fw-semibold mb-0">01</h5>
                            </div>
                            {/* Item 4 */}
                            <div className="d-inline-flex align-items-center justify-content-between rounded-pill bg-white ps-2 pe-3 py-2 gap-3 border">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="avatar avatar-sm rounded-circle bg-success">
                                        <i className="icon-check-check fs-14" />
                                    </div>
                                    <p className="mb-0 text-dark fw-medium">Completed</p>
                                </div>
                                <h5 className="fs-18px fw-semibold mb-0">02</h5>
                            </div>
                        </div>
                        <div className="gap-3 d-flex align-items-center flex-wrap">
                            <div className="page-search">
                                <input
                                    type="search"
                                    className="form-control form-control-sm"
                                    placeholder="Search"
                                />
                                <i className="icon-search fs-14" />
                            </div>
                        </div>
                    </div>
                    {/* End Page Header */}
                    {/* start row */}
                    <div className="row g-4">
                        {/* start col */}
                        <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
                            {/* start card */}
                            <div className="card flex-fill mb-0">
                                <div className="card-header bg-gray">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar rounded-circle bg-white">
                                                <i className="icon-hand-platter fs-24 text-dark" />
                                            </div>
                                            <p className="mb-0 text-white fw-semibold fs-14px">
                                                Jennifer Brooks
                                                <span className="fs-13 fw-normal d-block mt-1">
                                                    Dine In
                                                </span>
                                            </p>
                                        </div>
                                        <span className="badge bg-white text-center text-dark">
                                            #14751
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                        <h6 className="mb-0 fw-normal fs-14">
                                            Token No : <span className="fw-semibold">31</span>{" "}
                                        </h6>
                                        <p className="mb-0 fw-normal text-dark">
                                            15 Nov 2025, 06:00 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="orders-list mb-4">
                                        <div className="border-bottom-dashed mb-3 pb-3">
                                            <div className="orders text-dark mb-2">
                                                <p>
                                                    <span className="dot success" />
                                                    Mediterranean Salad - Regular
                                                </p>
                                                <p className="text-dark">×1</p>
                                            </div>
                                            <div className="bg-light rounded py-1 px-2">
                                                <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                                                    {" "}
                                                    <i className="icon-badge-info me-1" /> Notes : Extra Spicy
                                                </p>
                                            </div>
                                        </div>
                                        <div className="orders text-dark mb-3 pb-3 border-bottom-dashed">
                                            <p>
                                                <span className="dot success" />
                                                Lobster Thermidor
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                        <div className="orders text-dark mb-0">
                                            <p>
                                                <span className="dot success" />
                                                Caesar Salad
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="progress-item">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: "10%" }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-normal d-flex align-items-center">
                                            <i className="icon-clock me-1" /> 20:00
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between gap-2 pt-0 border-0 flex-wrap flex-xl-nowrap">
                                    <TimerButton />
                                    <Link
                                        href="#"
                                        className="btn btn-outline-light w-100"
                                        data-bs-toggle="modal"
                                   data-bs-target="#cooking_done_modal"
                                    >
                                        <i className="icon-check-check me-2" />
                                        <span>Mark Done</span>
                                    </Link>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                        {/* start col */}
                        <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
                            {/* start card */}
                            <div className="card flex-fill mb-0">
                                <div className="card-header bg-secondary">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar rounded-circle bg-white">
                                                <i className="icon-hand-platter fs-24 text-dark" />
                                            </div>
                                            <p className="mb-0 text-white fw-semibold fs-14px">
                                                Elijah Thompson
                                                <span className="fs-13 fw-normal d-block mt-1">
                                                    Take Away
                                                </span>
                                            </p>
                                        </div>
                                        <span className="badge bg-white text-center text-dark">
                                            #14351
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                        <h6 className="mb-0 fw-normal fs-14">
                                            Token No : <span className="fw-semibold">11</span>{" "}
                                        </h6>
                                        <p className="mb-0 fw-normal text-dark">
                                            19 Nov 2025, 03:25 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="orders-list mb-4">
                                        <div className="border-bottom-dashed mb-3 pb-3">
                                            <div className="orders text-dark mb-2">
                                                <p>
                                                    <span className="dot" />
                                                    Chicken Skewers
                                                </p>
                                                <p className="text-dark">×1</p>
                                            </div>
                                            <div className="bg-light rounded py-1 px-2">
                                                <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                                                    {" "}
                                                    <i className="icon-badge-info me-1" /> Notes : Extra Spicy
                                                </p>
                                            </div>
                                        </div>
                                        <div className="orders text-dark mb-3 pb-3 border-bottom-dashed">
                                            <p>
                                                <span className="dot" />
                                                Chicken Roll
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                        <div className="orders text-dark mb-0">
                                            <p>
                                                <span className="dot" />
                                                Chicken Taco
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="progress-item">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: "50%" }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-normal d-flex align-items-center">
                                            <i className="icon-clock me-1" /> 50:00
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between gap-2 pt-0 border-0 flex-wrap flex-xl-nowrap">
                                    <TimerButton />
                                    <Link
                                        href="#"
                                        className="btn btn-outline-light w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#cooking_done_modal"
                                    >
                                        <i className="icon-check-check me-2" />
                                        <span>Mark Done</span>
                                    </Link>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                        {/* start col */}
                        <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
                            {/* start card */}
                            <div className="card flex-fill mb-0">
                                <div className="card-header bg-warning">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar rounded-circle bg-white">
                                                <i className="icon-hand-platter fs-24 text-dark" />
                                            </div>
                                            <p className="mb-0 text-white fw-semibold fs-14px">
                                                Walk in Customer
                                                <span className="fs-13 fw-normal d-block mt-1">
                                                    Dine In
                                                </span>
                                            </p>
                                        </div>
                                        <span className="badge bg-white text-center text-dark">
                                            #23896
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                        <h6 className="mb-0 fw-normal fs-14">
                                            Token No : <span className="fw-semibold">07</span>{" "}
                                        </h6>
                                        <p className="mb-0 fw-normal text-dark">
                                            15 Nov 2025, 05:15 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="orders-list mb-4">
                                        <div className="border-bottom-dashed mb-3 pb-3">
                                            <div className="orders text-dark mb-2">
                                                <p>
                                                    <span className="dot Chicken" />
                                                    Margherita Pizza - Regular
                                                </p>
                                                <p className="text-dark">×1</p>
                                            </div>
                                            <div className="bg-light rounded py-1 px-2">
                                                <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                                                    {" "}
                                                    <i className="icon-badge-info me-1" /> Notes : Add More
                                                    Onion, with extra Spicy
                                                </p>
                                            </div>
                                        </div>
                                        <div className="orders text-dark mb-3 pb-3 border-bottom-dashed">
                                            <p>
                                                <span className="dot Chicken" />
                                                Caesar Salad
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                        <div className="orders text-dark mb-0">
                                            <p>
                                                <span className="dot Chicken" />
                                                Apple Pie
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="progress-item">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: "5%" }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-normal d-flex align-items-center">
                                            <i className="icon-clock me-1" /> 15:00
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between gap-2 pt-0 border-0 flex-wrap flex-xl-nowrap">
                                    <TimerButton />
                                    <Link
                                        href="#"
                                        className="btn btn-outline-light w-100"
                                        data-bs-toggle="modal"
                                       data-bs-target="#cooking_done_modal"

                                    >
                                        <i className="icon-check-check me-2" />
                                        <span>Mark Done</span>
                                    </Link>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                        {/* start col */}
                        <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
                            {/* start card */}
                            <div className="card flex-fill mb-0">
                                <div className="card-header bg-danger">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar rounded-circle bg-white">
                                                <i className="icon-hand-platter fs-24 text-dark" />
                                            </div>
                                            <p className="mb-0 text-white fw-semibold fs-14px">
                                                Walk in Customer
                                                <span className="fs-13 fw-normal d-block mt-1">
                                                    Dine In
                                                </span>
                                            </p>
                                        </div>
                                        <span className="badge bg-white text-center text-dark">
                                            #23896
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                        <h6 className="mb-0 fw-normal fs-14">
                                            Token No : <span className="fw-semibold">42</span>{" "}
                                        </h6>
                                        <p className="mb-0 fw-normal text-dark">
                                            15 Nov 2025, 03:22 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="orders-list mb-4">
                                        <div className="border-bottom-dashed mb-3 pb-3">
                                            <div className="orders text-dark mb-2">
                                                <p>
                                                    <span className="dot Chicken" />
                                                    Pesto Pasta
                                                </p>
                                                <p className="text-dark">×2</p>
                                            </div>
                                            <div className="bg-light rounded py-1 px-2">
                                                <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                                                    {" "}
                                                    <i className="icon-badge-info me-1" /> Notes : Need extra
                                                    Spicy
                                                </p>
                                            </div>
                                        </div>
                                        <div className="orders text-dark mborder-bottom-dashed mb-3 pb-3">
                                            <p>
                                                <span className="dot Chicken" />
                                                Basil pesto, pine nuts
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                        <div className="orders text-dark mb-0">
                                            <p>
                                                <span className="dot Chicken" />
                                                Lemon Tart
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-danger mb-3 d-flex align-items-center justify-content-center fw-medium">
                                        {" "}
                                        <i className="icon-clock-alert me-1" /> Delayed By 5 Mins
                                    </p>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="progress-item">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: "75%" }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-normal d-flex align-items-center">
                                            <i className="icon-clock me-1" /> 15:00
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between gap-2 pt-0 border-0 flex-wrap flex-xl-nowrap">
                                    <Link href="#" className="btn btn-light w-100 timer-btn">
                                        <i className="icon-play me-2" />
                                        <span className="label">Play</span>
                                        <span className="ps-1 fw-semibold time">00:00</span>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="btn btn-outline-light w-100"
                                        data-bs-toggle="modal"
                                      data-bs-target="#cooking_done_modal"
                                    >
                                        <i className="icon-check-check me-2" />
                                        <span>Mark Done</span>
                                    </Link>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                        {/* start col */}
                        <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
                            {/* start card */}
                            <div className="card flex-fill mb-0">
                                <div className="card-header bg-success">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar rounded-circle bg-white">
                                                <i className="icon-hand-platter fs-24 text-dark" />
                                            </div>
                                            <p className="mb-0 text-white fw-semibold fs-14px">
                                                Morgan Evans
                                                <span className="fs-13 fw-normal d-block mt-1">
                                                    Dine In
                                                </span>
                                            </p>
                                        </div>
                                        <span className="badge bg-white text-center text-dark">
                                            #74758
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                        <h6 className="mb-0 fw-normal fs-14">
                                            Token No : <span className="fw-semibold">30</span>{" "}
                                        </h6>
                                        <p className="mb-0 fw-normal text-dark">
                                            15 Nov 2025, 02:45 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="orders-list mb-4">
                                        <div className="border-bottom-dashed mb-3 pb-3">
                                            <div className="orders text-dark mb-2">
                                                <p>
                                                    <span className="dot" />
                                                    Spicy Tofu Stir-Fry
                                                </p>
                                                <p className="text-dark">×1</p>
                                            </div>
                                            <div className="bg-light rounded py-1 px-2">
                                                <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                                                    {" "}
                                                    <i className="icon-badge-info me-1" /> Notes : Add More
                                                    Onion, with extra Spicy
                                                </p>
                                            </div>
                                        </div>
                                        <div className="orders text-dark mb-3 pb-3 border-bottom-dashed">
                                            <p>
                                                <span className="dot" />
                                                Grilled Chicken
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                        <div className="orders text-dark mb-0">
                                            <p>
                                                <span className="dot" />
                                                Chicken Soup
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-danger mb-3 d-flex align-items-center justify-content-center fw-medium">
                                        {" "}
                                        <i className="icon-clock-alert me-1" /> 25:15 Mins - Served
                                        Before 5 Mins
                                    </p>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="progress-item">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: "85%" }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-normal d-flex align-items-center">
                                            <i className="icon-clock me-1" /> 12:00
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between gap-2 pt-0 border-0 flex-wrap flex-xl-nowrap">
                                    <Link
                                        href="#"
                                        className="btn btn-outline-light w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#print_order"
                                    >
                                        <i className="icon-printer me-2" />
                                        Print Order
                                    </Link>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                        {/* start col */}
                        <div className="col-xl-4 col-lg-6 col-md-6 d-flex">
                            {/* start card */}
                            <div className="card flex-fill mb-0">
                                <div className="card-header bg-success">
                                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="avatar rounded-circle bg-white">
                                                <i className="icon-hand-platter fs-24 text-dark" />
                                            </div>
                                            <p className="mb-0 text-white fw-semibold fs-14px">
                                                Walk in Customer
                                                <span className="fs-13 fw-normal d-block mt-1">
                                                    Delivery
                                                </span>
                                            </p>
                                        </div>
                                        <span className="badge bg-white text-center text-dark">
                                            #35658
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body border-bottom">
                                    <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                        <h6 className="mb-0 fw-normal fs-14">
                                            Token No : <span className="fw-semibold">40</span>{" "}
                                        </h6>
                                        <p className="mb-0 fw-normal text-dark">
                                            14 Nov 2025, 09:12 AM
                                        </p>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="orders-list mb-4">
                                        <div className="border-bottom-dashed mb-3 pb-3">
                                            <div className="orders text-dark mb-2">
                                                <p>
                                                    <span className="dot success" />
                                                    Cheesecake
                                                </p>
                                                <p className="text-dark">×2</p>
                                            </div>
                                            <div className="bg-light rounded py-1 px-2">
                                                <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                                                    {" "}
                                                    <i className="icon-badge-info me-1" /> Notes : Add More
                                                    Cheese, with extra Spicy
                                                </p>
                                            </div>
                                        </div>
                                        <div className="orders text-dark mb-3 pb-3 border-bottom-dashed">
                                            <p>
                                                <span className="dot success" />
                                                Creamy, graham
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                        <div className="orders text-dark mb-0">
                                            <p>
                                                <span className="dot success" />
                                                Chicken Lollipop
                                            </p>
                                            <p className="text-dark">×1</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-danger mb-3 d-flex align-items-center justify-content-center fw-medium">
                                        {" "}
                                        <i className="icon-clock-alert me-1" /> 25:15 Mins - Served
                                        Before 10 Mins
                                    </p>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="progress-item">
                                            <div
                                                className="progress-bar bg-success"
                                                style={{ width: "90%" }}
                                            />
                                        </div>
                                        <p className="mb-0 fw-normal d-flex align-items-center">
                                            <i className="icon-clock me-1" /> 40:00
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between gap-2 pt-0 border-0 flex-wrap flex-xl-nowrap">
                                    <Link
                                        href="#"
                                        className="btn btn-outline-light w-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#print_order"
                                    >
                                        <i className="icon-printer me-2" />
                                        Print Order
                                    </Link>
                                </div>
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* End Content */}
            </div>
            {/* ========================
			End Page Content
		    ========================= */}
            <KitchenModal />
        </>

    );
};

export default KitchenComponent;
