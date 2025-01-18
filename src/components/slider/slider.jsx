import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import "./slider.css";

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
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: `Image ${image.id}`,
                    isFluidWidth: true,
                    src: image.src,
                  },
                  largeImage: {
                    src: image.src,  
                    width: 1200,      
                    height: 1800,     
                  },
                  lensStyle: { 
                    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
                    borderRadius: '50%', 
                  }, 
                  enlargedImageContainerDimensions: {
                    width: '200%',
                    height: '100%',
                  },
                  enlargedImagePosition: 'over', 
                  lensFadeIn: true,  
                  lensFadeOut: true,  
                  magnifyLensGlassSize: 10, 
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="row gap-2">
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
