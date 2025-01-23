import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const GalleryView = ({ setActiveTab }) => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false); 
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
        setTimeout(() => setFeedback(""), 3000);
      } catch (err) {
        setFeedback("Failed to delete item. Please try again.");
        setTimeout(() => setFeedback(""), 3000);
      }
    }
  };

  const handleAddImages = async (e) => {
    e.preventDefault();
    if (newImages.length === 0) {
      setFeedback("Please select images to upload.");
      setTimeout(() => setFeedback(""), 3000);
      return;
    }
    setUploading(true); 
    const formData = new FormData();
    Array.from(newImages).forEach((image) => {
      formData.append("images", image);
    });
    try {
      const response = await API.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGalleryItems((prevItems) => [...prevItems, ...response.data.galleryItems]);
      setFeedback("Images uploaded successfully.");
      setNewImages([]);
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Failed to upload images. Please try again.");
      setTimeout(() => setFeedback(""), 3000);
    } finally {
      setUploading(false); 
    }
  };

  const handleImageChange = (e) => {
    setNewImages(e.target.files);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-white">Gallery Items</h3>
      {loading && <p className="text-white">Loading gallery items...</p>}
      {error && <p className="text-danger">{error}</p>}
      {feedback && (
        <div className={`alert ${feedback.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
          {feedback}
        </div>
      )}
      <form onSubmit={handleAddImages} className="mb-4">
        <div className="form-group">
          <label htmlFor="imageUpload">Upload New Images</label>
          <input type="file" className="form-control" id="imageUpload" multiple onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-2" disabled={uploading}>
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </form>
      {!loading && galleryItems.length === 0 && <p className="text-white">No gallery items available.</p>}
      <div className="row">
        {!loading && galleryItems.length > 0 && galleryItems.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card" style={{ borderColor: "#f5be32" }}>
              <img src={item.image} className="card-img-top" alt="Gallery Item" style={{ height: "200px", objectFit: "cover", width: "100%" }} />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
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
