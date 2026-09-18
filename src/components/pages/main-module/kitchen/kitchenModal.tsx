"use client";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { all_routes } from "@/routes/all_routes";
import Link from "next/link";

const KitchenModal = () => {
  return (
    <>
      {/* Print details modal */}
      <div className="modal fade" id="print_order">
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
                <h6 className="fs-14 fw-normal d-flex align-items-start justify-content-between mb-3 flex-column gap-2">
                  Grilled Chicken ×1
                  <div className="bg-light rounded py-1 px-2">
                    <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                      {" "}
                      <i className="icon-badge-info me-1" /> Notes : Extra
                      Spicy, With extra Pepperoni
                    </p>
                  </div>
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-start justify-content-between mb-3 flex-column gap-2">
                  {" "}
                  Chicken Taco ×2
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-start justify-content-between mb-3 flex-column gap-2">
                  {" "}
                  Lobster Thermidor ×1
                  <div className="bg-light rounded py-1 px-2">
                    <p className="mb-0 fw-medium d-flex align-items-center text-dark">
                      {" "}
                      <i className="icon-badge-info me-1" /> Notes : Extra
                      Spicy, Remove Scalp
                    </p>
                  </div>{" "}
                </h6>
                <h6 className="fs-14 fw-normal d-flex align-items-center justify-content-between mb-0">
                  {" "}
                  Grilled Chicken ×1{" "}
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
      {/* Start Modal  */}
      <div className="modal fade" id="cooking_started_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="mb-4">
                <span className="avatar avatar-xxl rounded-circle bg-orange-subtle">
                  <ImageWithBasePath
                    src="assets/img/icons/start-icon.svg"
                    alt="trash"
                    className="img-fluid w-auto h-auto"
                  />
                </span>
              </div>
              <h4 className="mb-1">Cooking Started</h4>
              <p className="mb-4">
                Vegetarian Lasagna Cooking has begun in the kitchen.
              </p>
              <div className="d-flex justify-content-between gap-2">
                <Link
                  href={all_routes.kitchen}
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal  */}
      {/* Start Modal  */}
      <div className="modal fade" id="cooking_done_modal">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="mb-4">
                <span className="avatar avatar-xxl rounded-circle bg-success-subtle">
                  <ImageWithBasePath
                    src="assets/img/icons/checked-img.svg"
                    alt="trash"
                    className="img-fluid w-auto h-auto"
                  />
                </span>
              </div>
              <h4 className="mb-1">Cooking Completed</h4>
              <p className="mb-4">
                Order <span className="text-dark fw-semibold">#14751</span> has
                been completed &amp; ready in kitchen to serve
              </p>
              <div className="d-flex justify-content-between gap-2">
                <Link
                  href={all_routes.kitchen}
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal  */}
      {/* Start Modal  */}
      <div className="modal fade" id="order_pause">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body text-center p-4">
              <div className="mb-4">
                <span className="avatar avatar-xxl rounded-circle bg-info-subtle">
                  <ImageWithBasePath
                    src="assets/img/icons/pause-icon.svg"
                    alt="trash"
                    className="img-fluid w-auto h-auto"
                  />
                </span>
              </div>
              <h4 className="mb-1">Order Paused</h4>
              <p className="mb-4">
                Order <span className="text-dark fw-semibold">#14751</span> has
                been paused in the kitchen
              </p>
              <div className="d-flex justify-content-between gap-2">
                <Link
                  href={all_routes.kitchen}
                  className="btn btn-primary w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal  */}
    </>
  );
};

export default KitchenModal;
