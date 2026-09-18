"use client";
import Link from "next/link";
import TableModal from "./tableModal";
import ImageWithBasePath from "@/core/common/image-with-base-path";


const Table = () => {
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
                Tables{" "}
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <div className="page-search">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search Tables"
                />
                <i className="icon-search fs-14" />
              </div>
              <Link
                href="#"
                className="btn btn-primary d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_table"
              >
                <i className="icon-circle-plus me-1" />
                Add New
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* Row start */}
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-01.svg"
                        alt="item"
                        className="img-fluid custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 1
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 6</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-02.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 2
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 4</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-01.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 3
                        </Link>{" "}
                        <span className="badge badge-soft-danger fw-medium fs-10 mb-0">
                          Booked
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 6</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-04.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 4
                        </Link>{" "}
                        <span className="badge badge-soft-danger fw-medium fs-10 mb-0">
                          Booked
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 10</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-05.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 5
                        </Link>{" "}
                        <span className="badge badge-soft-danger fw-medium fs-10 mb-0">
                          Booked
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 10</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-06.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 6
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 10</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-01.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 7
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 6</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-01.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 8
                        </Link>{" "}
                        <span className="badge badge-soft-danger fw-medium fs-10 mb-0">
                          Booked
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 1st</span>
                          <span className="ms-2">Capacity : 6</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-01.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 9
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 2nd</span>
                          <span className="ms-2">Capacity : 6</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-01.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 10
                        </Link>{" "}
                        <span className="badge badge-soft-danger fw-medium fs-10 mb-0">
                          Booked
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 2nd</span>
                          <span className="ms-2">Capacity : 6</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-02.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 11
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 2nd</span>
                          <span className="ms-2">Capacity : 4</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-06.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 12
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 2nd</span>
                          <span className="ms-2">Capacity : 10</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-02.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 13
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 3rd</span>
                          <span className="ms-2">Capacity : 4</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-14.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 14
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 3rd</span>
                          <span className="ms-2">Capacity : 10</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-02.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 15
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 3rd</span>
                          <span className="ms-2">Capacity : 4</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="bg-light rounded mb-3 tables-img">
                    <Link href="#">
                      <ImageWithBasePath
                        src="assets/img/tables/tables-06.svg"
                        alt="item"
                        className="img-fluid w-100 custom-line-img"
                      />
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fs-14 fw-semibold">
                        <Link href="#" className="me-1">
                          Table 16
                        </Link>{" "}
                        <span className="badge badge-soft-success fw-medium fs-10 mb-0">
                          Available
                        </span>
                      </h6>
                      <div className="d-flex align-items-center">
                        <p className="mb-0">
                          <span className="border-end pe-2">Floor : 3rd</span>
                          <span className="ms-2">Capacity : 10</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link href="#" className="table-menu" data-bs-toggle="dropdown">
                        <i className="icon-ellipsis-vertical" />
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-split">
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_table"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_modal"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Row end */}
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
      <TableModal />
    </>

  );
};

export default Table;
