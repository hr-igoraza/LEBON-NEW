import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    isVeg: false,
    isDeliverable: false,
    category: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await API.get(`/api/products/${id}`);
        setItem(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          isVeg: response.data.isVeg,
          isDeliverable: response.data.isDeliverable,
          category: response.data.category,
        });
      } catch (err) {
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/products/${id}`, formData);
      navigate("/view-items");
    } catch (err) {
      setError("Failed to update item. Please try again.");
    }
  };

  return (
    <div className="text-white">
      <h2>Edit Item</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="isVeg"
              checked={formData.isVeg}
              onChange={handleChange}
            />
            Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="isDeliverable"
              checked={formData.isDeliverable}
              onChange={handleChange}
            />
            Deliverable
          </label>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditItem;
