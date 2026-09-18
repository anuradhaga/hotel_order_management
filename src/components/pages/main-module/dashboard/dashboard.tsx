"use client";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import PredefinedDatePicker from "@/core/common/common-date-range-picker/PredefinedDatePicker";
import RevenueChart from "./revenueChart";
import CategoryChart from "./categoryChart";
import SalesChart from "./salesChart";
import StatisticChart from "./statisticChart";
import { all_routes } from "@/routes/all_routes";
import Link from "next/link";

const DashboardComponent = () => {
  return (
    <>
      {/* ========================
			Start Page Content
		========================= */}
      <div className="page-wrapper">
        {/* Start Content */}
        <div className="content pb-0">
          {/* Page Header */}
          <div className="d-flex align-items-center flex-wrap gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0">
                Dashboard{" "}
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link
                href="#"
                className="btn btn-white d-inline-flex align-items-center"
              >
                <i className="icon-folder-sync me-2" />
                Sync Data
              </Link>
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
              <PredefinedDatePicker />
            </div>
          </div>
          {/* End Page Header */}

          {/* start row */}
          <div className="row">
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card z-1 w-100 overflow-hidden">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="d-inline-flex align-items-center mb-2">
                        6986
                        <span className="badge badge-sm bg-success text-white rounded-pill ms-2">
                          +12.5%
                        </span>
                      </h4>
                      <p className="mb-0">Total Orders</p>
                    </div>
                    <div className="avatar avatar-lg avatar-rounded bg-purple count-icon border-end border-purple border-2">
                      <i className="icon-box fs-24" />
                    </div>
                  </div>
                  <ImageWithBasePath
                    src="assets/img/bg/order-bg.png"
                    alt="bg"
                    className="img-fluid position-absolute top-0 end-0 z-n1 custom-line-img"
                  />
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card z-1 w-100 overflow-hidden">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="d-inline-flex align-items-center mb-2">
                        $7516
                        <span className="badge badge-sm bg-success text-white rounded-pill ms-2">
                          +12.5%
                        </span>
                      </h4>
                      <p className="mb-0">Total Sales</p>
                    </div>
                    <div className="avatar avatar-lg avatar-rounded bg-primary count-icon border-end border-primary border-2">
                      <i className="icon-badge-dollar-sign fs-24" />
                    </div>
                  </div>
                  <ImageWithBasePath
                    src="assets/img/bg/order-bg.png"
                    alt="bg"
                    className="img-fluid position-absolute top-0 end-0 z-n1 custom-line-img"
                  />
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card z-1 w-100 overflow-hidden">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="d-inline-flex align-items-center mb-2">
                        $25.36
                        <span className="badge badge-sm bg-danger text-white rounded-pill ms-2">
                          -8.5%
                        </span>
                      </h4>
                      <p className="mb-0">Average Value</p>
                    </div>
                    <div className="avatar avatar-lg avatar-rounded bg-orange count-icon border-end border-orange border-2">
                      <i className="icon-diamond-percent fs-24" />
                    </div>
                  </div>
                  <ImageWithBasePath
                    src="assets/img/bg/order-bg.png"
                    alt="bg"
                    className="img-fluid position-absolute top-0 end-0 z-n1 custom-line-img"
                  />
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-xl-3 col-md-6 d-flex">
              <div className="card z-1 w-100 overflow-hidden">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="d-inline-flex align-items-center mb-2">
                        496
                        <span className="badge badge-sm bg-success text-white rounded-pill ms-2">
                          +12.5%
                        </span>
                      </h4>
                      <p className="mb-0">Reservations</p>
                    </div>
                    <div className="avatar avatar-lg avatar-rounded bg-success count-icon border-end border-success border-2">
                      <i className="icon-calendar-fold fs-24" />
                    </div>
                  </div>
                  <ImageWithBasePath
                    src="assets/img/bg/order-bg.png"
                    alt="bg"
                    className="img-fluid position-absolute top-0 end-0 z-n1 custom-line-img"
                  />
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}

          {/* start row */}
          <div className="row">
            <div className="col-xxl-8 col-xl-7 col-lg-12 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body pb-0">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-dollar-sign" />
                      </div>
                      <h5 className="mb-0">Total Revenue</h5>
                    </div>
                    <div className="dropdown">
                      <Link
                        href="#"
                        className="btn btn-sm btn-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        Weekly
                      </Link>
                      <ul className="dropdown-menu p-3">
                        <li>
                          <Link href="#" className="dropdown-item">
                            Weekly
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Monthly
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Yearly
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar bg-primary me-2">
                        <i className="icon-arrow-up fs-20" />
                      </div>
                      <div>
                        <p className="mb-1">Total Revenue</p>
                        <h4 className="mb-0">$3989</h4>
                      </div>
                    </div>
                    <p className="d-inline-flex align-items-center mb-0">
                      <i className="icon-square text-primary me-1" />
                      Revenue
                    </p>
                  </div>
                  <RevenueChart />
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-xxl-4 col-xl-5 col-lg-12 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-donut" />
                      </div>
                      <h5 className="mb-0">Top Selling Item</h5>
                    </div>
                    <div className="dropdown">
                      <Link
                        href="#"
                        className="btn btn-sm btn-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        All
                      </Link>
                      <ul className="dropdown-menu p-3">
                        <li>
                          <Link href="#" className="dropdown-item">
                            All
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Sea Food
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Pizza
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Salads
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="badge badge-soft-success text-start d-flex align-items-center text-wrap px-3 py-2 mb-3">
                    <ImageWithBasePath
                      src="assets/img/icons/spark.png"
                      alt="icon"
                      className="img-fluid me-2"
                    />
                    Most Ordered : Veggie Supreme Pizza
                  </div>
                  <div className="d-flex align-items-center border rounded p-2 mb-3">
                    <Link
                      href="#"
                      className="avatar avatar-lg avatar-rounded me-2"
                    >
                      <ImageWithBasePath
                        src="assets/img/category/category-02.png"
                        alt="food"
                        className="img-fluid"
                      />
                    </Link>
                    <div>
                      <h6 className="fs-14 fw-semibold mb-1">
                        <Link href="#">Veggie Supreme Pizza</Link>
                      </h6>
                      <p className="fs-13 mb-0">No of Orders : 520</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fs-14 fw-semibold mb-0">
                      <span className="text-body">#2</span> Chicken Taco
                    </h6>
                    <div className="d-flex align-items-center gap-4 w-50">
                      <div className="progress-stacked progress-sm w-100">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "85%" }}
                          aria-valuenow={15}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="fs-14 text-dark fw-medium mb-0">250</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fs-14 fw-semibold mb-0">
                      <span className="text-body">#3</span> Grilled Chicken
                    </h6>
                    <div className="d-flex align-items-center gap-4 w-50">
                      <div className="progress-stacked progress-sm w-100">
                        <div
                          className="progress-bar bg-secondary"
                          role="progressbar"
                          style={{ width: "70%" }}
                          aria-valuenow={15}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="fs-14 text-dark fw-medium mb-0">175</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="fs-14 fw-semibold mb-0">
                      <span className="text-body">#4</span> Lemon Mint Juice
                    </h6>
                    <div className="d-flex align-items-center gap-4 w-50">
                      <div className="progress-stacked progress-sm w-100">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={15}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="fs-14 text-dark fw-medium mb-0">160</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-0">
                    <h6 className="fs-14 fw-semibold mb-0">
                      <span className="text-body">#5</span> Chicken Taco
                    </h6>
                    <div className="d-flex align-items-center gap-4 w-50">
                      <div className="progress-stacked progress-sm w-100">
                        <div
                          className="progress-bar bg-purple"
                          role="progressbar"
                          style={{ width: "35%" }}
                          aria-valuenow={15}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="fs-14 text-dark fw-medium mb-0">120</p>
                    </div>
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
          {/* start row */}
          <div className="row">
            <div className="col-lg-6 col-xxl-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-croissant" />
                      </div>
                      <h5 className="mb-0">Category Statistics</h5>
                    </div>
                    <div className="dropdown">
                      <Link
                        href="#"
                        className="btn btn-sm btn-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        Weekly
                      </Link>
                      <ul className="dropdown-menu p-3">
                        <li>
                          <Link href="#" className="dropdown-item">
                            Weekly
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Monthly
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Yearly
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <CategoryChart />
                  <div className="d-flex align-items-center justify-content-between border-bottom p-2">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-sm avatar-rounded bg-primary me-2">
                        <i className="icon-shopping-bag" />
                      </span>
                      <h6 className="fs-14 fw-medium mb-0">Take Away</h6>
                    </div>
                    <p className="fw-medium mb-0">4898 Orders</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom p-2">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-sm avatar-rounded bg-secondary me-2">
                        <i className="icon-wine" />
                      </span>
                      <h6 className="fs-14 fw-medium mb-0">Reservation</h6>
                    </div>
                    <p className="fw-medium mb-0">4587 Orders</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2 pb-0">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-sm avatar-rounded bg-success me-2">
                        <i className="icon-check-check" />
                      </span>
                      <h6 className="fs-14 fw-medium mb-0">Delivery</h6>
                    </div>
                    <p className="fw-medium mb-0">3565 Orders</p>
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-lg-6 col-xxl-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-shopping-cart" />
                      </div>
                      <h5 className="mb-0">Active Orders</h5>
                    </div>
                    <Link
                      href={all_routes.orders}
                      className="btn btn-sm btn-white"
                    >
                      Add New
                    </Link>
                  </div>
                  <div className="d-flex align-items-sm-center justify-content-between gap-2 flex-column flex-sm-row mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-32.jpg"
                          alt="customer"
                          className="img-fluid"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h6 className="fs-14 fw-semibold mb-1">
                          Maria Gonzalez
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <p className="mb-0">Dine In</p>
                          <span className="even-line" />
                          <p className="mb-0">Table No : 3</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-purple">
                        In Kitchen
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center justify-content-between gap-2 flex-column flex-sm-row mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-35.jpg"
                          alt="customer"
                          className="img-fluid"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h6 className="fs-14 fw-semibold mb-1">
                          Andrew Fletcher
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <p className="mb-0">Reservation</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-danger">Cancelled</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center justify-content-between gap-2 flex-column flex-sm-row mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-34.jpg"
                          alt="customer"
                          className="img-fluid"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h6 className="fs-14 fw-semibold mb-1">Morgan Evans</h6>
                        <div className="d-flex align-items-center gap-2">
                          <p className="mb-0">Take Away</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-orange">Served</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center justify-content-between gap-2 flex-column flex-sm-row mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-rounded bg-light border me-2">
                        <i className="icon-users-round fs-16 text-dark " />
                      </div>
                      <div className="overflow-hidden">
                        <h6 className="fs-14 fw-semibold mb-1">
                          Walk in Customer
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <p className="mb-0">Dine In</p>
                          <span className="even-line" />
                          <p className="mb-0">Table No : 3</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-purple">
                        In Kitchen
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center justify-content-between gap-2 flex-column flex-sm-row mb-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-rounded bg-light border me-2">
                        <i className="icon-users-round fs-16 text-dark " />
                      </div>
                      <div className="overflow-hidden">
                        <h6 className="fs-14 fw-semibold mb-1">
                          Walk in Customer
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <p className="mb-0">Reservation</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-danger">Cancelled</span>
                    </div>
                  </div>
                  <Link
                    href={all_routes.orders}
                    className="btn btn-sm btn-secondary w-100"
                  >
                    View All
                  </Link>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-lg-12 col-xxl-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-chart-column-stacked" />
                      </div>
                      <h5 className="mb-0">Sales Performance</h5>
                    </div>
                    <Link
                      href={all_routes.salesReport}
                      className="btn btn-sm btn-white"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="mb-xl-4 mb-3">
                    <SalesChart />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border rounded position-relative p-2 position-relative p-2 z-1 overflow-hidden mb-3">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-md avatar-rounded bg-indigo me-2">
                        <i className="icon-shopping-bag fs-16" />
                      </span>
                      <div>
                        <p className="mb-1">Total Orders</p>
                        <h6 className="mb-0">6589</h6>
                      </div>
                    </div>
                    <span className="badge bg-success text-white rounded-pill">
                      +6%
                    </span>
                    <ImageWithBasePath
                      src="assets/img/bg/sale-bg.png"
                      alt="bg"
                      className="img-fluid z-n1 position-absolute start-0 top-0 custom-line-img"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between border rounded position-relative p-2 z-1 overflow-hidden mb-0">
                    <div className="d-flex align-items-center">
                      <span className="avatar avatar-md avatar-rounded bg-success me-2">
                        <i className="icon-shield-check fs-16" />
                      </span>
                      <div>
                        <p className="mb-1">Total Sales</p>
                        <h6 className="mb-0">$56589</h6>
                      </div>
                    </div>
                    <span className="badge bg-success text-white rounded-pill">
                      +12%
                    </span>
                    <ImageWithBasePath
                      src="assets/img/bg/sale-bg.png"
                      alt="bg"
                      className="img-fluid z-n1 position-absolute start-0 top-0 custom-line-img"
                    />
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
          {/* start row */}
          <div className="row">
            <div className="col-lg-12 col-xxl-8 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-book-text" />
                      </div>
                      <h5 className="mb-0">Trending Menus</h5>
                    </div>
                    <div className="dropdown">
                      <Link
                        href="#"
                        className="btn btn-sm btn-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        All Items
                      </Link>
                      <ul className="dropdown-menu p-3">
                        <li>
                          <Link href="#" className="dropdown-item">
                            All Items
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Sea Food
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Pizza
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="dropdown-item">
                            Salads
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-4 col-sm-6">
                      <div className="border p-3 rounded">
                        <div className="text-center mb-3">
                          <Link href="#">
                            <ImageWithBasePath
                              src="assets/img/menu/menu-01.jpg"
                              alt="menu"
                              className="img-fluid rounded w-100"
                            />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-1">
                            <Link href="#">Grilled Chicken</Link>
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">Orders : 48</p>
                            <p className="mb-0 d-inline-flex align-items-center">
                              <i className="icon-square-dot text-danger me-1" />
                              Non Veg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-md-4 col-sm-6">
                      <div className="border p-3 rounded">
                        <div className="text-center mb-3">
                          <Link href="#">
                            <ImageWithBasePath
                              src="assets/img/menu/menu-02.jpg"
                              alt="menu"
                              className="img-fluid rounded w-100"
                            />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-1">
                            <Link href="#">Grilled Veggie</Link>
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">Orders : 99</p>
                            <p className="mb-0 d-inline-flex align-items-center">
                              <i className="icon-square-dot text-danger me-1" />
                              Non Veg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-md-4 col-sm-6">
                      <div className="border p-3 rounded">
                        <div className="text-center mb-3">
                          <Link href="#">
                            <ImageWithBasePath
                              src="assets/img/menu/menu-03.jpg"
                              alt="menu"
                              className="img-fluid rounded w-100"
                            />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-1">
                            <Link href="#">Chicken Noodle</Link>
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">Orders : 59</p>
                            <p className="mb-0 d-inline-flex align-items-center">
                              <i className="icon-square-dot text-danger me-1" />
                              Non Veg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-md-4 col-sm-6">
                      <div className="border p-3 rounded">
                        <div className="text-center mb-3">
                          <Link href="#">
                            <ImageWithBasePath
                              src="assets/img/menu/menu-04.jpg"
                              alt="menu"
                              className="img-fluid rounded w-100"
                            />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-1">
                            <Link href="#">Corn Pizza</Link>
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">Orders : 69</p>
                            <p className="mb-0 d-inline-flex align-items-center">
                              <i className="icon-square-dot text-success me-1" />
                              Veg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-md-4 col-sm-6">
                      <div className="border p-3 rounded">
                        <div className="text-center mb-3">
                          <Link href="#">
                            <ImageWithBasePath
                              src="assets/img/menu/menu-05.jpg"
                              alt="menu"
                              className="img-fluid rounded w-100"
                            />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-1">
                            <Link href="#">Pumpkin Soup</Link>
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">Orders : 78</p>
                            <p className="mb-0 d-inline-flex align-items-center">
                              <i className="icon-square-dot text-success me-1" />
                              Veg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-md-4 col-sm-6">
                      <div className="border p-3 rounded">
                        <div className="text-center mb-3">
                          <Link href="#">
                            <ImageWithBasePath
                              src="assets/img/menu/menu-06.jpg"
                              alt="menu"
                              className="img-fluid rounded w-100"
                            />
                          </Link>
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-1">
                            <Link href="#">Hot Chocolate</Link>
                          </h6>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">Orders : 99</p>
                            <p className="mb-0 d-inline-flex align-items-center">
                              <i className="icon-square-dot text-success me-1" />
                              Veg
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-lg-12 col-xxl-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body d-flex flex-column pb-0">
                  <div>
                    <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                          <i className="icon-users-round" />
                        </div>
                        <h5 className="mb-0">User Statistics</h5>
                      </div>
                      <div className="dropdown">
                        <Link
                          href="#"
                          className="btn btn-sm btn-white dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-haspopup="false"
                          aria-expanded="false"
                        >
                          Weekly
                        </Link>
                        <ul className="dropdown-menu p-3">
                          <li>
                            <Link href="#" className="dropdown-item">
                              Weekly
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item">
                              Monthly
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="dropdown-item">
                              Yearly
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom mb-4 pb-4 flex-sm-row flex-wrap gap-2">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-xxl avatar-rounded flex-shrink-0 border me-2">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-05.jpg"
                            alt="user"
                            className="img-fluid"
                          />
                        </div>
                        <div>
                          <p className="fs-13 text-dark mb-1">Top User</p>
                          <h6 className="mb-0">Andrew Jessica</h6>
                        </div>
                      </div>
                      <div>
                        <p className="fs-13 text-dark mb-1">Grand Total</p>
                        <h6 className="mb-0">$800</h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <p className="mb-1">Total New Users</p>
                        <h6 className="mb-0">
                          986{" "}
                          <span className="d-inline-flex align-items-center text-success fs-13 fw-medium ms-1">
                            <i className="icon-circle-arrow-up me-1" />
                            12.6%
                          </span>
                        </h6>
                      </div>
                      <div className="avatar-list-stacked avatar-group-md">
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/profiles/avatar-27.jpg"
                            alt="user"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/profiles/avatar-33.jpg"
                            alt="user"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/profiles/avatar-35.jpg"
                            alt="user"
                          />
                        </span>
                        <span className="avatar avatar-rounded">
                          <ImageWithBasePath
                            className="border border-white"
                            src="assets/img/profiles/avatar-36.jpg"
                            alt="user"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <StatisticChart />
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
          {/* start row */}
          <div className="row">
            <div className="col-xxl-4 col-lg-12 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body pb-1">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-file-clock" />
                      </div>
                      <h5 className="mb-0">Reservations</h5>
                    </div>
                    <div className="dropdown">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-sm btn-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-haspopup="false"
                        aria-expanded="false"
                      >
                        All Orders
                      </a>
                      <ul className="dropdown-menu p-3">
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            All Orders
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            Pending
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            In Progress
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            Completed
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="dropdown-item"
                          >
                            Cancelled
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center flex-column flex-sm-row gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2 flex-fill">
                      <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                        <p className="text-white fw-semibold mb-0 position-relative">
                          Nov 08{" "}
                          <span className="fs-13 fw-normal d-block mt-1">
                            2025
                          </span>
                        </p>
                      </div>
                      <div>
                        <h6 className="mb-2 fw-semibold">Elijah Thoms</h6>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-clock me-1 text-dark me-1" />
                            10:45
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-sofa me-1 text-dark me-1" />2
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-users-round me-1 text-dark me-1" />
                            2
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-success">Booked</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center flex-column flex-sm-row gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2 flex-fill">
                      <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                        <p className="text-white fw-semibold mb-0 position-relative">
                          Nov 12{" "}
                          <span className="fs-13 fw-normal d-block mt-1">
                            2025
                          </span>
                        </p>
                      </div>
                      <div>
                        <h6 className="mb-2 fw-semibold">Liam O'Connor</h6>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-clock me-1 text-dark me-1" />
                            10:45
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-sofa me-1 text-dark me-1" />4
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-users-round me-1 text-dark me-1" />
                            5
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-success">Booked</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center flex-column flex-sm-row gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2 flex-fill">
                      <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                        <p className="text-white fw-semibold mb-0 position-relative">
                          Nov 06{" "}
                          <span className="fs-13 fw-normal d-block mt-1">
                            2025
                          </span>
                        </p>
                      </div>
                      <div>
                        <h6 className="mb-2 fw-semibold">Michael Cate</h6>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-clock me-1 text-dark me-1" />
                            10:45
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-sofa me-1 text-dark me-1" />8
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-users-round me-1 text-dark me-1" />
                            6
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-success">Booked</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center flex-column flex-sm-row gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2 flex-fill">
                      <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                        <p className="text-white fw-semibold mb-0 position-relative">
                          Nov 04{" "}
                          <span className="fs-13 fw-normal d-block mt-1">
                            2025
                          </span>
                        </p>
                      </div>
                      <div>
                        <h6 className="mb-2 fw-semibold">James Smith</h6>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-clock me-1 text-dark me-1" />
                            10:45
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-sofa me-1 text-dark me-1" />8
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-users-round me-1 text-dark me-1" />
                            5
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-purple">Paid</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-sm-center flex-column flex-sm-row gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2 flex-fill">
                      <div className="bg-dark reservation-date rounded p-2 text-center flex-shrink-0">
                        <p className="text-white fw-semibold mb-0 position-relative">
                          Nov 02{" "}
                          <span className="fs-13 fw-normal d-block mt-1">
                            2025
                          </span>
                        </p>
                      </div>
                      <div>
                        <h6 className="mb-2 text-truncate fw-semibold">
                          Walk in Customer
                        </h6>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-clock me-1 text-dark me-1" />
                            10:45
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-sofa me-1 text-dark me-1" />2
                          </p>
                          <span className="even-line" />
                          <p className="d-flex align-items-center mb-0">
                            <i className="icon-users-round me-1 text-dark me-1" />
                            5
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="badge badge-soft-danger">Cancelled</span>
                    </div>
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            {/* end col */}
            <div className="col-xxl-4 col-lg-6 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-concierge-bell" />
                      </div>
                      <h5 className="mb-0">Tables Available</h5>
                    </div>
                    <Link
                      href={all_routes.table}
                      className="btn btn-sm btn-white"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="row g-3">
                    <div className="col-sm-6 d-flex">
                      <div className="border p-3 rounded w-100 d-flex align-items-center justify-content-center">
                        <div className="position-relative text-center">
                          <ImageWithBasePath
                            src="assets/img/tables/tables-17.svg"
                            alt="reservation"
                            className="img-fluid custom-line-img"
                          />
                          <div className="position-absolute top-50 start-50 w-100 translate-middle text-center">
                            <h6 className="fs-12 fw-semibold mb-1">Table 01</h6>
                            <p className="fs-12 mb-0">Guests : 6</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-sm-6 d-flex">
                      <div className="border p-3 rounded w-100 d-flex align-items-center justify-content-center">
                        <div className="position-relative text-center">
                          <ImageWithBasePath
                            src="assets/img/tables/tables-18.svg"
                            alt="reservation"
                            className="img-fluid custom-line-img"
                          />
                          <div className="position-absolute top-50 start-50 w-100 translate-middle text-center">
                            <h6 className="fs-12 fw-semibold mb-1">Table 02</h6>
                            <p className="fs-12 mb-0">Guests : 6</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-sm-6 d-flex">
                      <div className="border p-3 rounded w-100 d-flex align-items-center justify-content-center">
                        <div className="position-relative text-center">
                          <ImageWithBasePath
                            src="assets/img/tables/tables-19.svg"
                            alt="reservation"
                            className="img-fluid custom-line-img"
                          />
                          <div className="position-absolute top-50 start-50 w-100 translate-middle text-center">
                            <h6 className="fs-12 fw-semibold mb-1">Table 03</h6>
                            <p className="fs-12 mb-0">Guests : 1</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-sm-6 d-flex">
                      <div className="border p-3 rounded w-100 d-flex align-items-center justify-content-center">
                        <div className="position-relative text-center">
                          <ImageWithBasePath
                            src="assets/img/tables/tables-17.svg"
                            alt="reservation"
                            className="img-fluid custom-line-img"
                          />
                          <div className="position-absolute top-50 start-50 w-100 translate-middle text-center">
                            <h6 className="fs-12 fw-semibold mb-1">Table 04</h6>
                            <p className="fs-12 mb-0">Guests : 6</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-sm-6 d-flex">
                      <div className="border p-3 rounded w-100 d-flex align-items-center justify-content-center">
                        <div className="position-relative text-center">
                          <ImageWithBasePath
                            src="assets/img/tables/tables-18.svg"
                            alt="reservation"
                            className="img-fluid custom-line-img"
                          />
                          <div className="position-absolute top-50 start-50 w-100 translate-middle text-center">
                            <h6 className="fs-12 fw-semibold mb-1">Table 05</h6>
                            <p className="fs-12 mb-0">Guests : 6</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                    <div className="col-sm-6 d-flex">
                      <div className="border p-3 rounded w-100 d-flex align-items-center justify-content-center">
                        <div className="position-relative text-center">
                          <ImageWithBasePath
                            src="assets/img/tables/tables-19.svg"
                            alt="reservation"
                            className="img-fluid custom-line-img"
                          />
                          <div className="position-absolute top-50 start-50 w-100 translate-middle text-center">
                            <h6 className="fs-12 fw-semibold mb-1">Table 06</h6>
                            <p className="fs-12 mb-0">Guests : 14</p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="col-xxl-4 col-lg-6 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom flex-wrap gap-2">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xs shadow border text-dark fs-14 me-2">
                        <i className="icon-bell" />
                      </div>
                      <h5 className="mb-0">Notifications</h5>
                    </div>
                    <Link
                      href={all_routes.notificationsSettings}
                      className="btn btn-sm btn-white"
                    >
                      View All
                    </Link>
                  </div>
                  <h6 className="mb-3">Today</h6>
                  <div className="log-wrap">
                    <div className="position-relative log-item">
                      <div className="d-flex gap-2 flex-sm-row flex-column mb-3">
                        <span className="avatar avatar-rounded flex-shrink-0 position-relative z-2 badge-soft-primary border border-primary">
                          <i className="icon-cooking-pot fs-16" />
                        </span>
                        <div className="w-100 overflow-hidden">
                          <p className="text-truncate mb-1">
                            New order from{" "}
                            <span className="text-dark fw-medium">
                              Table #12
                            </span>{" "}
                            (3 items){" "}
                          </p>
                          <p className="mb-0 fs-13 d-inline-flex align-items-center">
                            <i className="icon-clock me-1" />
                            20 min ago
                          </p>
                        </div>
                      </div>
                      <div className="d-flex gap-2 flex-sm-row flex-column mb-3">
                        <span className="avatar avatar-rounded flex-shrink-0 position-relative z-2 badge-soft-orange border border-orange">
                          <i className="icon-shopping-cart" />
                        </span>
                        <div className="w-100 overflow-hidden">
                          <p className="text-truncate mb-1">
                            New order from{" "}
                            <span className="text-dark fw-medium">
                              Table #12
                            </span>{" "}
                            (3 items){" "}
                          </p>
                          <p className="mb-0 fs-13 d-inline-flex align-items-center">
                            <i className="icon-clock me-1" />
                            20 min ago
                          </p>
                        </div>
                      </div>
                      <div className="d-flex gap-2 flex-sm-row flex-column mb-3">
                        <span className="avatar avatar-rounded flex-shrink-0 position-relative z-2 badge-soft-success border border-success">
                          <i className="icon-badge-dollar-sign fs-16" />
                        </span>
                        <div className="w-100 overflow-hidden">
                          <p className="text-truncate mb-1">
                            New order from{" "}
                            <span className="text-dark fw-medium">
                              Table #12
                            </span>{" "}
                            (3 items){" "}
                          </p>
                          <p className="mb-0 fs-13 d-inline-flex align-items-center">
                            <i className="icon-clock me-1" />
                            20 min ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h6 className="mb-3">Yesterday</h6>
                  <div className="log-wrap">
                    <div className="position-relative log-item">
                      <div className="d-flex gap-2 flex-sm-row flex-column mb-3">
                        <span className="avatar avatar-rounded flex-shrink-0 position-relative z-2 badge-soft-indigo border border-indigo">
                          <i className="icon-calendar-fold fs-16" />
                        </span>
                        <div className="w-100 overflow-hidden">
                          <p className="text-truncate mb-1">
                            New order from{" "}
                            <span className="text-dark fw-medium">
                              Table #12
                            </span>{" "}
                            (3 items){" "}
                          </p>
                          <p className="mb-0 fs-13 d-inline-flex align-items-center">
                            <i className="icon-clock me-1" />
                            40 Hrs Ago
                          </p>
                        </div>
                      </div>
                      <div className="d-flex gap-2 flex-sm-row flex-column mb-0">
                        <span className="avatar avatar-rounded flex-shrink-0 position-relative z-2 badge-soft-danger border border-danger">
                          <i className="icon-info fs-16" />
                        </span>
                        <div className="w-100 overflow-hidden">
                          <p className="text-truncate mb-1">
                            Low stock: Cheese{" "}
                            <span className="text-dark fw-medium">
                              (5 units left).
                            </span>
                          </p>
                          <p className="mb-0 fs-13 d-inline-flex align-items-center">
                            <i className="icon-clock me-1" />
                            40 Hrs Ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* End Content */}
      </div>
      {/* ========================
			End Page Content
		========================= */}
    </>
  );
};

export default DashboardComponent;
