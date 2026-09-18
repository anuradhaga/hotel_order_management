"use client";
import ImageWithBasePath from "@/core/common/image-with-base-path"
import Link from "next/link";

const IntegrationSettingsComponent = () => {

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
                                Integrations / API{" "}
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
                    {/* card start */}
                    <div className="card mb-0">
                        <div className="card-body">
                            {/* start row */}
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card payment-type flex-fill">
                                        <div className="card-body">
                                            <div className="w-100 d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-lg bg-light rounded-circle border p-2 me-2 flex-shrink-0">
                                                        <ImageWithBasePath src="assets/img/icons/mail-icon.svg" alt="Img" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-14 fw-semibold mb-1">Gmail</h6>
                                                        <p className="mb-0">
                                                            RESTful API you can use to send, receive, search,
                                                            label, archive emails, <br /> manage settings in Gmail
                                                            mailboxes.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check form-switch mb-0">
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="switchCheckChecked"
                                                        />
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="switchCheckChecked"
                                                            defaultChecked
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* end col */}
                                <div className="col-md-12">
                                    <div className="card payment-type flex-fill">
                                        <div className="card-body">
                                            <div className="w-100 d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-lg bg-light rounded-circle border p-2 me-2 flex-shrink-0">
                                                        <ImageWithBasePath src="assets/img/icons/gupshup.svg" alt="Img" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-14 fw-semibold mb-1">Gupshup</h6>
                                                        <p className="mb-0">
                                                            Messaging platform (SMS, WhatsApp, RCS) with presence
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check form-switch mb-0">
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="switchCheckChecked2"
                                                        />
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="switchCheckChecked2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* end col */}
                                <div className="col-md-12">
                                    <div className="card payment-type flex-fill mb-0">
                                        <div className="card-body">
                                            <div className="w-100 d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-lg bg-light rounded-circle border p-2 me-2 flex-shrink-0">
                                                        <ImageWithBasePath src="assets/img/icons/print-node.svg" alt="Img" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-14 fw-semibold mb-1">PrintNode</h6>
                                                        <p className="mb-0">
                                                            Middleware agents for cloud-to-local printing.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check form-switch mb-0">
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="switchCheckChecked3"
                                                        />
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="switchCheckChecked3"
                                                            defaultChecked
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* end col */}
                            </div>
                            {/* end row */}
                        </div>{" "}
                        {/* end card body */}
                    </div>
                    {/* card start */}
                </div>
                {/* End Content */}
            </div>
            {/* ========================
			End Page Content
		    ========================= */}
        </>


    )
}

export default IntegrationSettingsComponent