"use client";
import Link from "next/link"



const DeliverySettingsComponent = () => {

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
                                Delivery{" "}
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
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0">
                                                <label
                                                    className="form-check-label fs-16 fw-bold text-dark"
                                                    htmlFor="switchCheckChecked"
                                                >
                                                    Free Delivery
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="switchCheckChecked"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">
                                                    Free Delivery Over ($)
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" className="form-control" />
                                            </div>
                                         
                                        </div>
                                        {/* card-body */}
                                    </div>
                                    {/* card end */}
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0">
                                                <label
                                                    className="form-check-label fs-16 fw-bold text-dark"
                                                    htmlFor="switchCheckChecked1"
                                                >
                                                    Fixed Delivery Charges
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="switchCheckChecked1"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">
                                                    Fixed Delivery Amount ($)
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        {/* card-body */}
                                    </div>
                                    {/* card end */}
                                    <div className="card mb-0">
                                        <div className="card-body">
                                            <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0">
                                                <label
                                                    className="form-check-label fs-16 fw-bold text-dark"
                                                    htmlFor="switchCheckChecked2"
                                                >
                                                    Kilometer Based Delivery Charges
                                                </label>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="switchCheckChecked2"
                                                    defaultChecked
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Per KM Delivery Charge ($)
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Minimum Delivery Over ($)
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="mb-0">
                                                <label className="form-label">
                                                    Minimum Distance for Free Delivery (KM)
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <input type="text" className="form-control" />
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

export default DeliverySettingsComponent