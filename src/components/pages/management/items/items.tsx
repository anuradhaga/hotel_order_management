"use client";
import Link from "next/link";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import ItemsModal from "./itemsModal";

const ItemsComponent = () => {
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
                Items
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
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

              <Link
                href="#"
                className="btn btn-primary d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_item"
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
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-01.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Grilled Salmon Steak
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$80</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-02.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Cheese Burst Pizza
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$66</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-03.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Garlic Butter Shrimp
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$25</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-04.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Chicken Taco
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$38</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-05.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Grilled Chicken
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$49</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-06.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Grilled Veggie Taco
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$69</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-07.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Chicken Noodle Soup
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$45</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-08.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Corn Pizza
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$96</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-09.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Shrimp Tom Yum
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$25</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-danger me-1" />
                        Non Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-10.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Tomato Basil Soup
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$44</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-11.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Hot Chocolate
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$94</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-12.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Pumpkin Soup
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$78</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-13.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Al Pastor Taco
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$48</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-14.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Caesar Salad
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$69</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-15.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Quinoa Salad
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$110</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="food-items">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      <ImageWithBasePath
                        src="assets/img/items/food-16.jpg"
                        alt="item"
                        className="img-fluid mb-3 w-100 rounded"
                      />
                    </Link>
                    <Link
                      className="food-items-menu"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-split">
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_item"
                        >
                          <i className="icon-pencil-line me-2" />
                          Edit Item
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_item"
                        >
                          <i className="icon-trash-2 me-2" />
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#hide_item"
                        >
                          <i className="icon-eye-off me-2" />
                          Hide Item
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <h6 className="fs-14 fw-semibold">
                    <Link
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#items_details"
                    >
                      Lemon Mint Juice
                    </Link>
                  </h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0">$96</p>
                    <div>
                      <span className="d-flex align-items-center">
                        <i className="icon-square-dot text-success me-1" />
                        Veg
                      </span>
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
      <ItemsModal />
    </>
  );
};

export default ItemsComponent;
