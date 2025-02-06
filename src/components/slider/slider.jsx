import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./slider.css";

const Magnifier = ({ src, zoomLevel = 4 }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const magnifierSize = 200;

  // const handleMouseMove = (e) => {
  //   const { left, top, width, height } = e.target.getBoundingClientRect();
  //   const x = e.pageX - left;
  //   const y = e.pageY - top;
  //   const xPercent = (x / width) * 150;
  //   const yPercent = (y / height) * 150;
    
  //   setLensPosition({ x: e.pageX, y: e.pageY });
  //   setBackgroundPosition(`${xPercent}% ${yPercent}%`);
  // };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    
    const x = e.clientX - left;
    const y = e.clientY - top;
  
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
  
    setLensPosition({ 
      x: e.clientX - magnifierSize / 2 + 10, 
      y: e.clientY - magnifierSize / 2 + 10 
    });
  
    setBackgroundPosition(`${xPercent}% ${yPercent}%`);
  };
  

  return (
    <div
      className="magnifier-container"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      style={{ position: "relative", display: "inline-block" }}
    >
      <img src={src} alt="Magnified" className="img-fluid w-100" />
      {showMagnifier && (
        <div
          className="magnifier-lens"
          style={{
            position: "absolute",
            top: lensPosition.y - magnifierSize / 2,
            left: lensPosition.x - magnifierSize / 2,
            width: magnifierSize,
            height: magnifierSize,
            borderRadius: "50%",
            border: "2px solid #ccc",
            backgroundImage: `url(${src})`,
            backgroundSize: `${zoomLevel * 100}%`,
            backgroundPosition,
            pointerEvents: "none",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        ></div>
      )}
    </div>
  );
};

const ImageSlider = ({ images }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="container m-0 p-0 mt-4">
      <div className="slider-container mb-3">
        <Slider ref={sliderRef} {...settings}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} className="text-center slider-image">
                <Magnifier src={image} />
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
              style={{ width: "80px", height: "75px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
