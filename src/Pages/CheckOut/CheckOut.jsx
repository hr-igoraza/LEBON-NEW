import React from "react";
import "./checkOut.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

const CheckOut = () => {
  return (
    <>
      <NavBar />

      <section className="container-fluid m-0 p-3 p-lg-5 hero-section checkout ">
        <div className="row pt-lg-5 mt-lg-5">
          <div className="col-md-6">
            <img src="/images/checkoutImg.png" alt="product Image" />
          </div>
          <div className="col-md-6">
            <div className="product-description">
              <h2 className="f-1 f-col-w cinzel fw-700">Choco Ricota</h2>
              <h3 className="f-2 f-col-y">Rs. 1,200.00</h3>
              <p className="f-4 f-col-w mt-5">
                A luxurious combo of red velvet, white and chocolate sponge
                cakes layered with fluffy white cream, red velvet cream,
                chocolate cream and syrup with an elegant garnish of white
                truffle and black truffle.
              </p>
            </div>
            <div className="size-container">
              <div className="size">
                <h3 className="f-2 fw-700 f-col-w ">Size 1</h3>
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

            .messa
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CheckOut;
