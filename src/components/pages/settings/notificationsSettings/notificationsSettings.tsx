"use client";

import Link from "next/link";


const NotificationsSettingsComponent = () => {

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
            Notifications{" "}
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
            >
              <i className="icon-refresh-ccw" />
            </Link>
          </h3>
        </div>
      </div>
      {/* End Page Header */}
      <div>
        {/* card start */}
        <div className="card">
          <div className="card-body">
            <form action="notifications-settings.html">
              <div className="card">
                <div className="card-body">
                  <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0 pb-3 border-bottom">
                    <label
                      className="form-check-label fw-medium text-dark"
                      htmlFor="switchCheckChecked"
                    >
                      Mobile Push Notifications
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="switchCheckChecked"
                      defaultChecked
                    />
                  </div>
                  <div className="form-check form-switch d-flex align-items-center justify-content-between ps-0">
                    <label
                      className="form-check-label fw-medium text-dark"
                      htmlFor="switchCheckChecked2"
                    >
                      Desktop Notifications
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="switchCheckChecked2"
                      defaultChecked
                    />
                  </div>
                </div>
                {/* card-body */}
              </div>
              {/* card end */}
              <h6 className="mb-3">General Notification</h6>
              <div className="card mb-0">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom">
                    <h6 className="fs-14 fw-medium mb-3">Payment</h6>
                    <div className="d-flex align-items-center gap-4">
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked3"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked3"
                        >
                          Push
                        </label>
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked4"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked4"
                        >
                          SMS
                        </label>
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked5"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked5"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom">
                    <h6 className="fs-14 fw-medium mb-3">Transaction</h6>
                    <div className="d-flex align-items-center gap-4">
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked6"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked6"
                        >
                          Push
                        </label>
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked7"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked7"
                        >
                          SMS
                        </label>
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked8"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked8"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3 border-bottom">
                    <h6 className="fs-14 fw-medium mb-3">Activity</h6>
                    <div className="d-flex align-items-center gap-4">
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked9"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked9"
                        >
                          Push
                        </label>
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked10"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked10"
                        >
                          SMS
                        </label>
                      </div>
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked11"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked11"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6 className="fs-14 fw-medium">Account</h6>
                    <div className="d-flex align-items-center gap-4">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked12"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked12"
                        >
                          Push
                        </label>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked13"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked13"
                        >
                          SMS
                        </label>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchCheckChecked14"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switchCheckChecked14"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* card-body */}
              </div>
              {/* card end */}
              <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
                <button type="button" className="btn btn-light me-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>{" "}
          {/* end card body */}
        </div>
        {/* card start */}
      </div>
    </div>
    {/* End Content */}
  </div>
  {/* ========================
			End Page Content
		========================= */}
</>



    )
}

export default NotificationsSettingsComponent