import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./imageSlider.css";
import "./slider.css";
import API from "../../utils/api";

const ImageSlider = ({ images }) => {
  // const [images, setImages] = useState([]);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: images.length > 1,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await API.get(`/api/products/${id}`);
  //       console.log("API Response:", response.data);
  //       if (response.data && response.data.images) {
  //         setImages(response.data.images); // Update state with images from API
  //       }
  //     } catch (error) {
  //       console.error("Error fetching product images:", error);
  //     }
  //   };

  //   if (id) {
  //     fetchImages();
  //   }
  // }, [id]);

  return (
    <div className="container mt-4">
      <div className="slider-container mb-3">
        <Slider ref={sliderRef} {...settings}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="text-center slider-image">
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="img-fluid w-100 "
                />
              </div>
            ))
          ) : (
            <p className="text-center">Loading images...</p>
          )}
        </Slider>
      </div>

      <div className="row gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="col-auto m-0 thumbnail-container"
            onClick={() => goToSlide(index)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail-img"
              style={{
                width: "80px",
                height: "75px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
