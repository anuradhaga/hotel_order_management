import { useState } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import PosModals from "./posModal";
import CategorySlider from "./posCategorySlider";
import OrdersSlider from "./posOrderSlider";
import { Customer, Table_Size, Waiter } from "@/core/data/json/selectOption";
import CommonSelect from "@/core/common/common-select/commonSelect";
import Link from "next/link";
import SelectTwo from "@/core/common/common-select/selectTwo";

const PosComponent = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (
    id: string,
    getValue: (current: number) => number
  ) => {
    setQuantities((prev) => {
      const current = prev[id] ?? 1;
      const next = Math.max(1, getValue(current));
      return { ...prev, [id]: next };
    });
  };

  const increment = (id: string) =>
    updateQuantity(id, (current) => current + 1);
  const decrement = (id: string) =>
    updateQuantity(id, (current) => current - 1);
  const handleInputChange = (id: string, value: string) => {
    const parsed = parseInt(value, 10);
    updateQuantity(id, () => (Number.isNaN(parsed) ? 1 : parsed));
  };

  const renderQuantityControl = (id: string) => {
    const value = quantities[id] ?? 1;
    return (
      <div className="quantity-control">
        <button
          type="button"
          className="minus-btn"
          onClick={() => decrement(id)}
        >
          <i className="icon-minus" />
        </button>
        <input
          type="text"
          className="quantity-input"
          value={value}
          onChange={(e) => handleInputChange(id, e.target.value)}
          aria-label="Quantity"
        />
        <button type="button" className="add-btn" onClick={() => increment(id)}>
          <i className="icon-plus" />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Page Start*/}
      <div className="page-wrapper">
        <div className="content">
          {/* start row */}
          <div className="row g-0">
            <div className="col-lg-8 pos-left">
              <OrdersSlider />
              {/* Category Slider */}
              <CategorySlider />
              <div className="tab-content">
                {/* Tab Item */}
                <div className="tab-pane fade show active" id="all-menu">
                  <div className="row g-3">
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-01.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                          <span className="badge bg-danger">
                            <i className="icon-crown text-white" />
                            Trending
                          </span>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sea Food</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Grilled Salmon Steak
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$80</p>
                            {renderQuantityControl("grilled-salmon")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-02.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                          <span className="badge bg-indigo">
                            <i className="icon-flame text-white" />
                            Must Try
                          </span>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Pizza</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-success me-1" />{" "}
                                Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Cheese Burst Pizza
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$66</p>
                            {renderQuantityControl("cheese-burst-pizza")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-03.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sea Food</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Garlic Butter Shrimp
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$25</p>
                            {renderQuantityControl("garlic-butter-shrimp")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-04.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Tacos</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Chicken Taco
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">
                              <span className="text-body text-decoration-line-through">
                                $38
                              </span>{" "}
                              $33
                            </p>
                            {renderQuantityControl("chicken-taco")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-10.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Tomato Basil Soup
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">
                              <span className="text-body text-decoration-line-through">
                                $38
                              </span>{" "}
                              $33
                            </p>
                            {renderQuantityControl("tomato-basil-soup")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-05.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sushi</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Vegetable Roll
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$66</p>
                            {renderQuantityControl("vegetable-roll")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-16.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Beverages</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Lemon Mint Juice
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$96</p>
                            {renderQuantityControl("corn-pizza")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-05.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                          <span className="badge bg-indigo">
                            <i className="icon-flame text-white" />
                            Must Try
                          </span>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Salads</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Grilled Chicken
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$49</p>
                            {renderQuantityControl("grilled-chicken")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-09.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Shrimp Tom Yum
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$25</p>
                            {renderQuantityControl("shrimp-tom-yum")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-08.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Pizza</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Corn Pizza
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$96</p>
                            {renderQuantityControl("corn-pizza")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-07.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Chicken Noodle Soup
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$45</p>
                            {renderQuantityControl("chicken-noodle-soup")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-05.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sea Food</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Lobster Thermidor
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$56</p>
                            {renderQuantityControl("lobster-thermidor")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tab Item */}
                <div className="tab-pane fade" id="seafood-menu">
                  <div className="row g-3">
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-01.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                          <span className="badge bg-danger">
                            <i className="icon-crown text-white" />
                            Trending
                          </span>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sea Food</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Grilled Salmon Steak
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$80</p>
                            {renderQuantityControl("grilled-salmon")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-03.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sea Food</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Garlic Butter Shrimp
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$25</p>
                            {renderQuantityControl("garlic-butter-shrimp")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-05.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sushi</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Vegetable Roll
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$66</p>
                            {renderQuantityControl("vegetable-roll")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-05.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Sea Food</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Lobster Thermidor
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$56</p>
                            {renderQuantityControl("lobster-thermidor")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tab Item */}
                <div className="tab-pane fade" id="pizza-menu">
                  <div className="row g-3">
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-02.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                          <span className="badge bg-indigo">
                            <i className="icon-flame text-white" />
                            Must Try
                          </span>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Pizza</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-success me-1" />{" "}
                                Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Cheese Burst Pizza
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$66</p>
                            {renderQuantityControl("cheese-burst-pizza")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-08.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Pizza</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Corn Pizza
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$96</p>
                            {renderQuantityControl("corn-pizza")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tab Item */}
                <div className="tab-pane fade" id="salad-menu">
                  <div className="row g-3">
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-05.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                          <span className="badge bg-indigo">
                            <i className="icon-flame text-white" />
                            Must Try
                          </span>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Salads</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Grilled Chicken
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$49</p>
                            {renderQuantityControl("grilled-chicken")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-07.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Chicken Noodle Soup
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$45</p>
                            {renderQuantityControl("chicken-noodle-soup")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tab Item */}
                <div className="tab-pane fade" id="tacos-menu">
                  <div className="row g-3">
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-04.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Tacos</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Chicken Taco
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">
                              <span className="text-body text-decoration-line-through">
                                $38
                              </span>{" "}
                              $33
                            </p>
                            {renderQuantityControl("chicken-taco")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tab Item */}
                <div className="tab-pane fade" id="soup-menu">
                  <div className="row g-3">
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-10.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Tomato Basil Soup
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">
                              <span className="text-body text-decoration-line-through">
                                $38
                              </span>{" "}
                              $33
                            </p>
                            {renderQuantityControl("tomato-basil-soup")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-09.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Shrimp Tom Yum
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$25</p>
                            {renderQuantityControl("shrimp-tom-yum")}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Item */}
                    <div className="col-xl-3 col-md-4 col-sm-6">
                      <div className="food-grid-item">
                        <div className="food-items">
                          <Link
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#items_details"
                          >
                            <ImageWithBasePath
                              src="assets/img/items/food-07.jpg"
                              alt="item"
                              className="img-fluid w-100 rounded"
                            />
                          </Link>
                        </div>
                        <div className="food-items-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <p className="fs-12 mb-0">Soups</p>
                            <div>
                              <span className="d-flex align-items-center">
                                <i className="icon-square-dot text-danger me-1" />
                                Non Veg
                              </span>
                            </div>
                          </div>
                          <h6 className="fs-14 fw-semibold text-truncate mb-2">
                            <Link
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#items_details"
                            >
                              Chicken Noodle Soup
                            </Link>
                          </h6>
                          <div className="price d-flex align-items-center justify-content-between flex gap-2">
                            <p className="mb-0 text-dark">$45</p>
                            {renderQuantityControl("chicken-noodle-soup")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pos-right">
                {/* Title  */}
                <div className="p-3 d-flex align-items-center justify-content-between flex-wrap border-bottom">
                  <h6 className="mb-0">Order #56998</h6>
                  <p className="mb-0">08 Oct, 2025, 12:44 PM</p>
                </div>
                {/* Tabs  */}
                <div className="item border-bottom">
                  {/* Tabs */}
                  <ul
                    className="nav nav-tabs nav-tabs-solid border-0 mb-3 align-items-center justify-content-between flex-wrap gap-1 pos-tab"
                    role="tablist"
                  >
                    <li className="nav-item flex-fill">
                      <Link
                        href="#order-tab1"
                        className="nav-link active justify-content-center shadow-sm"
                        data-bs-toggle="tab"
                      >
                        <i className="icon-wine" />
                        Dine In
                      </Link>
                    </li>
                    <li className="nav-item flex-fill">
                      <Link
                        href="#order-tab2"
                        className="nav-link justify-content-center shadow-sm"
                        data-bs-toggle="tab"
                      >
                        <i className="icon-shopping-bag" />
                        Take Away
                      </Link>
                    </li>
                    <li className="nav-item flex-fill">
                      <Link
                        href="#order-tab3"
                        className="nav-link flex-fill justify-content-center shadow-sm"
                        data-bs-toggle="tab"
                      >
                        <i className="icon-check-check" />
                        Delivery
                      </Link>
                    </li>
                    <li className="nav-item flex-fill">
                      <Link
                        href="#order-tab4"
                        className="nav-link flex-fill justify-content-center shadow-sm"
                        data-bs-toggle="tab"
                      >
                        <i className="icon-land-plot" />
                        Table
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {/* TAb 1 */}
                    <div className="tab-pane show active" id="order-tab1">
                      {/* Start row */}
                      <div className="row g-2">
                        <div className="col-lg-5">
                          <CommonSelect
                            options={Waiter}
                            className="select"
                            defaultValue={Waiter[0]}
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="input-item d-flex align-items-center gap-2">
                           <CommonSelect
                            options={Customer}
                            className="select pos-select"
                            defaultValue={Customer[0]}
                          />
                            <button
                              className="btn btn-primary btn-icon"
                              data-bs-toggle="modal"
                              data-bs-target="#add_customer"
                            >
                              <i className="icon-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div className="d-flex align-items-center justify-content-end">
                            <button
                              className="border-0 btn btn-icon bg-transparent fs-16 text-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_customer"
                            >
                              <i className="icon-pencil-line" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* TAb 2 */}
                    <div className="tab-pane show" id="order-tab2">
                      {/* Start row */}
                      <div className="row g-2">
                        <div className="col-lg-11">
                          <div className="input-item d-flex align-items-center gap-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Select Customer"
                            />
                            <button
                              className="btn btn-primary btn-icon"
                              data-bs-toggle="modal"
                              data-bs-target="#add_customer"
                            >
                              <i className="icon-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div className="d-flex align-items-center justify-content-end">
                            <button
                              className="border-0 btn btn-icon bg-transparent fs-16 text-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_customer"
                            >
                              <i className="icon-pencil-line" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* TAb 3 */}
                    <div className="tab-pane show" id="order-tab3">
                      {/* Start row */}
                      <div className="row g-2">
                        <div className="col-lg-11">
                          <div className="input-item d-flex align-items-center gap-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Select Customer"
                            />
                            <button
                              className="btn btn-primary btn-icon"
                              data-bs-toggle="modal"
                              data-bs-target="#add_customer"
                            >
                              <i className="icon-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div className="d-flex align-items-center justify-content-end">
                            <button
                              className="border-0 btn btn-icon bg-transparent fs-16 text-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_customer"
                            >
                              <i className="icon-pencil-line" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* TAb 4 */}
                    <div className="tab-pane show" id="order-tab4">
                      {/* Start row */}
                      <div className="row g-2">
                        <div className="col-lg-5">
                          <CommonSelect
                            options={Table_Size}
                            className="select"
                            defaultValue={Table_Size[0]}
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="input-item d-flex align-items-center gap-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Select Customer"
                            />
                            <button
                              className="btn btn-primary btn-icon"
                              data-bs-toggle="modal"
                              data-bs-target="#add_customer"
                            >
                              <i className="icon-plus" />
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div className="d-flex align-items-center justify-content-end">
                            <button
                              className="border-0 btn btn-icon bg-transparent fs-16 text-dark"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_customer"
                            >
                              <i className="icon-pencil-line" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ordered Item */}
                <div className="p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-between mb-4 gap-2 flex-wrap">
                    <h6 className="mb-0">Ordered Menus</h6>
                    <p className="mb-0 d-flex align-items-center text-dark">
                      Total Menus :{" "}
                      <span className="d-flex align-items-center justify-content-center fs-14 btn btn-icon btn-xs rounded-circle border flex-shrink-0 ms-1 text-dark">
                        4
                      </span>
                    </p>
                  </div>
                  <div className="menu-item active p-2 rounded border shadow mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap flex-xl-nowrap gap-2">
                      <Link
                        href="#"
                        className="d-flex align-items-center overflow-hidden"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                      >
                        <div className="avatar avatar-lg flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/items/food-04.jpg"
                            alt="food-img"
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="mb-1 fs-13 fw-semibold text-truncate mb-2">
                            Chicken Taco
                          </h6>
                          <p className="badge badge-sm bg-light text-dark mb-0">
                            Medium
                          </p>
                        </div>
                      </Link>
                      <div className="d-flex align-items-center gap-2 flex-shrink-0">
                        {renderQuantityControl("cart-chicken-taco")}
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_notes"
                          className="btn btn-xs fs-12 py-1 px-2 btn-white"
                        >
                          Add Note
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-xs btn-icon fs-12 btn-light close-icon rounded-circle"
                        >
                          <i className="icon-x" />
                        </Link>
                      </div>
                    </div>
                    <div id="collapseOne" className="collapse show">
                      <div className="pt-2 mt-2 border-top">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Item Rate
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$33</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Amount
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$66</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Total
                            </span>
                            <p className="mb-0 fs-14 fw-semibold text-dark">
                              $66
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-item p-2 rounded border shadow mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap flex-xl-nowrap gap-2">
                      <Link
                        href="#"
                        className="d-flex align-items-center overflow-hidden"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                      >
                        <div className="avatar avatar-lg flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/items/food-01.jpg"
                            alt="food-img"
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="mb-1 fs-13 fw-semibold text-truncate mb-2">
                            Grilled Chicken
                          </h6>
                          <p className="badge badge-sm bg-light text-dark mb-0">
                            Small: 250 gms
                          </p>
                        </div>
                      </Link>
                      <div className="d-flex align-items-center gap-2 justify-content-end flex-shrink-0">
                        {renderQuantityControl("cart-grilled-chicken")}
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_notes"
                          className="btn btn-xs fs-12 py-1 px-2 btn-white"
                        >
                          Add Note
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-xs btn-icon fs-12 btn-light close-icon rounded-circle"
                        >
                          <i className="icon-x" />
                        </Link>
                      </div>
                    </div>
                    <div id="collapseTwo" className="collapse">
                      <div className="pt-2 mt-2 border-top">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Item Rate
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$13</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Amount
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$26</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Total
                            </span>
                            <p className="mb-0 fs-14 fw-semibold text-dark">
                              $46
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-item p-2 rounded border shadow mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap flex-xl-nowrap gap-2">
                      <Link
                        href="#"
                        className="d-flex align-items-center overflow-hidden"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                      >
                        <div className="avatar avatar-lg flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/items/food-20.jpg"
                            alt="food-img"
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="mb-1 fs-13 fw-semibold text-truncate mb-2">
                            Lobster Thermidor
                          </h6>
                          <p className="badge badge-sm bg-light text-dark mb-0">
                            Half Lobster : 300 gms
                          </p>
                        </div>
                      </Link>
                      <div className="d-flex align-items-center gap-2 justify-content-end flex-shrink-0">
                        {renderQuantityControl("cart-spinach-corn-pizza")}
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_notes"
                          className="btn btn-xs fs-12 py-1 px-2 btn-white"
                        >
                          Add Note
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-xs btn-icon fs-12 btn-light close-icon rounded-circle"
                        >
                          <i className="icon-x" />
                        </Link>
                      </div>
                    </div>
                    <div id="collapseThree" className="collapse">
                      <div className="pt-2 mt-2 border-top">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Item Rate
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$33</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Amount
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$66</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Total
                            </span>
                            <p className="mb-0 fs-14 fw-semibold text-dark">
                              $66
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-item p-2 rounded border shadow mb-3">
                    <div className="d-flex align-items-center justify-content-between flex-wrap flex-xl-nowrap gap-2">
                      <Link
                        href="#"
                        className="d-flex align-items-center overflow-hidden"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                      >
                        <div className="avatar avatar-lg flex-shrink-0 me-2">
                          <ImageWithBasePath
                            src="assets/img/items/food-08.jpg"
                            alt="food-img"
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="mb-1 fs-13 fw-semibold text-truncate mb-2">
                            Spinach &amp; Corn Pizza
                          </h6>
                          <p className="badge badge-sm bg-light text-dark mb-0">
                            Small: 6 inches
                          </p>
                        </div>
                      </Link>
                      <div className="d-flex align-items-center gap-2 justify-content-end flex-shrink-0">
                        {renderQuantityControl("cart-spinach-corn-pizza1")}
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#add_notes"
                          className="btn btn-xs fs-12 py-1 px-2 btn-white"
                        >
                          Add Note
                        </Link>
                        <Link
                          href="#"
                          className="btn btn-xs btn-icon fs-12 btn-light close-icon rounded-circle"
                        >
                          <i className="icon-x" />
                        </Link>
                      </div>
                    </div>
                    <div id="collapseFour" className="collapse">
                      <div className="pt-2 mt-2 border-top">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Item Rate
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$30</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Amount
                            </span>
                            <p className="mb-0 fs-14 fw-normal">$30</p>
                          </div>
                          <div className="text-center">
                            <span className="fs-12 mb-1 d-block fw-medium text-dark">
                              Total
                            </span>
                            <p className="mb-0 fs-14 fw-semibold text-dark">
                              $30
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-item">
                    <h6 className="mb-3">Payment Summary</h6>
                    <p className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-2">
                      Sub Total<span className="fw-medium text-dark">$267</span>{" "}
                    </p>
                    <p className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                      Tax (18%)
                      <span className="fw-medium text-dark">$26.7</span>{" "}
                    </p>
                  </div>
                </div>
                {/* Paid Item */}
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between gap-2 flex-wrap">
                  <h5 className="mb-0">Amount to be Paid</h5>
                  <h5 className="mb-0">$274</h5>
                </div>
                {/* Order Item */}
                <div className="p-3">
                  <Link
                    href="#"
                    className="btn btn-primary w-100 mb-4"
                    data-bs-toggle="modal"
                    data-bs-target="#order_modal"
                  >
                    Place an Order
                  </Link>
                  {/* start row */}
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <Link
                        href="#"
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#print_reciept"
                      >
                        <i className="icon-printer" />
                        Print
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        href="#"
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#view_invoices"
                      >
                        <i className="icon-file-chart-column" />
                        Invoice
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        href="#"
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#draft_details"
                      >
                        <i className="icon-files" />
                        Draft
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        href="#"
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_modal"
                      >
                        <i className="icon-x" />
                        Cancel
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        href="#"
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#add_notes"
                      >
                        Void
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        href="#"
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-1 shadow-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#transactions_details"
                      >
                        <i className="icon-file-chart-line" />
                        Tranactions
                      </Link>
                    </div>
                  </div>
                  {/* end row */}
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
      </div>
      {/* Page Start*/}
      <PosModals />
    </>
  );
};

export default PosComponent;
