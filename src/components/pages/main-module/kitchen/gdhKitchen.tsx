"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface KitchenTicketItem {
  order_item_id: number;
  round_number: number;
  quantity: number;
  cooking_notes?: string;
  item_status: string;
  item_name: string;
  item_code: string;
  kitchen_dept: string;
  is_spicy: boolean;
  is_vegetarian: boolean;
}

interface KitchenTicket {
  order_id: number;
  order_number: string;
  operating_mode: string;
  order_status: string;
  pickup_token?: string;
  guest_count: number;
  created_at: string;
  outlet_name: string;
  table_number?: string;
  dining_zone?: string;
  elapsed_minutes: number;
  elapsed_seconds: number;
  sla_status: "GREEN" | "AMBER" | "RED_FLASHING";
  items: KitchenTicketItem[];
}

export default function GdhKitchenComponent() {
  const [tickets, setTickets] = useState<KitchenTicket[]>([]);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  const fetchTickets = async () => {
    try {
      const url = selectedDept ? `/api/kds?dept=${selectedDept}` : "/api/kds";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setTickets(data.data);
      }
    } catch (err) {
      console.error("Error fetching KDS tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 3000);
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, [selectedDept]);

  // Status transitions
  const handleUpdateStatus = async (order_id: number, next_status: string) => {
    try {
      const res = await fetch("/api/kds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id, next_status }),
      });
      if (res.ok) {
        fetchTickets();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const stations = [
    { label: "All Stations", dept: null, icon: "ti-layout-grid" },
    { label: "Main Kitchen", dept: "MAIN_KITCHEN", icon: "ti-chef-hat" },
    { label: "Grill Station", dept: "GRILL", icon: "ti-flame" },
    { label: "Pastry & Bakery", dept: "PASTRY", icon: "ti-cake" },
    { label: "Beverage Bar", dept: "BAR", icon: "ti-glass-cocktail" },
  ];

  return (
    <div
      className="page-wrapper p-3"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
      }}
    >
      {/* KDS Header */}
      <div className="card border-0 shadow-lg mb-3 rounded-4 bg-slate-900" style={{ backgroundColor: "#1e293b" }}>
        <div className="card-body py-2 px-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-warning text-dark px-3 py-2 fs-6 fw-bold rounded-3">
              KDS
            </span>
            <div>
              <h5 className="mb-0 fw-bold text-light">Grand Dilara Kitchen Display System</h5>
              <small className="text-secondary">Culinary SLA Monitoring & Station Dispatch</small>
            </div>
          </div>

          {/* Station Filters */}
          <div className="d-flex gap-2 overflow-auto py-1">
            {stations.map((st, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedDept(st.dept)}
                className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                  selectedDept === st.dept ? "btn-warning text-dark shadow" : "btn-dark border border-secondary text-light"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Live Clock & Ticket Stats */}
          <div className="d-flex align-items-center gap-3">
            <div className="text-end">
              <span className="badge bg-dark border border-secondary px-3 py-2 font-monospace fs-6">
                🕒 {currentTime || "Live"}
              </span>
            </div>
            <span className="badge bg-primary px-3 py-2 rounded-pill fs-6">
              {tickets.length} Active Orders
            </span>
          </div>
        </div>
      </div>

      {/* SLA Legend Banner */}
      <div className="d-flex justify-content-between align-items-center px-2 mb-3 text-secondary small">
        <div className="d-flex align-items-center gap-3">
          <span className="d-flex align-items-center gap-1">
            <span className="badge bg-success rounded-circle p-1" style={{ width: 10, height: 10 }}></span>
            Green SLA (0 - 10 min: Standard)
          </span>
          <span className="d-flex align-items-center gap-1">
            <span className="badge bg-warning rounded-circle p-1" style={{ width: 10, height: 10 }}></span>
            Amber SLA (11 - 20 min: Priority Alert)
          </span>
          <span className="d-flex align-items-center gap-1">
            <span className="badge bg-danger rounded-circle p-1" style={{ width: 10, height: 10 }}></span>
            Red SLA (&gt; 20 min: Critical Delay)
          </span>
        </div>

        <button onClick={fetchTickets} className="btn btn-sm btn-outline-light rounded-pill px-3">
          ↻ Refresh
        </button>
      </div>

      {/* Tickets Board */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
          <p className="mt-2 text-secondary">Connecting to Kitchen ticket stream...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="card border-0 p-5 text-center rounded-4" style={{ backgroundColor: "#1e293b" }}>
          <div className="display-3 mb-2">👨‍🍳</div>
          <h4 className="fw-bold text-light">All Orders Cleared</h4>
          <p className="text-secondary mb-0">No tickets currently pending preparation in this station.</p>
        </div>
      ) : (
        <div className="row g-3">
          {tickets.map((t) => {
            const isRed = t.sla_status === "RED_FLASHING";
            const isAmber = t.sla_status === "AMBER";
            const isPrepared = t.order_status === "PREPARED";
            const isReady = t.order_status === "READY";

            let headerBg = "linear-gradient(135deg, #10b981 0%, #059669 100%)"; // Green
            if (isAmber) headerBg = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"; // Amber
            if (isRed) headerBg = "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)"; // Red

            return (
              <div key={t.order_id} className="col-xl-3 col-lg-4 col-md-6">
                <div
                  className={`card border-0 shadow-lg rounded-4 overflow-hidden h-100 ${
                    isRed ? "border border-2 border-danger animate-pulse" : ""
                  }`}
                  style={{ backgroundColor: "#1e293b" }}
                >
                  {/* Card Header with SLA Color */}
                  <div className="p-3 text-white" style={{ background: headerBg }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-black fs-5 tracking-wider font-monospace">
                        {t.operating_mode === "DINE_IN" ? `TABLE ${t.table_number}` : `TOKEN ${t.pickup_token}`}
                      </span>
                      <span className="badge bg-black bg-opacity-40 px-2 py-1 font-monospace">
                        ⏱️ {t.elapsed_minutes} min
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-1" style={{ fontSize: 11 }}>
                      <span>#{t.order_number}</span>
                      <span>{t.operating_mode === "DINE_IN" ? `${t.guest_count} Covers • ${t.dining_zone}` : "Counter Pickup"}</span>
                    </div>
                  </div>

                  {/* Card Body: Items List */}
                  <div className="card-body p-3 d-flex flex-column justify-content-between">
                    <div className="list-group list-group-flush mb-3">
                      {t.items.map((itm) => (
                        <div
                          key={itm.order_item_id}
                          className="list-group-item px-0 py-2 border-secondary border-opacity-25 bg-transparent text-light"
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center gap-2">
                              <span className="badge bg-warning text-dark fw-bold" style={{ fontSize: 13 }}>
                                {itm.quantity}x
                              </span>
                              <div>
                                <span className="fw-semibold fs-14">{itm.item_name}</span>
                                {itm.round_number > 1 && (
                                  <span className="badge bg-secondary ms-1 small" style={{ fontSize: 9 }}>
                                    Round {itm.round_number}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="badge bg-dark text-secondary border border-secondary border-opacity-50" style={{ fontSize: 9 }}>
                              {itm.kitchen_dept}
                            </span>
                          </div>

                          {/* Cooking Notes */}
                          {itm.cooking_notes && (
                            <div className="text-warning small fst-italic mt-1 ms-4" style={{ fontSize: 11 }}>
                              ⚠️ {itm.cooking_notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 border-top border-secondary border-opacity-25">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-dark border border-secondary small text-secondary">
                          Status: <strong className="text-light">{t.order_status}</strong>
                        </span>
                        <small className="text-secondary">{t.outlet_name}</small>
                      </div>

                      <div className="d-grid gap-2">
                        {t.order_status === "QUEUED" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(t.order_id, "PREPARING")}
                            className="btn btn-warning btn-sm fw-bold rounded-pill"
                          >
                            ▶ Start Cooking
                          </button>
                        )}

                        {t.order_status === "PREPARING" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(t.order_id, "PREPARED")}
                            className="btn btn-success btn-sm fw-bold rounded-pill"
                          >
                            ✓ Mark Prepared (Plate Ready)
                          </button>
                        )}

                        {t.order_status === "PREPARED" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(t.order_id, "READY")}
                            className="btn btn-info text-white btn-sm fw-bold rounded-pill"
                          >
                            🔔 Call for Pickup / Expedite
                          </button>
                        )}

                        {t.order_status === "READY" && (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(t.order_id, "COLLECTED")}
                            className="btn btn-outline-light btn-sm fw-bold rounded-pill"
                          >
                            🤝 Handed Over to Guest
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
