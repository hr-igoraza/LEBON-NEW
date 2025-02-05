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
    setCurrentItem(item);
    setSubcategories([]); // Reset subcategories
    if (item.category) {
      handleCategoryChange(item.category._id); // Fetch subcategories
    }
    const modal = new window.bootstrap.Modal(
      document.getElementById("editItemModal")
    );
    modal.show();
  };

  const   handleSave = async () => {
    if (!currentItem.name || !currentItem.price || !currentItem.category || !currentItem.images || !currentItem.description) {
      setModalFeedback("Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    try {
      await API.put(`/api/products/${currentItem._id}`, currentItem);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === currentItem._id ? currentItem : item
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


  const handleImageRemove = (imageToRemove) => {
    setCurrentItem((prevItem) => ({
      ...prevItem,
      images: prevItem.images.filter((image) => image !== imageToRemove),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setCurrentItem((prevItem) => ({
      ...prevItem,
      images: [...prevItem.images, ...newImages],
    }));
  };

  const handleCategoryChange = async (categoryId) => {
    try {
      const response = await API.get(
        `/api/categories/${categoryId}/subcategories`
      );
      setSubcategories(response.data);
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
                      {/* <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(item)}
                        data-bs-toggle="modal"
                        data-bs-target="#editItemModal"
                      >
                        Edit
                      </button> */}
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
                    {/* Category Dropdown
                    <div className="form-group mb-3">
                      <label>Category *</label>
                      <select
                        className="form-control"
                        value={currentItem.category?._id || ""}
                        onChange={(e) => {
                          const categoryId = e.target.value;
                          setCurrentItem({
                            ...currentItem,
                            category: { _id: categoryId },
                          });
                          handleCategoryChange(categoryId);
                        }}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    Subcategory Dropdown
                    {currentItem.category && currentItem.category._id && (
                      <div className="form-group mb-3">
                        <label>Subcategory</label>
                        <select
                          className="form-control"
                          value={currentItem.subcategory?._id || ""}
                          onChange={(e) =>
                            setCurrentItem({
                              ...currentItem,
                              subcategory: { _id: e.target.value },
                            })
                          }
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.map((subcategory) => (
                            <option key={subcategory._id} value={subcategory._id}>
                              {subcategory.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )} */}

                    {/* Name */}
                    <div className="form-group mb-3">
                      <label>Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentItem.name}
                        onChange={(e) =>
                          setCurrentItem({ ...currentItem, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="form-group mb-3 ">
                      <label>Description</label>
                      <textarea
                        className="form-control "
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

                    {/* Images Section */}
                    <div className="form-group mb-3">
                      <label>Images</label>
                      <div className="d-flex flex-wrap gap-2">
                        {currentItem.images && currentItem.images.length > 0 ? (
                          currentItem.images.map((image, index) => (
                            <div
                              key={index}
                              className="position-relative"
                              style={{ width: "80px", height: "80px" }}
                            >
                              <img
                                src={image}
                                alt={`Image ${index}`}
                                className="img-thumbnail"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <button
                                type="button"
                                className="btn-close position-absolute top-0 end-0 bg-danger"
                                onClick={() => handleImageRemove(image)}
                              ></button>
                            </div>
                          ))
                        ) : (
                          <p>No images uploaded.</p>
                        )}
                      </div>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="form-control mt-2"
                      />
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
                {isSaving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
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