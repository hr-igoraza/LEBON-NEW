import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./viewItem.css";

const ViewItem = ({ setActiveTab }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [modalFeedback, setModalFeedback] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get("/api/products");
        setItems(response.data);
      } catch (err) {
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await API.get("/api/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/api/products/${id}`);
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        setFeedback("Item deleted successfully.");
      } catch (err) {
        setFeedback("Failed to delete item. Please try again.");
      } finally {
        setTimeout(() => setFeedback(""), 3000);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentItem({
      ...item,
      category: item.category?._id,
      subCategory: item.subCategory?._id,
    });

    if (item.category) {
      handleCategoryChange(item.category._id);
    }
    const modal = new window.bootstrap.Modal(
      document.getElementById("editItemModal")
    );
    modal.show();
  };

  const handleSave = async () => {
    if (
      !currentItem.name ||
      !currentItem.price ||
      !currentItem.category ||
      !currentItem.description
    ) {
      setModalFeedback("Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", currentItem.name);
      formData.append("description", currentItem.description);
      formData.append("price", currentItem.price);
      formData.append("isVeg", currentItem.isVeg);
      formData.append("isDeliverable", currentItem.isDeliverable);
      formData.append("category", currentItem.category);
      formData.append("subCategory", currentItem.subCategory);

      if (currentItem.newImages) {
        currentItem.newImages.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await API.put(
        `/api/products/${currentItem._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === currentItem._id ? response.data.updatedProduct : item
        )
      );

      setModalFeedback("Item updated successfully.");
      setTimeout(() => {
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("editItemModal")
        );
        modal.hide();
      }, 1500);
    } catch (err) {
      setModalFeedback("Failed to update item. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setCurrentItem((prevItem) => ({
      ...prevItem,
      newImages: files,
    }));
  };


  const handleImageRemove = (imageToRemove) => {
    setCurrentItem((prevItem) => {
      const updatedImages = prevItem.images.filter((image) => image !== imageToRemove);
      const updatedNewImages = prevItem.newImages
        ? prevItem.newImages.filter((file) => URL.createObjectURL(file) !== imageToRemove)
        : [];
  
      return {
        ...prevItem,
        images: updatedImages,
        newImages: updatedNewImages,
      };
    });
  };
  

  const handleCategoryChange = async (categoryId) => {
    setCurrentItem((prev) => ({ ...prev, subCategory: "" })); // Reset subcategory on category change
    try {
      const response = await API.get(`/api/categories/${categoryId}`);
      setSubcategories(response.data.subCategories || []);
    } catch (err) {
      setError("Failed to load subcategories.");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="text-white">
          <h2>Menu Items</h2>
          <p>Here you can view all the items.</p>

          {loading && <p>Loading items...</p>}
          {error && <p className="text-danger">{error}</p>}
          {feedback && <p className="text-success">{feedback}</p>}

          {!loading && items.length === 0 && <p>No items available.</p>}

          {!loading && items.length > 0 && (
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Deliverable</th>
                    <th>Veg/Non-Veg</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span>No image</span>
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>₹{item.price}</td>
                      <td>{item.category?.name}</td>
                      <td>{item.isDeliverable ? "Yes" : "No"}</td>
                      <td>{item.isVeg ? "Veg" : "Non-Veg"}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm ms-2 mb-2"
                          onClick={() => handleEdit(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#editItemModal"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="editItemModal"
          tabIndex="-1"
          aria-labelledby="editItemModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editItemModalLabel">
                  Edit Item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {modalFeedback && (
                  <div
                    className={`alert ${
                      modalFeedback.includes("successfully")
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                  >
                    {modalFeedback}
                  </div>
                )}
                {currentItem && (
                  <div className="row">
                    <div className="col-md-12">
                      {/* Name */}
                      <div className="form-group mb-3">
                        <label>Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentItem.name}
                          onChange={(e) =>
                            setCurrentItem({
                              ...currentItem,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="form-group mb-3">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          value={currentItem.description}
                          onChange={(e) =>
                            setCurrentItem({
                              ...currentItem,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      {/* Price */}
                      <div className="form-group mb-3">
                        <label>Price *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={currentItem.price}
                          onChange={(e) =>
                            setCurrentItem({
                              ...currentItem,
                              price: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      {/* Deliverable */}
                      <div className="form-group mb-3">
                        <label>Deliverable</label>
                        <input
                          type="checkbox"
                          checked={currentItem.isDeliverable}
                          onChange={(e) =>
                            setCurrentItem({
                              ...currentItem,
                              isDeliverable: e.target.checked,
                            })
                          }
                        />
                      </div>

                      {/* Veg/Non-Veg */}
                      <div className="form-group mb-3">
                        <label>Veg/Non-Veg</label>
                        <select
                          className="form-control"
                          value={currentItem.isVeg ? "Veg" : "Non-Veg"}
                          onChange={(e) =>
                            setCurrentItem({
                              ...currentItem,
                              isVeg: e.target.value === "Veg",
                            })
                          }
                        >
                          <option value="Veg">Veg</option>
                          <option value="Non-Veg">Non-Veg</option>
                        </select>
                      </div>

                      {/* Category */}
                      <div className="form-group mb-3">
                        <label>Category</label>
                        <select
                          className="form-control"
                          value={currentItem.category || ""}
                          onChange={(e) => {
                            handleCategoryChange(e.target.value);
                            setCurrentItem((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }));
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
                      {/* Subcategory */}
                      <div className="form-group mb-3">
                        <label>Subcategory</label>
                        <select
                          className="form-control"
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
                            <option
                              key={subcategory._id}
                              value={subcategory._id}
                            >
                              {subcategory.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Images */}
                      <div className="form-group mb-3">
                        <label>Replace images</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                        <div className="mt-3">
                          {currentItem.images.map((image, index) => (
                            <div key={index} className="image-preview">
                              <img
                                src={image}
                                alt="Item"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  marginRight: "8px",
                                }}
                              />
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleImageRemove(image)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItem;
