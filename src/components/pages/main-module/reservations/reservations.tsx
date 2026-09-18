"use client";
import Link from "next/link";
import ReservationsModal from "./reservationsModal";
const ReservationsComponent = () => {
    return (
        <>
            {/* ========================
			Start Page Content
		    ========================= */}
            <div className="page-wrapper">
                {/* Start Content */}
                <div className="content">
                    {/* Page Header */}
                    <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
                        <div className="flex-grow-1">
                            <h3 className="mb-0">
                                Reservations{" "}
                                <Link
                                    href="#"
                                    className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                                >
                                    <i className="icon-refresh-ccw" />
                                </Link>
                            </h3>
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
                            <Link
                                href="#"
                                className="btn btn-primary d-inline-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#add_reservation"
                            >
                                <i className="icon-circle-plus me-1" />
                                Add New
                            </Link>
                        </div>
                    </div>
                    {/* End Page Header */}
                    {/* start row */}
                    <div className="row">
                        {/* Item 1 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Dec 15{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">John Doe</h6>
                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:45{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 5{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 4{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">9 Nov 2025, 2:30PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 2 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center flex-wrap gap-2  mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 08{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Christopher Adams</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:10{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 5{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 7{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">16 Nov 2025, 2:30PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-danger">Cancelled</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 3 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 07{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Daniel Mitchell</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:31{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 9{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 3{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">02 Aug 2025, 2:30PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-danger">Cancelled</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 4 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 06{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Emily Parker</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:40{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 2{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 3{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">02 Aug 2025, 2:30PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 5 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 05{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Jennifer Brooks</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:45{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 2{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 1{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">11 Nov 2025, 4:00PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 6 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 04{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Matthew Collins</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:43{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 4{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 3{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">12 Nov 2025, 4:00PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 7 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 03{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Jacob Morgan</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:15{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 5{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 4{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">15 Dec 2025, 3:30PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 8 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 02{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Olivia Reed</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:45{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 12{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 8{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">22 Jan 2026, 2:00PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 9 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Nov 01{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Ethan Sullivan</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:49{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 7{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 5{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">28 Feb 2026, 4:15PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 10 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Oct 28{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">John Morgan</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:00{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 5{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 4{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">15 Dec 2025, 3:30PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status{" "}
                                            <span className="badge badge-soft-success">Booked</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 11 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Oct 27{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Steave Rogers</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:30{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 7{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 7{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">22 Jan 2026, 2:00PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status <span className="badge badge-soft-purple">Paid</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Item 12 */}
                        <div className="col-xxl-4 col-xl-6 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
                                        <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                                            <p className="text-white fw-semibold mb-0 position-relative">
                                                Oct 26{" "}
                                                <span className="fs-13 fw-normal d-block mt-1">2025</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 fw-semibold">Ethan Royond</h6>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-clock me-1 text-dark me-1" /> 10:30{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-sofa me-1 text-dark me-1" /> Table : 3{" "}
                                                </p>
                                                <span className="even-line" />
                                                <p className="d-flex align-items-center mb-0">
                                                    <i className="icon-users-round me-1 text-dark me-1" />{" "}
                                                    Guests : 3{" "}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 pb-3 border-bottom-dashed">
                                        <p className="mb-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Created on{" "}
                                            <span className="text-dark">28 Feb 2026, 4:15PM</span>
                                        </p>
                                        <p className="mb-0 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                                            Status <span className="badge badge-soft-purple">Paid</span>
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <Link href="#" className="btn btn-outline-light">
                                            View Note
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-dark"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit_reservation"
                                            >
                                                <i className="icon-pencil-line" />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="btn btn-icon btn-sm btn-white rounded-circle text-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete_modal"
                                            >
                                                <i className="icon-trash-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end row */}
                    {/* Pagination start */}
                    <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <Link
                                    className="page-link d-flex align-items-center"
                                    href="#"
                                    aria-label="Previous"
                                >
                                    <span aria-hidden="true" className="me-1">
                                        <i className="icon-chevron-left" />
                                    </span>
                                    Pre
                                </Link>
                            </li>
                            <li className="page-item active">
                                <Link className="page-link" href="#">
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" href="#">
                                    2
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" href="#">
                                    3
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link
                                    className="page-link d-flex align-items-center"
                                    href="#"
                                    aria-label="Previous"
                                >
                                    Next
                                    <span aria-hidden="true" className="ms-1">
                                        <i className="icon-chevron-right" />
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* Pagination end */}
                </div>
                {/* End Content */}
            </div>
            {/* ========================
			End Page Content
		    ========================= */}
            <ReservationsModal />
        </>

    );
};

export default ReservationsComponent;
