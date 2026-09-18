"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { setMobileSidebar } from "@/redux/sidebarSlice";
import "overlayscrollbars/overlayscrollbars.css";
import { sidebarTabData } from "./sidebarData";
import ImageWithBasePath from "../image-with-base-path";
import { all_routes } from "@/routes/all_routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isRouteMatch = (currentPath: string, targetPath: string) =>
  currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

type SidebarItem = {
  link: string;
  relativeLinks?: string[];
};

const doesItemMatchRoute = (path: string, item: SidebarItem) =>
  isRouteMatch(path, item.link) ||
  (item.relativeLinks?.some((relative) => isRouteMatch(path, relative)) ??
    false);

const getTabIdByRoute = (path: string) => {
  for (const tab of sidebarTabData) {
    for (const section of tab.section) {
      for (const item of section.items) {
        if (doesItemMatchRoute(path, item)) {
          return tab.id;
        }
      }
    }
  }
  return null;
};

const Sidebar = () => {
  const location = usePathname();
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(
    () => getTabIdByRoute(location) ?? sidebarTabData[0]?.id ?? ""
  );

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      if (newState) {
        document?.body?.classList?.add("mini-sidebar");
        document?.body?.classList?.remove("expand-menu");
      } else {
        document?.body?.classList?.remove("mini-sidebar", "expand-menu");
      }
      return newState;
    });
  }, []);

  const handleSidebarMouseEnter = useCallback(() => {
    if (isCollapsed) {
      document?.body?.classList?.add("expand-menu");
    }
  }, [isCollapsed]);

  const handleSidebarMouseLeave = useCallback(() => {
    if (isCollapsed) {
      document?.body?.classList?.remove("expand-menu");
    }
  }, [isCollapsed]);

  // Clean up classes when component unmounts
  useEffect(() => {
    return () => {
      document?.body?.classList?.remove("mini-sidebar", "expand-menu");
    };
  }, []);

  useEffect(() => {
    const matchingTab = getTabIdByRoute(location);
    if (matchingTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(matchingTab);
    }
  }, [location]);

  return (
    <>
      {/* Two Col Sidebar */}
      <div className="two-col-sidebar" id="two-col-sidebar">
        <div className="sidebar sidebar-twocol">
          <div className="twocol-mini">
            <Link href={all_routes.dashboard} className="logo-small">
              <ImageWithBasePath src="assets/img/logo-small.svg" alt="Logo" />
            </Link>
            <div className="sidebar-left">
              <div
                className="nav flex-column align-items-center sidebar-nav simplebar-content-wrapper"
                id="sidebar-tabs"
                role="tablist"
                aria-orientation="vertical"
                data-simplebar=""
              >
                {sidebarTabData.map((tab, _index) => (
                  <Link
                    key={tab.id}
                    href="#"
                    className={`nav-link ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${tab.id}`}
                    title={tab.id}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveTab(tab.id);
                    }}
                  >
                    <i className={tab.icon} />
                  </Link>
                ))}
              </div>
              <div className="sidebar-profile">
                <div className="dropdown dropend">
                  <Link
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    <i className="icon-bell" />
                    <span className="position-absolute notification-badge bg-danger" />
                  </Link>
                  <div className="dropdown-menu dropdown-menu-xl notification-dropdown">
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
                        <div className="tab-pane fade" id="unread-notification">
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
                        <div className="tab-pane fade" id="inbox-notification">
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
                        <div className="tab-pane fade" id="order-notification">
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
                <div className="dropdown dropend">
                  <Link
                    href="#"
                    className="avatar avatar-sm"
                    data-bs-toggle="dropdown"
                  >
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-27.jpg"
                      alt="user"
                      className="img-fluid rounded-circle"
                    />
                  </Link>
                  <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md">
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
                            <h5 className="mb-1 fs-14 fw-semibold">
                              Adrian James
                            </h5>
                            <span className="d-block fs-13">Administrator</span>
                          </div>
                        </div>
                        <span className="badge badge-soft-success">Pro</span>
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
                      <Link
                        href={all_routes.login}
                        className="btn btn-white btn-sm w-100"
                      >
                        <i className="icon-log-in me-1" />
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="sidebar-right"
            onMouseEnter={handleSidebarMouseEnter}
            onMouseLeave={handleSidebarMouseLeave}
          >
            <div className="sidebar-logo mb-3">
              <div className="dropdown">
                <Link
                  href="#"
                  className="d-inline-flex align-items-center fw-medium"
                  data-bs-toggle="dropdown"
                >
                  <div className="avatar avatar-xs avatar-rounded me-1">
                    <ImageWithBasePath
                      src="assets/img/store/store-01.jpg"
                      alt="store"
                      className="img-fluid"
                    />
                  </div>
                  Streak House <i className="icon-chevrons-up-down ms-2" />
                </Link>
                <ul className="dropdown-menu p-3 mt-3">
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="avatar avatar-xs avatar-rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/store/store-01.jpg"
                          alt="store"
                          className="img-fluid"
                        />
                      </div>
                      Streak House
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="avatar avatar-xs avatar-rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/store/store-02.jpg"
                          alt="store"
                          className="img-fluid"
                        />
                      </div>
                      Hotchilli Hub
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="avatar avatar-xs avatar-rounded me-2">
                        <ImageWithBasePath
                          src="assets/img/store/store-03.jpg"
                          alt="store"
                          className="img-fluid"
                        />
                      </div>
                      The Flavor Lab
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Sidebar Toggle Button */}
              <button
                className="sidenav-toggle-btn btn border-0 p-0"
                id="toggle_btn"
                onClick={toggleSidebar}
              >
                <i className="icon-panel-right-open fs-16" />
              </button>
              {/* Sidebar Close Button */}
              <button
                className="sidebar-close"
                onClick={() => dispatch(setMobileSidebar(false))}
              >
                <i className="icon-x align-middle" />
              </button>
            </div>
            <div className="sidebar-scroll">
              <div className="tab-content" id="tab-content">
                {sidebarTabData.map((tab, _index) => (
                  <div
                    key={tab.id}
                    className={`tab-pane fade ${
                      activeTab === tab.id ? "show active" : ""
                    }`}
                    id={tab.id}
                  >
                    {tab.section.map((section, secIndex) => (
                      <ul key={secIndex}>
                        <li className="menu-title">
                          <span>{section.title}</span>
                        </li>

                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={item.link}
                              className={
                                doesItemMatchRoute(location, item)
                                  ? "active"
                                  : ""
                              }
                            >
                              <i className={item.icon} />
                              <span>{item.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Two Col Sidebar */}
    </>
  );
};

export default React.memo(Sidebar);
