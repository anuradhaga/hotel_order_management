"use client";

import React, { useEffect, useState, use } from "react";

interface OrderTrackingData {
  order_number: string;
  pickup_token: string;
  masked_phone: string;
  order_status: string;
  milestone_step: number;
  milestone_text: string;
  outlet_name: string;
  event_name?: string;
  created_at: string;
  subtotal_amount: number;
  discount_amount: number;
  sc_amount: number;
  vat_amount: number;
  net_payable: number;
  items: Array<{
    quantity: number;
    unit_price: number;
    line_total: number;
    cooking_notes?: string;
    item_name: string;
    item_code: string;
    round_number: number;
  }>;
}

export default function GuestTrackingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;

  const [order, setOrder] = useState<OrderTrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchTrackingData = async () => {
    try {
      const res = await fetch(`/api/tracking/${token}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Unable to locate order tracking information.");
      } else {
        setOrder(data.data);
        setError(null);
        setLastRefreshed(new Date());
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to tracking server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 4000);
    return () => clearInterval(interval);
  }, [token]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white p-3">
        <div className="text-center">
          <div className="spinner-border text-warning mb-3" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          <h5 className="fw-semibold">Loading Grand Dilara Guest Tracker...</h5>
          <p className="text-secondary small">Synchronizing real-time kitchen status</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
        <div className="card border-0 shadow-lg p-4 text-center" style={{ maxWidth: 450, borderRadius: 20 }}>
          <div className="display-4 text-danger mb-3">⚠️</div>
          <h4 className="fw-bold text-dark">Order Not Found</h4>
          <p className="text-muted">{error || "This tracking link may be invalid or expired."}</p>
          <button onClick={fetchTrackingData} className="btn btn-primary rounded-pill px-4">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const milestones = [
    { title: "Confirmed", desc: "Ticket in kitchen queue", icon: "bi-check2-circle" },
    { title: "In Kitchen", desc: "Chefs are actively cooking", icon: "bi-fire" },
    { title: "Ready for Pickup", desc: "Packaged at counter", icon: "bi-bell" },
    { title: "Collected", desc: "Order handed over", icon: "bi-hand-thumbs-up" },
  ];

  const isReady = order.milestone_step >= 2;

  return (
    <div className="min-vh-100" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#f8fafc" }}>
      {/* Header */}
      <header className="py-3 px-4 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center bg-black bg-opacity-25 backdrop-blur">
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-warning text-dark px-2 py-1 fw-bold">GDH</span>
            <span className="fw-bold fs-6 tracking-wide text-uppercase text-light">Grand Dilara Hotel & Suites</span>
          </div>
          <small className="text-secondary">{order.outlet_name} {order.event_name ? `• ${order.event_name}` : ""}</small>
        </div>
        <div className="text-end">
          <span className="badge bg-dark border border-secondary px-3 py-2 rounded-pill small">
            Live Sync <span className="spinner-grow spinner-grow-sm text-success ms-1" style={{ width: 8, height: 8 }}></span>
          </span>
        </div>
      </header>

      <div className="container py-4" style={{ maxWidth: 650 }}>
        {/* Pickup Token Card */}
        <div
          className={`card border-0 shadow-lg text-center p-4 mb-4 ${
            isReady ? "border border-2 border-warning" : ""
          }`}
          style={{
            background: isReady ? "linear-gradient(135deg, #1e3a8a 0%, #065f46 100%)" : "rgba(30, 41, 59, 0.7)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            boxShadow: isReady ? "0 0 35px rgba(16, 185, 129, 0.3)" : undefined,
          }}
        >
          <span className="text-secondary text-uppercase small fw-semibold tracking-wider">Your Pickup Token</span>
          <div className="display-3 fw-black text-warning my-2 tracking-widest font-monospace">
            {order.pickup_token || `#${order.order_number.slice(-4)}`}
          </div>

          <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
            <span className={`badge px-3 py-2 rounded-pill fs-6 ${
              order.milestone_step === 2
                ? "bg-warning text-dark fw-bold animate-pulse"
                : order.milestone_step === 3
                ? "bg-secondary text-white"
                : "bg-primary text-white"
            }`}>
              {order.milestone_text}
            </span>
          </div>

          {order.milestone_step === 2 && (
            <div className="alert alert-warning text-dark border-0 mt-3 py-2 px-3 rounded-pill fw-medium small animate-bounce">
              🔔 Your meal is hot and ready! Please present token <strong>{order.pickup_token}</strong> at the counter.
            </div>
          )}

          <div className="mt-3 text-secondary small d-flex justify-content-center gap-3">
            <span>Order: <strong className="text-light">{order.order_number}</strong></span>
            <span>•</span>
            <span>Mobile: <strong className="text-light">{order.masked_phone}</strong></span>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div
          className="card border-0 p-4 mb-4 shadow-sm"
          style={{ background: "rgba(30, 41, 59, 0.7)", backdropFilter: "blur(12px)", borderRadius: 20 }}
        >
          <h6 className="text-uppercase text-secondary small fw-bold mb-4">Preparation Lifecycle</h6>

          <div className="position-relative mb-4">
            {/* Progress line background */}
            <div
              className="position-absolute start-0 end-0 bg-secondary bg-opacity-25"
              style={{ height: 4, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
            ></div>
            {/* Active progress fill */}
            <div
              className="position-absolute start-0 bg-warning transition-all"
              style={{
                height: 4,
                top: "50%",
                transform: "translateY(-50%)",
                width: `${(Math.min(order.milestone_step, 3) / 3) * 100}%`,
                zIndex: 2,
                transition: "width 0.6s ease-in-out",
              }}
            ></div>

            {/* Steps */}
            <div className="d-flex justify-content-between position-relative" style={{ zIndex: 3 }}>
              {milestones.map((m, idx) => {
                const isPassed = order.milestone_step >= idx;
                const isCurrent = order.milestone_step === idx;
                return (
                  <div key={idx} className="text-center" style={{ width: 70 }}>
                    <div
                      className={`rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-sm ${
                        isCurrent
                          ? "bg-warning text-dark fw-bold border border-3 border-white scale-up"
                          : isPassed
                          ? "bg-success text-white"
                          : "bg-dark text-secondary border border-secondary"
                      }`}
                      style={{
                        width: 38,
                        height: 38,
                        fontSize: 14,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isPassed ? "✓" : idx + 1}
                    </div>
                    <div className={`small mt-2 ${isCurrent ? "fw-bold text-warning" : isPassed ? "text-light" : "text-secondary"}`} style={{ fontSize: 11 }}>
                      {m.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Itemized Order Receipt Details */}
        <div
          className="card border-0 p-4 mb-4 shadow-sm"
          style={{ background: "rgba(30, 41, 59, 0.7)", backdropFilter: "blur(12px)", borderRadius: 20 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="text-uppercase text-secondary small fw-bold m-0">Ordered Items</h6>
            <span className="badge bg-dark text-secondary border border-secondary border-opacity-50">
              {order.items?.length || 0} Items
            </span>
          </div>

          <div className="list-group list-group-flush bg-transparent">
            {order.items?.map((item, i) => (
              <div
                key={i}
                className="list-group-item bg-transparent text-light border-secondary border-opacity-25 px-0 py-3 d-flex justify-content-between align-items-start"
              >
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-warning bg-opacity-25 text-warning fw-bold">{item.quantity}x</span>
                    <span className="fw-semibold">{item.item_name}</span>
                  </div>
                  {item.cooking_notes && (
                    <div className="text-warning small fst-italic mt-1 ms-4">
                      Note: {item.cooking_notes}
                    </div>
                  )}
                  {item.round_number > 1 && (
                    <div className="text-secondary small ms-4">Round {item.round_number}</div>
                  )}
                </div>
                <div className="text-end font-monospace text-light fw-medium">
                  LKR {Number(item.line_total).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Breakdown */}
          <div className="border-top border-secondary border-opacity-50 pt-3 mt-2 text-secondary small">
            <div className="d-flex justify-content-between py-1">
              <span>Item Subtotal</span>
              <span className="font-monospace text-light">LKR {Number(order.subtotal_amount).toFixed(2)}</span>
            </div>
            {Number(order.discount_amount) > 0 && (
              <div className="d-flex justify-content-between py-1 text-danger">
                <span>Promotional / Guest Discount</span>
                <span className="font-monospace">- LKR {Number(order.discount_amount).toFixed(2)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between py-1">
              <span>Service Charge (10%)</span>
              <span className="font-monospace text-light">LKR {Number(order.sc_amount).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between py-1">
              <span>VAT (15%)</span>
              <span className="font-monospace text-light">LKR {Number(order.vat_amount).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-top border-secondary border-opacity-25 mt-2 fs-6 fw-bold text-warning">
              <span>Total Payable Amount</span>
              <span className="font-monospace">LKR {Number(order.net_payable).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-secondary small pb-4">
          <p className="mb-1">Grand Dilara Hotel & Suites • Luxury Dining & Hospitality</p>
          <p className="text-muted" style={{ fontSize: 11 }}>
            Last status check: {lastRefreshed.toLocaleTimeString()} • Zero installation tracking
          </p>
        </div>
      </div>
    </div>
  );
}
