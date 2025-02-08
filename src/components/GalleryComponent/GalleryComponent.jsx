import React, { useEffect, useState } from "react";
import "./galleryComp.css";
import API from "../../utils/api";

const GalleryComponent = ({ limit }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await API.get("api/gallery");
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load images.");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Apply limit condition
  const displayedImages = limit ? images.slice(0, limit) : images;

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <>
      <section className="container my-5 p-3 p-lg-5">
        <div className="section-heading mb-lg-4">
          <h2 className="title f-2">Gallery</h2>
        </div>

        {loading && <p>Loading images...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="gallery-grid">
          {displayedImages.map((image, index) => (
            <div
              className="gallery-item"
              key={index}
              onClick={() => openModal(index)}
            >
              <img
                src={image.image}
                className="gallery-image"
                alt={`Gallery Image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {modalIsOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              <button className="prev-button" onClick={prevImage}>
                &#10094;
              </button>
              {images[currentImageIndex] && (
                <img
                  src={images[currentImageIndex].image}
                  className="modal-image"
                  alt={`Gallery Image ${currentImageIndex + 1}`}
                />
              )}
              <button className="next-button" onClick={nextImage}>
                &#10095;
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default GalleryComponent;
