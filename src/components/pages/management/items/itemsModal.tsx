"use client";
import React, { useState, useEffect } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";

export interface ItemSizePrice {
  price_id?: number;
  size_name: string;
  selling_price: number | string;
}

export interface ItemRecord {
  item_id?: number;
  id?: string | number;
  item_name: string;
  item?: string;
  item_code: string;
  item_size?: string;
  category_id?: number;
  category?: string;
  category_name?: string;
  description?: string;
  selling_price?: number | string;
  price?: string;
  price_raw?: number;
  sizes?: ItemSizePrice[];
  is_vegetarian?: number;
  is_spicy?: number;
  is_active?: number;
  status?: string;
  Status?: string;
  image?: string;
}

interface ItemsModalProps {
  editingItem?: ItemRecord | null;
  viewingItem?: ItemRecord | null;
  categories?: { category_id: number; category_name: string }[];
  onSuccess?: () => void;
  currentFilter?: {
    status: string;
    category: string;
    veg: string;
  };
  onApplyFilter?: (filter: { status: string; category: string; veg: string }) => void;
  onResetFilter?: () => void;
}

const PRESET_SIZES = [
  "Regular",
  "Small",
  "Medium",
  "Large",
  "Full",
  "Half",
  "Single",
  "Double",
  "Family",
];

const ItemsModal = ({
  editingItem,
  viewingItem,
  categories = [],
  onSuccess,
  currentFilter = { status: "all", category: "all", veg: "all" },
  onApplyFilter,
  onResetFilter,
}: ItemsModalProps) => {
  // Add Form State
  const [addName, setAddName] = useState("");
  const [addCode, setAddCode] = useState("");
  const [addCategory, setAddCategory] = useState<number | string>(
    categories[0]?.category_id || 1
  );
  const [addSizes, setAddSizes] = useState<Array<{ size_name: string; selling_price: string }>>([
    { size_name: "Regular", selling_price: "" },
  ]);
  const [addDesc, setAddDesc] = useState("");
  const [addIsVeg, setAddIsVeg] = useState(0);
  const [addIsActive, setAddIsActive] = useState(1);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Edit Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editCategory, setEditCategory] = useState<number | string>(1);
  const [editSizes, setEditSizes] = useState<Array<{ size_name: string; selling_price: string }>>([
    { size_name: "Regular", selling_price: "" },
  ]);
  const [editDesc, setEditDesc] = useState("");
  const [editIsVeg, setEditIsVeg] = useState(0);
  const [editIsActive, setEditIsActive] = useState(1);
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Filter Offcanvas State
  const [filterStatus, setFilterStatus] = useState(currentFilter.status || "all");
  const [filterCat, setFilterCat] = useState(currentFilter.category || "all");
  const [filterVeg, setFilterVeg] = useState(currentFilter.veg || "all");

  useEffect(() => {
    setFilterStatus(currentFilter.status || "all");
    setFilterCat(currentFilter.category || "all");
    setFilterVeg(currentFilter.veg || "all");
  }, [currentFilter]);

  useEffect(() => {
    if (categories.length > 0 && !addCategory) {
      setAddCategory(categories[0].category_id);
    }
  }, [categories, addCategory]);

  useEffect(() => {
    if (editingItem) {
      setEditId(editingItem.item_id || null);
      setEditName(editingItem.item_name || editingItem.item || "");
      setEditCode(editingItem.item_code || "");
      setEditCategory(editingItem.category_id || 1);
      const rawPrice = editingItem.price_raw ?? editingItem.selling_price ?? "";

      if (Array.isArray(editingItem.sizes) && editingItem.sizes.length > 0) {
        setEditSizes(
          editingItem.sizes.map((s) => ({
            size_name: s.size_name || "Regular",
            selling_price:
              s.selling_price !== undefined && s.selling_price !== null
                ? String(s.selling_price)
                : "",
          }))
        );
      } else {
        setEditSizes([
          {
            size_name: editingItem.item_size || "Regular",
            selling_price: rawPrice ? String(rawPrice) : "",
          },
        ]);
      }

      setEditDesc(editingItem.description || "");
      setEditIsVeg(editingItem.is_vegetarian ? 1 : 0);
      setEditIsActive(editingItem.is_active !== undefined ? (editingItem.is_active ? 1 : 0) : 1);
      setEditError(null);
    }
  }, [editingItem]);

  // Size row handlers for Add modal
  const handleAddSizeRow = () => {
    setAddSizes((prev) => [...prev, { size_name: "", selling_price: "" }]);
  };

  const handleRemoveAddSizeRow = (index: number) => {
    if (addSizes.length > 1) {
      setAddSizes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleUpdateAddSize = (
    index: number,
    field: "size_name" | "selling_price",
    value: string
  ) => {
    setAddSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  // Size row handlers for Edit modal
  const handleAddEditSizeRow = () => {
    setEditSizes((prev) => [...prev, { size_name: "", selling_price: "" }]);
  };

  const handleRemoveEditSizeRow = (index: number) => {
    if (editSizes.length > 1) {
      setEditSizes((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleUpdateEditSize = (
    index: number,
    field: "size_name" | "selling_price",
    value: string
  ) => {
    setEditSizes((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  // Handle Add Item Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) {
      setAddError("Item name is required.");
      return;
    }

    // Validate sizes and prices
    for (let i = 0; i < addSizes.length; i++) {
      const sz = addSizes[i];
      if (!sz.size_name.trim()) {
        setAddError(`Size / Portion name is required for row ${i + 1}.`);
        return;
      }
      if (
        sz.selling_price === "" ||
        isNaN(parseFloat(sz.selling_price)) ||
        parseFloat(sz.selling_price) < 0
      ) {
        setAddError(`Please provide a valid price for size "${sz.size_name}".`);
        return;
      }
    }

    setAdding(true);
    setAddError(null);
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_name: addName.trim(),
          item_code: addCode.trim() || undefined,
          category_id: Number(addCategory) || 1,
          item_size: addSizes[0]?.size_name.trim() || "Regular",
          selling_price: parseFloat(addSizes[0]?.selling_price) || 0,
          sizes: addSizes.map((s) => ({
            size_name: s.size_name.trim() || "Regular",
            selling_price: parseFloat(s.selling_price) || 0,
          })),
          description: addDesc.trim(),
          is_vegetarian: addIsVeg,
          is_active: addIsActive,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAddName("");
        setAddCode("");
        setAddSizes([{ size_name: "Regular", selling_price: "" }]);
        setAddDesc("");
        const closeBtn = document.getElementById("close_add_item_btn");
        closeBtn?.click();
        onSuccess?.();
      } else {
        setAddError(data.error || "Failed to create item.");
      }
    } catch (err: any) {
      setAddError(err.message || "Failed to submit request.");
    } finally {
      setAdding(false);
    }
  };

  // Handle Edit Item Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    if (!editName.trim()) {
      setEditError("Item name is required.");
      return;
    }

    // Validate sizes and prices
    for (let i = 0; i < editSizes.length; i++) {
      const sz = editSizes[i];
      if (!sz.size_name.trim()) {
        setEditError(`Size / Portion name is required for row ${i + 1}.`);
        return;
      }
      if (
        sz.selling_price === "" ||
        isNaN(parseFloat(sz.selling_price)) ||
        parseFloat(sz.selling_price) < 0
      ) {
        setEditError(`Please provide a valid price for size "${sz.size_name}".`);
        return;
      }
    }

    setEditing(true);
    setEditError(null);
    try {
      const res = await fetch("/api/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: editId,
          item_name: editName.trim(),
          item_code: editCode.trim() || undefined,
          category_id: Number(editCategory) || 1,
          item_size: editSizes[0]?.size_name.trim() || "Regular",
          selling_price: parseFloat(editSizes[0]?.selling_price) || 0,
          sizes: editSizes.map((s) => ({
            size_name: s.size_name.trim() || "Regular",
            selling_price: parseFloat(s.selling_price) || 0,
          })),
          description: editDesc.trim(),
          is_vegetarian: editIsVeg,
          is_active: editIsActive,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const closeBtn = document.getElementById("close_edit_item_btn");
        closeBtn?.click();
        onSuccess?.();
      } else {
        setEditError(data.error || "Failed to update item.");
      }
    } catch (err: any) {
      setEditError(err.message || "Failed to submit update.");
    } finally {
      setEditing(false);
    }
  };

  return (
    <>
      {/* Shared Datalist for preset size suggestions */}
      <datalist id="item-size-presets">
        {PRESET_SIZES.map((ps) => (
          <option key={ps} value={ps} />
        ))}
      </datalist>

      {/* 1. Item Details Modal */}
      <div className="modal fade" id="items_details" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header p-4 pb-2 border-bottom">
              <h4 className="modal-title fw-bold">Item Details</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-4">
              {viewingItem ? (
                <div className="row g-4 align-items-start">
                  <div className="col-lg-5">
                    <div className="bg-light p-2 rounded border text-center">
                      <ImageWithBasePath
                        src={
                          viewingItem.image
                            ? viewingItem.image.startsWith("assets/")
                              ? viewingItem.image
                              : `assets/img/items/${viewingItem.image}`
                            : "assets/img/items/food-01.jpg"
                        }
                        alt={viewingItem.item_name || "item"}
                        className="img-fluid rounded w-100 object-fit-cover"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-12">
                        {viewingItem.category || viewingItem.category_name || "General"}
                      </span>
                      <span
                        className={`badge ${
                          (viewingItem.status || viewingItem.Status) === "Active"
                            ? "badge-soft-success"
                            : "badge-soft-danger"
                        }`}
                      >
                        {viewingItem.status || viewingItem.Status || "Active"}
                      </span>
                    </div>
                    <h4 className="fw-bold mb-1 text-dark">
                      {viewingItem.item_name || viewingItem.item}
                    </h4>
                    {viewingItem.item_code && (
                      <span className="badge bg-light text-muted border font-monospace mb-3">
                        Code: {viewingItem.item_code}
                      </span>
                    )}

                    {/* Sizes & Pricing Card */}
                    <div className="my-3 p-3 bg-light rounded border">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="text-muted fs-13 fw-semibold">
                          Portion Sizes & Pricing:
                        </span>
                        <span className="badge bg-secondary-subtle text-secondary fs-11">
                          {viewingItem.sizes && viewingItem.sizes.length > 1
                            ? `${viewingItem.sizes.length} Sizes`
                            : "Standard"}
                        </span>
                      </div>
                      {viewingItem.sizes && viewingItem.sizes.length > 0 ? (
                        <div className="d-flex flex-column gap-2">
                          {viewingItem.sizes.map((s, sIdx) => (
                            <div
                              key={sIdx}
                              className="d-flex align-items-center justify-content-between bg-white p-2 px-3 rounded border"
                            >
                              <span className="fw-semibold text-dark fs-13 d-inline-flex align-items-center">
                                <span className="badge bg-primary-subtle text-primary border border-primary-subtle me-2 fs-11">
                                  Size
                                </span>
                                {s.size_name || "Regular"}
                              </span>
                              <span className="fw-bold text-dark font-monospace fs-15">
                                LKR {Number(s.selling_price).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="d-flex align-items-center justify-content-between bg-white p-2 px-3 rounded border">
                          <span className="fw-semibold text-dark fs-13">
                            {viewingItem.item_size || "Regular"}
                          </span>
                          <span className="fw-bold text-dark font-monospace fs-16">
                            {viewingItem.price ||
                              `LKR ${Number(viewingItem.selling_price || viewingItem.price_raw || 0).toFixed(2)}`}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <h6 className="fw-semibold fs-13 text-muted mb-1">Description</h6>
                      <p className="text-dark fs-14">
                        {viewingItem.description ||
                          "Delicious gourmet preparation crafted with authentic spices and fresh local ingredients."}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-3 fs-13 text-muted">
                      <span>
                        Dietary:{" "}
                        <strong
                          className={
                            viewingItem.is_vegetarian ? "text-success" : "text-danger"
                          }
                        >
                          {viewingItem.is_vegetarian ? "Vegetarian" : "Non-Vegetarian"}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-muted my-4">No item selected.</p>
              )}
            </div>
            <div className="modal-footer border-0 pt-0 px-4 pb-4">
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Add Item Modal */}
      <div className="modal fade" id="add_item" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom p-4 pb-3">
              <h4 className="modal-title fw-bold">Add New Item</h4>
              <button
                type="button"
                id="close_add_item_btn"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body p-4">
                {addError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3">{addError}</div>
                )}
                <div className="row g-3">
                  <div className="col-lg-8">
                    <label className="form-label fw-semibold fs-13">
                      Item Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Grilled Salmon Steak"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">Item Code</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      placeholder="e.g. SEA-01"
                      value={addCode}
                      onChange={(e) => setAddCode(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={addCategory}
                      onChange={(e) => setAddCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.category_id} value={c.category_id}>
                          {c.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">Dietary Type</label>
                    <select
                      className="form-select"
                      value={addIsVeg}
                      onChange={(e) => setAddIsVeg(Number(e.target.value))}
                    >
                      <option value={0}>Non-Vegetarian</option>
                      <option value={1}>Vegetarian</option>
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">Status</label>
                    <select
                      className="form-select"
                      value={addIsActive}
                      onChange={(e) => setAddIsActive(Number(e.target.value))}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>

                  {/* Size & Price Section */}
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label className="form-label fw-semibold fs-13 mb-0">
                        Item Size &amp; Price <span className="text-danger">*</span>
                      </label>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary py-1 px-2 fs-12 d-inline-flex align-items-center"
                        onClick={handleAddSizeRow}
                      >
                        <i className="icon-plus me-1" /> Add Another Size
                      </button>
                    </div>

                    <div className="bg-light p-3 rounded border">
                      {addSizes.map((s, idx) => (
                        <div key={idx} className="row g-2 align-items-center mb-2">
                          <div className="col-sm-6">
                            <label className="form-label text-muted fs-12 mb-1">
                              Size / Portion <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              list="item-size-presets"
                              className="form-control"
                              placeholder="e.g. Regular, Small, Large, Full, Half"
                              value={s.size_name}
                              onChange={(e) =>
                                handleUpdateAddSize(idx, "size_name", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="col-sm-5">
                            <label className="form-label text-muted fs-12 mb-1">
                              Price (LKR) <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <span className="input-group-text fw-bold fs-12">LKR</span>
                              <input
                                type="number"
                                step="0.01"
                                className="form-control font-monospace"
                                placeholder="0.00"
                                value={s.selling_price}
                                onChange={(e) =>
                                  handleUpdateAddSize(idx, "selling_price", e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-sm-1 d-flex align-items-end justify-content-center pt-sm-4">
                            {addSizes.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-icon btn-sm btn-white text-danger rounded-circle border shadow-xs"
                                title="Remove this size"
                                onClick={() => handleRemoveAddSizeRow(idx)}
                              >
                                <i className="icon-trash-2" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <small className="text-muted fs-11 mt-1 d-block">
                      Select or enter portion size (e.g. Regular, Small, Large, Full, Half) and its price. Click &ldquo;Add Another Size&rdquo; if this item has multiple portions.
                    </small>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold fs-13">Description</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      placeholder="Brief culinary description of the food item..."
                      value={addDesc}
                      onChange={(e) => setAddDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={adding}
                >
                  {adding ? "Saving..." : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Edit Item Modal */}
      <div className="modal fade" id="edit_item" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom p-4 pb-3">
              <h4 className="modal-title fw-bold">Edit Item</h4>
              <button
                type="button"
                id="close_edit_item_btn"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body p-4">
                {editError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3">{editError}</div>
                )}
                <div className="row g-3">
                  <div className="col-lg-8">
                    <label className="form-label fw-semibold fs-13">
                      Item Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">Item Code</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      value={editCode}
                      onChange={(e) => setEditCode(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c.category_id} value={c.category_id}>
                          {c.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">Dietary Type</label>
                    <select
                      className="form-select"
                      value={editIsVeg}
                      onChange={(e) => setEditIsVeg(Number(e.target.value))}
                    >
                      <option value={0}>Non-Vegetarian</option>
                      <option value={1}>Vegetarian</option>
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label fw-semibold fs-13">Status</label>
                    <select
                      className="form-select"
                      value={editIsActive}
                      onChange={(e) => setEditIsActive(Number(e.target.value))}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>

                  {/* Size & Price Section */}
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label className="form-label fw-semibold fs-13 mb-0">
                        Item Size &amp; Price <span className="text-danger">*</span>
                      </label>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary py-1 px-2 fs-12 d-inline-flex align-items-center"
                        onClick={handleAddEditSizeRow}
                      >
                        <i className="icon-plus me-1" /> Add Another Size
                      </button>
                    </div>

                    <div className="bg-light p-3 rounded border">
                      {editSizes.map((s, idx) => (
                        <div key={idx} className="row g-2 align-items-center mb-2">
                          <div className="col-sm-6">
                            <label className="form-label text-muted fs-12 mb-1">
                              Size / Portion <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              list="item-size-presets"
                              className="form-control"
                              placeholder="e.g. Regular, Small, Large, Full, Half"
                              value={s.size_name}
                              onChange={(e) =>
                                handleUpdateEditSize(idx, "size_name", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="col-sm-5">
                            <label className="form-label text-muted fs-12 mb-1">
                              Price (LKR) <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <span className="input-group-text fw-bold fs-12">LKR</span>
                              <input
                                type="number"
                                step="0.01"
                                className="form-control font-monospace"
                                placeholder="0.00"
                                value={s.selling_price}
                                onChange={(e) =>
                                  handleUpdateEditSize(idx, "selling_price", e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-sm-1 d-flex align-items-end justify-content-center pt-sm-4">
                            {editSizes.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-icon btn-sm btn-white text-danger rounded-circle border shadow-xs"
                                title="Remove this size"
                                onClick={() => handleRemoveEditSizeRow(idx)}
                              >
                                <i className="icon-trash-2" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <small className="text-muted fs-11 mt-1 d-block">
                      Select or enter portion size (e.g. Regular, Small, Large, Full, Half) and its price. Click &ldquo;Add Another Size&rdquo; if this item has multiple portions.
                    </small>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold fs-13">Description</label>
                    <textarea
                      rows={3}
                      className="form-control"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={editing}
                >
                  {editing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 4. Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="items-filter-offcanvas"
        aria-labelledby="itemsFilterOffcanvasLabel"
        style={{ width: 340 }}
      >
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold" id="itemsFilterOffcanvasLabel">
            <i className="icon-funnel me-2 text-primary" />
            Filter Items
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body d-flex flex-column pt-3">
          <div className="mb-3">
            <label className="form-label fw-semibold fs-13">Category</label>
            <select
              className="form-select"
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.category_id} value={String(c.category_id)}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold fs-13">Status</label>
            <div className="d-flex gap-2">
              {["all", "Active", "Inactive"].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`btn btn-sm flex-fill ${
                    filterStatus.toLowerCase() === st.toLowerCase()
                      ? "btn-primary"
                      : "btn-light"
                  }`}
                  onClick={() => setFilterStatus(st)}
                >
                  {st === "all" ? "All" : st}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold fs-13">Dietary Type</label>
            <div className="d-flex gap-2">
              {[
                { label: "All", val: "all" },
                { label: "Veg", val: "veg" },
                { label: "Non-Veg", val: "non_veg" },
              ].map((t) => (
                <button
                  key={t.val}
                  type="button"
                  className={`btn btn-sm flex-fill ${
                    filterVeg === t.val ? "btn-primary" : "btn-light"
                  }`}
                  onClick={() => setFilterVeg(t.val)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto d-flex gap-2 pt-3 border-top">
            <button
              type="button"
              className="btn btn-light w-50"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                setFilterStatus("all");
                setFilterCat("all");
                setFilterVeg("all");
                onResetFilter?.();
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary w-50"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                onApplyFilter?.({
                  status: filterStatus,
                  category: filterCat,
                  veg: filterVeg,
                });
              }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsModal;
