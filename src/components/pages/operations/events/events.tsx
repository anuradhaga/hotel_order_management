"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Toast from "@/core/common/toast/toast";

interface SpecialEvent {
  event_id: number;
  event_code: string;
  event_name: string;
  event_type: string;
  outlet_id: number | null;
  outlet_name?: string;
  dedicated_kitchen_dept: string;
  expected_guests: number;
  location_name: string;
  start_datetime: string;
  end_datetime: string;
  organizer_name: string | null;
  organizer_contact: string | null;
  billing_type: string;
  status: string;
  notes: string | null;
  custom_menu_count: number;
  total_orders_count: number;
  total_event_revenue: string | number;
}

interface CatalogItem {
  item_id: number;
  item_name: string;
  item_code: string;
  category_id: number;
  category_name: string;
  selling_price: number;
  kitchen_dept: string;
  item_size?: string;
}

interface EventMenuItem {
  event_menu_item_id: number;
  event_id: number;
  item_id: number;
  custom_price: number | null;
  is_complimentary: number | boolean;
  override_kitchen_dept: string | null;
  display_order: number;
  is_available: number | boolean;
  item_code: string;
  item_name: string;
  item_size: string;
  description?: string;
  image_url?: string;
  default_kitchen_dept: string;
  effective_kitchen_dept: string;
  category_name?: string;
  catalog_price: number;
  selling_price: number;
}

export default function EventsManagementComponent() {

  // Master states
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [outlets, setOutlets] = useState<any[]>([]);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterKitchen, setFilterKitchen] = useState("ALL");

  // Event Modal (Create / Edit)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SpecialEvent | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Form Fields
  const [formEventName, setFormEventName] = useState("");
  const [formEventCode, setFormEventCode] = useState("");
  const [formEventType, setFormEventType] = useState("BANQUET");
  const [formOutletId, setFormOutletId] = useState<number | "">("");
  const [formKitchenDept, setFormKitchenDept] = useState("BANQUET_KITCHEN");
  const [formLocation, setFormLocation] = useState("");
  const [formPax, setFormPax] = useState<number>(100);
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formOrganizer, setFormOrganizer] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formBillingType, setFormBillingType] = useState("PER_ORDER");
  const [formStatus, setFormStatus] = useState("ACTIVE");
  const [formNotes, setFormNotes] = useState("");

  // Menu Designer Modal
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [activeMenuEvent, setActiveMenuEvent] = useState<SpecialEvent | null>(null);
  const [eventMenuItems, setEventMenuItems] = useState<EventMenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(false);

  // Menu Add Form
  const [selectedCatalogItemId, setSelectedCatalogItemId] = useState<number | "">("");
  const [customPriceInput, setCustomPriceInput] = useState<string>("");
  const [isComplimentary, setIsComplimentary] = useState(false);
  const [kitchenOverride, setKitchenOverride] = useState<string>("");
  const [savingMenuItem, setSavingMenuItem] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{ msg: string; type: "success" | "danger" | "warning" | "info" } | null>(null);

  // Load Events
  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setEvents(data.data || []);
      } else {
        setToast({ msg: data.error || "Failed to load events", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Network error loading events", type: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  // Load catalog items & outlets for dropdowns
  const loadMasters = useCallback(async () => {
    try {
      const [itemsRes, outletsRes] = await Promise.all([
        fetch("/api/items"),
        fetch("/api/outlets"),
      ]);
      const itemsData = await itemsRes.json();
      const outletsData = await outletsRes.json();
      if (itemsData.success) setCatalogItems(itemsData.data || []);
      if (outletsData.success) setOutlets(outletsData.data || []);
    } catch (err) {
      console.error("Error loading master data:", err);
    }
  }, []);

  useEffect(() => {
    loadEvents();
    loadMasters();
  }, [loadEvents, loadMasters]);

  // Load customized menu for a specific event
  const openMenuDesigner = async (event: SpecialEvent) => {
    setActiveMenuEvent(event);
    setIsMenuModalOpen(true);
    setMenuLoading(true);
    setSelectedCatalogItemId("");
    setCustomPriceInput("");
    setIsComplimentary(false);
    setKitchenOverride(event.dedicated_kitchen_dept);

    try {
      const res = await fetch(`/api/events/${event.event_id}/menu`);
      const data = await res.json();
      if (data.success) {
        setEventMenuItems(data.data || []);
      } else {
        setToast({ msg: data.error || "Failed to load event menu", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to load event menu", type: "danger" });
    } finally {
      setMenuLoading(false);
    }
  };

  // Add or update item in event menu
  const handleSaveMenuItem = async () => {
    if (!activeMenuEvent || !selectedCatalogItemId) {
      setToast({ msg: "Please select an item from catalog", type: "warning" });
      return;
    }

    setSavingMenuItem(true);
    try {
      const res = await fetch(`/api/events/${activeMenuEvent.event_id}/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: Number(selectedCatalogItemId),
          custom_price: isComplimentary ? 0 : customPriceInput ? parseFloat(customPriceInput) : null,
          is_complimentary: isComplimentary,
          override_kitchen_dept: kitchenOverride || activeMenuEvent.dedicated_kitchen_dept,
          is_available: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Item added to event menu!", type: "success" });
        // Refresh menu list
        const refreshed = await fetch(`/api/events/${activeMenuEvent.event_id}/menu`);
        const refData = await refreshed.json();
        if (refData.success) setEventMenuItems(refData.data || []);
        // Reset form
        setSelectedCatalogItemId("");
        setCustomPriceInput("");
        setIsComplimentary(false);
        // Refresh master events counter
        loadEvents();
      } else {
        setToast({ msg: data.error || "Failed to add item", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to save item", type: "danger" });
    } finally {
      setSavingMenuItem(false);
    }
  };

  // Remove item from event menu
  const handleRemoveMenuItem = async (itemId: number) => {
    if (!activeMenuEvent) return;
    try {
      const res = await fetch(`/api/events/${activeMenuEvent.event_id}/menu?item_id=${itemId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Item removed from event menu", type: "info" });
        setEventMenuItems((prev) => prev.filter((i) => i.item_id !== itemId));
        loadEvents();
      } else {
        setToast({ msg: data.error || "Failed to remove item", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to remove item", type: "danger" });
    }
  };

  // Open Create / Edit Modal
  const openEventModal = (event?: SpecialEvent) => {
    if (event) {
      setEditingEvent(event);
      setFormEventName(event.event_name);
      setFormEventCode(event.event_code);
      setFormEventType(event.event_type || "BANQUET");
      setFormOutletId(event.outlet_id || "");
      setFormKitchenDept(event.dedicated_kitchen_dept || "BANQUET_KITCHEN");
      setFormLocation(event.location_name);
      setFormPax(event.expected_guests || 100);
      setFormStart(event.start_datetime ? new Date(event.start_datetime).toISOString().slice(0, 16) : "");
      setFormEnd(event.end_datetime ? new Date(event.end_datetime).toISOString().slice(0, 16) : "");
      setFormOrganizer(event.organizer_name || "");
      setFormContact(event.organizer_contact || "");
      setFormBillingType(event.billing_type || "PER_ORDER");
      setFormStatus(event.status || "ACTIVE");
      setFormNotes(event.notes || "");
    } else {
      setEditingEvent(null);
      setFormEventName("");
      setFormEventCode(`EVT-${Date.now().toString(36).toUpperCase()}`);
      setFormEventType("BANQUET");
      setFormOutletId(4); // Default to Grand Ballroom & Banquet Counter
      setFormKitchenDept("BANQUET_KITCHEN");
      setFormLocation("Grand Ballroom A");
      setFormPax(100);
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      setFormStart(now.toISOString().slice(0, 16));
      setFormEnd(nextWeek.toISOString().slice(0, 16));
      setFormOrganizer("");
      setFormContact("");
      setFormBillingType("PER_ORDER");
      setFormStatus("ACTIVE");
      setFormNotes("");
    }
    setIsEventModalOpen(true);
  };

  // Submit Event Create / Update
  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEventName.trim() || !formLocation.trim() || !formStart || !formEnd) {
      setToast({ msg: "Please fill in all mandatory event fields.", type: "warning" });
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        event_code: formEventCode,
        event_name: formEventName,
        event_type: formEventType,
        outlet_id: formOutletId || null,
        dedicated_kitchen_dept: formKitchenDept,
        expected_guests: Number(formPax) || 50,
        location_name: formLocation,
        start_datetime: formStart,
        end_datetime: formEnd,
        organizer_name: formOrganizer || null,
        organizer_contact: formContact || null,
        billing_type: formBillingType,
        status: formStatus,
        notes: formNotes || null,
      };

      const url = editingEvent ? `/api/events/${editingEvent.event_id}` : "/api/events";
      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setToast({
          msg: editingEvent ? "Event updated successfully!" : "Special Event created successfully!",
          type: "success",
        });
        setIsEventModalOpen(false);
        loadEvents();
      } else {
        setToast({ msg: data.error || "Failed to save event", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Network error", type: "danger" });
    } finally {
      setFormSubmitting(false);
    }
  };

  // Toggle or Cancel Event
  const handleCancelEvent = async (event: SpecialEvent) => {
    if (!confirm(`Are you sure you want to cancel event "${event.event_name}"?`)) return;
    try {
      const res = await fetch(`/api/events/${event.event_id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setToast({ msg: "Event cancelled successfully.", type: "info" });
        loadEvents();
      } else {
        setToast({ msg: data.error || "Failed to cancel event", type: "danger" });
      }
    } catch (err: any) {
      setToast({ msg: err.message || "Failed to cancel event", type: "danger" });
    }
  };

  // Filtering
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.event_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.organizer_name && e.organizer_name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filterStatus === "ALL" || e.status === filterStatus;
      const matchesKitchen = filterKitchen === "ALL" || e.dedicated_kitchen_dept === filterKitchen;

      return matchesSearch && matchesStatus && matchesKitchen;
    });
  }, [events, searchTerm, filterStatus, filterKitchen]);

  // Statistics
  const stats = useMemo(() => {
    const total = events.length;
    const active = events.filter((e) => e.status === "ACTIVE").length;
    const totalPax = events
      .filter((e) => e.status === "ACTIVE")
      .reduce((sum, e) => sum + (Number(e.expected_guests) || 0), 0);
    const totalRev = events.reduce((sum, e) => sum + (parseFloat(String(e.total_event_revenue)) || 0), 0);

    return { total, active, totalPax, totalRev };
  }, [events]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i className="ti ti-circle-check me-1"></i>Live / Active</span>;
      case "UPCOMING":
        return <span className="badge bg-info-subtle text-info border border-info-subtle px-2 py-1"><i className="ti ti-clock me-1"></i>Upcoming</span>;
      case "COMPLETED":
        return <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1"><i className="ti ti-flag me-1"></i>Completed</span>;
      case "CANCELLED":
        return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i className="ti ti-ban me-1"></i>Cancelled</span>;
      default:
        return <span className="badge bg-light text-dark px-2 py-1">{status}</span>;
    }
  };

  const getKitchenBadge = (dept: string) => {
    switch (dept) {
      case "BANQUET_KITCHEN":
        return <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1"><i className="ti ti-chef-hat me-1"></i>Banquet Kitchen</span>;
      case "EVENT_SATELLITE":
        return <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1"><i className="ti ti-truck-delivery me-1"></i>Satellite Kitchen</span>;
      case "LIVE_STATION":
        return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1"><i className="ti ti-flame me-1"></i>Live Station</span>;
      case "BAR":
        return <span className="badge bg-info-subtle text-info border border-info-subtle px-2 py-1"><i className="ti ti-glass-cocktail me-1"></i>Event Bar</span>;
      default:
        return <span className="badge bg-dark-subtle text-dark border border-dark-subtle px-2 py-1"><i className="ti ti-tools-kitchen-2 me-1"></i>{dept}</span>;
    }
  };

  // Selected catalog item helper
  const activeCatalogItem = useMemo(() => {
    if (!selectedCatalogItemId) return null;
    return catalogItems.find((i) => i.item_id === Number(selectedCatalogItemId)) || null;
  }, [selectedCatalogItemId, catalogItems]);

  return (
    <div className="page-wrapper">
      <div className="content">
        {/* Toast Feedback */}
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

        {/* Page Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
          <div>
            <h4 className="fw-bold mb-1 text-dark">Special Events & Banquets</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link href="/dashboard" className="text-muted">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <span className="text-muted">Operations</span>
                </li>
                <li className="breadcrumb-item active text-primary" aria-current="page">
                  Special Events
                </li>
              </ol>
            </nav>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link
              href="/pos"
              className="btn btn-outline-primary d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm"
            >
              <i className="ti ti-device-laptop fs-16"></i>
              <span>Open POS</span>
            </Link>
            <Link
              href="/kitchen"
              className="btn btn-outline-warning text-dark d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm"
            >
              <i className="ti ti-chef-hat fs-16"></i>
              <span>Open KDS</span>
            </Link>
            <button
              onClick={() => openEventModal()}
              type="button"
              className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4 shadow"
            >
              <i className="ti ti-plus fs-16"></i>
              <span className="fw-semibold">New Special Event</span>
            </button>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="row g-3 mb-4">
          <div className="col-xl-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-3" style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fw-semibold small text-uppercase">Total Events</span>
                  <h3 className="fw-black text-primary mb-0 mt-1">{stats.total}</h3>
                  <small className="text-muted">Configured banquet files</small>
                </div>
                <div className="avatar avatar-lg rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-sm">
                  <i className="ti ti-calendar-event fs-24"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-3" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fw-semibold small text-uppercase">Live & Active</span>
                  <h3 className="fw-black text-success mb-0 mt-1">{stats.active}</h3>
                  <small className="text-success fw-semibold">Ready for POS ordering</small>
                </div>
                <div className="avatar avatar-lg rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-sm">
                  <i className="ti ti-bolt fs-24"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-3" style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fw-semibold small text-uppercase">Expected Pax</span>
                  <h3 className="fw-black text-warning mb-0 mt-1">{stats.totalPax}</h3>
                  <small className="text-muted">Active guest covers</small>
                </div>
                <div className="avatar avatar-lg rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center shadow-sm">
                  <i className="ti ti-users fs-24"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="card border-0 shadow-sm rounded-4 h-100 p-3" style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fw-semibold small text-uppercase">Event Sales</span>
                  <h3 className="fw-black text-purple mb-0 mt-1">LKR {Number(stats.totalRev).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                  <small className="text-muted">Settled & open orders</small>
                </div>
                <div className="avatar avatar-lg rounded-circle bg-dark text-white d-flex align-items-center justify-content-center shadow-sm">
                  <i className="ti ti-receipt-tax fs-24"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-3">
            <div className="row g-2 align-items-center">
              <div className="col-lg-5 col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="ti ti-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by event title, venue, code, or organizer..."
                    className="form-control bg-light border-start-0"
                  />
                  {searchTerm && (
                    <button
                      className="btn btn-light border"
                      type="button"
                      onClick={() => setSearchTerm("")}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="form-select bg-light"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Live / Active</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-6">
                <select
                  value={filterKitchen}
                  onChange={(e) => setFilterKitchen(e.target.value)}
                  className="form-select bg-light"
                >
                  <option value="ALL">All Kitchen Stations</option>
                  <option value="BANQUET_KITCHEN">Banquet Kitchen</option>
                  <option value="EVENT_SATELLITE">Satellite Kitchen</option>
                  <option value="LIVE_STATION">Live Cooking Station</option>
                  <option value="BAR">Event Beverage Bar</option>
                </select>
              </div>

              <div className="col-lg-1 d-flex justify-content-end">
                <button
                  onClick={loadEvents}
                  className="btn btn-light border rounded-circle p-2"
                  title="Refresh Events"
                >
                  <i className="ti ti-refresh text-muted"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Loading Grand Dilara special events...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-4 text-muted mb-3">🎪</div>
                <h5 className="fw-bold text-dark">No Special Events Found</h5>
                <p className="text-muted">Create a new banquet, gala dinner, or wedding to manage customized menus and isolated kitchens.</p>
                <button onClick={() => openEventModal()} className="btn btn-primary rounded-pill px-4">
                  + Create Event
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Event Details</th>
                      <th>Type & Venue</th>
                      <th>Dates & Schedule</th>
                      <th>Dedicated Kitchen</th>
                      <th>Custom Menu</th>
                      <th>Status</th>
                      <th className="text-end pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((evt) => (
                      <tr key={evt.event_id}>
                        {/* Event Name & Code */}
                        <td className="ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className="avatar avatar-md rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold">
                              <i className="ti ti-confetti fs-20"></i>
                            </div>
                            <div>
                              <div className="fw-bold text-dark fs-15">{evt.event_name}</div>
                              <div className="d-flex align-items-center gap-2 text-muted small">
                                <span className="badge bg-light text-secondary font-monospace">{evt.event_code}</span>
                                {evt.organizer_name && (
                                  <span>• 👤 {evt.organizer_name}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Type & Venue */}
                        <td>
                          <div>
                            <span className="badge bg-secondary-subtle text-secondary fw-semibold mb-1">
                              {evt.event_type}
                            </span>
                            <div className="text-dark small fw-medium">
                              📍 {evt.location_name}
                            </div>
                            <small className="text-muted">
                              👥 {evt.expected_guests} Expected Guests
                            </small>
                          </div>
                        </td>

                        {/* Dates & Schedule */}
                        <td>
                          <div className="small">
                            <div className="text-dark fw-medium">
                              🗓️ {new Date(evt.start_datetime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                            <div className="text-muted">
                              ⏰ {new Date(evt.start_datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                              {new Date(evt.end_datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </td>

                        {/* Dedicated Kitchen */}
                        <td>
                          {getKitchenBadge(evt.dedicated_kitchen_dept)}
                          <div className="mt-1">
                            <Link
                              href={`/kitchen?dept=${evt.dedicated_kitchen_dept}`}
                              className="text-primary text-decoration-none small d-inline-flex align-items-center gap-1"
                              title="View this kitchen station display"
                            >
                              <span>View KDS Line</span>
                              <i className="ti ti-arrow-right fs-12"></i>
                            </Link>
                          </div>
                        </td>

                        {/* Custom Menu */}
                        <td>
                          <button
                            onClick={() => openMenuDesigner(evt)}
                            className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-2"
                          >
                            <i className="ti ti-tools-kitchen fs-14"></i>
                            <span>
                              {evt.custom_menu_count > 0 ? `${evt.custom_menu_count} Custom Items` : "Curate Menu"}
                            </span>
                          </button>
                        </td>

                        {/* Status */}
                        <td>{getStatusBadge(evt.status)}</td>

                        {/* Actions */}
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end align-items-center gap-1">
                            <button
                              onClick={() => openMenuDesigner(evt)}
                              className="btn btn-sm btn-light border"
                              title="Configure Event Menu"
                            >
                              <i className="ti ti-tools-kitchen text-primary"></i>
                            </button>
                            <button
                              onClick={() => openEventModal(evt)}
                              className="btn btn-sm btn-light border"
                              title="Edit Event Details"
                            >
                              <i className="ti ti-edit text-secondary"></i>
                            </button>
                            <button
                              onClick={() => handleCancelEvent(evt)}
                              className="btn btn-sm btn-light border text-danger"
                              title="Cancel / Deactivate Event"
                            >
                              <i className="ti ti-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODAL 1: CREATE / EDIT SPECIAL EVENT                                      */}
        {/* ========================================================================= */}
        {isEventModalOpen && (
          <div className="modal show fade d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <form onSubmit={handleSubmitEvent}>
                  <div className="modal-header border-bottom-0 pb-0">
                    <div>
                      <h5 className="modal-title fw-bold text-dark">
                        {editingEvent ? "Edit Special Event" : "Create Special Event"}
                      </h5>
                      <small className="text-muted">
                        Configure banquet scheduling, venue parameters, and dedicated kitchen routing
                      </small>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setIsEventModalOpen(false)}
                    ></button>
                  </div>

                  <div className="modal-body py-4">
                    <div className="row g-3">
                      {/* Event Code & Name */}
                      <div className="col-md-4">
                        <label className="form-label fw-semibold small text-muted">Event Code</label>
                        <input
                          type="text"
                          required
                          value={formEventCode}
                          onChange={(e) => setFormEventCode(e.target.value)}
                          className="form-control"
                          placeholder="EVT-GALA-2026"
                        />
                      </div>
                      <div className="col-md-8">
                        <label className="form-label fw-semibold small text-muted">Event Title *</label>
                        <input
                          type="text"
                          required
                          value={formEventName}
                          onChange={(e) => setFormEventName(e.target.value)}
                          className="form-control"
                          placeholder="e.g. Royal Wedding Reception - Perera Family"
                        />
                      </div>

                      {/* Event Type & Outlet */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Event Classification</label>
                        <select
                          value={formEventType}
                          onChange={(e) => setFormEventType(e.target.value)}
                          className="form-select"
                        >
                          <option value="BANQUET">Banquet Dinner</option>
                          <option value="GALA_DINNER">Gala Dinner & Awards</option>
                          <option value="WEDDING">Wedding Reception</option>
                          <option value="COCKTAIL_PARTY">Cocktail Evening</option>
                          <option value="CORPORATE">Corporate Conference</option>
                          <option value="PRIVATE_DINING">Private VIP Dining</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Associated Outlet</label>
                        <select
                          value={formOutletId}
                          onChange={(e) => setFormOutletId(e.target.value ? Number(e.target.value) : "")}
                          className="form-select"
                        >
                          <option value="">No Specific Outlet / Mobile</option>
                          {outlets.map((o) => (
                            <option key={o.outlet_id} value={o.outlet_id}>
                              {o.outlet_name} ({o.outlet_code})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Location & Expected Pax */}
                      <div className="col-md-8">
                        <label className="form-label fw-semibold small text-muted">Banquet Venue / Location *</label>
                        <input
                          type="text"
                          required
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          className="form-control"
                          placeholder="e.g. Grand Ballroom A & Terrace Lawn"
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-semibold small text-muted">Expected Guests (Pax)</label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={formPax}
                          onChange={(e) => setFormPax(parseInt(e.target.value, 10) || 0)}
                          className="form-control"
                        />
                      </div>

                      {/* Start & End Dates */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Start Date & Time *</label>
                        <input
                          type="datetime-local"
                          required
                          value={formStart}
                          onChange={(e) => setFormStart(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">End Date & Time *</label>
                        <input
                          type="datetime-local"
                          required
                          value={formEnd}
                          onChange={(e) => setFormEnd(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      {/* Dedicated Kitchen Routing */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Dedicated Kitchen Station *</label>
                        <select
                          value={formKitchenDept}
                          onChange={(e) => setFormKitchenDept(e.target.value)}
                          className="form-select bg-warning-subtle border-warning fw-semibold"
                        >
                          <option value="BANQUET_KITCHEN">👨‍🍳 Dedicated Banquet Production Line (BANQUET_KITCHEN)</option>
                          <option value="EVENT_SATELLITE">🚚 Event Satellite Kitchen (EVENT_SATELLITE)</option>
                          <option value="LIVE_STATION">🔥 Live Cooking Station / BBQ Lawn (LIVE_STATION)</option>
                          <option value="BAR">🍸 Event Beverage Bar (BAR)</option>
                          <option value="MAIN_KITCHEN">🍽️ Main Restaurant Kitchen (Shared)</option>
                        </select>
                        <small className="text-muted d-block mt-1">
                          Orders for this event route directly to this kitchen station&apos;s display.
                        </small>
                      </div>

                      {/* Status */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Lifecycle Status</label>
                        <select
                          value={formStatus}
                          onChange={(e) => setFormStatus(e.target.value)}
                          className="form-select"
                        >
                          <option value="ACTIVE">ACTIVE (Available in POS & KDS)</option>
                          <option value="UPCOMING">UPCOMING (Scheduled / Draft)</option>
                          <option value="COMPLETED">COMPLETED (Concluded)</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>

                      {/* Organizer Details */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Organizer / Host Name</label>
                        <input
                          type="text"
                          value={formOrganizer}
                          onChange={(e) => setFormOrganizer(e.target.value)}
                          className="form-control"
                          placeholder="e.g. Apex Corporate Ltd"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold small text-muted">Organizer Phone</label>
                        <input
                          type="text"
                          value={formContact}
                          onChange={(e) => setFormContact(e.target.value)}
                          className="form-control"
                          placeholder="+94 77 123 4567"
                        />
                      </div>

                      {/* Notes */}
                      <div className="col-12">
                        <label className="form-label fw-semibold small text-muted">Culinary & Service Notes</label>
                        <textarea
                          rows={2}
                          value={formNotes}
                          onChange={(e) => setFormNotes(e.target.value)}
                          className="form-control"
                          placeholder="Dietary requirements, VIP table arrangements, special instructions..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-top-0 pt-0">
                    <button
                      type="button"
                      className="btn btn-light rounded-pill px-4"
                      onClick={() => setIsEventModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="btn btn-primary rounded-pill px-4 shadow"
                    >
                      {formSubmitting ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : null}
                      {editingEvent ? "Save Changes" : "Create Event"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: CUSTOMIZED EVENT MENU DESIGNER                                   */}
        {/* ========================================================================= */}
        {isMenuModalOpen && activeMenuEvent && (
          <div className="modal show fade d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content rounded-4 border-0 shadow-lg">
                <div className="modal-header border-bottom bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar avatar-md rounded-3 bg-primary text-white d-flex align-items-center justify-content-center">
                      <i className="ti ti-tools-kitchen-2 fs-20"></i>
                    </div>
                    <div>
                      <h5 className="modal-title fw-bold text-dark mb-0">
                        Curate Custom Menu: {activeMenuEvent.event_name}
                      </h5>
                      <small className="text-muted">
                        Venue: {activeMenuEvent.location_name} • Dedicated Kitchen:{" "}
                        <span className="fw-semibold text-warning">{activeMenuEvent.dedicated_kitchen_dept}</span>
                      </small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsMenuModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  <div className="row g-4">
                    {/* Left: Add Item Form */}
                    <div className="col-lg-4 border-end">
                      <h6 className="fw-bold text-dark mb-3">
                        <i className="ti ti-plus-circle text-primary me-2"></i>
                        Add Item to Event Menu
                      </h6>

                      <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">Select From Catalog *</label>
                        <select
                          value={selectedCatalogItemId}
                          onChange={(e) => {
                            const val = e.target.value ? Number(e.target.value) : "";
                            setSelectedCatalogItemId(val);
                            if (val) {
                              const itm = catalogItems.find((i) => i.item_id === val);
                              if (itm) setCustomPriceInput(String(itm.selling_price));
                            } else {
                              setCustomPriceInput("");
                            }
                          }}
                          className="form-select"
                        >
                          <option value="">-- Choose Catalog Item --</option>
                          {catalogItems.map((itm) => (
                            <option key={itm.item_id} value={itm.item_id}>
                              {itm.item_name} (LKR {Number(itm.selling_price).toFixed(2)})
                            </option>
                          ))}
                        </select>
                      </div>

                      {activeCatalogItem && (
                        <div className="p-3 bg-light rounded-3 mb-3 border">
                          <div className="small text-muted mb-1">Catalog Item Details:</div>
                          <div className="fw-bold text-dark">{activeCatalogItem.item_name}</div>
                          <div className="d-flex justify-content-between small text-muted mt-1">
                            <span>Category: {activeCatalogItem.category_name}</span>
                            <span>Std Price: LKR {Number(activeCatalogItem.selling_price).toFixed(2)}</span>
                          </div>
                        </div>
                      )}

                      {/* Custom Price or Complimentary */}
                      <div className="mb-3">
                        <div className="form-check form-switch mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="compSwitch"
                            checked={isComplimentary}
                            onChange={(e) => setIsComplimentary(e.target.checked)}
                          />
                          <label className="form-check-label small fw-semibold text-dark" htmlFor="compSwitch">
                            Complimentary / Inclusive in Package (LKR 0.00)
                          </label>
                        </div>

                        {!isComplimentary && (
                          <div>
                            <label className="form-label small fw-semibold text-muted">
                              Event Special Price (LKR)
                            </label>
                            <input
                              type="number"
                              step="10.00"
                              value={customPriceInput}
                              onChange={(e) => setCustomPriceInput(e.target.value)}
                              placeholder="Enter customized price"
                              className="form-control"
                            />
                            <small className="text-muted">
                              Leave empty to use catalog standard price.
                            </small>
                          </div>
                        )}
                      </div>

                      {/* Kitchen Override */}
                      <div className="mb-4">
                        <label className="form-label small fw-semibold text-muted">
                          Dispatch Kitchen Station
                        </label>
                        <select
                          value={kitchenOverride}
                          onChange={(e) => setKitchenOverride(e.target.value)}
                          className="form-select"
                        >
                          <option value={activeMenuEvent.dedicated_kitchen_dept}>
                            {activeMenuEvent.dedicated_kitchen_dept} (Event Dedicated Default)
                          </option>
                          <option value="BANQUET_KITCHEN">BANQUET_KITCHEN</option>
                          <option value="EVENT_SATELLITE">EVENT_SATELLITE</option>
                          <option value="LIVE_STATION">LIVE_STATION</option>
                          <option value="BAR">BAR</option>
                          <option value="MAIN_KITCHEN">MAIN_KITCHEN</option>
                          <option value="GRILL">GRILL</option>
                          <option value="PASTRY">PASTRY</option>
                        </select>
                        <small className="text-muted">
                          Directs ticket printing/KDS dispatch for this specific item.
                        </small>
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveMenuItem}
                        disabled={savingMenuItem || !selectedCatalogItemId}
                        className="btn btn-primary w-100 rounded-pill py-2 shadow-sm"
                      >
                        {savingMenuItem ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : (
                          <i className="ti ti-plus me-1"></i>
                        )}
                        Add to Event Menu
                      </button>
                    </div>

                    {/* Right: Active Event Menu Items List */}
                    <div className="col-lg-8">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold text-dark mb-0">
                          <i className="ti ti-list-check text-success me-2"></i>
                          Configured Event Menu Items ({eventMenuItems.length})
                        </h6>
                        <span className="badge bg-primary-subtle text-primary px-3 py-1">
                          Visible in POS Special Event Mode
                        </span>
                      </div>

                      {menuLoading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status"></div>
                          <p className="mt-2 text-muted">Loading custom menu...</p>
                        </div>
                      ) : eventMenuItems.length === 0 ? (
                        <div className="p-5 text-center border rounded-4 bg-light">
                          <div className="fs-1 mb-2">🥗</div>
                          <h6 className="fw-bold text-dark">No Customized Items Added Yet</h6>
                          <p className="text-muted small mb-0">
                            Use the form on the left to add items from the master catalog, configure custom event prices, or provide complimentary courses.
                          </p>
                        </div>
                      ) : (
                        <div className="table-responsive border rounded-4 overflow-hidden">
                          <table className="table align-middle table-hover mb-0">
                            <thead className="table-light small text-uppercase">
                              <tr>
                                <th>Item</th>
                                <th>Standard Price</th>
                                <th>Event Custom Price</th>
                                <th>Dispatch Kitchen</th>
                                <th className="text-end">Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {eventMenuItems.map((mi) => {
                                const isDisc = mi.custom_price !== null && Number(mi.custom_price) < Number(mi.catalog_price);
                                return (
                                  <tr key={mi.event_menu_item_id}>
                                    <td>
                                      <div className="fw-bold text-dark">{mi.item_name}</div>
                                      <div className="text-muted small">
                                        <span className="badge bg-light text-secondary font-monospace">{mi.item_code}</span>
                                        {mi.category_name && <span className="ms-1">• {mi.category_name}</span>}
                                      </div>
                                    </td>
                                    <td>
                                      <span className="text-muted font-monospace">
                                        LKR {Number(mi.catalog_price).toFixed(2)}
                                      </span>
                                    </td>
                                    <td>
                                      {mi.is_complimentary ? (
                                        <span className="badge bg-success text-white px-2 py-1">
                                          🎁 Complimentary (Free)
                                        </span>
                                      ) : mi.custom_price !== null ? (
                                        <div>
                                          <span className="fw-bold text-primary font-monospace">
                                            LKR {Number(mi.custom_price).toFixed(2)}
                                          </span>
                                          {isDisc && (
                                            <span className="badge bg-success-subtle text-success ms-1 small">
                                              Special Banquet Rate
                                            </span>
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-muted font-monospace">
                                          LKR {Number(mi.catalog_price).toFixed(2)} (Standard)
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <span className="badge bg-warning-subtle text-warning border border-warning-subtle">
                                        {mi.effective_kitchen_dept}
                                      </span>
                                    </td>
                                    <td className="text-end">
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveMenuItem(mi.item_id)}
                                        className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                                        title="Remove from Event Menu"
                                      >
                                        <i className="ti ti-trash"></i>
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setIsMenuModalOpen(false)}
                  >
                    Done Curating
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
