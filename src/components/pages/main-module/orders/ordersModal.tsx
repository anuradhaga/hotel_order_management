"use client";
import Link from "next/link";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Calculator from "./calendar";

const OrdersModal = () => {
  return (
    <>
      {/* Print details modal */}
      <div className="modal fade" id="print_reciept">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title">Print Reciept</h4>
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
              {/* Item 1 */}
              <div className="mb-3 pb-3 border-bottom">
                <h5 className="mb-3 fs-16">Order Info</h5>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  Date &amp; Time{" "}
                  <span className="fw-medium text-dark">
                    25/11/2025 - 08:45 PM
                  </span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  {" "}
                  Order No <span className="fw-medium text-dark">
                    {" "}
                    #54654
                  </span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  {" "}
                  Token No <span className="fw-medium text-dark"> 20</span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  {" "}
                  No of Items <span className="fw-medium text-dark">
                    {" "}
                    4
                  </span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                  {" "}
                  Order Type
                  <span className="fw-medium text-dark">
                    {" "}
                    Dine In (TabIe 4){" "}
                  </span>{" "}
                </h6>
              </div>
              {/* Item 2 */}
              <div className="mb-3 pb-3 border-bottom">
                <h5 className="mb-3 fs-16">Ordered Menus</h5>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  Grilled Chicken ×1{" "}
                  <span className="fw-medium text-dark">$49</span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  {" "}
                  Chicken Taco ×2{" "}
                  <span className="fw-medium text-dark"> $66</span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  {" "}
                  Lobster Thermidor ×1{" "}
                  <span className="fw-medium text-dark"> $76</span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                  {" "}
                  Grilled Chicken ×1{" "}
                  <span className="fw-medium text-dark"> $62</span>{" "}
                </h6>
              </div>
              {/* Item 3 */}
              <div className="mb-3 pb-3 border-bottom">
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  Sub Total<span className="fw-medium text-dark">$267</span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                  {" "}
                  Tax (10%)<span className="fw-medium text-dark">
                    {" "}
                    $268
                  </span>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                  {" "}
                  Service Charge{" "}
                  <span className="fw-medium text-dark"> $15</span>{" "}
                </h6>
              </div>
              <h5 className="mb-0 d-flex align-items-center justify-content-between">
                Total <span>$274</span>
              </h5>
            </div>
            <div className="modal-footer d-flex align-items-center justify-content-between flex-nowrap gap-2">
              <button
                type="button"
                className="btn btn-light w-100 m-0"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary w-100 m-0">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Pay & Complete Order modal */}
      <div className="modal fade" id="pay_complete_order">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title">Pay &amp; Complete Order</h4>
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
              <div className="p-3 border rounded mb-4">
                <h3 className="text-center mb-0">Final Total : $274</h3>
              </div>
              {/* start row */}
              <div className="row g-4">
                <div className="col-lg-6 border-end">
                  {/* Item 1 */}
                  <div className="mb-3 pb-3 border-bottom">
                    <h5 className="mb-3 fs-16">Order Info</h5>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      {" "}
                      Order No{" "}
                      <span className="fw-medium text-dark"> #54654</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      {" "}
                      No of Items{" "}
                      <span className="fw-medium text-dark"> 4</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                      {" "}
                      Order Type
                      <span className="fw-medium text-dark">
                        {" "}
                        Dine In (TabIe 4){" "}
                      </span>{" "}
                    </h6>
                  </div>
                  {/* Item 2 */}
                  <div className="mb-3 pb-3 border-bottom orders-list">
                    <h5 className="mb-3 fs-16">Ordered Menus</h5>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 orders-two">
                      Grilled Chicken ×1 <span className="line" />
                      <span className="fw-medium text-dark">$49</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 orders-two">
                      {" "}
                      Chicken Taco ×2 <span className="line" />
                      <span className="fw-medium text-dark"> $66</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 orders-two">
                      {" "}
                      Lobster Thermidor ×1 <span className="line" />
                      <span className="fw-medium text-dark"> $76</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0 orders-two">
                      {" "}
                      Grilled Chicken ×1 <span className="line" />
                      <span className="fw-medium text-dark"> $62</span>{" "}
                    </h6>
                  </div>
                  {/* Item 3 */}
                  <div>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      Sub Total<span className="fw-medium text-dark">$267</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      {" "}
                      Tax (10%)
                      <span className="fw-medium text-dark"> $268</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      {" "}
                      Discount (15%)
                      <span className="fw-medium text-dark"> $26.7</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      {" "}
                      Service Charge{" "}
                      <span className="fw-medium text-dark"> $15</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
                      {" "}
                      Coupon (FIRSTORDER){" "}
                      <span className="fw-medium text-danger"> -$45</span>{" "}
                    </h6>
                    <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                      {" "}
                      Tip <span className="fw-medium text-dark"> $20</span>{" "}
                    </h6>
                  </div>
                </div>
                {/* end cold */}
                <div className="col-lg-6">
                  <div>
                    <h6 className="mb-3">Payment Type</h6>
                    <ul
                      className="nav nav-tabs nav-tabs-solid border-0 flex-nowrap mb-4"
                      role="tablist"
                    >
                      <li className="nav-item w-100">
                        <Link
                          href="#order-tab6"
                          className="nav-link active d-flex align-items-center justify-content-center w-100"
                          data-bs-toggle="tab"
                        >
                          <i className="icon-dollar-sign me-1" />
                          Cash
                        </Link>
                      </li>
                      <li className="nav-item w-100">
                        <Link
                          href="#order-tab7"
                          className="nav-link d-flex align-items-center justify-content-center w-100"
                          data-bs-toggle="tab"
                        >
                          <i className="icon-credit-card me-1" />
                          Card
                        </Link>
                      </li>
                      <li className="nav-item w-100">
                        <Link
                          href="#order-tab8"
                          className="nav-link d-flex align-items-center justify-content-center w-100"
                          data-bs-toggle="tab"
                        >
                          <i className="icon-scan-text me-1" />
                          Scan
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      {/* Item 1 */}
                      <div className="tab-pane show active" id="order-tab6">
                        <div className="mb-4">
                          <label className="form-label">
                            Amount <span className="text-danger"> *</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Discount <span className="line" />{" "}
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#calculator"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Tips <span className="line" />
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#add_tips_calci"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Coupoun <span className="line" />
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                Given Amount
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={300}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                Balance<span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={26}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="form-label fw-semibold">Note</label>
                          <textarea
                            rows={4}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      {/* Item 2 */}
                      <div className="tab-pane" id="order-tab7">
                        <div className="mb-4 text-center p-4 border rounded d-flex align-items-center justify-content-center flex-column gap-2">
                          <ImageWithBasePath
                            src="assets/img/icons/mobile-phone.svg"
                            alt="Mobile"
                            className="img-fluid d-block"
                          />
                          Tap or Swipe your card to pay
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Discount <span className="line" />{" "}
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#calculator"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Tips <span className="line" />
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#add_tips_calci"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Coupoun <span className="line" />
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div>
                          <label className="form-label fw-semibold">Note</label>
                          <textarea
                            rows={4}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      {/* Item 3 */}
                      <div className="tab-pane" id="order-tab8">
                       
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Discount <span className="line" />{" "}
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#calculator"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Tips <span className="line" />
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#add_tips_calci"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-4 fw-medium text-dark">
                          Coupoun <span className="line" />
                          <Link
                            href="#"
                            className="btn btn-sm btn-outline-light d-flex align-items-center"
                          >
                            <i className="icon-plus me-1" />
                            Add
                          </Link>{" "}
                        </div>
                         <div className="mb-4 text-center p-4 border rounded d-flex align-items-center justify-content-center flex-column gap-2">
                          <ImageWithBasePath
                            src="assets/img/icons/qr-img.svg"
                            alt="Mobile"
                            className="img-fluid d-block "
                          />
                          Scan with your UPI app to pay
                        </div>
                        <div>
                          <label className="form-label fw-semibold">Note</label>
                          <textarea
                            rows={4}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
            <div className="modal-footer d-flex align-items-center justify-content-end flex-nowrap gap-2">
              <button
                type="button"
                className="btn btn-light m-0"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary m-0">
                Pay &amp; Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* start offcanvas */}
      <div
        className="offcanvas offcanvas-offset offcanvas-end"
        tabIndex={-1}
        id="view_details"
      >
        <div className="offcanvas-header d-block border-bottom">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="title mb-0">Order : #22154</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="icon-x" />
            </button>
          </div>
        </div>
        <div className="offcanvas-body">
          {/* Item 1 */}
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                <h6 className="mb-0">Order Status</h6>
                <h6 className="mb-0 fw-semibold d-flex align-items-center gap-1">
                  <i className="icon-clock fs-14" /> 06:24 PM
                </h6>
              </div>
              <div className="orders-list-two">
                {/* start row */}
                <div className="row g-3">
                  <div className="col-sm-4">
                    <div className="status-item text-center">
                      <div className="avatar bg-primary rounded-circle mb-2">
                        <i className="icon-check" />
                      </div>
                      <p className="mb-0">Accepted</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="status-item text-center">
                      <div className="avatar bg-warning rounded-circle mb-2">
                        <i className="icon-cooking-pot" />
                      </div>
                      <p className="mb-0">In Kitchen</p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="status-item text-center">
                      <div className="avatar bg-light rounded-circle mb-2 text-dark">
                        <i className="icon-flag" />
                      </div>
                      <p className="mb-0">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Item 2 */}
          <div className="mb-4 pb-4 border-bottom">
            <h5 className="mb-3 fs-16">Order Info</h5>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 text-body">
              Date &amp; Time{" "}
              <span className="fw-medium text-dark">25/11/2025 - 08:45 PM</span>{" "}
            </h6>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 text-body">
              {" "}
              Order No <span className="fw-medium text-dark"> #54654</span>{" "}
            </h6>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 text-body">
              {" "}
              Token No <span className="fw-medium text-dark"> 20</span>{" "}
            </h6>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3 text-body">
              {" "}
              No of Items <span className="fw-medium text-dark"> 4</span>{" "}
            </h6>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0 text-body">
              {" "}
              Order Type
              <span className="fw-medium text-dark">
                {" "}
                Dine In (TabIe 4){" "}
              </span>{" "}
            </h6>
          </div>
          {/* Item 3 */}
          <div className="mb-4 pb-4 border-bottom orders-list-three">
            <h5 className="mb-3 fs-16">Items</h5>
            <div className="status-item mb-4 d-flex align-items-center justify-content-start gap-2">
              <div className="avatar bg-success rounded-circle flex-shrink-0">
                <i className="icon-flag" />
              </div>
              <div>
                <p className="d-flex align-items-center gap-2 mb-2 text-dark fw-medium">
                  Margherita Pizza <span>x1</span>
                </p>
                <div className="bg-light rounded py-1 px-2">
                  <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                    {" "}
                    <i className="icon-badge-info me-1" /> Notes : Extra Spicy,
                    With extra Pepperoni
                  </p>
                </div>
              </div>
            </div>
            <div className="status-item mb-4 d-flex align-items-center justify-content-start gap-2">
              <div className="avatar bg-warning rounded-circle flex-shrink-0">
                <i className="icon-cooking-pot" />
              </div>
              <p className="d-flex align-items-center gap-2 mb-0 text-dark fw-medium">
                Pasta Primavera <span>x1</span>
              </p>
            </div>
            <div className="status-item d-flex align-items-center justify-content-start gap-2">
              <div className="avatar bg-warning rounded-circle flex-shrink-0">
                <i className="icon-cooking-pot" />
              </div>
              <p className="d-flex align-items-center gap-2 mb-0 text-dark fw-medium">
                Chocolate Lava Cake <span>x2</span>
              </p>
            </div>
          </div>
          {/* Item 4 */}
          <div className="mb-4 pb-4 border-bottom">
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
              Sub Total<span className="fw-medium text-dark">$267</span>{" "}
            </h6>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-3">
              {" "}
              Tax (10%)<span className="fw-medium text-dark"> $268</span>{" "}
            </h6>
            <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
              {" "}
              Service Charge <span className="fw-medium text-dark">
                {" "}
                $15
              </span>{" "}
            </h6>
          </div>
          <h5 className="mb-0 d-flex align-items-center justify-content-between">
            Total <span>$274</span>
          </h5>
        </div>
      </div>
      {/* End Wrapper */}
      {/* Start Modal  */}
      <div className="modal fade" id="delete_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="mb-4">
                <span className="avatar avatar-xxl rounded-circle bg-danger-subtle">
                  <ImageWithBasePath
                    src="assets/img/icons/trash-icon.svg"
                    alt="trash"
                    className="img-fluid w-auto h-auto"
                  />
                </span>
              </div>
              <h4 className="mb-1">Delete Confirmation</h4>
              <p className="mb-4">Are you sure you want to delete?</p>
              <div className="d-flex justify-content-between gap-2">
                <Link
                  href="#"
                  className="btn btn-light w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </Link>
                <Link href="#" className="btn btn-danger w-100">
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal  */}
      {/* Calculator */}
      <div
        className="modal fade pos-modal calci"
        id="calculator"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header border-0">
              <h4 className="modal-title">Add Discount</h4>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <Calculator />
            <div className="modal-footer d-flex align-items-center justify-content-between flex-nowrap gap-2">
              <button
                type="button"
                className="btn btn-light w-100 m-0"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary w-100 m-0">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /Calculator */}
    </>
  );
};

export default OrdersModal;
