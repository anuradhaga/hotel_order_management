"use client";
import { useEffect, useRef } from "react";
import BootstrapToast from "bootstrap/js/dist/toast";
import Link from "next/link";

interface ToastProps {
  msg: string;
  type: "success" | "danger" | "warning" | "info";
}

export default function Toast({ msg, type }: ToastProps) {
  const typeClasses: Record<ToastProps["type"], string> = {
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-info text-white",
  };

  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!toastRef.current) return;

    const bsToast = new BootstrapToast(toastRef.current, {
      autohide: true,
      delay: 3000,
    });

    bsToast.show();

    return () => {
      bsToast.dispose();
    };
  }, [msg, type]);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        ref={toastRef}
        id="appToast"
        className={`toast ${typeClasses[type]}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {/* Header with close icon */}
        <div className="toast-body d-flex align-items-center">
          {msg}
          <Link
            href="#"
            className="btn toats-btn"
            data-bs-dismiss="toast"
            aria-label="Close"
          >
            <i className="icon-x"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
