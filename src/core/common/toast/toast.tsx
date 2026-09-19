"use client";
import { useState } from "react";

interface ToastProps {
  msg: string;
  type: "success" | "danger" | "warning" | "info";
  onClose?: () => void;
}

export default function Toast({ msg, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  const typeClasses: Record<ToastProps["type"], string> = {
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-info text-white",
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        id="appToast"
        className={`toast show fade ${typeClasses[type]}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ display: "block" }}
      >
        <div className="toast-body d-flex align-items-center justify-content-between">
          <span>{msg}</span>
          <button
            type="button"
            className="btn toats-btn text-white p-0 ms-2 border-0 bg-transparent"
            onClick={handleDismiss}
            aria-label="Close"
          >
            <i className="icon-x" style={{ fontSize: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
