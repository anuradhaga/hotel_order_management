"use client";

import Link from "next/link";

const RolesPermissionsComponent = () => {
  const handleRevertAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const pane = e.currentTarget.closest(".tab-pane");
    if (pane) {
      const inputs = pane.querySelectorAll<HTMLInputElement>(
        'input.form-check-input[type="checkbox"]'
      );
      inputs.forEach((input) => (input.checked = checked));
    }
  };

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
                Permissions{" "}
                <Link
                  href="#"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
                >
                  <i className="icon-refresh-ccw" />
                </Link>
              </h3>
            </div>
            <div className="gap-3 d-flex align-items-center flex-wrap">
              <Link
                href="#"
                className="btn btn-primary d-inline-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#add_role"
              >
                <i className="icon-circle-plus me-1" />
                Add New
              </Link>
            </div>
          </div>
          {/* End Page Header */}
          {/* card start */}
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="fs-20 fw-bold mb-4">Roles</h6>
                  <div className="roles-sidebar d-flex align-items-start">
                    <ul
                      className="nav flex-column nav-pills me-3 w-100"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <li>
                        <Link
                          href="#"
                          className="nav-link active"
                          id="v-pills-admin-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-admin"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-admin"
                          aria-selected="true"
                        >
                          Admin
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          id="v-pills-supervisor-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-supervisor"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-supervisor"
                          aria-selected="true"
                        >
                          Supervisor
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          id="v-pills-cashier-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-cashier"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-cashier"
                          aria-selected="true"
                        >
                          Cashier
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          id="v-pills-chef-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-chef"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-chef"
                          aria-selected="true"
                        >
                          Chef
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          id="v-pills-waiter-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-waiter"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-waiter"
                          aria-selected="true"
                        >
                          Waiter
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link"
                          id="v-pills-accountant-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-accountant"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-accountant"
                          aria-selected="true"
                        >
                          Accountant
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="nav-link mb-0"
                          id="v-pills-systemoperator-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#v-pills-systemoperator"
                          type="button"
                          role="tab"
                          aria-controls="v-pills-systemoperator"
                          aria-selected="true"
                        >
                          System Operator
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-admin"
                  role="tabpanel"
                  aria-labelledby="v-pills-admin-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">Role : Admin </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Module</th>
                              <th>View</th>
                              <th>Add</th>
                              <th>Edit</th>
                              <th>Delete</th>
                              <th>Export</th>
                              <th>Approved/Void</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-supervisor"
                  role="tabpanel"
                  aria-labelledby="v-pills-supervisor-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">Role : Supervisor </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Modules</th>
                              <th>Allow All</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-cashier"
                  role="tabpanel"
                  aria-labelledby="v-pills-cashier-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">Role : Cashier </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Modules</th>
                              <th>Allow All</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-chef"
                  role="tabpanel"
                  aria-labelledby="v-pills-chef-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">Role : Chef </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Modules</th>
                              <th>Allow All</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-waiter"
                  role="tabpanel"
                  aria-labelledby="v-pills-waiter-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">Role : Waiter </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Modules</th>
                              <th>Allow All</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-accountant"
                  role="tabpanel"
                  aria-labelledby="v-pills-accountant-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">Role : Chef </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Modules</th>
                              <th>Allow All</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-systemoperator"
                  role="tabpanel"
                  aria-labelledby="v-pills-systemoperator-tab"
                  tabIndex={0}
                >
                  <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-2 mb-4">
                    <div className="flex-grow-1">
                      <h5 className="fs-16 fw-bold mb-0">
                        Role : System Operator{" "}
                      </h5>
                    </div>
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        onChange={handleRevertAll}
                      />
                      <label htmlFor="select-all">Revert All</label>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive" id="v-pills-tabContent">
                        <table className="table m-0 table-nowrap bg-white border">
                          <thead>
                            <tr>
                              <th>Modules</th>
                              <th>Allow All</th>
                              <th>Read</th>
                              <th>Write</th>
                              <th>Create</th>
                              <th>Delete</th>
                              <th>Import</th>
                              <th>Export</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-dark fw-medium">Dashboard</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">POS</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Hold/Resume Sale
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Refund / Return
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Products</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">
                                Categories
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Customers</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Reports</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="text-dark fw-medium">Settings</td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="form-check form-check-md">
                                  {" "}
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex align-items-center justify-content-end flex-wrap row-gap-2 border-top mt-4 pt-4">
            <button
              type="button"
              className="btn btn-light me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* card start */}
        </div>
        {/* End Content */}
      </div>
      {/* ========================
			End Page Content
		    ========================= */}

      {/* Add Role */}
      <div className="modal fade" id="add_role">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 p-4 pb-3">
              <h4 className="modal-title">Add Role</h4>
              <button
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form>
              <div className="modal-body p-4 pt-1">
                <div className="mb-3">
                  <label className="form-label">
                    Role Name<span className="text-danger"> *</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="d-flex align-items-center justify-content-between gap-2 pt-1">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary w-100">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add Role End */}
    </>
  );
};

export default RolesPermissionsComponent;