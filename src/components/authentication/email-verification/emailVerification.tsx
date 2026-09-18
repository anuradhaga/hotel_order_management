"use client";
import { all_routes } from "@/routes/all_routes";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";

const EmailVerificationComponent = () => {

  return (
    <>

      {/* ========================
         Start Page Content
       ========================= */}
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row g-2">
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
              <div className="row justify-content-center align-items-center overflow-auto flex-wrap auth-vh vh-100">
                <div className="col-xl-8 col-lg-10 col-md-8 col-sm-10 mx-auto">
                  <form>
                    <div className="d-flex flex-column justify-content-between p-3">
                      <div className="mb-5">
                        <Link href="/">
                          <ImageWithBasePath
                            src="assets/img/logo.svg"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </Link>
                      </div>

                      <div>
                        <div className="mb-4">
                          <h3 className="mb-2">Check your Email</h3>
                          <p className="mb-0">
                            We have sent a password recovery instruction to your email
                          </p>
                        </div>

                        <div className="mb-4">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Resend Email
                          </button>
                        </div>


                        <div className="text-center mt-4">
                          <p className="fw-normal mb-0">
                            Back to
                            <Link href={all_routes.login} className="link-primary">
                              {" "}
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="col-lg-6">
              <div className="position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100 p-4 ps-0">
                <div className="w-100 rounded-3 position-relative h-100 bg-primary z-1 overflow-hidden">
                  <ImageWithBasePath
                    src="assets/img/authentication/authentication-bg-01.png"
                    className="img-fluid position-absolute end-0 z-n1 auth-bg-01"
                    alt="bg"
                  />
                  <ImageWithBasePath
                    src="assets/img/authentication/authentication-bg-02.png"
                    className="img-fluid position-absolute top-0 end-0 z-n1 auth-bg-02"
                    alt="bg"
                  />
                  <div className="px-4 rounded-3 h-100 d-flex flex-column align-items-center auth-wrap">
                    <div className="text-center z-2">
                      <h1 className="text-white mb-2">
                        Complete Control of Your Cafe &amp; Restaurant with Ease
                      </h1>
                      <p className="text-white mb-0">
                        From billing to inventory access everything you need in a single powerful dashboard, Analyze sales, track your best-selling dishes.
                      </p>
                    </div>

                    <div className="text-center auth-img position-absolute bottom-0">
                      <ImageWithBasePath
                        src="assets/img/authentication/login.png"
                        className="img-fluid position-relative z-1"
                        alt="user"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationComponent;
