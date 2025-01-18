import React, { useState } from "react";
import "./checkOut.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ImageSlider from "../../components/slider/slider";
import axios from "axios";

const CheckOut = () => {
  // State management for product quantity, size, and message
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("1");
  const [message, setMessage] = useState("");
  const [pickup, setPickup] = useState(false);  // To handle pickup option

  // Function to handle quantity change
  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to handle size selection
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  // Function to handle message input
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle pickup checkbox
  const handlePickupChange = () => {
    setPickup(!pickup);
  };

  // Function to create a WhatsApp URL with order details
  const handleCheckout = () => {
    const orderDetails = `*Order Details*%0AProduct: Choco Ricota%0ASize: ${size}%0AQuantity: ${quantity}%0AMessage: ${message}%0APickup: ${pickup ? "Yes" : "No"}`;

    // Replace this with the admin's WhatsApp number
    const adminPhoneNumber = "9061536976"; // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${orderDetails}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };
  
  return (
    <>
      <NavBar />

      <section className="container-fluid m-0 p-3 p-lg-5 checkout">
        <div className="checkout-content py-lg-5">
          <div className="row">
            <div className="col-md-6 p-5">
              <ImageSlider />
            </div>
            <div className="col-md-6 p-4 pt-lg-5">
              <div className="product-description">
                <h2 className="heading f-1">Choco Ricota</h2>
                <div className="price-count">
                  <h3 className="f-2 f-col-y">Rs. 1,200.00</h3>
                  <div className="count">
                    <img
                      width={45}
                      height={45}
                      src="/images/checkout/reduce.png"
                      alt="reduce"
                      onClick={() => handleQuantityChange("decrease")}
                    />
                    <p className="f-4 f-col-w">{quantity}</p>
                    <img
                      width={45}
                      height={45}
                      src="/images/checkout/add.png"
                      alt="add"
                      onClick={() => handleQuantityChange("increase")}
                    />
                  </div>
                </div>
                <p className="f-4 f-col-w mt-5">
                  A luxurious combo of red velvet, white and chocolate sponge cakes layered with fluffy white cream, red velvet cream, chocolate cream, and syrup with an elegant garnish of white truffle and black truffle.
                </p>
              </div>
              <div className="size-container">
                <div className="size">
                  <select
                    className="form-select"
                    aria-label="Select Size"
                    value={size}
                    onChange={handleSizeChange}
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
                  className="msg-input"
                  type="text"
                  value={message}
                  onChange={handleMessageChange}
                />
              </div>

              <div className="whatsapp mt-5" onClick={handleCheckout} >
                <img src="/images/whatsapp.svg" alt="whatsapp" />
                <p className="whatsapp-txt m-0 text-dark fw-700">
                  CHAT ON WHATSAPP ORDER
                </p>
              </div>

              <div className="pickup mt-4">
                <input
                  type="checkbox"
                  checked={pickup}
                  onChange={handlePickupChange}
                />
                <div className="pickup-text">
                  <p className="f-col-w m-0">Pickup available at I have selected my pickup store</p>
                  <p className="f-col-w m-0">Usually ready in 24 hours</p>
                </div>
              </div>

              {/* Checkout Button */}
              {/* <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout (WhatsApp)
              </button> */}
            </div>
          </div>
        </div>
      </section>

      <section className="related-products my-lg-5 py-lg-5">
        <h2 className="cinzel f-3 f-col-y fw-700">Related Products</h2>
        <div className="related-images mt-5">
          {/* Add related products here */}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CheckOut;
