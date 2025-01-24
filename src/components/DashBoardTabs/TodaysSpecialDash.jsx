import React, { useState, useEffect } from "react";
import { Table, Container, Spinner, Button } from "react-bootstrap";
import API from "../../utils/api";

const TodaysSpecial = () => {
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchSpecialItems = async () => {
      try {
        const response = await API.get("/todays-special");
        setSpecialItems(response.data);
      } catch (err) {
        console.error("Error fetching Today's Special items:", err);
        setError("Error fetching Today's Special items.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/todays-special/${id}`);
        setSpecialItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        setFeedback("Item deleted successfully.");
        setTimeout(() => setFeedback(""), 3000);
      } catch (err) {
        console.error("Error deleting item:", err);
        setFeedback("Failed to delete item. Please try again.");
        setTimeout(() => setFeedback(""), 3000);
      }
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <Container>
        <h1 className="text-center mb-4" style={{ color: "#f5be32" }}>
          Today's Special
        </h1>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <>
            {feedback && <p className="text-success text-center">{feedback}</p>}
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Images</th>
                  <th>Veg</th>
                  <th>Deliverable</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {specialItems.length > 0 ? (
                  specialItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.itemName}</td>
                      <td>{item.description}</td>
                      <td>₹{item.price}</td>
                      <td>
                        {item.itemImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={item.itemName || "Special item image"}
                            style={{ width: "100px", marginRight: "5px" }}
                          />
                        ))}
                      </td>
                      <td>{item.isVeg ? "Yes" : "No"}</td>
                      <td>{item.isDeliverable ? "Yes" : "No"}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
};

export default TodaysSpecial;
