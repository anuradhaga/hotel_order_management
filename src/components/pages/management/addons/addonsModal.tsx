"use client";
import React, { useState, useEffect, useRef } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";
import Link from "next/link";

export interface FoodItemOption {
  item_id: number;
  item_name: string;
  item_code?: string;
  image?: string;
}

export interface AddonRecord {
  addon_id?: number;
  id?: number | string;
  key?: string;
  item_id: number;
  Item?: string;
  item_name?: string;
  item_code?: string;
  item_image?: string;
  Addon?: string;
  addon_name: string;
  price?: string | number;
  price_raw?: number;
  description?: string;
  image_url?: string | null;
  is_active?: number;
  status?: string;
  Status?: string;
}

interface AddonsModalProps {
  items: FoodItemOption[];
  editingAddon?: AddonRecord | null;
  onSuccess: () => void;
  onApplyFilter?: (filter: { itemId: string; status: string }) => void;
  onResetFilter?: () => void;
}

const AddonsModal: React.FC<AddonsModalProps> = ({
  items,
  editingAddon,
  onSuccess,
  onApplyFilter,
  onResetFilter,
}) => {
  // ----------------------------------------------------
  // Add Addon State
  // ----------------------------------------------------
  const [addItemId, setAddItemId] = useState<number | string>("");
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addIsActive, setAddIsActive] = useState<number>(1);
  const [addImageFile, setAddImageFile] = useState<File | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const addFileInputRef = useRef<HTMLInputElement | null>(null);

  // Set default item when items list loads
  useEffect(() => {
    if (items.length > 0 && !addItemId) {
      setAddItemId(items[0].item_id);
    }
  }, [items, addItemId]);

  // Image upload handler for Add
  const handleAddFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAddError("Selected image exceeds 5MB limit.");
        return;
      }
      setAddImageFile(file);
      const objUrl = URL.createObjectURL(file);
      setAddImagePreview(objUrl);
      setAddError(null);
    }
  };

  const handleRemoveAddImage = () => {
    setAddImageFile(null);
    setAddImagePreview(null);
    if (addFileInputRef.current) {
      addFileInputRef.current.value = "";
    }
  };

  // Submit Add Addon
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addItemId) {
      setAddError("Please select an item.");
      return;
    }
    if (!addName.trim()) {
      setAddError("Addon name is required.");
      return;
    }
    if (addPrice === "" || isNaN(parseFloat(addPrice)) || parseFloat(addPrice) < 0) {
      setAddError("Please provide a valid price (>= 0).");
      return;
    }

    setAdding(true);
    setAddError(null);

    try {
      let finalImageUrl: string | null = null;
      if (addImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", addImageFile);
        const upRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const upData = await upRes.json();
        if (upData.success && upData.url) {
          finalImageUrl = upData.url;
        } else {
          setAddError(upData.error || "Failed to upload image.");
          setAdding(false);
          return;
        }
      }

      const res = await fetch("/api/addons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: Number(addItemId),
          addon_name: addName.trim(),
          price: parseFloat(addPrice) || 0,
          description: addDesc.trim(),
          image_url: finalImageUrl,
          is_active: addIsActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        // Reset form
        setAddName("");
        setAddPrice("");
        setAddDesc("");
        setAddIsActive(1);
        handleRemoveAddImage();
        if (items.length > 0) {
          setAddItemId(items[0].item_id);
        }

        // Close modal
        document.getElementById("close_add_addon_btn")?.click();
        onSuccess();
      } else {
        setAddError(data.error || "Failed to create addon.");
      }
    } catch (err: any) {
      setAddError(err.message || "Failed to submit request.");
    } finally {
      setAdding(false);
    }
  };

  // ----------------------------------------------------
  // Edit Addon State
  // ----------------------------------------------------
  const [editId, setEditId] = useState<number | null>(null);
  const [editItemId, setEditItemId] = useState<number | string>("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editIsActive, setEditIsActive] = useState<number>(1);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state when editingAddon changes
  useEffect(() => {
    if (editingAddon) {
      setEditId(Number(editingAddon.addon_id || editingAddon.id) || null);
      setEditItemId(editingAddon.item_id || (items[0]?.item_id ?? ""));
      setEditName(editingAddon.addon_name || editingAddon.Addon || "");
      const rawPrice = editingAddon.price_raw ?? editingAddon.price ?? "";
      setEditPrice(rawPrice !== undefined && rawPrice !== null ? String(rawPrice) : "");
      setEditDesc(editingAddon.description || "");
      setEditIsActive(editingAddon.is_active !== undefined ? Number(editingAddon.is_active) : 1);
      setEditImageUrl(editingAddon.image_url || null);
      setEditImagePreview(editingAddon.image_url || null);
      setEditImageFile(null);
      setEditError(null);
    }
  }, [editingAddon, items]);

  // Image upload handler for Edit
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setEditError("Selected image exceeds 5MB limit.");
        return;
      }
      setEditImageFile(file);
      const objUrl = URL.createObjectURL(file);
      setEditImagePreview(objUrl);
      setEditError(null);
    }
  };

  const handleRemoveEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview(null);
    setEditImageUrl(null);
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  // Submit Edit Addon
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) {
      setEditError("No addon selected for editing.");
      return;
    }
    if (!editItemId) {
      setEditError("Please select an item.");
      return;
    }
    if (!editName.trim()) {
      setEditError("Addon name is required.");
      return;
    }
    if (editPrice === "" || isNaN(parseFloat(editPrice)) || parseFloat(editPrice) < 0) {
      setEditError("Please provide a valid price (>= 0).");
      return;
    }

    setEditing(true);
    setEditError(null);

    try {
      let finalImageUrl: string | null = editImageUrl;
      if (editImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", editImageFile);
        const upRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        const upData = await upRes.json();
        if (upData.success && upData.url) {
          finalImageUrl = upData.url;
        } else {
          setEditError(upData.error || "Failed to upload image.");
          setEditing(false);
          return;
        }
      }

      const res = await fetch("/api/addons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addon_id: editId,
          item_id: Number(editItemId),
          addon_name: editName.trim(),
          price: parseFloat(editPrice) || 0,
          description: editDesc.trim(),
          image_url: finalImageUrl,
          is_active: editIsActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        document.getElementById("close_edit_addon_btn")?.click();
        onSuccess();
      } else {
        setEditError(data.error || "Failed to update addon.");
      }
    } catch (err: any) {
      setEditError(err.message || "Failed to submit request.");
    } finally {
      setEditing(false);
    }
  };

  // ----------------------------------------------------
  // Filter State
  // ----------------------------------------------------
  const [filterItemId, setFilterItemId] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleApplyFilter = () => {
    onApplyFilter?.({ itemId: filterItemId, status: filterStatus });
  };

  const handleResetFilter = () => {
    setFilterItemId("all");
    setFilterStatus("all");
    onResetFilter?.();
  };

  return (
    <>
      {/* ==================================================== */}
      {/* ADD ADDON MODAL                                      */}
      {/* ==================================================== */}
      <div className="modal fade" id="add_modifier" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 p-4 pb-3">
              <h4 className="modal-title">Add Addon</h4>
              <button
                id="close_add_addon_btn"
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body p-4 pt-1">
                {addError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3" role="alert">
                    <i className="icon-alert-circle me-1" />
                    {addError}
                  </div>
                )}

                {/* Optional Image */}
                <div className="mb-3 d-flex align-items-center flex-wrap gap-3">
                  <div className="avatar avatar-3xl border bg-light rounded overflow-hidden position-relative">
                    {addImagePreview ? (
                      <img
                        src={addImagePreview}
                        alt="Addon preview"
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <i className="icon-images fs-28 text-muted" />
                    )}
                  </div>
                  <div>
                    <label className="form-label mb-1">Addon Image (Optional)</label>
                    <p className="fs-12 text-muted mb-2">Max file size: 5 MB</p>
                    <div className="d-flex align-items-center">
                      <label className="btn btn-icon btn-sm btn-white rounded-circle position-relative me-2 mb-0 cursor-pointer shadow-sm">
                        <input
                          ref={addFileInputRef}
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleAddFileChange}
                        />
                        <i className="icon-upload" />
                      </label>
                      {addImagePreview && (
                        <button
                          type="button"
                          className="btn btn-icon btn-sm btn-white rounded-circle text-danger shadow-sm"
                          onClick={handleRemoveAddImage}
                          title="Remove image"
                        >
                          <i className="icon-trash-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Item Selection from DB */}
                <div className="mb-3">
                  <label className="form-label">
                    Item (from Menu)<span className="text-danger"> *</span>
                  </label>
                  <select
                    className="form-select"
                    value={addItemId}
                    onChange={(e) => setAddItemId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Select Food Item --
                    </option>
                    {items.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item_name} {item.item_code ? `(${item.item_code})` : ""}
                      </option>
                    ))}
                  </select>
                  <span className="fs-11 text-muted">
                    Choose the menu item this addon/modifier belongs to.
                  </span>
                </div>

                {/* Addon Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Addon Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Extra Mozzarella Cheese, Garlic Butter Dip"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    required
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">
                    Price (LKR)<span className="text-danger"> *</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">LKR</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control"
                      placeholder="0.00"
                      value={addPrice}
                      onChange={(e) => setAddPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Optional description of this addon..."
                    value={addDesc}
                    onChange={(e) => setAddDesc(e.target.value)}
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={addIsActive}
                    onChange={(e) => setAddIsActive(Number(e.target.value))}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center"
                    disabled={adding}
                  >
                    {adding ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      "Save Addon"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* EDIT ADDON MODAL                                     */}
      {/* ==================================================== */}
      <div className="modal fade" id="edit_modifier" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 p-4 pb-3">
              <h4 className="modal-title">Edit Addon</h4>
              <button
                id="close_edit_addon_btn"
                type="button"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body p-4 pt-1">
                {editError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3" role="alert">
                    <i className="icon-alert-circle me-1" />
                    {editError}
                  </div>
                )}

                {/* Image */}
                <div className="mb-3 d-flex align-items-center flex-wrap gap-3">
                  <div className="avatar avatar-3xl border bg-light rounded overflow-hidden position-relative">
                    {editImagePreview ? (
                      <img
                        src={editImagePreview}
                        alt="Addon preview"
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <i className="icon-images fs-28 text-muted" />
                    )}
                  </div>
                  <div>
                    <label className="form-label mb-1">Addon Image (Optional)</label>
                    <p className="fs-12 text-muted mb-2">Max file size: 5 MB</p>
                    <div className="d-flex align-items-center">
                      <label className="btn btn-icon btn-sm btn-white rounded-circle position-relative me-2 mb-0 cursor-pointer shadow-sm">
                        <input
                          ref={editFileInputRef}
                          type="file"
                          accept="image/*"
                          className="d-none"
                          onChange={handleEditFileChange}
                        />
                        <i className="icon-pencil-line" />
                      </label>
                      {editImagePreview && (
                        <button
                          type="button"
                          className="btn btn-icon btn-sm btn-white rounded-circle text-danger shadow-sm"
                          onClick={handleRemoveEditImage}
                          title="Remove image"
                        >
                          <i className="icon-trash-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Item Selection from DB */}
                <div className="mb-3">
                  <label className="form-label">
                    Item (from Menu)<span className="text-danger"> *</span>
                  </label>
                  <select
                    className="form-select"
                    value={editItemId}
                    onChange={(e) => setEditItemId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      -- Select Food Item --
                    </option>
                    {items.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item_name} {item.item_code ? `(${item.item_code})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Addon Name */}
                <div className="mb-3">
                  <label className="form-label">
                    Addon Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">
                    Price (LKR)<span className="text-danger"> *</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">LKR</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="form-control"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={editIsActive}
                    onChange={(e) => setEditIsActive(Number(e.target.value))}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="d-flex align-items-center justify-content-between gap-2 pt-2">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center"
                    disabled={editing}
                  >
                    {editing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving Changes...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* FILTER OFFCANVAS                                     */}
      {/* ==================================================== */}
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="filter-offcanvas">
        <div className="offcanvas-header pb-0">
          <div className="border-bottom d-flex align-items-center justify-content-between w-100 pb-3">
            <h4 className="offcanvas-title mb-0">Filter Addons</h4>
            <button
              type="button"
              className="btn-close btn-close-modal"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="icon-x" />
            </button>
          </div>
        </div>
        <div className="offcanvas-body d-flex flex-column pt-3">
          <div>
            {/* Filter by Item */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Item</label>
              <select
                className="form-select"
                value={filterItemId}
                onChange={(e) => setFilterItemId(e.target.value)}
              >
                <option value="all">All Items</option>
                {items.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.item_name} {item.item_code ? `(${item.item_code})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-auto offcanvas-footer border-0 pt-3">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={handleResetFilter}
              data-bs-dismiss="offcanvas"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleApplyFilter}
              data-bs-dismiss="offcanvas"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddonsModal;
