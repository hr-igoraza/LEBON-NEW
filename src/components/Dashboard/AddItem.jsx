// AddItem.jsx
import React, { useState } from "react";
import API from "../../utils/api"; // Use your axios instance

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages
    setMessageType("");

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("price", price);

    Array.from(images).forEach((image) => {
      formData.append("itemImages", image);
    });

    try {
      const response = await API.post("/menu/addtomenu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Item added successfully!");
      setMessageType("success");
      setLoading(false);
      // Reset form fields
      setItemName("");
      setDescription("");
      setPrice("");
      setImages([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding item.");
      setMessageType("error");
      setLoading(false);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImages(e.target.files); // 'e.target.files' is a FileList
  };

  return (
    <div className="text-white">
      <h2>Add Item</h2>
      <p>Here you can add a new item to the menu.</p>

      {/* Feedback messages */}
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            className="form-control"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="itemImages" className="form-label">
            Item Images
          </label>
          <input
            type="file"
            id="itemImages"
            className="form-control"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Adding Item...
            </>
          ) : (
            "Add Item"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddItem;
