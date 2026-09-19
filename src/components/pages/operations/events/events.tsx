"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Toast from "@/core/common/toast/toast";
import SearchInput from "@/core/common/data-table/dataTableSearch";

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

  // Load catalog items & outlets
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
        const refreshed = await fetch(`/api/events/${activeMenuEvent.event_id}/menu`);
        const refData = await refreshed.json();
        if (refData.success) setEventMenuItems(refData.data || []);
        setSelectedCatalogItemId("");
        setCustomPriceInput("");
        setIsComplimentary(false);
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
      setFormOutletId(4);
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

  // Cancel Event
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
        return <span className="badge badge-soft-success">Active / Live</span>;
      case "UPCOMING":
        return <span className="badge badge-soft-info">Upcoming</span>;
      case "COMPLETED":
        return <span className="badge badge-soft-secondary">Completed</span>;
      case "CANCELLED":
        return <span className="badge badge-soft-danger">Cancelled</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  const getKitchenBadge = (dept: string) => {
    switch (dept) {
      case "BANQUET_KITCHEN":
        return <span className="badge badge-soft-warning">Banquet Kitchen</span>;
      case "EVENT_SATELLITE":
        return <span className="badge badge-soft-primary">Satellite Kitchen</span>;
      case "LIVE_STATION":
        return <span className="badge badge-soft-danger">Live Station</span>;
      case "BAR":
        return <span className="badge badge-soft-info">Event Bar</span>;
      default:
        return <span className="badge bg-light text-dark">{dept}</span>;
    }
  };

  const activeCatalogItem = useMemo(() => {
    if (!selectedCatalogItemId) return null;
    return catalogItems.find((i) => i.item_id === Number(selectedCatalogItemId)) || null;
  }, [selectedCatalogItemId, catalogItems]);

  return (
    <>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-wrapper">
        <div className="content">
          {/* Template Page Header */}
          <div className="d-flex align-items-sm-center flex-sm-row flex-column gap-3 mb-4">
            <div className="flex-grow-1">
              <h3 className="mb-0 d-flex align-items-center">
                Special Events & Banquets
                <span className="badge bg-primary-subtle text-primary fs-12 ms-2 rounded-pill">
                  {events.length}
                </span>
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-white rounded-circle ms-2 shadow-xs"
                  title="Refresh events"
                  onClick={loadEvents}
                  disabled={loading}
                >
                  <i className={`icon-refresh-ccw ${loading ? "spin-animation" : ""}`} />
                </button>
              </h3>
            </div>
            <div className="gap-2 d-flex align-items-center flex-wrap">
              <Link href="/pos" className="btn btn-white d-inline-flex align-items-center shadow-xs">
                <i className="icon-combine me-2" />
                POS
              </Link>
              <Link href="/kitchen" className="btn btn-white d-inline-flex align-items-center shadow-xs">
                <i className="icon-drumstick me-2" />
                KDS
              </Link>
              <button
                type="button"
                className="btn btn-primary d-inline-flex align-items-center shadow-sm"
                onClick={() => openEventModal()}
              >
                <i className="icon-circle-plus me-1" />
                Add New Event
              </button>
            </div>
          </div>

          {/* Template Metric KPI Cards */}
          <div className="row mb-4">
            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="card shadow-sm border-0 flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">Total Events</span>
                      <h4 className="mb-0">{stats.total}</h4>
                    </div>
                    <div className="avatar avatar-md bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center">
                      <i className="icon-calendar fs-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="card shadow-sm border-0 flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">Live & Active</span>
                      <h4 className="mb-0 text-success">{stats.active}</h4>
                    </div>
                    <div className="avatar avatar-md bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center">
                      <i className="icon-check-circle fs-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="card shadow-sm border-0 flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">Expected Guests</span>
                      <h4 className="mb-0">{stats.totalPax} Pax</h4>
                    </div>
                    <div className="avatar avatar-md bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
                      <i className="icon-users fs-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12 d-flex">
              <div className="card shadow-sm border-0 flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">Event Revenue</span>
                      <h4 className="mb-0">
                        LKR {Number(stats.totalRev).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h4>
                    </div>
                    <div className="avatar avatar-md bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center">
                      <i className="icon-file-text fs-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Template Main Card & Data Table */}
          <div className="card mb-0 shadow-sm border-0">
            <div className="card-body">
              {/* Filter & Search Bar */}
              <div className="d-flex align-items-center flex-wrap gap-3 justify-content-between mb-4">
                <div className="search-input" style={{ minWidth: 260 }}>
                  <SearchInput
                    value={searchTerm}
                    onChange={(val: string) => setSearchTerm(val)}
                  />
                </div>

                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <select
                    className="form-select form-select-sm w-auto shadow-xs"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="ACTIVE">Active / Live</option>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>

                  <select
                    className="form-select form-select-sm w-auto shadow-xs"
                    value={filterKitchen}
                    onChange={(e) => setFilterKitchen(e.target.value)}
                  >
                    <option value="ALL">All Kitchen Stations</option>
                    <option value="BANQUET_KITCHEN">Banquet Kitchen</option>
                    <option value="EVENT_SATELLITE">Satellite Kitchen</option>
                    <option value="LIVE_STATION">Live Station</option>
                    <option value="BAR">Beverage Bar</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-nowrap datatable mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th>Event</th>
                      <th>Type & Venue</th>
                      <th>Schedule</th>
                      <th>Dedicated Kitchen</th>
                      <th>Custom Menu</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          <div className="spinner-border text-primary" role="status" />
                          <p className="mt-2 text-muted mb-0">Loading events...</p>
                        </td>
                      </tr>
                    ) : filteredEvents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4 text-muted">
                          No special events found.
                        </td>
                      </tr>
                    ) : (
                      filteredEvents.map((evt) => (
                        <tr key={evt.event_id}>
                          <td>
                            <div className="fw-semibold text-dark">{evt.event_name}</div>
                            <span className="text-muted fs-12 font-monospace">{evt.event_code}</span>
                            {evt.organizer_name && (
                              <span className="text-muted fs-12 ms-1">• {evt.organizer_name}</span>
                            )}
                          </td>
                          <td>
                            <span className="badge bg-light text-secondary mb-1">{evt.event_type}</span>
                            <div className="fs-13 text-dark">{evt.location_name}</div>
                            <small className="text-muted">{evt.expected_guests} Pax</small>
                          </td>
                          <td>
                            <div className="fs-13 text-dark">
                              {new Date(evt.start_datetime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </div>
                            <small className="text-muted">
                              {new Date(evt.start_datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                              {new Date(evt.end_datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </small>
                          </td>
                          <td>
                            {getKitchenBadge(evt.dedicated_kitchen_dept)}
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => openMenuDesigner(evt)}
                              className="btn btn-sm btn-white border shadow-xs d-inline-flex align-items-center"
                            >
                              <i className="icon-layers me-1" />
                              {evt.custom_menu_count > 0 ? `${evt.custom_menu_count} Items` : "Curate Menu"}
                            </button>
                          </td>
                          <td>{getStatusBadge(evt.status)}</td>
                          <td className="text-end">
                            <button
                              type="button"
                              onClick={() => openMenuDesigner(evt)}
                              className="btn btn-icon btn-sm btn-white rounded-circle me-1 shadow-xs"
                              title="Curate Custom Menu"
                            >
                              <i className="icon-layers" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEventModal(evt)}
                              className="btn btn-icon btn-sm btn-white rounded-circle me-1 shadow-xs"
                              title="Edit Event"
                            >
                              <i className="icon-edit-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCancelEvent(evt)}
                              className="btn btn-icon btn-sm btn-white rounded-circle text-danger shadow-xs"
                              title="Cancel / Deactivate Event"
                            >
                              <i className="icon-trash-2" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MODAL 1: CREATE / EDIT SPECIAL EVENT (Template Standard)                  */}
          {/* ========================================================================= */}
          {isEventModalOpen && (
            <>
              <div className="modal fade show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content border-0 shadow">
                    <form onSubmit={handleSubmitEvent}>
                      <div className="modal-header">
                        <h4 className="modal-title">
                          {editingEvent ? "Edit Special Event" : "Create Special Event"}
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setIsEventModalOpen(false)}
                        />
                      </div>

                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label className="form-label">
                              Event Code <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formEventCode}
                              onChange={(e) => setFormEventCode(e.target.value)}
                              className="form-control"
                              placeholder="EVT-GALA-2026"
                            />
                          </div>
                          <div className="col-md-8 mb-3">
                            <label className="form-label">
                              Event Title <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formEventName}
                              onChange={(e) => setFormEventName(e.target.value)}
                              className="form-control"
                              placeholder="e.g. Royal Wedding Reception"
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Event Classification</label>
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

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Associated Outlet</label>
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

                          <div className="col-md-8 mb-3">
                            <label className="form-label">
                              Venue / Location <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formLocation}
                              onChange={(e) => setFormLocation(e.target.value)}
                              className="form-control"
                              placeholder="e.g. Grand Ballroom A"
                            />
                          </div>

                          <div className="col-md-4 mb-3">
                            <label className="form-label">Expected Pax</label>
                            <input
                              type="number"
                              min="1"
                              required
                              value={formPax}
                              onChange={(e) => setFormPax(parseInt(e.target.value, 10) || 0)}
                              className="form-control"
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">
                              Start Date & Time <span className="text-danger">*</span>
                            </label>
                            <input
                              type="datetime-local"
                              required
                              value={formStart}
                              onChange={(e) => setFormStart(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">
                              End Date & Time <span className="text-danger">*</span>
                            </label>
                            <input
                              type="datetime-local"
                              required
                              value={formEnd}
                              onChange={(e) => setFormEnd(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">
                              Dedicated Kitchen Station <span className="text-danger">*</span>
                            </label>
                            <select
                              value={formKitchenDept}
                              onChange={(e) => setFormKitchenDept(e.target.value)}
                              className="form-select"
                            >
                              <option value="BANQUET_KITCHEN">Banquet Kitchen (BANQUET_KITCHEN)</option>
                              <option value="EVENT_SATELLITE">Event Satellite Kitchen (EVENT_SATELLITE)</option>
                              <option value="LIVE_STATION">Live Cooking Station (LIVE_STATION)</option>
                              <option value="BAR">Event Beverage Bar (BAR)</option>
                              <option value="MAIN_KITCHEN">Main Restaurant Kitchen (Shared)</option>
                            </select>
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Lifecycle Status</label>
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

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Organizer Name</label>
                            <input
                              type="text"
                              value={formOrganizer}
                              onChange={(e) => setFormOrganizer(e.target.value)}
                              className="form-control"
                              placeholder="e.g. Apex Corporate Ltd"
                            />
                          </div>

                          <div className="col-md-6 mb-3">
                            <label className="form-label">Organizer Contact</label>
                            <input
                              type="text"
                              value={formContact}
                              onChange={(e) => setFormContact(e.target.value)}
                              className="form-control"
                              placeholder="+94 77 123 4567"
                            />
                          </div>

                          <div className="col-12 mb-3">
                            <label className="form-label">Culinary & Service Notes</label>
                            <textarea
                              rows={2}
                              value={formNotes}
                              onChange={(e) => setFormNotes(e.target.value)}
                              className="form-control"
                              placeholder="Dietary requirements, VIP table arrangements..."
                            />
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => setIsEventModalOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={formSubmitting}
                          className="btn btn-primary"
                        >
                          {formSubmitting ? (
                            <span className="spinner-border spinner-border-sm me-2" />
                          ) : null}
                          {editingEvent ? "Save Changes" : "Create Event"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-backdrop fade show" onClick={() => setIsEventModalOpen(false)} />
            </>
          )}

          {/* ========================================================================= */}
          {/* MODAL 2: CUSTOMIZED EVENT MENU DESIGNER (Template Standard)               */}
          {/* ========================================================================= */}
          {isMenuModalOpen && activeMenuEvent && (
            <>
              <div className="modal fade show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                  <div className="modal-content border-0 shadow">
                    <div className="modal-header">
                      <div>
                        <h4 className="modal-title">
                          Curate Custom Menu: {activeMenuEvent.event_name}
                        </h4>
                        <small className="text-muted">
                          Venue: {activeMenuEvent.location_name} • Dedicated Kitchen:{" "}
                          <span className="fw-semibold text-primary">{activeMenuEvent.dedicated_kitchen_dept}</span>
                        </small>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setIsMenuModalOpen(false)}
                      />
                    </div>

                    <div className="modal-body">
                      <div className="row">
                        {/* Left: Add Item Form */}
                        <div className="col-lg-4 border-end">
                          <h6 className="fw-semibold mb-3">
                            <i className="icon-plus-circle me-1 text-primary" />
                            Add Item to Event Menu
                          </h6>

                          <div className="mb-3">
                            <label className="form-label">
                              Select From Catalog <span className="text-danger">*</span>
                            </label>
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
                            <div className="p-3 bg-light rounded mb-3">
                              <div className="fw-semibold fs-13">{activeCatalogItem.item_name}</div>
                              <div className="d-flex justify-content-between text-muted fs-12 mt-1">
                                <span>Category: {activeCatalogItem.category_name}</span>
                                <span>Std: LKR {Number(activeCatalogItem.selling_price).toFixed(2)}</span>
                              </div>
                            </div>
                          )}

                          <div className="mb-3">
                            <div className="form-check form-switch mb-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="compSwitch"
                                checked={isComplimentary}
                                onChange={(e) => setIsComplimentary(e.target.checked)}
                              />
                              <label className="form-check-label fs-13" htmlFor="compSwitch">
                                Complimentary / Package Inclusive (LKR 0.00)
                              </label>
                            </div>

                            {!isComplimentary && (
                              <div>
                                <label className="form-label fs-13">Event Special Price (LKR)</label>
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

                          <div className="mb-4">
                            <label className="form-label fs-13">Dispatch Kitchen Station</label>
                            <select
                              value={kitchenOverride}
                              onChange={(e) => setKitchenOverride(e.target.value)}
                              className="form-select"
                            >
                              <option value={activeMenuEvent.dedicated_kitchen_dept}>
                                {activeMenuEvent.dedicated_kitchen_dept} (Event Default)
                              </option>
                              <option value="BANQUET_KITCHEN">BANQUET_KITCHEN</option>
                              <option value="EVENT_SATELLITE">EVENT_SATELLITE</option>
                              <option value="LIVE_STATION">LIVE_STATION</option>
                              <option value="BAR">BAR</option>
                              <option value="MAIN_KITCHEN">MAIN_KITCHEN</option>
                              <option value="GRILL">GRILL</option>
                              <option value="PASTRY">PASTRY</option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={handleSaveMenuItem}
                            disabled={savingMenuItem || !selectedCatalogItemId}
                            className="btn btn-primary w-100 shadow-sm"
                          >
                            {savingMenuItem ? (
                              <span className="spinner-border spinner-border-sm me-2" />
                            ) : (
                              <i className="icon-plus me-1" />
                            )}
                            Add to Event Menu
                          </button>
                        </div>

                        {/* Right: Active Event Menu Items List */}
                        <div className="col-lg-8">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-semibold mb-0">
                              Configured Event Items ({eventMenuItems.length})
                            </h6>
                            <span className="badge bg-primary-subtle text-primary">
                              Visible in Special Event POS Mode
                            </span>
                          </div>

                          {menuLoading ? (
                            <div className="text-center py-4">
                              <div className="spinner-border text-primary" role="status" />
                              <p className="mt-2 text-muted mb-0">Loading menu items...</p>
                            </div>
                          ) : eventMenuItems.length === 0 ? (
                            <div className="p-4 text-center border rounded bg-light">
                              <p className="text-muted mb-0">
                                No customized items added yet. Use the form on the left to add items.
                              </p>
                            </div>
                          ) : (
                            <div className="table-responsive">
                              <table className="table table-nowrap mb-0">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Item</th>
                                    <th>Catalog Price</th>
                                    <th>Event Price</th>
                                    <th>Station</th>
                                    <th className="text-end">Remove</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {eventMenuItems.map((mi) => (
                                    <tr key={mi.event_menu_item_id}>
                                      <td>
                                        <div className="fw-semibold text-dark">{mi.item_name}</div>
                                        <small className="text-muted font-monospace">{mi.item_code}</small>
                                      </td>
                                      <td>
                                        <span className="text-muted">
                                          LKR {Number(mi.catalog_price).toFixed(2)}
                                        </span>
                                      </td>
                                      <td>
                                        {mi.is_complimentary ? (
                                          <span className="badge badge-soft-success">Complimentary</span>
                                        ) : mi.custom_price !== null ? (
                                          <span className="fw-semibold text-primary">
                                            LKR {Number(mi.custom_price).toFixed(2)}
                                          </span>
                                        ) : (
                                          <span className="text-muted">
                                            LKR {Number(mi.catalog_price).toFixed(2)}
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        <span className="badge bg-light text-secondary">
                                          {mi.effective_kitchen_dept}
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveMenuItem(mi.item_id)}
                                          className="btn btn-icon btn-sm btn-white rounded-circle text-danger shadow-xs"
                                          title="Remove"
                                        >
                                          <i className="icon-trash-2" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setIsMenuModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-backdrop fade show" onClick={() => setIsMenuModalOpen(false)} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
