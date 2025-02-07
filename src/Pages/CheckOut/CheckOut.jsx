import React, { useContext, useState, useEffect } from "react";
import "./checkOut.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ImageSlider from "../../components/slider/slider";
import { CartContext } from "../../context/cartContext";
import API from "../../utils/api";

const CheckOut = () => {
  const { cart } = useContext(CartContext);
  const [quantity, setQuantity] = useState({});
  const [size, setSize] = useState({});
  const [message, setMessage] = useState({});
  const [sliderImages, setSliderImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Warn user before page refresh or exit
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave? Your order details will be lost.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
        const images = {};
        for (const item of cart) {
          const response = await API.get(`/api/products/${item.id}`);
          images[item.id] = response.data.images;
        }
        setSliderImages(images);
      } catch (error) {
        console.error("Error fetching product images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [cart]);

  const handleQuantityChange = (action, index) => {
    setQuantity((prev) => ({
      ...prev,
      [index]:
        action === "increase" ? prev[index] + 1 : Math.max(prev[index] - 1, 1),
    }));
  };

  const handleSizeChange = (e, index) => {
    setSize((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  const handleMessageChange = (e, index) => {
    setMessage((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  const handleCheckout = () => {
    const orderDetails = cart
      .map(
        (item, index) =>
          `*Order Details*%0AProduct: ${item.title}%0AQuantity: ${
            quantity[index]
          }${item.category === "Cakes" ? " kg" : ""}%0AMessage: ${message[index]}%0APrice: Rs.${item.price}`
      )
      .join("%0A%0A");

    const adminPhoneNumber = "+918921655023"; 
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${orderDetails}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <NavBar />
      <section className="container-fluid m-0 p-3 p-lg-5 checkout">
        <div className="py-lg-5 checkout-content">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div className="cart-item row mb-5 checkout-slider" key={index}>
                <div className="col-lg-6 px-lg-5 px-2 ">
                  {isLoading ? (
                    <p className="text-center f-3 f-col-w">Loading images...</p>
                  ) : (
                    <ImageSlider images={sliderImages[item.id] || []} />
                  )}
                </div>
                <div className="col-md-6 col-12">
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
                        <p className="f-4 f-col-w">
                          {quantity[index]}{" "}
                          {item.category === "Cakes" ? "kg" : ""}
                        </p>
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

                    {item.isVeg !== undefined && (
                      <div className="veg-nonveg-icon mt-4 d-flex gap-2 align-items-center">
                        <img
                          width={30}
                          height={30}
                          src={
                            item.isVeg
                              ? "/images/checkout/veg.png"
                              : "/images/checkout/non-veg.png"
                          }
                          alt={item.isVeg ? "veg" : "non-veg"}
                        />
                        <p className="f-5 f-col-w m-0">
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </p>
                      </div>
                    )}

                    {item.isDeliverable !== undefined && (
                      <div className="delivery-icon mt-4 d-flex gap-2 align-items-center">
                        {item.isDeliverable ? (
                          <>
                            <img
                              width={30}
                              height={30}
                              src="/images/checkout/delivery.png"
                              alt="delivery available"
                            />
                            <p className="f-5 f-col-w m-0">
                              Delivery Available
                            </p>
                          </>
                        ) : (
                          <p className="f-5 f-col-w m-0">Not Deliverable</p>
                        )}
                      </div>
                    )}

                    {item.category === "Cakes" && (
                      <div className="message mt-4">
                        <p className="f-col-w f-4">Message On Cakes</p>
                        <input
                          className="msg-input p-3 "
                          type="text"
                          value={message[index]}
                          placeholder="Enter your message"
                          onChange={(e) => handleMessageChange(e, index)}
                        />
                      </div>
                    )}

                    <div className="whatsapp mt-lg-5 my-3" onClick={handleCheckout}>
                      <img src="/images/whatsapp.svg" alt="whatsapp" />
                      <p className="whatsapp-txt m-0 text-dark fw-700">
                        ORDER ON WHATSAPP
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
