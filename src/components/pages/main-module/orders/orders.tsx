"use client";
import { useEffect } from "react";
import { all_routes } from "@/routes/all_routes";
import OrdersModal from "./ordersModal";
import Link from "next/link";
import PredefinedDatePicker from "@/core/common/common-date-range-picker/PredefinedDatePicker";

const OrdersComponent = () => {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const moreMenu = card.querySelector<HTMLElement>(".more-menu");
      const viewAllBtn =
        card.querySelector<HTMLButtonElement>(".viewall-button");

      if (!moreMenu || !viewAllBtn) {
        return;
      }

      moreMenu.classList.add("d-none");
      const collapsedLabel = viewAllBtn.textContent?.trim() || "+ More Items";
      const expandedLabel = "Show Less";

      const toggleMenu = () => {
        const isExpanded = !moreMenu.classList.contains("d-none");
        moreMenu.classList.toggle("d-none");
        viewAllBtn.textContent = isExpanded ? collapsedLabel : expandedLabel;
      };

      viewAllBtn.addEventListener("click", toggleMenu);
      cleanups.push(() => viewAllBtn.removeEventListener("click", toggleMenu));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

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
                Orders{" "}
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <div>
                <PredefinedDatePicker />
              </div>
              <Link
                href={all_routes.pos}
                className="btn btn-primary d-inline-flex align-items-center"
              >
                <i className="icon-circle-plus me-1" />
                Add New
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start row */}
          <div className="row orders-list-four">
            <div className="col-xxl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <span className="fs-13 fw-medium mb-1 d-block">
                        Confirmed
                      </span>
                      <h4 className="mb-0">98</h4>
                    </div>
                    <div className="avatar bg-soft-secondary fs-20 rounded-circle flex-shrink-0">
                      <i className="icon-bookmark-check" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xxl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <span className="fs-13 fw-medium mb-1 d-block">
                        Pending
                      </span>
                      <h4 className="mb-0">32</h4>
                    </div>
                    <div className="avatar bg-soft-primary fs-20 rounded-circle flex-shrink-0">
                      <i className="icon-circle-arrow-out-down-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xxl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <span className="fs-13 fw-medium mb-1 d-block">
                        Processing
                      </span>
                      <h4 className="mb-0">66</h4>
                    </div>
                    <div className="avatar bg-soft-orange fs-20 rounded-circle flex-shrink-0">
                      <i className="icon-loader" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xxl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <span className="fs-13 fw-medium mb-1 d-block">
                        Out For Delivery
                      </span>
                      <h4 className="mb-0">45</h4>
                    </div>
                    <div className="avatar bg-soft-purple fs-20 rounded-circle flex-shrink-0">
                      <i className="icon-bike" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xxl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <span className="fs-13 fw-medium mb-1 d-block">
                        Delivered
                      </span>
                      <h4 className="mb-0">69</h4>
                    </div>
                    <div className="avatar badge-soft-success fs-20 rounded-circle flex-shrink-0">
                      <i className="icon-send" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
            <div className="col-xxl-2 col-lg-4 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <span className="fs-13 fw-medium mb-1 d-block">
                        Cancelled
                      </span>
                      <h4 className="mb-0">18</h4>
                    </div>
                    <div className="avatar bg-soft-danger fs-20 rounded-circle flex-shrink-0">
                      <i className="icon-user-x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* End row */}
          {/* Start Tabs */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 pb-4 mb-4 border-bottom">
            <ul className="nav nav-tabs nav-tabs-solid border-0" role="tablist">
              <li className="nav-item">
                <Link
                  href="#order-tab1"
                  className="nav-link active"
                  data-bs-toggle="tab"
                >
                  All Orders (48)
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#order-tab2"
                  className="nav-link"
                  data-bs-toggle="tab"
                >
                  Pending (12)
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#order-tab3"
                  className="nav-link"
                  data-bs-toggle="tab"
                >
                  In Progress (12)
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#order-tab4"
                  className="nav-link"
                  data-bs-toggle="tab"
                >
                  Completed (22)
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="#order-tab5"
                  className="nav-link"
                  data-bs-toggle="tab"
                >
                  Cancelled (2)
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="active-item d-flex align-items-center justify-content-between gap-1 p-1 border rounded bg-white">
                <Link
                  href={all_routes.orders}
                  className="btn btn-sm btn-icon btn-primary"
                  aria-label="grid"
                >
                  <i className="icon-grid-2x2" />
                </Link>
                <Link
                  href={all_routes.kanbanView}
                  className="btn btn-sm btn-icon"
                  aria-label="kanban"
                >
                  <i className="icon-square-kanban" />
                </Link>
              </div>
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
          {/* End Tabs */}
          <div className="tab-content">
            {/* TAb 1 */}
            <div className="tab-pane show active" id="order-tab1">
              {/* Start row */}
              <div className="row">
                {/* Item 1 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #56998
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Dine In <span className="text-light">|</span>{" "}
                              Table No : 3
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 24
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 06:24 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Chicken{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Chicken Taco - Medium
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Lobster Thermidor
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Caesar Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Pumpkin Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57001
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Take Away
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 25
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 06:55 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Vegan Burger{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Sweet Potato Fries
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Chocolate Lava Cake
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Caesar Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Pumpkin Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57002
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Delivery
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 26
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:00 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Margherita Pizza{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Pasta Primavera
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Grilled Salmon Steak
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Cheese Burst Pizza
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Chicken Noodle Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 4 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57004
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Take Away
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 28
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:30 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Margherita Pizza{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×2</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Caesar Salad
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Corn Pizza
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Shrimp Tom Yum
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Tomato Basil Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-purple mb-0">Paid</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 5 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57003
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Dine In <span className="text-light">|</span>{" "}
                              Table No : 7
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 27
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:15 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Steak Frites
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Mushroom Risotto
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Tiramisu
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Quinoa Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Lemon Mint Juice
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 6 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57005{" "}
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Dine In <span className="text-light">|</span>{" "}
                              Table No : 9
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 29
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:25 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Lobster Pasta
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Garlic Bread
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Chicken Taco
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Garlic Butter Shrimp
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Cheese Burst Pizza
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-purple mb-0">Paid</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End row */}
            </div>
            {/* TAb 2 */}
            <div className="tab-pane show" id="order-tab2">
              {/* Start row */}
              <div className="row">
                {/* Item 1 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #56998
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Dine In <span className="text-light">|</span>{" "}
                              Table No : 3
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 24
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 06:24 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Chicken{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Chicken Taco - Medium
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Lobster Thermidor
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Caesar Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Pumpkin Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57001
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Take Away
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 25
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 06:55 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Vegan Burger{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Sweet Potato Fries
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Chocolate Lava Cake
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Caesar Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Tomato Basil Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57002
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Delivery
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 26
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:00 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Chicken{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Chicken Noodle
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Salmon Steak
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Cheese Burst Pizza
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Chicken Noodle Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End row */}
            </div>
            {/* TAb 3 */}
            <div className="tab-pane show" id="order-tab3">
              {/* Start row */}
              <div className="row">
                {/* Item 2 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57001
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Take Away
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 25
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 06:55 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Vegan Burger{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Sweet Potato Fries
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Chocolate Lava Cake
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Caesar Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Pumpkin Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57002
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Delivery
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 26
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:00 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Chicken{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Chicken Noodle
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Salmon Steak
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Cheese Burst Pizza
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Chicken Noodle Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End row */}
            </div>
            {/* TAb 4 */}
            <div className="tab-pane show" id="order-tab4">
              {/* Start row */}
              <div className="row">
                {/* Item 2 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57001
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Take Away
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 25
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 06:55 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Vegan Burger{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Sweet Potato Fries
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Chocolate Lava Cake
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Caesar Salad
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Pumpkin Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57002
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Delivery
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 26
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:00 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Chicken Noodle Soup{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Grilled Chicken
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Salmon Steak
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Grilled Burst Chiken
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Chicken Noodle
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 6 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57005{" "}
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Dine In <span className="text-light">|</span>{" "}
                              Table No : 9
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 29
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:25 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Shrimp Tom Yum
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Garlic Bread
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Quinoa Salad
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Garlic Butter Shrimp
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Cheese Burst Pizza
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-purple mb-0">Paid</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End row */}
            </div>
            {/* TAb 5 */}
            <div className="tab-pane show" id="order-tab5">
              {/* Start row */}
              <div className="row">
                {/* Item 3 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57002
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Delivery
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 26
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:00 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Chicken Taco{" "}
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot" />
                              Chicken Soup
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot" />
                              Grilled Salmon Steak
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Chicken Noodle
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot" />
                                Chicken Noodle Soup
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-success mb-0">Billed</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Item 6 */}
                <div className="col-xxl-4 col-xl-6 col-md-6 d-flex">
                  {/* Start card */}
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                          <div className="avatar avatar-lg bg-primary rounded-circle">
                            <i className="icon-shopping-bag" />
                          </div>
                          <div>
                            <h6 className="mb-1 fs-14 fw-semibold">
                              <Link
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#view_details"
                              >
                                #57005{" "}
                              </Link>
                            </h6>
                            <p className="mb-0 d-flex align-items-center gap-2">
                              Dine In <span className="text-light">|</span>{" "}
                              Table No : 9
                            </p>
                          </div>
                        </div>
                        <div className="dropstart">
                          <button
                            className="btn btn-sm btn-icon btn-white rounded-circle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            aria-label="Actions"
                          >
                            <i className="icon-ellipsis-vertical" />
                          </button>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link
                                href={all_routes.pos}
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-pencil-line me-2" />
                                Edit Order
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                              >
                                <i className="icon-check-check me-2" />
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="icon-x me-2" />
                                Cancel
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#pay_complete_order"
                              >
                                <i className="icon-pointer me-2" />
                                Pay &amp; CompIete
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="#"
                                className="dropdown-item rounded d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#print_reciept"
                              >
                                <i className="icon-printer me-2" />
                                Print Receipt
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <p className="mb-0 fs-14 fw-semibold text-dark">
                          <span className="fw-normal">Token No :</span> 29
                        </p>
                        <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                          <i className="icon-clock fs-14" /> 07:25 PM
                        </h6>
                      </div>
                      <div className="mb-3 pb-3 border-bottom">
                        <div className="orders-list">
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Lobster Pasta
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="orders text-dark mb-2">
                            <p>
                              <span className="dot success" />
                              Garlic Bread
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="bg-light rounded py-1 px-2 mb-3">
                            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                              {" "}
                              <i className="icon-badge-info me-1" /> Notes :
                              Extra Spicy
                            </p>
                          </div>
                          <div className="orders text-dark mb-3">
                            <p>
                              <span className="dot success" />
                              Chicken Taco
                            </p>
                            <span className="line" />
                            <p className="text-dark">×1</p>
                          </div>
                          <div className="more-menu">
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Garlic Butter Shrimp
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                            <div className="orders text-dark mb-3">
                              <p>
                                <span className="dot success" />
                                Cheese Burst Pizza
                              </p>
                              <span className="line" />
                              <p className="text-dark">×1</p>
                            </div>
                          </div>
                          <div className="view-all mt-1">
                            <button className="fw-semibold fs-14 mb-0 text-primary viewall-button">
                              +2 More Items
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <p className="badge badge-soft-purple mb-0">Paid</p>
                        <div className="dropdown">
                          <Link
                            href="#"
                            className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            Pending
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Pending
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Preparing
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Served
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                Delivered
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CompIete
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item rounded">
                                CanceI
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End row */}
            </div>
          </div>
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
      <OrdersModal />
    </>
  );
};

export default OrdersComponent;
