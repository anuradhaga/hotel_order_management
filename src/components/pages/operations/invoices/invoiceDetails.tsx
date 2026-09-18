import ImageWithBasePath from '@/core/common/image-with-base-path'
import { all_routes } from '@/routes/all_routes'
import Link from 'next/link'
import React from 'react'

const InvoiceDetailsComponent = () => {
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
            Invoices Details{" "}
            <Link
              href="#"
              className="btn btn-icon btn-sm btn-white rounded-circle ms-2"
            >
              <i className="icon-refresh-ccw" />
            </Link>
          </h3>
        </div>
        <div className="gap-2 d-flex align-items-center flex-wrap">
          <div className="dropdown">
            <Link
              href="#"
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i className="icon-upload me-1" />
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
      <Link href={all_routes.invoices} className="d-inline-flex align-items-center mb-4">
        <i className="icon-arrow-left me-2" />
        Back
      </Link>
      {/* card start */}
      <div className="card mb-0">
        <div className="card-body">
          <div className="mb-4">
            <div className="row justify-content-between align-items-center border-bottom pb-4">
              <div className="col-md-6">
                <h6 className="mb-2">#INV5465</h6>
                <h6>DreamsPOS</h6>
              </div>
              <div className="col-md-6">
                <div className="mb-2 invoice-logo d-flex align-items-center justify-content-md-end justify-content-start">
                  <ImageWithBasePath
                    src="assets/img/logo.svg"
                    width={130}
                    className="img-fluid logo"
                    alt="logo"
                  />
                  <ImageWithBasePath
                    src="assets/img/logo-white.svg"
                    width={130}
                    className="img-fluid logo-white d-none"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="row g-3 justify-content-between align-items-center border-bottom pb-4">
              <div className="col-md-4">
                <h6 className="mb-2">Invoice From</h6>
                <p className="text-dark fw-semibold mb-2">DreamsPOS</p>
                <p className="mb-2">
                  15 Hodges Mews, High Wycombe HP12 3JL,United Kingdom
                </p>
                <p className="mb-0">Phone : +1 45659 96566</p>
              </div>
              <div className="col-md-4">
                <h6 className="mb-2">Bill To&nbsp;</h6>
                <p className="text-dark fw-semibold mb-2">Andrew Fletcher</p>
                <p className="mb-2">
                  1147 Rohan Drive Suite,Burlington, VT / 8202115 United Kingdom
                </p>
                <p className="mb-0">Phone : +1 45659 96566</p>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-md-center">
                  <ImageWithBasePath
                    src="assets/img/invoices/paid-invoices.svg"
                    alt="paid-invoices-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h6 className="mb-3">Items Details</h6>
            <div className="table-responsive table-nowrap">
              <table className="table mb-0 border ">
                <thead className="thead-light">
                  <tr>
                    <th>#</th>
                    <th>Item Details</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Grilled Salmon Steak</td>
                    <td>2</td>
                    <td>$200.00</td>
                    <td>$396.00</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Crispy Bacon Bits</td>
                    <td>1</td>
                    <td>$350.00</td>
                    <td>$365.75</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Side Fries</td>
                    <td>1</td>
                    <td>$399.00</td>
                    <td>$398.90</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Lemon Wedge</td>
                    <td>4</td>
                    <td>$100.00</td>
                    <td>$396.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-4">
            <div className="row g-3 justify-content-center align-items-center pb-4 border-bottom">
              <div className="col-md-6">
                <h6 className="mb-2">Terms and Conditions</h6>
                <div className="mb-4">
                  <p className="mb-0">
                    1. Goods once sold cannot be taken back or exchanged.
                  </p>
                  <p className="mb-0">
                    2. We are not the manufacturers the company provides
                    warranty
                  </p>
                </div>
                <div className="px-3 py-2 bg-light">
                  <p className="mb-0">
                    Note : Please ensure payment is made within 7 days of
                    invoice date.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="row align-items-center pb-3 border-bottom">
                    <div className="col-6">
                      <p className="text-dark fw-semibold mb-3">Amount</p>
                      <p className="text-dark fw-semibold mb-3">CGST (9%)</p>
                      <p className="text-dark fw-semibold mb-3">SGST (9%)</p>
                      <p className="text-dark fw-semibold mb-3">
                        Discount (25%)
                      </p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="text-dark fw-semibold mb-3">$1,793.12</p>
                      <p className="text-dark fw-semibold mb-3">$18</p>
                      <p className="text-dark fw-semibold mb-3">$18</p>
                      <p className="text-danger fw-semibold">- $18</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between algin-item-center">
                  <h6>Total ($)</h6>
                  <h6>$1,972.43</h6>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-3">Authorized Sign</p>
          </div>
          <div className="d-flex justify-content-center algin-item-center flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-white d-flex align-items-center"
            >
              <i className="icon-download me-1" />
              Download PDF
            </button>
            <button
              type="button"
              className="btn btn-white d-flex align-items-center"
            >
              <i className="icon-printer me-1" />
              Print Invoice
            </button>
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
</>

  )
}

export default InvoiceDetailsComponent