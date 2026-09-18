
import { Page_Size } from "@/core/data/json/selectOption";
import CommonSelect from "@/core/common/common-select/commonSelect";
import Link from "next/link";



const PrintSettingsComponent = () => {

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
                                Print Settings{" "}
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
                                    <h5 className="mb-3">Print Settings</h5>
                                    {/* start row */}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0">
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="switchCheckChecked"
                                                    >
                                                        Enable Print
                                                    </label>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="switchCheckChecked"
                                                        defaultChecked
                                                    />
                                                </div>
                                                <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0">
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="switchCheckChecked2"
                                                    >
                                                        Show Store Details
                                                    </label>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="switchCheckChecked2"
                                                        defaultChecked
                                                    />
                                                </div>
                                                <div className="form-check form-switch mb-3 d-flex align-items-center justify-content-between ps-0">
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="switchCheckChecked3"
                                                    >
                                                        Show Customer Details
                                                    </label>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="switchCheckChecked3"
                                                        defaultChecked
                                                    />
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Format (Page Sizes)
                                                    <span className="text-danger ms-1">*</span>
                                                </label>
                                                <CommonSelect
                                                    options={Page_Size}
                                                    className="select"
                                                    defaultValue={Page_Size[0]}
                                                />
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Header</label>
                                                <textarea className="form-control" defaultValue={""} />
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Footer</label>
                                                <textarea className="form-control" defaultValue={""} />
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <div className="form-check form-switch d-flex align-items-center justify-content-between mb-3 ps-0">
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="switchCheckChecked4"
                                                    >
                                                        Show Notes
                                                    </label>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="switchCheckChecked4"
                                                        defaultChecked
                                                    />
                                                </div>
                                                <div className="form-check form-switch d-flex align-items-center justify-content-between mb-3 ps-0">
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="switchCheckChecked5"
                                                    >
                                                        Print Tokens
                                                    </label>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="switchCheckChecked5"
                                                        defaultChecked
                                                    />
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* end col */}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-2 pt-4">
                            <button type="button" className="btn btn-light me-2">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                                    {/* end row */}
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

export default PrintSettingsComponent