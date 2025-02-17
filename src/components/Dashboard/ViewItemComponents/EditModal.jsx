import React from "react";

const EditItemModal = ({
  isModalOpen,
  currentItem,
  categories,
  subcategories,
  handleCategoryChange,
  handleImageUpload,
  handleSave,
  handleCloseModal,
  isSaving,
  modalFeedback,
  setCurrentItem,
}) => {
  if (!isModalOpen || !currentItem) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title mx-4">Edit Item</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              disabled={isSaving}
            ></button>
          </div>

          <div className="modal-body w-100">
            {/* Feedback Message */}
            {modalFeedback && (
              <div
                className={`alert ${
                  modalFeedback.includes("success")
                    ? "alert-success"
                    : "alert-danger"
                }`}
              >
                {modalFeedback}
              </div>
            )}

            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={currentItem.name || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, name: e.target.value })
                }
              />
            </div>

            {/* Description Field */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={currentItem.description || ""}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* Price Field */}
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={currentItem.price || ""}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, price: e.target.value })
                }
              />
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select bg-dark text-white"
                value={currentItem.category || ""}
                onChange={(e) => {
                  setCurrentItem({ ...currentItem, category: e.target.value });
                  handleCategoryChange(e.target.value);
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div className="mb-3">
              <label className="form-label">Subcategory</label>
              <select
                className="form-select bg-dark text-white "
                value={currentItem.subCategory || ""}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    subCategory: e.target.value,
                  })
                }
                disabled={!currentItem.category}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Veg Checkbox */}
            {/* <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={currentItem.isVeg || false}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, isVeg: e.target.checked })
                }
              />
              <label className="form-check-label">Vegetarian</label>
            </div> */}

            <div className="mb-3">
              <label htmlFor="isVeg" className="form-label">
                Veg/Non-Veg
              </label>
              <select
                id="isVeg"
                className="form-control bg-dark text-white"
                value={currentItem.isVeg}
                onChange={(e) => {
                  const value =
                    e.target.value === "null"
                      ? null
                      : e.target.value === "true";
                  setCurrentItem({ ...currentItem, isVeg: value });
                }}
                required
                // disabled={loading}
              >
                <option value="true">Veg</option>
                <option value="false">Non-Veg</option>
                <option value="null">Both are Available</option>
              </select>
            </div>

            {/* Deliverable Checkbox */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={currentItem.isDeliverable || false}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    isDeliverable: e.target.checked,
                  })
                }
              />
              <label className="form-check-label">Deliverable</label>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Upload New Images</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
