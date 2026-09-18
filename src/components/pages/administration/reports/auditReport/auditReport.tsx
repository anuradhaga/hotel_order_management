"use client";

import Link from "next/link";
import Reportstab from "../reportstab";


const AuditReportComponent = () => {
  return (
    <>
      {/* ========================
			Start Page Content
		    ========================= */}
      {/* Start Content */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0">
                Reports{" "}
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
                  <i className="icon-upload me-2" />
                  Export
                </Link>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <Link href="#" className="dropdown-item rounded">
                      Export as PDF
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="dropdown-item rounded">
                      Export as Excel
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* End Page Header */}

          {/* Tabs */}
          <Reportstab />
          {/* Tabs */}

          {/* start row */}
          <div className="row">
            <div className="col-sm-12">
              {/* card start */}
              <div className="card mb-0">
                <div className="card-body schedule-timeline">
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-badge-dollar-sign text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Sale Created by David Williams (Cashier) at POS
                          Terminal
                        </p>
                        <span>12 Nov 2025 at 09:45 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-box text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Product Updated by Emily Johnson (Supervisor) in
                          Inventory
                        </p>
                        <span>12 Nov 2025 at 10:15 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-user-round text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          User Added by John Smith (Admin) in Settings
                        </p>
                        <span>12 Nov 2025 at 11:00 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-diamond-percent text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Discount Applied by Alex Martinez (Cashier) in POS
                          Terminal
                        </p>
                        <span>12 Nov 2025 at 11:25 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-trash-2 text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill timeline-hrline">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Product Deleted by Emily Johnson (Supervisor) in
                          Inventory
                        </p>
                        <span>12 Nov 2025 at 12:20 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-badge-x text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill timeline-hrline">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Sale Voided by Alex Martinez (Cashier) at POS Terminal
                        </p>
                        <span>12 Nov 2025 at 01:45 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-badge-dollar-sign text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill timeline-hrline">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Refund Issued by Emily Johnson (Supervisor) in Sales
                        </p>
                        <span>12 Nov 2025 at 02:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-log-in text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill timeline-hrline">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Login Attempt (Failed) by John Smith (Admin) at
                          Dashboard
                        </p>
                        <span>12 Nov 2025 at 02:20 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-badge-dollar-sign text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill timeline-hrline">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Sale Deleted by David Williams (Cashier) in POS
                          Terminal
                        </p>
                        <span>12 Nov 2025 at 02:30 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-sm-flex align-items-center">
                    <div className="d-flex align-items-center active-time">
                      <span className="timeline-border-none d-flex align-items-center justify-content-center bg-white">
                        <i className="icon-badge-dollar-sign text-gray-2 fs-18" />
                      </span>
                    </div>
                    <div className="flex-fill timeline-hrline">
                      <div className="p-3">
                        <p className="fw-medium text-dark mb-1">
                          Sale Created by David Williams (Cashier) at POS
                          Terminal
                        </p>
                        <span>12 Nov 2025 at 02:35 PM</span>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* end card body */}
              </div>
              {/* card start */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>
      {/* End Content */}
      {/* ========================
			End Page Content
		    ========================= */}
    </>
  );
};

export default AuditReportComponent;
