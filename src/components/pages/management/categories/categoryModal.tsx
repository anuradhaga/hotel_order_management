"use client";
import React, { useState, useEffect } from "react";
import ImageWithBasePath from "@/core/common/image-with-base-path";

export interface CategoryItem {
  id?: string | number;
  category_id?: number;
  category: string;
  category_name?: string;
  category_code?: string;
  No_Items: string | number;
  items_count?: number;
  Date: string;
  Status: string;
  status?: string;
  image?: string;
}

interface CategoryModalProps {
  editingCategory?: CategoryItem | null;
  onSuccess?: () => void;
  currentFilterStatus?: string;
  onApplyFilter?: (status: string) => void;
  onResetFilter?: () => void;
}

const CategoryModal = ({
  editingCategory,
  onSuccess,
  currentFilterStatus = "all",
  onApplyFilter,
  onResetFilter,
}: CategoryModalProps) => {
  // Add form state
  const [addName, setAddName] = useState("");
  const [addStatus, setAddStatus] = useState("Active");
  const [addImage, setAddImage] = useState("category-01.png");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editStatus, setEditStatus] = useState("Active");
  const [editImage, setEditImage] = useState("category-01.png");
  const [editing, setEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Filter state
  const [filterStatus, setFilterStatus] = useState(currentFilterStatus);

  useEffect(() => {
    setFilterStatus(currentFilterStatus);
  }, [currentFilterStatus]);

  useEffect(() => {
    if (editingCategory) {
      setEditName(editingCategory.category_name || editingCategory.category || "");
      setEditStatus(editingCategory.status || editingCategory.Status || "Active");
      setEditImage(editingCategory.image || "category-01.png");
      setEditError(null);
    }
  }, [editingCategory]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) {
      setAddError("Category name is required.");
      return;
    }

    setAdding(true);
    setAddError(null);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: addName.trim(),
          image: addImage,
          status: addStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAddName("");
        // close modal
        const closeBtn = document.getElementById("close_add_modal_btn");
        closeBtn?.click();
        onSuccess?.();
      } else {
        setAddError(data.error || "Failed to create category.");
      }
    } catch (err: any) {
      setAddError(err.message || "Failed to submit request.");
    } finally {
      setAdding(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    if (!editName.trim()) {
      setEditError("Category name is required.");
      return;
    }

    setEditing(true);
    setEditError(null);
    try {
      const catId = editingCategory.category_id || editingCategory.id;
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: catId,
          category_name: editName.trim(),
          image: editImage,
          status: editStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const closeBtn = document.getElementById("close_edit_modal_btn");
        closeBtn?.click();
        onSuccess?.();
      } else {
        setEditError(data.error || "Failed to update category.");
      }
    } catch (err: any) {
      setEditError(err.message || "Failed to submit update.");
    } finally {
      setEditing(false);
    }
  };

  const availableImages = [
    "category-01.png",
    "category-02.png",
    "category-03.png",
    "category-04.png",
    "category-05.png",
    "category-06.png",
    "category-07.png",
    "category-08.png",
    "category-09.png",
    "category-10.png",
  ];

  return (
    <>
      {/* Add Category Modal */}
      <div className="modal fade" id="add_category" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom p-4 pb-3">
              <h4 className="modal-title fw-bold">Add Category</h4>
              <button
                type="button"
                id="close_add_modal_btn"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body p-4 pt-3">
                {addError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3">{addError}</div>
                )}
                {/* Image Selection */}
                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">Choose Category Icon</label>
                  <div className="d-flex align-items-center gap-2 flex-wrap p-2 border rounded bg-light">
                    {availableImages.map((img) => (
                      <div
                        key={img}
                        className={`avatar avatar-md cursor-pointer border rounded ${
                          addImage === img ? "border-primary border-2 bg-white shadow-sm" : ""
                        }`}
                        onClick={() => setAddImage(img)}
                        title={img}
                      >
                        <ImageWithBasePath
                          src={`assets/img/category/${img}`}
                          alt={img}
                          className="img-fluid"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">
                    Category Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Seafood, Burgers, Beverages"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold fs-13">Status</label>
                  <div className="d-flex gap-3">
                    <label className="d-flex align-items-center cursor-pointer">
                      <input
                        type="radio"
                        name="addStatus"
                        className="form-check-input me-2"
                        checked={addStatus === "Active"}
                        onChange={() => setAddStatus("Active")}
                      />
                      Active
                    </label>
                    <label className="d-flex align-items-center cursor-pointer">
                      <input
                        type="radio"
                        name="addStatus"
                        className="form-check-input me-2"
                        checked={addStatus === "Expired"}
                        onChange={() => setAddStatus("Expired")}
                      />
                      Expired / Inactive
                    </label>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-2 pt-1 border-top pt-3">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={adding}
                  >
                    {adding ? "Saving..." : "Save Category"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <div className="modal fade" id="edit_category" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom p-4 pb-3">
              <h4 className="modal-title fw-bold">Edit Category</h4>
              <button
                type="button"
                id="close_edit_modal_btn"
                className="btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-x" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body p-4 pt-3">
                {editError && (
                  <div className="alert alert-danger py-2 fs-13 mb-3">{editError}</div>
                )}
                {/* Icon selection */}
                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">Choose Category Icon</label>
                  <div className="d-flex align-items-center gap-2 flex-wrap p-2 border rounded bg-light">
                    {availableImages.map((img) => (
                      <div
                        key={img}
                        className={`avatar avatar-md cursor-pointer border rounded ${
                          editImage === img ? "border-primary border-2 bg-white shadow-sm" : ""
                        }`}
                        onClick={() => setEditImage(img)}
                        title={img}
                      >
                        <ImageWithBasePath
                          src={`assets/img/category/${img}`}
                          alt={img}
                          className="img-fluid"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold fs-13">
                    Category Name<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold fs-13">Status</label>
                  <div className="d-flex gap-3">
                    <label className="d-flex align-items-center cursor-pointer">
                      <input
                        type="radio"
                        name="editStatus"
                        className="form-check-input me-2"
                        checked={editStatus === "Active"}
                        onChange={() => setEditStatus("Active")}
                      />
                      Active
                    </label>
                    <label className="d-flex align-items-center cursor-pointer">
                      <input
                        type="radio"
                        name="editStatus"
                        className="form-check-input me-2"
                        checked={editStatus === "Expired"}
                        onChange={() => setEditStatus("Expired")}
                      />
                      Expired / Inactive
                    </label>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between gap-2 pt-1 border-top pt-3">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={editing}
                  >
                    {editing ? "Updating..." : "Update Category"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="filter-offcanvas"
        aria-labelledby="categoriesFilterLabel"
        style={{ width: 340 }}
      >
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold" id="categoriesFilterLabel">
            <i className="icon-funnel me-2 text-primary" />
            Filter Categories
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="icon-x" />
          </button>
        </div>
        <div className="offcanvas-body d-flex flex-column pt-3">
          <div className="mb-4">
            <label className="form-label fw-semibold fs-13">Category Status</label>
            <div className="vstack gap-2">
              {[
                { label: "All Categories", val: "all" },
                { label: "Active", val: "Active" },
                { label: "Expired", val: "Expired" },
              ].map((opt) => (
                <label
                  key={opt.val}
                  className="d-flex align-items-center cursor-pointer p-2 border rounded"
                >
                  <input
                    type="radio"
                    name="filterCategoryStatus"
                    className="form-check-input me-2 m-0"
                    checked={filterStatus.toLowerCase() === opt.val.toLowerCase()}
                    onChange={() => setFilterStatus(opt.val)}
                  />
                  <span className="fs-14">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 mt-auto offcanvas-footer border-top pt-3">
            <button
              type="button"
              className="btn btn-light w-100"
              onClick={() => {
                setFilterStatus("all");
                onResetFilter?.();
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary w-100"
              data-bs-dismiss="offcanvas"
              onClick={() => onApplyFilter?.(filterStatus)}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;
