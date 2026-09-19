"use client";

import React, { useState, useEffect } from "react";
import { calculateHospitalityTaxes } from "@/lib/taxEngine";

interface MenuItem {
  item_id: number;
  category_id: number;
  item_code: string;
  item_name: string;
  description?: string;
  kitchen_dept: string;
  effective_kitchen_dept?: string;
  is_spicy: boolean;
  is_vegetarian: boolean;
  selling_price: number;
  catalog_price?: number;
  is_complimentary?: boolean | number;
}

interface Category {
  category_id: number;
  category_name: string;
  category_code: string;
  icon_class: string;
}

interface CartItem {
  item: MenuItem;
  quantity: number;
  cooking_notes: string;
  round_number: number;
}

interface UserData {
  user_id: number;
  username: string;
  full_name: string;
  role_code: string;
}

interface TableData {
  table_id: number;
  table_number: string;
  seating_capacity: number;
  dining_zone: string;
  current_status: string;
  active_order_id: number | null;
  net_payable?: number;
  waiter_user_id?: number | null;
  waiter_name?: string | null;
}

interface OutletData {
  outlet_id: number;
  outlet_code: string;
  outlet_name: string;
  outlet_type: string;
}

export default function GdhPosComponent() {
  // Operating Mode: 'OUTLET_COUNTER' (Mode A), 'DINE_IN' (Mode B), or 'SPECIAL_EVENT' (Mode C)
  const [operatingMode, setOperatingMode] = useState<"OUTLET_COUNTER" | "DINE_IN" | "SPECIAL_EVENT">("OUTLET_COUNTER");
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [activeEvent, setActiveEvent] = useState<any | null>(null);

  // Masters
  const [outlets, setOutlets] = useState<OutletData[]>([]);
  const [selectedOutletId, setSelectedOutletId] = useState<number>(2); // Default Poolside Cafe
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<TableData[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedWaiterId, setSelectedWaiterId] = useState<number>(3); // Default Sunil Fernando (WAITER)

  // Mode-specific states
  const [customerMobile, setCustomerMobile] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [orderNotes, setOrderNotes] = useState<string>("");

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals & Confirmation States
  const [submitting, setSubmitting] = useState(false);
  const [activeOrderConfirmation, setActiveOrderConfirmation] = useState<any | null>(null);
  const [otpInput, setOtpInput] = useState<string>("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState<string | null>(null);
  const [otpCooldown, setOtpCooldown] = useState<number>(0);

  // Settlement Modal (Mode A advance or Mode B table settlement)
  const [settleModalOpen, setSettleModalOpen] = useState(false);
  const [settleOrderTarget, setSettleOrderTarget] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "ROOM_CHARGE">("CASH");
  const [tenderedAmount, setTenderedAmount] = useState<string>("");
  const [cardAuthCode, setCardAuthCode] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [guestName, setGuestName] = useState<string>("");
  const [settleError, setSettleError] = useState<string | null>(null);
  const [settleReceipt, setSettleReceipt] = useState<any | null>(null);

  // Fetch initial data
  const loadData = async () => {
    try {
      const [menuRes, outletsRes, tablesRes, usersRes, eventsRes] = await Promise.all([
        fetch("/api/menu"),
        fetch("/api/outlets"),
        fetch("/api/tables"),
        fetch("/api/users"),
        fetch("/api/events?active_only=true"),
      ]);

      const menuData = await menuRes.json();
      const outletsData = await outletsRes.json();
      const tablesData = await tablesRes.json();
      const usersData = await usersRes.json();
      const eventsData = await eventsRes.json();

      if (menuData.success) {
        setCategories(menuData.categories);
        setItems(menuData.items);
      }
      if (outletsData.success) {
        setOutlets(outletsData.data);
      }
      if (tablesData.success) {
        setTables(tablesData.data);
      }
      if (eventsData.success && Array.isArray(eventsData.data)) {
        setEvents(eventsData.data);
      }
      if (usersData.success && Array.isArray(usersData.data)) {
        setUsers(usersData.data);
        const defaultWaiter = usersData.data.find((u: any) => u.role_code === "WAITER") || usersData.data[0];
        if (defaultWaiter) {
          setSelectedWaiterId(defaultWaiter.user_id);
        }
      }
    } catch (err) {
      console.error("Error loading POS master data:", err);
    }
  };

  const handleSelectEvent = async (event: any) => {
    setSelectedEventId(event.event_id);
    setActiveEvent(event);
    if (event.outlet_id) {
      setSelectedOutletId(event.outlet_id);
    }
    // Load event's customized menu
    try {
      const res = await fetch(`/api/events/${event.event_id}/menu`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setItems(
          data.data.map((em: any) => ({
            item_id: em.item_id,
            category_id: em.category_id || 1,
            item_code: em.item_code,
            item_name: em.item_name,
            description: em.description,
            kitchen_dept: em.effective_kitchen_dept || em.default_kitchen_dept,
            effective_kitchen_dept: em.effective_kitchen_dept,
            is_spicy: em.is_spicy,
            is_vegetarian: em.is_vegetarian,
            selling_price: em.selling_price,
            catalog_price: em.catalog_price,
            is_complimentary: em.is_complimentary,
          }))
        );
      }
    } catch (err) {
      console.error("Error loading event menu:", err);
    }
  };

  const switchToStandardMenu = async () => {
    setSelectedEventId(null);
    setActiveEvent(null);
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  // OTP Cooldown timer tick
  useEffect(() => {
    if (otpCooldown > 0) {
      const t = setTimeout(() => setOtpCooldown(otpCooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpCooldown]);

  // Add Item to Cart
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (ci) => ci.item.item_id === item.item_id && ci.round_number === currentRound
      );
      if (existing) {
        return prev.map((ci) =>
          ci.item.item_id === item.item_id && ci.round_number === currentRound
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [
        ...prev,
        {
          item,
          quantity: 1,
          cooking_notes: "",
          round_number: currentRound,
        },
      ];
    });
  };

  const updateQuantity = (itemId: number, round: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.item_id === itemId && ci.round_number === round) {
            const next = ci.quantity + delta;
            return next > 0 ? { ...ci, quantity: next } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const updateNotes = (itemId: number, round: number, notes: string) => {
    setCart((prev) =>
      prev.map((ci) =>
        ci.item.item_id === itemId && ci.round_number === round
          ? { ...ci, cooking_notes: notes }
          : ci
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCustomerMobile("");
    setSelectedTableId(null);
    setDiscountPercent(0);
    setOrderNotes("");
  };

  // Compute live financial totals using statutory tax engine
  const cartSubtotal = cart.reduce(
    (sum, ci) => sum + Number(ci.item.selling_price) * ci.quantity,
    0
  );
  const discountAmount = Math.round((cartSubtotal * (discountPercent / 100)) * 100) / 100;
  const taxes = calculateHospitalityTaxes({
    subtotal: cartSubtotal,
    discountAmount,
  });

  // Filter items
  const filteredItems = items.filter((itm) => {
    const matchesCategory = selectedCategoryId ? itm.category_id === selectedCategoryId : true;
    const matchesSearch = searchQuery
      ? itm.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itm.item_code.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Selected table info
  const activeTableInfo = tables.find((t) => t.table_id === selectedTableId);

  // Submit Order (Mode A or Mode B)
  const handleSubmitOrder = async () => {
    if (!cart.length) {
      alert("Please select at least one menu item.");
      return;
    }

    if (operatingMode === "OUTLET_COUNTER" && !customerMobile.trim()) {
      alert("Customer mobile number is mandatory for counter orders (SRS FR-OUT-002).");
      return;
    }

    if (operatingMode === "DINE_IN" && !selectedTableId) {
      alert("Please select a dining table from the floor layout (SRS FR-RES-001).");
      return;
    }

    if (operatingMode === "SPECIAL_EVENT" && !selectedEventId) {
      alert("Please select an active special event.");
      return;
    }

    setSubmitting(true);
    try {
      const isEventMode = operatingMode === "SPECIAL_EVENT";
      const resolvedMode = isEventMode ? (selectedTableId ? "DINE_IN" : "OUTLET_COUNTER") : operatingMode;

      const payload = {
        operating_mode: resolvedMode,
        outlet_id: selectedOutletId,
        event_id: isEventMode ? selectedEventId : null,
        table_id: resolvedMode === "DINE_IN" ? selectedTableId : null,
        waiter_user_id: resolvedMode === "DINE_IN" ? selectedWaiterId : null,
        customer_mobile: resolvedMode === "OUTLET_COUNTER" ? (customerMobile.trim() || (isEventMode ? "0770000000" : null)) : null,
        guest_count: guestCount,
        discount_amount: discountAmount,
        notes: orderNotes,
        existing_order_id: activeTableInfo?.active_order_id || undefined,
        items: cart.map((ci) => ({
          item_id: ci.item.item_id,
          quantity: ci.quantity,
          unit_price: ci.item.selling_price,
          cooking_notes: ci.cooking_notes,
          round_number: ci.round_number,
          routed_kitchen_dept: ci.item.effective_kitchen_dept || activeEvent?.dedicated_kitchen_dept || undefined,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        alert(resData.error || "Failed to submit order.");
      } else {
        setActiveOrderConfirmation(resData.data);
        // Refresh tables
        loadData();

        if (isEventMode) {
          alert(`🎉 Special Event Order #${resData.data.order_number} successfully dispatched directly to ${activeEvent?.dedicated_kitchen_dept || 'Banquet Kitchen'} for ${activeEvent?.event_name}!`);
          clearCart();
        } else if (operatingMode === "DINE_IN") {
          // Direct dispatch confirmation
          alert(`Order #${resData.data.order_number} successfully dispatched to Kitchen Queue for Table ${activeTableInfo?.table_number}!`);
          clearCart();
        } else {
          // Open OTP modal for counter order
          setOtpInput("");
          setOtpError(null);
          setOtpSuccessMessage(null);
        }
      }
    } catch (err: any) {
      alert("Server communication error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Verify OTP (Mode A Counter)
  const handleVerifyOtp = async () => {
    if (!activeOrderConfirmation || !otpInput.trim()) {
      setOtpError("Please enter the 6-digit OTP code.");
      return;
    }

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: activeOrderConfirmation.order_id,
          otp_code: otpInput.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setOtpError(data.error || "Invalid OTP code.");
      } else {
        setOtpSuccessMessage(`✓ OTP Verified! Ticket dispatched with Pickup Token ${data.data.pickup_token}`);
        setOtpError(null);
        // Prompt for advance payment settlement or keep open
        setTimeout(() => {
          setSettleOrderTarget({
            order_id: activeOrderConfirmation.order_id,
            order_number: activeOrderConfirmation.order_number,
            pickup_token: data.data.pickup_token,
            net_payable: taxes.netPayable,
            customer_mobile: customerMobile,
            operating_mode: "OUTLET_COUNTER",
          });
          setActiveOrderConfirmation(null);
          setSettleModalOpen(true);
          setTenderedAmount(taxes.netPayable.toString());
          clearCart();
        }, 1500);
      }
    } catch (err: any) {
      setOtpError("Failed to verify OTP: " + err.message);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!activeOrderConfirmation) return;
    try {
      const res = await fetch("/api/otp/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: activeOrderConfirmation.order_id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setOtpError(data.error || "Failed to resend OTP.");
      } else {
        setOtpSuccessMessage(`New OTP sent! (Simulated code: ${data.simulated_otp})`);
        setOtpCooldown(60);
      }
    } catch (err: any) {
      setOtpError(err.message);
    }
  };

  // Execute Settlement
  const handleSettlePayment = async () => {
    if (!settleOrderTarget) return;

    setSettleError(null);
    try {
      const res = await fetch("/api/billing/settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: settleOrderTarget.order_id,
          payment_method: paymentMethod,
          tendered_amount: parseFloat(tenderedAmount) || settleOrderTarget.net_payable,
          card_auth_code: cardAuthCode,
          room_number: roomNumber,
          guest_name: guestName,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSettleError(data.error || "Payment settlement failed.");
      } else {
        setSettleReceipt(data.data);
        loadData();
      }
    } catch (err: any) {
      setSettleError(err.message);
    }
  };

  return (
    <div className="page-wrapper p-3" style={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      {/* Top Navigation & Mode Switcher */}
      <div className="card border-0 shadow-sm mb-3 rounded-4">
        <div className="card-body py-2 px-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-dark text-warning px-3 py-2 fs-6 fw-bold rounded-3">
              GDH-OMS
            </span>
            <div>
              <h5 className="mb-0 fw-bold text-dark">Grand Dilara Hotel & Suites</h5>
              <small className="text-muted">Point of Sale & Order Release Terminal</small>
            </div>
          </div>

          {/* Operating Mode Toggle (Mode A vs Mode B vs Mode C) */}
          <div className="btn-group bg-light p-1 rounded-pill shadow-sm" role="group">
            <button
              type="button"
              onClick={() => {
                setOperatingMode("OUTLET_COUNTER");
                setSelectedOutletId(2);
                setSelectedTableId(null);
                switchToStandardMenu();
              }}
              className={`btn rounded-pill px-3 fw-semibold ${
                operatingMode === "OUTLET_COUNTER"
                  ? "btn-warning text-dark shadow"
                  : "btn-light text-secondary"
              }`}
            >
              <i className="ti ti-cup me-1" />
              Mode A: Counter (OTP)
            </button>
            <button
              type="button"
              onClick={() => {
                setOperatingMode("DINE_IN");
                setSelectedOutletId(1);
                switchToStandardMenu();
              }}
              className={`btn rounded-pill px-3 fw-semibold ${
                operatingMode === "DINE_IN"
                  ? "btn-primary text-white shadow"
                  : "btn-light text-secondary"
              }`}
            >
              <i className="ti ti-tools-kitchen-2 me-1" />
              Mode B: Dine-In (Table)
            </button>
            <button
              type="button"
              onClick={() => {
                setOperatingMode("SPECIAL_EVENT");
                if (events.length > 0) {
                  handleSelectEvent(events[0]);
                }
              }}
              className={`btn rounded-pill px-3 fw-semibold ${
                operatingMode === "SPECIAL_EVENT"
                  ? "btn-success text-white shadow"
                  : "btn-light text-secondary"
              }`}
            >
              <i className="ti ti-confetti me-1" />
              Mode C: Special Event
            </button>
          </div>

          {/* Outlet Selector */}
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold">Outlet:</span>
            <select
              value={selectedOutletId}
              onChange={(e) => setSelectedOutletId(Number(e.target.value))}
              className="form-select form-select-sm rounded-pill fw-medium border-0 shadow-sm"
              style={{ minWidth: 200 }}
            >
              {outlets.map((o) => (
                <option key={o.outlet_id} value={o.outlet_id}>
                  {o.outlet_name} ({o.outlet_type})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Special Event Active Banner */}
      {operatingMode === "SPECIAL_EVENT" && (
        <div className="card border-0 shadow-sm mb-3 rounded-4 bg-success bg-opacity-10 border border-success border-opacity-25">
          <div className="card-body py-2 px-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-success text-white px-3 py-2 fs-6 fw-bold rounded-pill">
                🎪 SPECIAL EVENT MODE
              </span>
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted fw-bold">Active Event:</span>
                <select
                  value={selectedEventId || ""}
                  onChange={(e) => {
                    const ev = events.find((x) => x.event_id === Number(e.target.value));
                    if (ev) handleSelectEvent(ev);
                  }}
                  className="form-select form-select-sm fw-bold border-success text-success bg-white rounded-pill px-3"
                  style={{ minWidth: 260 }}
                >
                  {events.map((ev) => (
                    <option key={ev.event_id} value={ev.event_id}>
                      {ev.event_name} ({ev.event_code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeEvent && (
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="small text-dark">
                  📍 <strong>Venue:</strong> {activeEvent.location_name}
                </div>
                <div className="small text-dark">
                  👥 <strong>Pax:</strong> {activeEvent.expected_guests} Covers
                </div>
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill font-monospace fw-bold">
                  👨‍🍳 Dedicated Kitchen: {activeEvent.dedicated_kitchen_dept}
                </span>
                <span className="badge bg-info text-white px-2 py-1 rounded-pill">
                  {items.length} Custom Menu Items
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Grid: Left (Catalog/Tables), Right (Cart/Taxes/Action) */}
      <div className="row g-3">
        {/* Left Column */}
        <div className="col-lg-8">
          {/* If Mode B: Interactive Table Selector Strip */}
          {operatingMode === "DINE_IN" && (
            <div className="card border-0 shadow-sm mb-3 rounded-4 p-3 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0 text-dark">
                  <i className="ti ti-layout-grid me-1 text-primary" />
                  Select Floor Table (Dilara Fine Dining)
                </h6>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success bg-opacity-25 text-success">Available</span>
                  <span className="badge bg-primary bg-opacity-25 text-primary">Seated</span>
                  <span className="badge bg-warning bg-opacity-25 text-warning">Bill Requested</span>
                </div>
              </div>

              <div className="d-flex gap-2 overflow-auto py-2">
                {tables.map((tbl) => {
                  const isSelected = selectedTableId === tbl.table_id;
                  let badgeColor = "bg-success";
                  if (tbl.current_status === "SEATED") badgeColor = "bg-primary";
                  else if (tbl.current_status === "BILL_REQUESTED") badgeColor = "bg-warning text-dark";
                  else if (tbl.current_status === "CLEANING") badgeColor = "bg-secondary";

                  return (
                    <button
                      key={tbl.table_id}
                      type="button"
                      onClick={() => {
                        setSelectedTableId(tbl.table_id);
                        if (tbl.waiter_user_id) {
                          setSelectedWaiterId(tbl.waiter_user_id);
                        }
                      }}
                      className={`btn p-2 text-start rounded-3 border-2 ${
                        isSelected ? "border-primary shadow bg-primary bg-opacity-10" : "border-light bg-light"
                      }`}
                      style={{ minWidth: 110, flexShrink: 0 }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold fs-6">{tbl.table_number}</span>
                        <span className={`badge ${badgeColor} px-1`} style={{ fontSize: 9 }}>
                          {tbl.seating_capacity}P
                        </span>
                      </div>
                      <div className="small text-muted text-truncate mt-1" style={{ fontSize: 10 }}>
                        {tbl.dining_zone}
                      </div>
                      <div className="mt-1 d-flex flex-column gap-1">
                        <span className="badge text-dark bg-white border small" style={{ fontSize: 9 }}>
                          {tbl.current_status}
                        </span>
                        {tbl.waiter_name && (
                          <span className="badge badge-soft-primary small text-truncate text-start px-1" style={{ fontSize: 9 }} title={`Assigned: ${tbl.waiter_name}`}>
                            🤵 {tbl.waiter_name}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Multi-Round Selector & Server Assignment */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-2 pt-2 border-top">
                <div className="d-flex align-items-center gap-2">
                  <span className="small fw-semibold text-muted">Round:</span>
                  {[1, 2, 3].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setCurrentRound(r)}
                      className={`btn btn-sm rounded-pill px-3 ${
                        currentRound === r ? "btn-primary fw-bold" : "btn-outline-secondary"
                      }`}
                    >
                      Round {r} {r === 1 ? "(Drinks)" : r === 2 ? "(Mains)" : "(Desserts)"}
                    </button>
                  ))}
                </div>

                <div className="d-flex align-items-center gap-3">
                  {/* Waiter / Server Selector */}
                  <div className="d-flex align-items-center gap-1">
                    <span className="small fw-semibold text-muted">Waiter:</span>
                    <select
                      value={selectedWaiterId || ""}
                      onChange={(e) => setSelectedWaiterId(Number(e.target.value))}
                      className="form-select form-select-sm fw-semibold"
                      style={{ minWidth: 140 }}
                    >
                      {users
                        .filter((u) => u.role_code === "WAITER" || u.role_code === "ADMIN" || u.role_code === "MANAGER" || !u.role_code)
                        .map((u) => (
                          <option key={u.user_id} value={u.user_id}>
                            🤵 {u.full_name} ({u.role_code})
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Covers */}
                  <div className="d-flex align-items-center gap-1">
                    <span className="small fw-semibold text-muted">Covers:</span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="form-control form-control-sm text-center fw-bold"
                      style={{ width: 55 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Pills & Search */}
          <div className="card border-0 shadow-sm mb-3 rounded-4 p-3 bg-white">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <div className="d-flex gap-2 overflow-auto" style={{ maxWidth: "70%" }}>
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId(null)}
                  className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                    selectedCategoryId === null ? "btn-dark" : "btn-light text-secondary"
                  }`}
                >
                  All Items ({items.length})
                </button>
                {categories.map((c) => (
                  <button
                    key={c.category_id}
                    type="button"
                    onClick={() => setSelectedCategoryId(c.category_id)}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold text-nowrap ${
                      selectedCategoryId === c.category_id ? "btn-dark" : "btn-light text-secondary"
                    }`}
                  >
                    {c.category_name}
                  </button>
                ))}
              </div>

              <div className="input-group input-group-sm" style={{ width: 220 }}>
                <span className="input-group-text bg-light border-0">🔍</span>
                <input
                  type="text"
                  placeholder="Search item or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control bg-light border-0"
                />
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="row g-3" style={{ maxHeight: "62vh", overflowY: "auto" }}>
              {filteredItems.map((itm) => (
                <div key={itm.item_id} className="col-xl-3 col-md-4 col-sm-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden food-card hover-shadow transition-all">
                    <div className="p-3 d-flex flex-column justify-content-between h-100">
                      <div>
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <span className="badge bg-light text-muted border font-monospace" style={{ fontSize: 10 }}>
                            {itm.item_code}
                          </span>
                          <span className="badge bg-dark bg-opacity-75 text-white" style={{ fontSize: 9 }}>
                            {itm.effective_kitchen_dept || itm.kitchen_dept}
                          </span>
                        </div>

                        <h6 className="fw-bold text-dark mb-1 fs-14 text-truncate" title={itm.item_name}>
                          {itm.item_name}
                        </h6>
                        <p className="text-muted small mb-2 text-truncate-2" style={{ fontSize: 11, minHeight: 32 }}>
                          {itm.description || "Signature Grand Dilara culinary creation."}
                        </p>

                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {itm.is_complimentary ? (
                            <span className="badge bg-success text-white small" style={{ fontSize: 9 }}>
                              🎁 Complimentary
                            </span>
                          ) : itm.catalog_price && Number(itm.selling_price) < Number(itm.catalog_price) ? (
                            <span className="badge bg-success-subtle text-success small" style={{ fontSize: 9 }}>
                              Special Event Rate
                            </span>
                          ) : null}
                          {itm.is_spicy && (
                            <span className="badge bg-danger bg-opacity-10 text-danger small" style={{ fontSize: 9 }}>
                              🌶️ Spicy
                            </span>
                          )}
                          {itm.is_vegetarian && (
                            <span className="badge bg-success bg-opacity-10 text-success small" style={{ fontSize: 9 }}>
                              🌱 Veg
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                        <div>
                          <span className="fw-bold text-primary font-monospace fs-14">
                            LKR {Number(itm.selling_price).toFixed(2)}
                          </span>
                          {itm.catalog_price && Number(itm.selling_price) < Number(itm.catalog_price) && (
                            <span className="text-muted text-decoration-line-through small ms-1" style={{ fontSize: 10 }}>
                              LKR {Number(itm.catalog_price).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(itm)}
                          className="btn btn-sm btn-primary rounded-pill px-3 shadow-sm"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Cart & Bill Breakdown */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 bg-white sticky-top d-flex flex-column"
            style={{ top: 15, maxHeight: "calc(100vh - 95px)", height: "calc(100vh - 95px)" }}
          >
            {/* Header (Fixed) */}
            <div className="card-header bg-white border-0 pt-3 pb-2 d-flex justify-content-between align-items-center flex-shrink-0">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Current Order</h6>
                <small className="text-muted">
                  {operatingMode === "OUTLET_COUNTER"
                    ? "Counter Fast-Casual Dispatch"
                    : `Table ${activeTableInfo?.table_number || "None"} • Round ${currentRound}`}
                </small>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="btn btn-sm btn-outline-danger border-0 rounded-pill"
                title="Clear Cart"
              >
                Clear
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="card-body p-3 overflow-y-auto flex-grow-1" style={{ scrollbarWidth: "thin" }}>
              {/* Mandatory Mobile Input for Mode A */}
              {operatingMode === "OUTLET_COUNTER" && (
                <div className="mb-3 p-3 bg-light rounded-3">
                  <label className="form-label small fw-bold text-dark d-flex justify-content-between mb-1">
                    <span>Customer Mobile (Mandatory)</span>
                    <span className="text-primary small">SMS OTP Verify</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-0">📱</span>
                    <input
                      type="tel"
                      placeholder="e.g., 0771234567"
                      value={customerMobile}
                      onChange={(e) => setCustomerMobile(e.target.value)}
                      className="form-control border-0 shadow-sm"
                    />
                  </div>
                  <small className="text-muted d-block mt-1" style={{ fontSize: 10 }}>
                    A 6-digit OTP and live tracking link will be sent to this number.
                  </small>
                </div>
              )}

              {/* Cart Items List */}
              <div className="order-items-scroll mb-3" style={{ maxHeight: "250px", overflowY: "auto", scrollbarWidth: "thin" }}>
                {cart.length === 0 ? (
                  <div className="text-center py-4 text-muted">
                    <div className="fs-1 mb-2">🍽️</div>
                    <p className="small mb-0">No items selected in cart.</p>
                    <small>Select dishes from the menu to start order.</small>
                  </div>
                ) : (
                  cart.map((ci, idx) => (
                    <div key={idx} className="p-2 mb-2 bg-light rounded-3 border">
                      <div className="d-flex justify-content-between align-items-start">
                        <div style={{ maxWidth: "58%" }}>
                          <span className="fw-semibold text-dark fs-13 d-block text-truncate">
                            {ci.item.item_name}
                          </span>
                          <span className="text-muted font-monospace small" style={{ fontSize: 11 }}>
                            LKR {Number(ci.item.selling_price).toFixed(2)} ea • R{ci.round_number}
                          </span>
                        </div>

                        {/* Quantity buttons */}
                        <div className="d-flex align-items-center gap-1 bg-white p-1 rounded-pill border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(ci.item.item_id, ci.round_number, -1)}
                            className="btn btn-sm btn-light p-0 d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: 22, height: 22 }}
                          >
                            -
                          </button>
                          <span className="fw-bold px-1 font-monospace" style={{ fontSize: 12 }}>
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(ci.item.item_id, ci.round_number, 1)}
                            className="btn btn-sm btn-light p-0 d-flex align-items-center justify-content-center rounded-circle"
                            style={{ width: 22, height: 22 }}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-end font-monospace fw-bold text-dark fs-13">
                          LKR {(ci.quantity * ci.item.selling_price).toFixed(2)}
                        </div>
                      </div>

                      {/* Cooking Note Input */}
                      <input
                        type="text"
                        placeholder="Cooking notes (e.g. Extra spicy, no onion)..."
                        value={ci.cooking_notes}
                        onChange={(e) => updateNotes(ci.item.item_id, ci.round_number, e.target.value)}
                        className="form-control form-control-sm border-0 bg-white mt-1"
                        style={{ fontSize: 11 }}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Discount Selector */}
              <div className="d-flex align-items-center justify-content-between mb-2 small text-muted">
                <span>Guest Discount:</span>
                <div className="btn-group btn-group-sm">
                  {[0, 5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDiscountPercent(pct)}
                      className={`btn btn-sm ${
                        discountPercent === pct ? "btn-dark fw-bold" : "btn-outline-secondary"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Statutory Tax Breakdown (SRS 8.1) */}
              <div className="border-top pt-2 small text-muted">
                <div className="d-flex justify-content-between py-1">
                  <span>Item Subtotal</span>
                  <span className="font-monospace text-dark">LKR {taxes.subtotal.toFixed(2)}</span>
                </div>
                {taxes.discountAmount > 0 && (
                  <div className="d-flex justify-content-between py-1 text-danger">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-monospace">- LKR {taxes.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between py-1">
                  <span>Service Charge (10%)</span>
                  <span className="font-monospace text-dark">LKR {taxes.serviceChargeAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>VAT (15%)</span>
                  <span className="font-monospace text-dark">LKR {taxes.vatAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Pinned Card Footer (Always Visible at Bottom) */}
            <div className="card-footer bg-white border-top p-3 flex-shrink-0">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fs-6 fw-bold text-dark">Net Payable</span>
                <span className="font-monospace fs-4 fw-bold text-primary">
                  LKR {taxes.netPayable.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                disabled={submitting || !cart.length}
                onClick={handleSubmitOrder}
                className={`btn w-100 py-2 fw-bold rounded-pill shadow-sm fs-14 ${
                  operatingMode === "OUTLET_COUNTER" ? "btn-warning text-dark" : "btn-primary"
                }`}
              >
                {submitting
                  ? "Processing..."
                  : operatingMode === "OUTLET_COUNTER"
                  ? "Confirm Order & Send OTP (SMS)"
                  : `Dispatch Round ${currentRound} to Kitchen`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Mode A OTP Verification Modal (FR-OUT-004) */}
      {activeOrderConfirmation && operatingMode === "OUTLET_COUNTER" && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Customer Mobile OTP Verification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setActiveOrderConfirmation(null)}
                />
              </div>
              <div className="modal-body text-center">
                <div className="mb-3">
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fs-6">
                    Token: {activeOrderConfirmation.pickup_token}
                  </span>
                </div>
                <p className="text-muted small">
                  A 6-digit OTP was sent to <strong>{activeOrderConfirmation.customer_mobile}</strong>.
                  Please ask the guest to provide the code to confirm the order.
                </p>

                {/* Simulated OTP notice for local development ease */}
                {activeOrderConfirmation.simulated_otp && (
                  <div className="alert alert-info py-2 small mb-3">
                    🔑 <strong>Simulated Dev OTP:</strong> {activeOrderConfirmation.simulated_otp}
                  </div>
                )}

                <div className="my-3">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                    className="form-control form-control-lg text-center font-monospace fw-bold fs-3 tracking-widest"
                    autoFocus
                  />
                </div>

                {otpError && <div className="alert alert-danger py-2 small">{otpError}</div>}
                {otpSuccessMessage && <div className="alert alert-success py-2 small">{otpSuccessMessage}</div>}

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    type="button"
                    disabled={otpCooldown > 0}
                    onClick={handleResendOtp}
                    className="btn btn-sm btn-link text-decoration-none text-muted"
                  >
                    {otpCooldown > 0 ? `Resend OTP in ${otpCooldown}s` : "Resend OTP Code"}
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="btn btn-primary rounded-pill px-4 fw-bold"
                  >
                    Validate OTP & Release
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Settlement Modal (Cash change, Card auth, Room Charge) */}
      {settleModalOpen && settleOrderTarget && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 p-3">
              <div className="modal-header border-0">
                <div>
                  <h5 className="modal-title fw-bold">Settlement & Payment Tender</h5>
                  <small className="text-muted">Order #{settleOrderTarget.order_number}</small>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setSettleModalOpen(false);
                    setSettleReceipt(null);
                  }}
                />
              </div>

              <div className="modal-body">
                {settleReceipt ? (
                  /* Fiscal Receipt View */
                  <div className="text-center p-3 border rounded-3 bg-light font-monospace small">
                    <h6 className="fw-bold mb-1">GRAND DILARA HOTEL & SUITES</h6>
                    <p className="mb-2 text-muted" style={{ fontSize: 10 }}>
                      VAT Reg: VAT-2026-GDH-08819 • Official Fiscal Receipt
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between py-1">
                      <span>Order #:</span>
                      <strong>{settleReceipt.order_number}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span>Payment Method:</span>
                      <strong>{settleReceipt.payment_method}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span>Payable Total:</span>
                      <strong>LKR {Number(settleReceipt.payable_amount).toFixed(2)}</strong>
                    </div>
                    <div className="d-flex justify-content-between py-1">
                      <span>Tendered:</span>
                      <span>LKR {Number(settleReceipt.tendered_amount).toFixed(2)}</span>
                    </div>
                    {Number(settleReceipt.change_amount) > 0 && (
                      <div className="d-flex justify-content-between py-1 text-success fw-bold">
                        <span>Change Returned:</span>
                        <span>LKR {Number(settleReceipt.change_amount).toFixed(2)}</span>
                      </div>
                    )}
                    <hr />
                    <p className="mb-0 text-success fw-bold">✓ SETTLED & TABLE RELEASED</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSettleModalOpen(false);
                        setSettleReceipt(null);
                      }}
                      className="btn btn-dark btn-sm rounded-pill mt-3 px-4"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-3 p-3 bg-light rounded-3">
                      <span className="small text-muted text-uppercase">Payable Amount</span>
                      <div className="fs-3 fw-bold text-primary font-monospace">
                        LKR {Number(settleOrderTarget.net_payable).toFixed(2)}
                      </div>
                    </div>

                    {/* Tender Method Selector */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Payment Method</label>
                      <div className="btn-group w-100" role="group">
                        {(["CASH", "CREDIT_CARD", "ROOM_CHARGE"] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setPaymentMethod(m)}
                            className={`btn btn-sm ${
                              paymentMethod === m ? "btn-dark fw-bold" : "btn-outline-secondary"
                            }`}
                          >
                            {m.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cash Tender Input */}
                    {paymentMethod === "CASH" && (
                      <div className="mb-3">
                        <label className="form-label small fw-bold">Cash Tendered (LKR)</label>
                        <input
                          type="number"
                          value={tenderedAmount}
                          onChange={(e) => setTenderedAmount(e.target.value)}
                          className="form-control form-control-lg font-monospace fw-bold text-center"
                        />
                        {parseFloat(tenderedAmount) >= settleOrderTarget.net_payable && (
                          <div className="alert alert-success py-1 mt-2 text-center small">
                            Change to Return: <strong>LKR {(parseFloat(tenderedAmount) - settleOrderTarget.net_payable).toFixed(2)}</strong>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Credit Card Input */}
                    {paymentMethod === "CREDIT_CARD" && (
                      <div className="mb-3">
                        <label className="form-label small fw-bold">EFT Card Auth Code (From Terminal)</label>
                        <input
                          type="text"
                          placeholder="e.g. AUTH-982314"
                          value={cardAuthCode}
                          onChange={(e) => setCardAuthCode(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    )}

                    {/* Room Charge Input */}
                    {paymentMethod === "ROOM_CHARGE" && (
                      <div className="row g-2 mb-3">
                        <div className="col-6">
                          <label className="form-label small fw-bold">Room Number</label>
                          <input
                            type="text"
                            placeholder="e.g. Room 402"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label small fw-bold">Guest Surname</label>
                          <input
                            type="text"
                            placeholder="e.g. Mr. Silva"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    )}

                    {settleError && <div className="alert alert-danger py-2 small">{settleError}</div>}

                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => setSettleModalOpen(false)}
                        className="btn btn-light rounded-pill px-3"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSettlePayment}
                        className="btn btn-success rounded-pill px-4 fw-bold"
                      >
                        Finalize Settlement & Print
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
