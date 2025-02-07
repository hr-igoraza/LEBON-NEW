import React, { useEffect, useState } from "react";
import "./gallery.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/buttons/Button";
import API from "../../utils/api"; 
import GalleryComponent from "../../components/GalleryComponent/GalleryComponent";

const Gallery = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  return (
    <>
      <NavBar />




      <section className="container my-500px mt-5 p-3 p-lg-5">

        <GalleryComponent/>
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

        <div className="row mt-lg-5">
          <div className="col-12 col-lg-6">
            <div className="text-white bottomline our-story-text">
              <div className="p-2 p-md-5 mt-2 mt-md-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer feugiat urna id leo euismod rhoncus. Aliquam erat
                  volutpat. Nulla id aliquam neque, at dignissim quam. Praesent
                  et lacus accumsan, consequat nisl a, mattis sapien.
                </p>
                <p>
                  Nam sodales ullamcorper aliquet. Phasellus ut pretium libero,
                  vitae imperdiet purus. Sed sed tincidunt velit. Aliquam vitae
                  ipsum molestie, vehicula nisi quis, finibus leo.
                </p>

                {/* <Button
                  className={"button txt-yellow"}
                  divClass={"bt-container mt-5"}
                  stroke={"#f5be32"}
                >
                  Learn More
                </Button> */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <iframe
              width="560"
              height="400"
              src="https://www.youtube.com/embed/L8S89BCjQvo?si=1hiCQXYpk4UqHxb5"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
