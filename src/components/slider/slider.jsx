import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./slider.css";

const ProductZoom = ({ images = [] }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [mainImage, setMainImage] = useState("");
  const imageRef = useRef(null);

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundSize: "300%",
      backgroundPosition: `${x}% ${y}%`,
      display: "block",
      top:-10,
      left:600,
      // top: `${e.clientY - 10}px`,
      // left: `${e.clientX - 10}px`,
      width: "600px",
      height: "600px",
      border: "1px solid #ccc",
      borderRadius: "2px",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none"  });
  };

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="slider-img">
          <div className="position-relative p-2">
            <div
              className="zoom-lens position-absolute main-image"
              style={zoomStyle}
            ></div>
            {mainImage && (
              <img
                ref={imageRef}
                className="img-fluid w-100 object-fit-cover"
                src={mainImage}
                alt="Product"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: "zoom-in" }}
              />
            )}
          </div>
          <div className="d-flex mt-3 gap-2 ps-2">
            {images.map((src, index) => (
              <div className="thumbnail-container">
                <img
                  key={index}
                  className="thumbnail-img"
                  src={src}
                  alt="Thumbnail"
                  onClick={() => handleThumbnailClick(src)}
                //   style={{ cursor: "pointer", width: "60px", height: "60px" }}
                />
              </div>    
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductZoom;
