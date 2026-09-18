"use client";
import ImageWithBasePath from "@/core/common/image-with-base-path"
import Link from "next/link"

const PaymentSettingsComponent = () => {

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
                                Payment Types{" "}
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
                                <form>
                                    {/* start row */}
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/dollar-sign.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">Cash</p>
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
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/credit-card.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">Card</p>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check form-switch mb-0">
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="switchCheckChecked1"
                                                                />
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="switchCheckChecked1"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/wallet.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">Wallet</p>
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
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/russian-ruble.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">Paypal</p>
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
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/qr-code.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">QR Reader</p>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check form-switch mb-0">
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="switchCheckChecked4"
                                                                />
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="switchCheckChecked4"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/receipt-text.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">Card Reader</p>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check form-switch mb-0">
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="switchCheckChecked5"
                                                                />
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="switchCheckChecked5"
                                                                    defaultChecked
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-6 col-lg-4">
                                            <div className="card flex-fill mb-0">
                                                <div className="card-body">
                                                    <div className="w-100 d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-md bg-light p-2 me-2">
                                                                <ImageWithBasePath
                                                                    src="assets/img/icons/landmark.svg"
                                                                    alt="Img"
                                                                    className="custom-line-img-two"
                                                                />
                                                            </div>
                                                            <p className="mb-0 text-dark">Bank</p>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check form-switch mb-0">
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="switchCheckChecked6"
                                                                />
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    role="switch"
                                                                    id="switchCheckChecked6"
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

export default PaymentSettingsComponent