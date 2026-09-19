"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import type { RootState } from "@/redux/store";
import { setMobileSidebar } from "@/redux/sidebarSlice";
import { useEffect, useCallback } from "react";
import { useThemeSettings } from "@/hooks/useThemeSettings";
import { all_routes } from "@/routes/all_routes";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "antd";

const Header = () => {
  const dispatch = useAppDispatch();
  const { handleUpdateTheme } = useThemeSettings();
  const { themeSettings } = useThemeSettings();
  const mobileSidebar = useAppSelector(
    (state: RootState) => state.sidebar.mobileSidebar
  );
  const pathname = usePathname();

  const isActive = (route: string) => (pathname === route ? "active" : "");
  const toggleMobileSidebar = useCallback(() => {
    dispatch(setMobileSidebar(!mobileSidebar));
  }, [dispatch, mobileSidebar]);

  const handleDarkModeClick = useCallback(() => {
    handleUpdateTheme("data-bs-theme", "light");
  }, [handleUpdateTheme]);
  const handleLightModeClick = useCallback(() => {
    handleUpdateTheme("data-bs-theme", "dark");
  }, [handleUpdateTheme]);

  useEffect(() => {
    const htmlElement = document.documentElement as HTMLElement;
    Object.entries(themeSettings).forEach(([key, value]) => {
      htmlElement.setAttribute(key as string, String(value));
    });
  }, [themeSettings]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const htmlElement = document.documentElement;
    const mainWrapper = document.querySelector(".main-wrapper");

    if (mobileSidebar) {
      if (htmlElement?.classList) htmlElement.classList.add("menu-opened");
      if (mainWrapper?.classList) mainWrapper.classList.add("slide-nav");
    } else {
      if (htmlElement?.classList) htmlElement.classList.remove("menu-opened");
      if (mainWrapper?.classList) mainWrapper.classList.remove("slide-nav");
    }

    return () => {
      if (htmlElement?.classList) htmlElement.classList.remove("menu-opened");
      if (mainWrapper?.classList) mainWrapper.classList.remove("slide-nav");
    };
  }, [mobileSidebar]);

  return (
    <>
      {/* Topbar Start */}
      <header className="navbar-header">
        <div className="topbar-menu">
          <div className="d-flex align-items-center gap-2">
            {/* Logo */}
            <Link href={all_routes.dashboard} className="logo">
              {/* Logo Normal */}
              <span className="logo-light">
                <span className="logo-lg">
                  <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                </span>
                <span className="logo-sm">
                  <ImageWithBasePath
                    src="assets/img/logo-small.svg"
                    alt="small logo"
                  />
                </span>
              </span>
              {/* Logo Dark */}
              <span className="logo-dark">
                <span className="logo-lg">
                  <ImageWithBasePath
                    src="assets/img/logo-white.svg"
                    alt="dark logo"
                  />
                </span>
              </span>
            </Link>
            {/* Sidebar Mobile Button */}
            <Link
              id="mobile_btn"
              className="mobile-btn"
              href="#sidebar"
              onClick={toggleMobileSidebar}
              aria-label="Toggle Mobile Sidebar"
            >
              <i className="icon-menu fs-24" />
            </Link>
            {/* Search */}
            <div className="header-links d-lg-flex d-none">
              <Link
                href={all_routes.pos}
                className={`d-inline-flex align-items-center ${isActive(
                  all_routes.pos
                )}`}
              >
                <i className="icon-hand-platter me-1" />
                POS
              </Link>

              <Link
                href={all_routes.orders}
                className={`d-inline-flex align-items-center ${isActive(
                  all_routes.orders && all_routes.kanbanView
                )}`}
              >
                <i className="icon-list-todo me-1" />
                Orders
              </Link>

              <Link
                href={all_routes.kitchen}
                className={`d-inline-flex align-items-center ${isActive(
                  all_routes.kitchen
                )}`}
              >
                <i className="icon-drumstick me-1" />
                Kitchen
              </Link>

              <Link
                href={all_routes.reservations}
                className={`d-inline-flex align-items-center ${isActive(
                  all_routes.reservations
                )}`}
              >
                <i className="icon-file-clock me-1" />
                Reservation
              </Link>

              <Link
                href={all_routes.table}
                className={`d-inline-flex align-items-center ${isActive(
                  all_routes.table
                )}`}
              >
                <i className="icon-concierge-bell me-1" />
                Table
              </Link>
            </div>
          </div>
          <div className="d-flex align-items-center header-list">
            {/* Upgrade Button */}
            <div className="header-item d-none d-sm-flex">
              <Link
                href="#"
                className="btn btn-sm btn-primary d-inline-flex align-items-center"
              >
                <i className="icon-crown me-1" />
                Upgrade
              </Link>
            </div>
            {/* Search Button */}
            <div className="header-item d-flex">
              <button
                className="topbar-link btn btn-icon"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
                type="button"
                aria-label="search"
              >
                <i className="icon-search fs-16" />
              </button>
            </div>
            {/* Report Button */}
            <div className="header-item d-none d-sm-flex">
              <Tooltip title="Report">
                <Link
                  href={all_routes.earningReport}
                  className="topbar-link btn btn-icon"
                  aria-label="report"
                >
                  <i className="icon-chart-column-stacked fs-16" />
                  <span className="position-absolute report-badge bg-success" />
                </Link>
              </Tooltip>
            </div>
            {/* Light/Dark Mode Button */}
            <div className="header-item d-flex ">
              <Tooltip title="Dark/Light Mode">
                <button
                  className={`topbar-link btn topbar-link ${
                    themeSettings["mode"] === "dark" ? "active" : ""
                  }`}
                  id="dark-mode-toggle"
                  type="button"
                  onClick={handleDarkModeClick}
                  aria-label="Switch to light mode"
                >
                  <i className="icon-sun fs-16" aria-hidden="true" />
                </button>
              </Tooltip>
              <Tooltip title="Dark/Light Mode">
                <button
                  className={`topbar-link btn topbar-link ${
                    themeSettings["mode"] === "light" ? "active" : ""
                  }`}
                  id="light-mode-toggle"
                  type="button"
                  onClick={handleLightModeClick}
                  aria-label="Switch to dark mode"
                >
                  <i className="icon-moon fs-16" aria-hidden="true" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>
      {/* Topbar End */}
      <>
        {/* Search Modal */}
        <div className="modal fade" id="searchModal">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="mb-0">Search</h5>
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
                <div className="input-group input-group-flat mb-4">
                  <input
                    type="text"
                    className="form-control form-control-lg fs-14"
                    placeholder="Search your keyword"
                  />
                  <span className="input-group-text">
                    <i className="icon-search text-dark" />
                  </span>
                </div>
                <ul className="nav nav-tabs nav-bordered nav-bordered-primary mb-4">
                  <li className="nav-item">
                    <Link
                      href="#customer-tab"
                      data-bs-toggle="tab"
                      aria-expanded="false"
                      className="nav-link active d-flex align-items-center"
                    >
                      <i className="icon-badge-dollar-sign me-2" />
                      Customer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="#orders-tab"
                      data-bs-toggle="tab"
                      aria-expanded="true"
                      className="nav-link d-flex align-items-center"
                    >
                      <i className="icon-badge-dollar-sign me-2" />
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="#kitchen-tab"
                      data-bs-toggle="tab"
                      aria-expanded="false"
                      className="nav-link d-flex align-items-center"
                    >
                      <i className="icon-shopping-bag me-2" />
                      Kitchen
                    </Link>
                  </li>
                </ul>
                <div className="tab-content pt-1">
                  <div className="tab-pane fade show active" id="customer-tab">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded me-2">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-32.jpg"
                            alt="customer"
                          />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Adrian James
                          </h6>
                          <p className="fs-13 mb-0">Male</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#CR6569</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded me-2">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-33.jpg"
                            alt="customer"
                          />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">Sue Allen</h6>
                          <p className="fs-13 mb-0">Female</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#CR6569</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded me-2">
                          <ImageWithBasePath
                            src="assets/img/profiles/avatar-31.jpg"
                            alt="customer"
                          />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Frank Barrett
                          </h6>
                          <p className="fs-13 mb-0">Male</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#CR4824</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pb-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark border me-2">
                          <i className="icon-user fs-20" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Walkin Customer
                          </h6>
                          <p className="fs-13 mb-0">Male</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#CR8238</span>
                    </div>
                    <Link
                      href={all_routes.customer}
                      className="btn btn-sm btn-white d-inline-flex align-items-center w-100 mt-1"
                    >
                      View All
                      <i className="icon-arrow-right ms-1" />
                    </Link>
                  </div>
                  <div className="tab-pane fade" id="orders-tab">
                    <div className="d-flex align-items-sm-center justify-content-between flex-column gap-2 flex-sm-row pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-shopping-bag fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">#56998</h6>
                          <div className="d-flex align-items-center gap-2">
                            <p className="mb-0">Dine In</p>
                            <span className="even-line" />
                            <p className="mb-0">Table No : 3</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="badge bg-light text-dark">
                          Token No : 27
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-sm-center justify-content-between flex-column gap-2 flex-sm-row pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-shopping-bag fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">#57001</h6>
                          <div className="d-flex align-items-center gap-2">
                            <p className="mb-0">Take Away</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="badge bg-light text-dark">
                          Token No : 26
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-sm-center justify-content-between flex-column gap-2 flex-sm-row pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-shopping-bag fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">#56998</h6>
                          <div className="d-flex align-items-center gap-2">
                            <p className="mb-0">Dine In</p>
                            <span className="even-line" />
                            <p className="mb-0">Table No : 3</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="badge bg-light text-dark">
                          Token No : 27
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-sm-center justify-content-between flex-column gap-2 flex-sm-row pb-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-shopping-bag fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">#57002</h6>
                          <div className="d-flex align-items-center gap-2">
                            <p className="mb-0">Delivery</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="badge bg-light text-dark">
                          Token No : 25
                        </span>
                      </div>
                    </div>
                    <Link
                      href={all_routes.orders}
                      className="btn btn-sm btn-white d-inline-flex align-items-center w-100 mt-1"
                    >
                      View All
                      <i className="icon-arrow-right ms-1" />
                    </Link>
                    <div className="text-center d-none">
                      <ImageWithBasePath
                        src="assets/img/icons/search.svg"
                        alt="search icon"
                        className="img-fluid mb-4"
                      />
                      <h4 className="mb-1">No Results Found</h4>
                      <p className="mb-0">
                        Refine your query to discover relevant items
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="kitchen-tab">
                    <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-hand-platter fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Andrew Brooks
                          </h6>
                          <p className="fs-13 mb-0">#14751</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">T#23896</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-hand-platter fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Walk in Customer
                          </h6>
                          <p className="fs-13 mb-0">Take Away</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#14547</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-hand-platter fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Elijah Thompson
                          </h6>
                          <p className="fs-13 mb-0">Take Away</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#98765</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pb-3">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-rounded bg-light text-dark me-2">
                          <i className="icon-hand-platter fs-24" />
                        </div>
                        <div>
                          <h6 className="fs-14 fw-semibold mb-1">
                            Jennifer Brooks
                          </h6>
                          <p className="fs-13 mb-0">DineIn</p>
                        </div>
                      </div>
                      <span className="badge bg-light text-dark">#23896</span>
                    </div>
                    <Link
                      href={all_routes.kitchen}
                      className="btn btn-sm btn-white d-inline-flex align-items-center w-100 mt-1"
                    >
                      View All
                      <i className="icon-arrow-right ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default React.memo(Header);
