import React, { useContext, useState, useEffect } from "react";
import "./checkOut.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ImageSlider from "../../components/slider/slider";
import { CartContext } from "../../context/cartContext";
import axios from "axios";

const CheckOut = () => {
  const { cart } = useContext(CartContext); 
  const [quantity, setQuantity] = useState({}); 
  const [size, setSize] = useState({}); 
  const [message, setMessage] = useState({}); 
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const initialQuantities = {};
    const initialSizes = {};
    const initialMessages = {};
    cart.forEach((item, index) => {
      initialQuantities[index] = item.quantity || 1;
      initialSizes[index] = item.size || "1";
      initialMessages[index] = item.message || "";
    });
    setQuantity(initialQuantities);
    setSize(initialSizes);
    setMessage(initialMessages);
  }, [cart]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/menu/${id}`);
        setSliderImages(response.data.images);
        // console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Function to handle quantity change
  const handleQuantityChange = (action, index) => {
    setQuantity((prev) => ({
      ...prev,
      [index]:
        action === "increase" ? prev[index] + 1 : Math.max(prev[index] - 1, 1),
    }));
  };

  // Function to handle size selection
  const handleSizeChange = (e, index) => {
    setSize((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  // Function to handle message input
  const handleMessageChange = (e, index) => {
    setMessage((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  // WhatsApp checkout
  const handleCheckout = () => {
    const orderDetails = cart
      .map(
        (item, index) =>
          `*Order Details*%0AProduct: ${item.title}%0ASize: ${size[index]}%0AQuantity: ${quantity[index]}%0AMessage: ${message[index]}%0APrice: Rs.${item.price}`
      )
      .join("%0A%0A");

    const adminPhoneNumber = "997987549374"; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${orderDetails}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <NavBar />
      <section className="container-fluid m-0 p-3 p-lg-5 checkout">
        <div className="checkout-content py-lg-5">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item row mb-5" key={index}>
                {/* <div className="col-md-6">
                  <ImageSlider  images={sliderImages}/>
                </div> */}

                <div className="col-md-6 p-5">
                  {isLoading ? (
                    <p className="text-center f-3 f-col-w">Loading images...</p>
                  ) : (
                    <ImageSlider images={sliderImages} />
                  )}
                </div>
                {/* ===slider */}
                <div className="col-md-6">
                  <div className="product-description">
                    <h2 className="heading f-1">{item.title}</h2>
                    <div className="price-count">
                      <h3 className="f-2 f-col-y">Rs. {item.price}</h3>
                      <div className="count">
                        <img
                          width={45}
                          height={45}
                          src="/images/checkout/reduce.png"
                          alt="reduce"
                          onClick={() =>
                            handleQuantityChange("decrease", index)
                          }
                        />
                        <p className="f-4 f-col-w">{quantity[index]}</p>
                        <img
                          width={45}
                          height={45}
                          src="/images/checkout/add.png"
                          alt="add"
                          onClick={() =>
                            handleQuantityChange("increase", index)
                          }
                        />
                      </div>
                    </div>

                    <p className="f-4 f-col-w mt-4">{item.description}</p>

                    <div className="non-veg-icon mt-4 ">
                      <img
                        width={30}
                        height={30}
                        src="/images/checkout/non-veg.png"
                        alt="non-veg"
                      />
                      <p className="f-5 f-col-w">Non-Veg</p>
                    </div>

                    <div className="size-container mt-4">
                      <div className="size">
                        <select
                          className="form-select"
                          aria-label="Select Size"
                          value={size[index]}
                          onChange={(e) => handleSizeChange(e, index)}
                        >
                          <option value="1">Size 1</option>
                          <option value="2">Size 2</option>
                          <option value="3">Size 3</option>
                        </select>
                        <img
                          width={25}
                          height={15}
                          src="/images/VectorDown.png"
                          alt="down"
                        />
                      </div>
                      <img src="/images/line.svg" alt="svg" />
                    </div>

                    <div className="message mt-4">
                      <p className="f-col-w f-4">Message On Cakes</p>
                      <input
                        className="msg-input p-3"
                        type="text"
                        value={message[index]}
                        placeholder="Enter your message"
                        onChange={(e) => handleMessageChange(e, index)}
                      />
                    </div>

                    <div className="whatsapp mt-5" onClick={handleCheckout}>
                      <img src="/images/whatsapp.svg" alt="whatsapp" />
                      <p className="whatsapp-txt m-0 text-dark fw-700">
                        CHAT ON WHATSAPP ORDER
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckOut;
