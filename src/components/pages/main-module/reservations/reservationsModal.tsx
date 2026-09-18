
import CommonSelect from "@/core/common/common-select/commonSelect";
import { Customer_Reservation, Gender, Status_Reservation, Table_Reservation } from "@/core/data/json/selectOption";
import CommonDatePicker from "@/core/common/common-date-picker/commonDatePicker";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";



const ReservationsModal = () => {
    return (
        <>
            {/* Add reservation modal */}
            <div className="modal fade" id="add_reservation">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title">Add Reservation</h4>
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
                            <form action="#">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Customer <span className="text-danger"> *</span>
                                            </label>
                                            <CommonSelect
                                                options={Customer_Reservation}
                                                className="select"
                                                defaultValue={Customer_Reservation[0]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Date &amp; Time <span className="text-danger ms-1">*</span>
                                        </label>
                                        <CommonDatePicker />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Table <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            options={Table_Reservation}
                                            className="select"
                                            defaultValue={Table_Reservation[0]}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            No of Guests <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Status <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            options={Status_Reservation}
                                            className="select"
                                            defaultValue={Status_Reservation[0]}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label className="form-label">
                                            Notes<span className="text-danger"> *</span>
                                        </label>
                                        <textarea rows={4} className="form-control" defaultValue={""} />
                                    </div>
                                </div>
                            </form>
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
                                Save Reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit reservation modal */}
            <div className="modal fade" id="edit_reservation">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title">Edit Reservation</h4>
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
                            <form action="#">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Customer <span className="text-danger"> *</span>
                                            </label>
                                            <CommonSelect
                                                options={Customer_Reservation}
                                                className="select"
                                                defaultValue={Customer_Reservation[1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Date &amp; Time <span className="text-danger ms-1">*</span>
                                        </label>
                                        <CommonDatePicker />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Table <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            options={Table_Reservation}
                                            className="select"
                                            defaultValue={Table_Reservation[1]}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            No of Guests <span className="text-danger"> *</span>
                                        </label>
                                        <input type="number" className="form-control" defaultValue={"10"} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Status <span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            options={Status_Reservation}
                                            className="select"
                                            defaultValue={Status_Reservation[1]}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label className="form-label">
                                            Notes<span className="text-danger"> *</span>
                                        </label>
                                        <textarea rows={4} className="form-control" defaultValue={""} />
                                    </div>
                                </div>
                            </form>
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
                                Save Reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Add Customer modal */}
            <div className="modal fade" id="add_customer">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h4 className="modal-title">Add Customer</h4>
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
                            <form action="#">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Customer Name <span className="text-danger"> *</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Phone <span className="text-danger"> *</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <label className="form-label">
                                                Email <span className="text-danger"> *</span>
                                            </label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Date Of Birth<span className="text-danger ms-1">*</span>
                                        </label>
                                        <CommonDatePicker />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label">
                                            Gneder<span className="text-danger"> *</span>
                                        </label>
                                        <CommonSelect
                                            options={Gender}
                                            className="select"
                                            defaultValue={Gender[0]}
                                        />
                                    </div>
                                </div>
                            </form>
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
                                Save Customer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
                                <Link href="#" className="btn btn-light w-100" data-bs-dismiss="modal">
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
        </>

    );
};

export default ReservationsModal;
