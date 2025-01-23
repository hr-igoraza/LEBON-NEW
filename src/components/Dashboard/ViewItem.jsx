import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const ViewItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get("/menu"); 
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load items.");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/menu/${id}`);
        setItems(items.filter((item) => item._id !== id));
      } catch (err) {
        alert("Failed to delete item.");
      }
    }
  };

  return (
    <div className="text-white">
      <h2>View Items</h2>
      <p>Here you can view all the items.</p>

      {loading && <p>Loading items...</p>}
      {error && <p className="text-danger">{error}</p>} 

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`/uploads/${item.itemImages[0]}`} 
                      alt={item.itemName}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/edit-item/${item._id}`)} 
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
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
  );
};

export default ViewItem;
