import React, { useState } from "react";
import API from "../../utils/api"; 

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [isDeliverable, setIsDeliverable] = useState(false); 
  const [isVeg, setIsVeg] = useState(false); 
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    // Form validation
    if (!itemName || !description || !price || !category || images.length === 0) {
      setMessage("Please fill in all fields and upload at least one image.");
      setMessageType("error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("isDeliverable", isDeliverable); 
    formData.append("isVeg", isVeg); 

  
    Array.from(images).forEach((image) => {
      formData.append("itemImages", image);
    });


    console.log(formData);

    try {
      const response = await API.post("/menu/addtomenu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Item added successfully!");
      setMessageType("success");
      setLoading(false);
      setItemName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setIsDeliverable(false); 
      setIsVeg(false); 
      setImages([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding item.");
      setMessageType("error");
      setLoading(false);
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  return (
    <div className="container">
      <div className="text-white">
        <h2>Add Item</h2>
        <p>Here you can add a new item to the menu.</p>

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

        <div className="row">
          <div className=" colo-8 col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  className="form-control bg-dark text-white"
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
                  className="form-control bg-dark text-white"
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
                  className="form-control bg-dark text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  id="category"
                  className="form-control bg-dark text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="todays special">Today's Special</option>
                  <option value="new arrivals">New Arrivals</option>
                  <option value="cakes">Cakes</option>
                  <option value="menu">Menu</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="isDeliverable" className="form-label">
                  Deliverable
                </label>
                <select
                  id="isDeliverable"
                  className="form-control bg-dark text-white"
                  value={isDeliverable}
                  onChange={(e) => setIsDeliverable(e.target.value === "true")}
                  required
                >
                  <option value="">Select Deliverable</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="isVeg" className="form-label">
                  Veg/Non-Veg
                </label>
                <select
                  id="isVeg"
                  className="form-control bg-dark text-white"
                  value={isVeg}
                  onChange={(e) => setIsVeg(e.target.value === "true")}
                  required
                >
                  <option value="">Select Veg/Non-Veg</option>
                  <option value="true">Veg</option>
                  <option value="false">Non-Veg</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="itemImages" className="form-label mb-2 ">
                  Item Images
                </label>
                <input
                  type="file"
                  id="itemImages"
                  className="form-control bg-dark text-white"
                  multiple
                  onChange={handleImageChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
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
        </div>
      </div>
    </div>
  );
};

export default AddItem;
