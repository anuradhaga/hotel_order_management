"use client";
import React, { useMemo, useState } from "react";
import PredefinedDatePicker from "@/core/common/common-date-range-picker/PredefinedDatePicker";
import OrdersModal from "./ordersModal";
import { all_routes } from "@/routes/all_routes";
import Link from "next/link";

type Item = {
  name: string;
  quantity: number;
  dotClass?: string;
};

type Task = {
  id: string;
  orderNo: string;
  type: string;
  table?: string;
  token: string;
  time: string;
  items: Item[];
  note?: string;
  actions: { primary: string; secondary: string };
};

type Column = {
  id: string;
  title: string;
  headerClass: string;
  iconClass: string;
  tasks: Task[];
};

const KanbanViewComponent = () => {
  const initialColumns = useMemo<Column[]>(
    () => [
      {
        id: "new-orders",
        title: "New Orders",
        headerClass: "bg-gray",
        iconClass: "icon-newspaper",
        tasks: [
          {
            id: "task-56998",
            orderNo: "#56998",
            type: "Dine In",
            table: "Table No : 3",
            token: "24",
            time: "06:24 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Grilled Chicken", quantity: 1 },
              { name: "Chicken Taco - Medium", quantity: 1 },
              { name: "Lobster Thermidor", quantity: 1 },
            ],
            actions: { primary: "Start", secondary: "Cancel" },
          },
          {
            id: "task-57001",
            orderNo: "#57001",
            type: "Take Away",
            token: "25",
            time: "06:55 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Vegan Burger", quantity: 1, dotClass: "success" },
              { name: "Veg Salad", quantity: 1, dotClass: "success" },
              { name: "Shawarma", quantity: 1, dotClass: "success" },
            ],
            actions: { primary: "Start", secondary: "Cancel" },
          },
          {
            id: "task-57003",
            orderNo: "#57002",
            type: "Delivery",
            token: "26",
            time: "07:00 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Margherita Pizza", quantity: 1, dotClass: "success" },
              { name: "Pasta Primavera", quantity: 1, dotClass: "success" },
              {
                name: "Grilled Salmon Steak",
                quantity: 1,
                dotClass: "success",
              },
            ],
            actions: { primary: "Complete", secondary: "Print Receipt" },
          },
        ],
      },
      {
        id: "Processing",
        title: "Processing",
        headerClass: "bg-warning",
        iconClass: "icon-package-2",
        tasks: [
          {
            id: "task-56999",
            orderNo: "#56999",
            type: "Dine In",
            table: "Table No : 2",
            token: "20",
            time: "06:24 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Margherita Pizza", quantity: 1, dotClass: "success" },
              { name: "Pasta Primavera", quantity: 1, dotClass: "success" },
              {
                name: "Grilled Salmon Steak",
                quantity: 1,
                dotClass: "success",
              },
            ],
            actions: { primary: "Mark Done", secondary: "Cancel" },
          },
          {
            id: "task-57000",
            orderNo: "#57000",
            type: "Take Away",
            token: "23",
            time: "06:45 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Caesar Salad", quantity: 1, dotClass: "success" },
              { name: "Pumpkin Soup", quantity: 1, dotClass: "success" },
              { name: "Bruschetta", quantity: 1, dotClass: "success" },
            ],
            actions: { primary: "Mark Done", secondary: "Cancel" },
          },
        ],
      },
      {
        id: "Completed",
        title: "Completed",
        headerClass: "bg-success",
        iconClass: "icon-check-check",
        tasks: [
          {
            id: "task-57002",
            orderNo: "#57002",
            type: "Delivery",
            token: "26",
            time: "07:00 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Margherita Pizza", quantity: 1, dotClass: "success" },
              { name: "Pasta Primavera", quantity: 1, dotClass: "success" },
              {
                name: "Grilled Salmon Steak",
                quantity: 1,
                dotClass: "success",
              },
            ],
            actions: { primary: "Complete", secondary: "Print Receipt" },
          },
        ],
      },
      {
        id: "Cancelled",
        title: "Cancelled",
        headerClass: "bg-danger",
        iconClass: "icon-x",
        tasks: [
          {
            id: "task-57004",
            orderNo: "#57002",
            type: "Delivery",
            token: "26",
            time: "07:00 PM",
            note: "Notes : Extra Spicy",
            items: [
              { name: "Margherita Pizza", quantity: 1, dotClass: "success" },
              { name: "Pasta Primavera", quantity: 1, dotClass: "success" },
              {
                name: "Grilled Salmon Steak",
                quantity: 1,
                dotClass: "success",
              },
            ],
            actions: { primary: "Reorder", secondary: "Remove" },
          },
        ],
      },
    ],
    []
  );

  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (event: React.DragEvent, task: Task) => {
    event.dataTransfer.effectAllowed = "move";
    setDraggedTask(task);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent, targetColumnId: string) => {
    event.preventDefault();
    if (!draggedTask) {
      return;
    }

    setColumns((prev) => {
      const nextColumns = prev.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
      }));

      const targetIndex = nextColumns.findIndex(
        (column) => column.id === targetColumnId
      );
      if (targetIndex !== -1) {
        nextColumns[targetIndex] = {
          ...nextColumns[targetIndex],
          tasks: [...nextColumns[targetIndex].tasks, draggedTask],
        };
      }

      return nextColumns;
    });

    setDraggedTask(null);
  };

  const renderItems = (items: Item[], note?: string) => (
    <div className="mb-3 pb-3 border-bottom">
      <div className="orders-list">
        {items.map((item) => (
          <div className="orders text-dark mb-3" key={item.name}>
            <p>
              <span className={`dot ${item.dotClass || ""}`} />
              {item.name}
            </p>
            <span className="line" />
            <p className="text-dark">×{item.quantity}</p>
          </div>
        ))}
        {note && (
          <div className="bg-light rounded py-1 px-2 mb-3">
            <p className="mb-0 fw-medium d-flex align-items-center text-dark">
              <i className="icon-badge-info me-1" />
              {note}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTaskCard = (task: Task) => (
    <div
      key={task.id}
      className="card flex-fill kanban-card"
      draggable
      onDragStart={(event) => handleDragStart(event, task)}
    >
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
                  {task.orderNo}
                </Link>
              </h6>
              <p className="mb-0 d-flex align-items-center gap-2">
                {task.type}
                {task.table && (
                  <>
                    <span className="text-light">|</span> {task.table}
                  </>
                )}
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
            <span className="fw-normal">Token No :</span> {task.token}
          </p>
          <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
            <i className="icon-clock fs-14" /> {task.time}
          </h6>
        </div>
        {renderItems(task.items, task.note)}
        <div className="d-flex align-items-center justify-content-between flex-nowrap gap-3">
          <Link href="#" className="btn btn-outline-light w-100">
            {task.actions.secondary}
          </Link>
          <Link href="#" className="btn btn-light w-100">
            {task.actions.primary}
          </Link>
        </div>
      </div>
    </div>
  );

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
            <div className="gap-3 d-flex align-items-center flex-wrap">
              <div className="dropdown">
                <Link
                  href="#"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  Today
                </Link>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <Link href="#" className="dropdown-item rounded">
                      Tomorrow
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item rounded">
                      This Week
                    </Link>
                  </li>
                </ul>
              </div>
              <Link
                href={all_routes.pos}
                className="btn btn-primary d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_users"
              >
                <i className="icon-circle-plus me-1" />
                Add New
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* Start row */}
          <div className="row g-3">
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
            <h5 className="mb-0">Orders</h5>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="active-item d-flex align-items-center justify-content-between gap-1 p-1 border rounded bg-white">
                <Link
                  href={all_routes.orders}
                  className="btn btn-sm btn-icon"
                  aria-label="grid"
                >
                  <i className="icon-grid-2x2" />
                </Link>
                <Link
                  href={all_routes.kanbanView}
                  className="btn btn-sm btn-icon btn-primary"
                  aria-label="kanban"
                >
                  <i className="icon-square-kanban" />
                </Link>
              </div>
              <div>
                <PredefinedDatePicker />
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
          {/* Kanban Card drag Item */}
          <div className="d-flex gap-3 align-items-start overflow-auto project-status">
            {columns.map((column) => (
              <div className="card mb-0" key={column.id}>
                <div className="card-body">
                  <div
                    className={`top-item d-flex align-items-center justify-content-between ${column.headerClass} rounded py-3 px-3 mb-4`}
                  >
                    <span className="mb-0 d-flex align-items-center gap-2 text-white fw-semibold">
                      <i className={column.iconClass} /> {column.title}
                    </span>
                    <span className="text-white">
                      {column.tasks.length.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="kanban-drag"
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, column.id)}
                  >
                    {column.tasks.map((task) => renderTaskCard(task))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Kanban Card drag Item */}
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

export default KanbanViewComponent;
