import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./imageSlider.css"; 
const ImageSlider = () => {
  const sliderRef = useRef(null);
  const images = [
    { id: 0, src: "/images/checkout/check-1.png" },
    { id: 1, src: "/images/checkout/check-2.png" },
    { id: 2, src: "/images/checkout/check-3.png" },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
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
    <div className="container mt-4">
      <div className="slider-container mb-3">
        <Slider ref={sliderRef} {...settings}>
          {images.map((image) => (
            <div key={image.id} className="text-center">
              <img
                src={image.src}
                alt={`Cake Slide ${image.id}`}
                className="img-fluid "
                style={{ 
                    // maxHeight: "500px"
                 }}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="row gap-2 ">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="col-auto m-0 thumbnail-container"
            onClick={() => goToSlide(index)}
            style={{ cursor: "pointer" }}
            
          >
            <img
              src={image.src}
              alt={`Thumbnail ${image.id}`}
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