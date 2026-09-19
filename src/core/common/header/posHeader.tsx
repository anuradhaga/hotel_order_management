"use client";
import React from "react";
import { useAppSelector } from "@/hooks/useReduxHooks";
import type { RootState } from "@/redux/store";
import { useEffect, useCallback, useState } from "react";
import { useThemeSettings } from "@/hooks/useThemeSettings";
import { all_routes } from "@/routes/all_routes";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "antd";
import { useAuth } from "@/components/authentication/auth-context/authContext";

const PosHeader = () => {
  const { handleUpdateTheme } = useThemeSettings();
  const location = usePathname();
  const { themeSettings } = useThemeSettings();
  const { user: authUser, logout } = useAuth();
  const mobileSidebar = useAppSelector(
    (state: RootState) => state.sidebar.mobileSidebar
  );
  const [currentUser, setCurrentUser] = useState<any>(authUser);

  useEffect(() => {
    if (authUser) {
      setCurrentUser(authUser);
    } else {
      try {
        const stored = localStorage.getItem("authUser");
        if (stored) {
          setCurrentUser(JSON.parse(stored));
        }
      } catch (e) {}
    }
  }, [authUser]);

  const handleDarkModeClick = useCallback(() => {
    handleUpdateTheme("data-bs-theme", "light");
  }, [handleUpdateTheme]);
  const handleLightModeClick = useCallback(() => {
    handleUpdateTheme("data-bs-theme", "dark");
  }, [handleUpdateTheme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const htmlElement = document.documentElement;
    if (!htmlElement) return;
    Object.entries(themeSettings).forEach(([key, value]) => {
      htmlElement.setAttribute?.(key as string, String(value));
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
      {/* Navbar Header */}
      <div className="header">
        <div className="container-fluid">
          <div className="header-menu">
            <div className="header-logo">
              <Link href={all_routes.dashboard} className="logo-dark">
                {" "}
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
              <Link href={all_routes.dashboard} className="logo-light">
                {" "}
                <ImageWithBasePath
                  src="assets/img/logo-white.svg"
                  alt="logo"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="navbar-header">
              <Link href={all_routes.dashboard} className="toggle-btn me-2">
                <i className="icon-grip" />
              </Link>
              {/* Search */}
              <div className="header-links d-lg-flex d-none">
                <Link
                  href={all_routes.pos}
                  className={`d-inline-flex align-items-center ${
                    location === all_routes.pos ? "active" : ""
                  }`}
                >
                  <i className="icon-hand-platter me-1" />
                  POS
                </Link>
                <Link
                  href={all_routes.orders}
                  className={`d-inline-flex align-items-center ${
                    location === all_routes.orders ? "active" : ""
                  }`}
                >
                  <i className="icon-list-todo me-1" />
                  Orders
                </Link>
                <Link
                  href={all_routes.kitchen}
                  className={`d-inline-flex align-items-center ${
                    location === all_routes.kitchen ? "active" : ""
                  }`}
                >
                  <i className="icon-drumstick me-1" />
                  Kitchen
                </Link>
                <Link
                  href={all_routes.reservations}
                  className={`d-inline-flex align-items-center ${
                    location === all_routes.reservations ? "active" : ""
                  }`}
                >
                  <i className="icon-file-clock me-1" />
                  Reservation
                </Link>
                <Link
                  href={all_routes.table}
                  className={`d-inline-flex align-items-center ${
                    location === all_routes.table ? "active" : ""
                  }`}
                >
                  <i className="icon-concierge-bell me-1" />
                  Table
                </Link>
              </div>
              <ul className="header-notification">
                <li className="d-none d-sm-flex">
                  <Tooltip title="Report">
                    <Link
                      href={all_routes.customerReport}
                      className="btn btn-icon"
                    >
                      <i className="icon-chart-column-stacked" />
                    </Link>
                  </Tooltip>
                </li>
                {/* Light/Dark Mode Button */}
                <li className="header-item d-flex">
                  {/* Light/Dark Mode Button */}
                  <div className="header-item d-flex ">
                    <Tooltip title="Dark/Light Mode">
                      <button
                        className={`topbar-link btn btn-icon ${
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
                        className={`topbar-link btn btn-icon ${
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
                </li>
                <li>
                  <div>
                    <button
                      className="btn-icon btn notification"
                      type="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-haspopup="true"
                      aria-expanded="false"
                      aria-label="Notifications"
                    >
                      <i className="icon-bell" />
                    </button>
                    <div className="dropdown-menu dropdown-menu-xl notification-dropdown mt-2">
                      <div className="d-flex align-items-center justify-content-between notification-header">
                        <h5 className="mb-0">Notifications</h5>
                        <Link href="#" className="link-primary">
                          Mark all as unread
                        </Link>
                      </div>
                      <div className="notification-body" data-simplebar="">
                        <ul className="nav nav-tabs p-1 bg-light rounded border-0 nav-solid-white mb-3">
                          <li className="nav-item">
                            <Link
                              href="#all-notification"
                              data-bs-toggle="tab"
                              aria-expanded="true"
                              className="nav-link active d-flex align-items-center py-1 px-2"
                            >
                              All
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="#unread-notification"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                              className="nav-link d-flex align-items-center py-1 px-2"
                            >
                              Unread <span className="badge-icon ms-1">4</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="#inbox-notification"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                              className="nav-link d-flex align-items-center py-1 px-2"
                            >
                              Inbox
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="#kitchen-notification"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                              className="nav-link d-flex align-items-center py-1 px-2"
                            >
                              Kitchen <span className="badge-icon ms-1">5</span>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              href="#order-notification"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                              className="nav-link d-flex align-items-center py-1 px-2"
                            >
                              Orders
                            </Link>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div
                            className="tab-pane fade show active"
                            id="all-notification"
                          >
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">Today</h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-secondary border border-secondary">
                                    <i className="icon-cooking-pot" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order from{" "}
                                      <span className="text-dark fw-medium">
                                        Table #12
                                      </span>{" "}
                                      (3 items) pending.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      20 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-orange border border-orange">
                                    <i className="icon-shopping-cart" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      <span className="text-dark fw-medium">
                                        Order #124
                                      </span>{" "}
                                      confirmed and sent to the kitchen.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      35 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-success border border-success">
                                    <i className="icon-badge-dollar-sign" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      <span className="text-dark fw-medium">
                                        $850
                                      </span>{" "}
                                      received via UPI for{" "}
                                      <span className="text-dark fw-medium">
                                        Order #124.
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      40 Min Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-success border border-success">
                                    <i className="icon-square-pen" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order has been created{" "}
                                      <span className="text-dark fw-medium">
                                        Dine
                                      </span>{" "}
                                      in for{" "}
                                      <span className="text-dark fw-medium">
                                        Table 1
                                      </span>{" "}
                                      total{" "}
                                      <span className="text-dark fw-medium">
                                        20 Items
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      45 Min Ago
                                    </p>
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-primary"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-white"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">
                                Yesterday
                              </h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-danger border border-danger">
                                    <i className="icon-info" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      Low stock: Cheese{" "}
                                      <span className="text-dark fw-medium">
                                        (5 units left).
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      10 Hrs Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-indigo border border-indigo">
                                    <i className="icon-calendar-fold" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      Table reservation for Andrew Merkel at{" "}
                                      <span className="text-dark fw-medium">
                                        7:30 PM.
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      40 Hrs Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="unread-notification"
                          >
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">Today</h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-secondary border border-secondary">
                                    <i className="icon-cooking-pot" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order from{" "}
                                      <span className="text-dark fw-medium">
                                        Table #12
                                      </span>{" "}
                                      (3 items) pending.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      20 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-orange border border-orange">
                                    <i className="icon-shopping-cart" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      <span className="text-dark fw-medium">
                                        Order #124
                                      </span>{" "}
                                      confirmed and sent to the kitchen.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      35 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">
                                Yesterday
                              </h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-danger border border-danger">
                                    <i className="icon-info" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      Low stock: Cheese{" "}
                                      <span className="text-dark fw-medium">
                                        (5 units left).
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      10 Hrs Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-indigo border border-indigo">
                                    <i className="icon-calendar-fold" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      Table reservation for Andrew Merkel at{" "}
                                      <span className="text-dark fw-medium">
                                        7:30 PM.
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      40 Hrs Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="inbox-notification"
                          >
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">Today</h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-success border border-success">
                                    <i className="icon-badge-dollar-sign" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      <span className="text-dark fw-medium">
                                        $850
                                      </span>{" "}
                                      received via UPI for{" "}
                                      <span className="text-dark fw-medium">
                                        Order #124.
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      40 Min Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-success border border-success">
                                    <i className="icon-square-pen" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order has been created{" "}
                                      <span className="text-dark fw-medium">
                                        Dine
                                      </span>{" "}
                                      in for{" "}
                                      <span className="text-dark fw-medium">
                                        Table 1
                                      </span>{" "}
                                      total{" "}
                                      <span className="text-dark fw-medium">
                                        20 Items
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      45 Min Ago
                                    </p>
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-primary"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-white"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="kitchen-notification"
                          >
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">Today</h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-orange border border-orange">
                                    <i className="icon-shopping-cart" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      <span className="text-dark fw-medium">
                                        Order #124
                                      </span>{" "}
                                      confirmed and sent to the kitchen.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      35 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-secondary border border-secondary">
                                    <i className="icon-cooking-pot" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order from{" "}
                                      <span className="text-dark fw-medium">
                                        Table #12
                                      </span>{" "}
                                      (3 items) pending.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      20 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">
                                Yesterday
                              </h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-indigo border border-indigo">
                                    <i className="icon-calendar-fold" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      Table reservation for Andrew Merkel at{" "}
                                      <span className="text-dark fw-medium">
                                        7:30 PM.
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      40 Hrs Ago
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="order-notification"
                          >
                            <div className="notification-list">
                              <h6 className="fs-14 fw-semibold mb-3">Today</h6>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-secondary border border-secondary">
                                    <i className="icon-cooking-pot" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order from{" "}
                                      <span className="text-dark fw-medium">
                                        Table #12
                                      </span>{" "}
                                      (3 items) pending.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      20 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-orange border border-orange">
                                    <i className="icon-shopping-cart" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      <span className="text-dark fw-medium">
                                        Order #124
                                      </span>{" "}
                                      confirmed and sent to the kitchen.
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      35 Min Ago
                                    </p>
                                  </div>
                                </div>
                                <div className="notification-action">
                                  <Link
                                    href="javascript:void(0);"
                                    className="notification-read rounded-circle bg-success"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Make as Read"
                                    aria-label="Make as Read"
                                  />
                                </div>
                              </div>
                              {/* Item*/}
                              <div className="notification-item">
                                <div className="d-flex">
                                  <div className="me-2 avatar avatar-rounded flex-shrink-0 badge-soft-success border border-success">
                                    <i className="icon-square-pen" />
                                  </div>
                                  <div className="flex-grow-1">
                                    <p className="mb-1">
                                      New order has been created{" "}
                                      <span className="text-dark fw-medium">
                                        Dine
                                      </span>{" "}
                                      in for{" "}
                                      <span className="text-dark fw-medium">
                                        Table 1
                                      </span>{" "}
                                      total{" "}
                                      <span className="text-dark fw-medium">
                                        20 Items
                                      </span>
                                    </p>
                                    <p className="fs-13 mb-0 d-inline-flex align-items-center">
                                      <i className="icon-clock me-1" />
                                      45 Min Ago
                                    </p>
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-primary"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-white"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <Tooltip title="Settings">
                    <Link
                      href={all_routes.taxSettings}
                      className="btn btn-icon"
                    >
                      <i className="icon-cog" />
                    </Link>
                  </Tooltip>
                </li>
                <li>
                  <div>
                    <button
                      className="btn-icon profile-icon"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      aria-label="Actions"
                    >
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt="img-fluid img-1"
                      />
                    </button>
                    <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md mt-2">
                      <div className="dropdown-header border-bottom p-3">
                        <div className="d-flex align-items-center justify-content-between gap-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-lg avatar-rounded border border-success">
                              <ImageWithBasePath
                                src="assets/img/profiles/avatar-27.jpg"
                                className="rounded-circle"
                                alt="user"
                              />
                            </div>
                            <div className="ms-2">
                              <h5 className="mb-1 fs-14 fw-semibold text-truncate" style={{ maxWidth: 180 }}>
                                {currentUser?.full_name || "Adrian James"}
                              </h5>
                              <span className="d-block fs-13 text-muted">
                                {currentUser?.role_code || "Administrator"} {currentUser?.username ? `(@${currentUser.username})` : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        {/* Item*/}
                        <Link
                          href={all_routes.storeSettings}
                          className="dropdown-item"
                        >
                          <i className="icon-warehouse me-2 fs-16 align-middle" />
                          <span className="align-middle">Store Settings</span>
                        </Link>
                        {/* Item*/}
                        <Link
                          href={all_routes.rolePermissions}
                          className="dropdown-item"
                        >
                          <i className="icon-shield-ellipsis me-2 fs-16 align-middle" />
                          <span className="align-middle">
                            Roles &amp; Permisisons
                          </span>
                        </Link>
                        {/* Item*/}
                        <Link
                          href={all_routes.auditReport}
                          className="dropdown-item"
                        >
                          <i className="icon-clock-arrow-down me-2 fs-16 align-middle" />
                          <span className="align-middle">Audit Logs</span>
                        </Link>
                        {/* Item*/}
                        <Link href={all_routes.users} className="dropdown-item">
                          <i className="icon-user-pen me-2 fs-16 align-middle" />
                          <span className="align-middle">Manage Staffs</span>
                        </Link>
                      </div>
                      <div className="p-3 border-top">
                        <button
                          type="button"
                          onClick={logout}
                          className="btn btn-white btn-sm w-100"
                        >
                          <i className="icon-log-in me-1" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar Header */}
    </>
  );
};

export default React.memo(PosHeader);
