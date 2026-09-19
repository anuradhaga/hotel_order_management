"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Toast from "@/core/common/toast/toast";
import { useAuth } from "../auth-context/authContext";
import { getDashboardForRole } from "@/utils/roleRoutes";
import ImageWithBasePath from "@/core/common/image-with-base-path";

type PasswordField = "password" | "confirmPassword";

const DEMO_ACCOUNTS = [
  { role: "ADMIN", label: "Admin", username: "admin", pass: "Niranura@1", dest: "/dashboard", badge: "bg-primary" },
  { role: "WAITER", label: "Waiter", username: "waiter1", pass: "waiter123", dest: "/pos", badge: "bg-info" },
  { role: "CASHIER", label: "Cashier", username: "cashier1", pass: "cashier123", dest: "/pos", badge: "bg-success" },
  { role: "CHEF", label: "Chef", username: "chef1", pass: "chef123", dest: "/kitchen", badge: "bg-danger" },
  { role: "MANAGER", label: "Manager", username: "manager1", pass: "manager123", dest: "/dashboard", badge: "bg-warning text-dark" },
  { role: "EXPEDITER", label: "Expediter", username: "expediter1", pass: "expediter123", dest: "/kitchen", badge: "bg-secondary" },
];

const Login = () => {
  const router = useRouter();
  const { login, user, isInitialized } = useAuth();

  // Form state
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Niranura@1");
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (isInitialized && user) {
      const destination = getDashboardForRole(user.role_code);
      router.replace(destination);
    }
  }, [isInitialized, user, router]);

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

      const roleRoute = getDashboardForRole(result.user?.role_code);
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get("redirect");
      const targetUrl =
        redirectUrl && !redirectUrl.startsWith("/login") ? redirectUrl : roleRoute;

      showToast(
        `Welcome ${result.user?.full_name || username}! Redirecting to ${targetUrl}...`,
        "success"
      );

      setTimeout(() => {
        router.push(targetUrl);
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

                          {/* Quick Role Switcher for seamless testing */}
                          <div className="mb-3 p-3 bg-light rounded border">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-semibold text-uppercase text-secondary" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                                ⚡ Quick Role Login
                              </span>
                              <span className="text-muted" style={{ fontSize: "11px" }}>Select to auto-fill</span>
                            </div>
                            <div className="d-flex flex-wrap gap-1">
                              {DEMO_ACCOUNTS.map((acc) => (
                                <button
                                  key={acc.username}
                                  type="button"
                                  className={`btn btn-xs py-1 px-2 border rounded ${
                                    username === acc.username ? "btn-dark text-white" : "btn-white"
                                  }`}
                                  style={{ fontSize: "11px" }}
                                  onClick={() => {
                                    setUsername(acc.username);
                                    setPassword(acc.pass);
                                  }}
                                >
                                  <span className={`badge ${acc.badge} me-1`} style={{ fontSize: "9px" }}>
                                    {acc.role}
                                  </span>
                                  {acc.label}
                                </button>
                              ))}
                            </div>
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
                              placeholder="e.g. admin, waiter1, or chef1"
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
                          <div className="d-flex align-items-center mb-4">
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
                          <div className="mb-3">
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
