import React from "react";
import "./checkOut.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

const CheckOut = () => {
  return (
    <>
      <NavBar />

      <section className="container-fluid m-0 p-3 p-lg-5 checkout ">
        <div className="checkout-content">
        <div className="row ">
          <div className="col-md-6 ">
            <img src="/images/checkoutImg.png" alt="product Image" />
          </div>
          <div className="col-md-6 pt-lg-5">
            <div className="product-description">
              {/* <h2 className="f-1 f-col-w cinzel fw-700">Choco Ricota</h2> */}
              <h2 className="heading f-1">Choco Ricota</h2>
              <div className="price-count">
              <h3 className="f-2 f-col-y">Rs. 1,200.00</h3>
              <div className="count">
              <img width={45} height={45} src="/images/checkout/reduce.png" alt="reduce" />
              <p className="f-4 f-col-w">1</p>
              <img width={45} height={45}  src="/images/checkout/add.png" alt="add" />
              </div>
              </div>
              <p className="f-4 f-col-w mt-5">
                A luxurious combo of red velvet, white and chocolate sponge
                cakes layered with fluffy white cream, red velvet cream,
                chocolate cream and syrup with an elegant garnish of white
                truffle and black truffle.
              </p>
            </div>
            <div className="size-container">
              <div className="size">
                <h3 className="f-3 fw-700 f-col-w  ">Size 1</h3>
                <img
                  width={25}
                  height={15}
                  className=""
                  src="./images/VectorDown.png"
                  alt="down"
                />
              </div>
              <img src="/images/line.svg" alt="svg" />
            </div>

            <div className="message mt-4">
              <p className="f-col-w f-4">Message On Cakes</p>
              <input className="msg-input" type="text" />
            </div>

            <div className="whatsapp mt-5">
              <img src="/images/whatsapp.svg" alt="whatsapp" />
              <p className="whatsapp-txt m-0 ">CHAT ON WHATSAPP ORDER</p>
            </div>

<div className="pickup mt-4">
  <input type="checkbox" />
  <div className="pickup-text">
  <p className="f-col-w m-0">Pickup available at I have selected my pickup store</p>
  <p className="f-col-w m-0">Usually ready in 24 hours</p>
  </div>
</div>

          </div>
        </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CheckOut;
