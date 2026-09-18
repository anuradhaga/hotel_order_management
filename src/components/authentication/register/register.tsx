
import { useAuth } from "../auth-context/authContext";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Toast from "@/core/common/toast/toast";
import { all_routes } from "../../../routes/all_routes";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import { useRouter } from "next/navigation";
import Link from "next/link";
type PasswordField = "password" | "confirmPassword";

const RegisterComponent = () => {
  const { register } = useAuth();
  const navigate = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "danger" | "warning" | "info";
  } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (
    msg: string,
    type: "success" | "danger" | "warning" | "info"
  ) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 🔹 Basic validations
    if (!username.trim()) {
      return showToast("Username is required!", "danger");
    }

    if (!email.includes("@")) {
      return showToast("Invalid email address!", "danger");
    }

    if (password.length < 4) {
      return showToast("Password must be at least 4 characters", "warning");
    }

    if (password !== confirmPassword) {
      return showToast("Passwords do not match!", "danger");
    }

    // 🔹 Save to localStorage (your authContext does this)
    register(email, password);

    showToast("Registered Successfully!", "success");

    // Optionally clear fields
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate.push(all_routes.login);
    }, 400);
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* ======================== Start Page Content ========================= */}
      <div className="container-fuild">
        <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div className="row g-2">
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
              <div className="row justify-content-center align-items-center overflow-auto flex-wrap auth-vh vh-100">
                <div className="col-xl-8 col-lg-10 col-md-8 col-sm-10 mx-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="mb-5">
                        <Link href={all_routes.dashboard}>
                          <ImageWithBasePath
                            src="assets/img/logo.svg"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </Link>
                      </div>

                      <div>
                        <div className="mb-4">
                          <h3 className="mb-2">Sign Up</h3>
                          <p className="mb-0">And lets get started with your free trial</p>
                        </div>

                        {/* Username */}
                        <div className="mb-3">
                          <label className="form-label">
                            Username <span className="text-danger">*</span>
                          </label>
                          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                          <label className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-flat pass-group">
                            <input type={ passwordVisibility.password ? "text" : "password" } className="form-control pass-input" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
                            <span className={`ti toggle-password input-group-text toggle-password ${passwordVisibility.password ? "icon-eye" : "icon-eye-off" }`}onClick={() => togglePasswordVisibility("password")}></span>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                          <label className="form-label">
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-group input-group-flat pass-group">
                            <input type={ passwordVisibility.confirmPassword ? "text" : "password" } className="form-control pass-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} aria-label="Confirm Password" />
                            <span className={`ti toggle-password input-group-text toggle-password ${passwordVisibility.confirmPassword ? "icon-eye" : "icon-eye-off" }`} onClick={() => togglePasswordVisibility("confirmPassword") } ></span>
                          </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <div className="form-check form-check-md mb-0">
                            <input className="form-check-input" id="remember_me" type="checkbox" />
                            <label htmlFor="remember_me" className="form-check-label text-dark mt-0" >
                              Remember Me
                            </label>
                          </div>
                        
                        </div>

                        {/* Submit */}
                        <div className="mb-4">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Sign Up
                          </button>
                        </div>

                        {/* Social Buttons */}
                        <div className="login-or position-relative mb-4 text-center">
                          <span className="position-relative bg-white px-2 z-2">
                            or continue with
                          </span>
                        </div>

                        <div className="d-flex align-items-center justify-content-center flex-wrap">
                          <div className="text-center me-2 flex-fill">
                            <Link href="#" className="btn btn-white d-flex align-items-center justify-content-center shadow" >
                              <ImageWithBasePath className="img-fluid me-2" src="assets/img/icons/google.svg" alt="google" />
                              Google
                            </Link>
                          </div>

                          <div className="text-center me-2 flex-fill">
                            <Link href="#" className="btn btn-white d-flex align-items-center justify-content-center shadow" >
                              <ImageWithBasePath className="img-fluid me-2" src="assets/img/icons/fb.svg" alt="facebook" />
                              Facebook
                            </Link>
                          </div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-4">
                          <p className="fw-normal mb-0">
                            Already have an account?{" "}
                            <Link href={all_routes.login} className="link-primary">
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

            {/* Right Side */}
            <div className="col-lg-6">
              <div className="position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100 p-4 ps-0">
                <div className="w-100 rounded-3 position-relative h-100 bg-primary z-1 overflow-hidden">
                  <ImageWithBasePath src="assets/img/authentication/authentication-bg-01.png" className="img-fluid position-absolute bottom-0 end-0 z-n1 auth-bg-01" alt="bg" />
                  <ImageWithBasePath src="assets/img/authentication/authentication-bg-02.png" className="img-fluid position-absolute top-0 end-0 z-n1 auth-bg-02" alt="bg" />
                  <div className="px-4 rounded-3 h-100 d-flex flex-column align-items-center auth-wrap">
                    <div className="text-center z-2">
                      <h1 className="text-white mb-2">
                        Complete Control of Your Cafe & Restaurant with Ease
                      </h1>
                      <p className="text-white mb-0">
                        From billing to inventory access everything you need in a single powerful dashboard, Analyze sales, track your best-selling dishes.
                      </p>
                    </div>

                    <div className="text-center auth-img position-absolute bottom-0">
                      <ImageWithBasePath src="assets/img/authentication/login.png" className="img-fluid position-relative z-1" alt="user" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* End Right Side */}
          </div>
        </div>
      </div>
      {/* ======================== End Page Content ========================= */}
    </>
  );
};

export default RegisterComponent;
