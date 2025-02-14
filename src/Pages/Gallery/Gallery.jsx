import React, { useEffect, useState } from "react";
import "./gallery.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/buttons/Button";
import API from "../../utils/api";
import GalleryComponent from "../../components/GalleryComponent/GalleryComponent";
import VideoGalleryModal from "../../components/videoComponent/video";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar />

      <section className="container my-500px mt-5 p-3 p-lg-5">
        <GalleryComponent />
        {/* <div className="section-heading mb-lg-4 mt-5">
          <h2 className="title f-2">Gallery</h2>
        </div>

        {loading && <p>Loading images...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={index} onClick={() => openModal(index)}>
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
        )} */}

        <div className="row mt-lg-5 mb-3 mb-lg-5  youtube-vdo align-items-center">
          <div className="col-12 col-lg-6 ">
            <div className="text-white bottomline our-story-text">
              <div className="">
                <p>
                  Welcome to our cake gallery! At LEBONCAKES, we take pride in
                  crafting visually stunning and irresistibly delicious cakes
                  for every occasion. Whether you're celebrating a birthday,
                  wedding, or simply indulging in a sweet treat, our cakes are
                  designed to leave a lasting impression.
                </p>
                <p>
                  Browse through our face book page Lebon cakes and delicacies
                  and insta pages @Leboncakes to see the varieties....Call or
                  whatsapp anytime at <strong>8593880999</strong> or{" "}
                  <strong>8593882999</strong> for your orders...
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-4 my-lg-0">
            <VideoGalleryModal />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
