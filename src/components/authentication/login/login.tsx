"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Toast from "@/core/common/toast/toast";
import { useAuth } from "../auth-context/authContext";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "@/core/common/image-with-base-path";

type PasswordField = "password" | "confirmPassword";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  // Form state
  const [username, setUsername] = useState("anuradha");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "danger" | "warning" | "info";
  } | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (
    message: string,
    type: "success" | "danger" | "warning" | "info"
  ) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);

    setToast({ msg: message, type });
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      showToast("Please enter both username and password!", "danger");
      return;
    }

    setLoading(true);
    try {
      const result = await login(username.trim(), password);

      if (!result.ok) {
        showToast(result.msg ?? "Invalid username or password", "danger");
        setLoading(false);
        return;
      }

      showToast(result.msg || "Login successful! Redirecting...", "success");

      setTimeout(() => {
        router.push(all_routes.pos || all_routes.dashboard);
      }, 500);
    } catch (err: any) {
      showToast(err.message || "An unexpected error occurred", "danger");
      setLoading(false);
    }
  };

  // Password visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <>
      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Begin Wrapper */}
      <div className="main-wrapper">
        {/* ========================
          Start Page Content
        ========================= */}
        <div className="container-fuild">
          {/* Start Content */}
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            {/* start row */}
            <div className="row g-2">
              <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                {/* start row */}
                <div className="row justify-content-center align-items-center overflow-auto flex-wrap auth-vh vh-100">
                  <div className="col-xl-8 col-lg-10 col-md-8 col-sm-10 mx-auto">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex flex-column justify-content-between">
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
                            <h3 className="mb-2">Hi, Welcome Back !!!</h3>
                            <p className="mb-0">
                              Please enter your credentials to sign in!
                            </p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Username / Email<span className="text-danger"> *</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="e.g. anuradha, admin, or waiter1"
                              autoComplete="username"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label fw-semibold">
                              Password<span className="text-danger"> *</span>
                            </label>
                            <div className="input-group input-group-flat pass-group">
                              <input
                                type={
                                  passwordVisibility.password
                                    ? "text"
                                    : "password"
                                }
                                className="form-control pass-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                              />
                              <span
                                className="input-group-text toggle-password cursor-pointer"
                                onClick={() => togglePasswordVisibility("password")}
                                style={{ cursor: "pointer" }}
                              >
                                <i
                                  className={
                                    passwordVisibility.password
                                      ? "icon-eye"
                                      : "icon-eye-off"
                                  }
                                />
                              </span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-md mb-0">
                                <input
                                  className="form-check-input"
                                  id="remember_me"
                                  type="checkbox"
                                />
                                <label
                                  htmlFor="remember_me"
                                  className="form-check-label text-dark mt-0"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </div>
                            <div className="text-end">
                              <Link
                                href={all_routes.forgotPassword}
                                className="link-primary"
                              >
                                Forgot Password?
                              </Link>
                            </div>
                          </div>
                          <div className="mb-4">
                            <button
                              type="submit"
                              className="btn btn-primary w-100 fw-bold"
                              disabled={loading}
                            >
                              {loading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                                  Signing In...
                                </>
                              ) : (
                                "Sign In"
                              )}
                            </button>
                          </div>
                          <div className="login-or position-relative mb-4 text-center">
                            <span className="position-relative bg-white px-2 z-2">
                              or continue with
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-center flex-wrap">
                            <div className="text-center me-2 flex-fill">
                              <Link
                                href="#"
                                className="btn btn-white d-flex align-items-center justify-content-center shadow"
                              >
                                <ImageWithBasePath
                                  className="img-fluid me-2"
                                  src="assets/img/icons/google.svg"
                                  alt="google"
                                />
                                Google
                              </Link>
                            </div>
                            <div className="text-center me-2 flex-fill">
                              <Link
                                href="#"
                                className="btn btn-white d-flex align-items-center justify-content-center shadow"
                              >
                                <ImageWithBasePath
                                  className="img-fluid me-2"
                                  src="assets/img/icons/fb.svg"
                                  alt="facebook"
                                />
                                Facebook
                              </Link>
                            </div>
                          </div>
                          <div className="text-center mt-4">
                            <p className="fw-normal mb-0">
                              Don&apos;t have an account?
                              <Link
                                href={all_routes.register}
                                className="link-primary"
                              >
                                {" "}
                                Sign Up
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* end col */}
                </div>
                {/* end row */}
              </div>
              {/* end col */}
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
                          Complete Control of Your Cafe &amp; Restaurant with
                          Ease
                        </h1>
                        <p className="text-white mb-0">
                          From billing to inventory access everything you need
                          in a single powerful dashboard, Analyze sales, track
                          your best-selling dishes.
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
            {/* end row */}
          </div>
          {/* End Content */}
        </div>
        {/* ========================
          End Page Content
        ========================= */}
      </div>
      {/* End Wrapper */}
    </>
  );
};

export default Login;
