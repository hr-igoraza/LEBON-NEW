import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const ViewItem = ({ setActiveTab }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); 
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

    fetchItems();
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

  const handleEdit = (id) => {
    setActiveTab("edit");
    navigate(`/edit-item/${id}`);
  };

  return (
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
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>₹{item.price}</td>
                  <td>{item.category.name}</td>
                  <td>{item.isDeliverable ? "Yes" : "No"}</td>
                  <td>{item.isVeg ? "Veg" : "Non-Veg"}</td>
                  <td>
                    {/* <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item._id)}>
                      Edit
                    </button> */}
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(item._id)}>
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
  );
};

export default ViewItem;
