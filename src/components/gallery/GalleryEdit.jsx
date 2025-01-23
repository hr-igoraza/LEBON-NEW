import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const GalleryView = ({ setActiveTab }) => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(""); 
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await API.get("/gallery");
        setGalleryItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load gallery items.");
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/gallery/${id}`);
        setGalleryItems((prevItems) => prevItems.filter((item) => item._id !== id));
        setFeedback("Item deleted successfully.");
        setTimeout(() => setFeedback(""), 3000); // Clear feedback after 3 seconds
      } catch (err) {
        setFeedback("Failed to delete item. Please try again.");
        setTimeout(() => setFeedback(""), 3000);
      }
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage) {
      setFeedback("Please select an image to upload.");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("image", newImage);

    try {
      const response = await API.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGalleryItems((prevItems) => [...prevItems, response.data.galleryItem]);
      setFeedback("Image uploaded successfully.");
      setNewImage(null);
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Failed to upload image. Please try again.");
      setTimeout(() => setFeedback(""), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Gallery Items</h3>
      {loading && <p>Loading gallery items...</p>}
      {error && <p className="text-danger">{error}</p>}
      {feedback && <p className="text-success">{feedback}</p>}

      <form onSubmit={handleAddImage} className="mb-4">
        <div className="form-group">
          <label htmlFor="imageUpload">Upload New Image</label>
          <input
            type="file"
            className="form-control"
            id="imageUpload"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Upload
        </button>
      </form>

      {!loading && galleryItems.length === 0 && <p>No gallery items available.</p>}

      <div className="row">
        {!loading && galleryItems.length > 0 && galleryItems.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card" style={{ borderColor: "#f5be32" }}>
              <img
                src={`uploads/${item.image}`}
                className="card-img-top"
                alt="Gallery Item"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Item: {item.image}</h5>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#f5be32", color: "#fff" }}
                    onClick={() => setActiveTab("edit")}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
