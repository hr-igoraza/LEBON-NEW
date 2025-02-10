import React from "react";
import "./footer.css";
import Button from "../buttons/Button";
import DeliveryAvailableBtn from "../DeliveryButton/DeliveryAvailableBtn";
import ChatWithUs from "../ChatWithUs/ChatWithUs";
import { NavLink, useNavigate } from "react-router";

const Footer = () => {

  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate("/");
    setTimeout(() => {
      const aboutSection = document.querySelector("#aboutUs");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };
  return (
    <>
      <section
        className="container-fluid lebon-footer p-3 p-lg-5 position-relative"
        id="footer"
      >
        <h2 className="footer-title  f-2">
        We're ready to serve you  <br />
          the best dining experiences
        </h2>
        <div className="row w-100 mt-lg-5 mt-2">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 px-lg-2">
            <h5 className="text-uppercase f-col-w ">LeBon</h5>

            <ul className="list-unstyled mb-0 ">
              <li>
                <p className="text-body ">
                LeBon, established in July 2019, is a one-stop destination for a wide variety of cravings. With multiple locations, it's the perfect spot to enjoy a diverse and delicious menu.
                </p>
              </li>
            </ul>

            <section class="">
              <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating  text-body m-1"
                href="https://www.facebook.com/p/Lebon-Cakes-Delicacies-100064955673544/"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i class="fab fa-facebook-f"></i>
              </a>

              <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating  text-body m-1"
                href="#"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i class="fab fa-twitter"></i>
              </a>

              <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating  text-body m-1"
                href="https://www.instagram.com/leboncakes/"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </section>
          </div>


          <div className="col-lg-2 col-md-6 mb-4 mb-md-0 px-lg-2">
            <h5 className="text-uppercase f-col-w">Quick Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a className="text-body " onClick={handleAboutClick}>
                  About Lebon
                </a>
              </li>
              <li>
                <NavLink className="text-body" to={"/menu"}>
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink className="text-body" to={"/gallery"}>
                  Gallery
                </NavLink>
              </li>
              <li></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 px-lg-3 footer-contact">
            <h5 className="text-uppercase f-col-w">Contact Us</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-body">email@gmail.com</p>
              </li>
              <li>
                <p className="text-body"> +918593880999</p>
              </li>
              <li>
                <p className="text-body">
                  Village Office, Cherthala Road, North gate of devi temple,
                  Opposte of, Cherthala, Kerala, 688524
                </p>
              </li>
              <li>
                <p className="text-body">Timing : 9.00 to 10.00pm</p>
              </li>
            </ul>
          </div>


          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 outlets px-lg-2">
            <h5 className="text-uppercase f-col-w"> Outlets</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-body">
                   Lebon Cakes and Delicacies,
                   North gate of Karthyayini
                   Devi temple, Cherthala,
                  <a href="tel:+918593880999"> +918593880999</a>
                </p>
              </li>
              <li>
                <p className="text-body">
                  Opposite to Moham hospital, Eramallore,
                  <a href="tel:+918593882999"> +918593882999</a>
                </p>
              </li>
              <li>
                <p className="text-body">
                  Opposite to Joy Alukkas
                   Near Iron Bridge
                   Alappuzha,
                  <a href="tel:+918593883999"> +918593883999</a>
                </p>
              </li>
              <li>
                <p className="text-body">
                  Fourth cross road, Panambilly nagar, <br />
                  <a href="tel:+918593882999"> +919562576114</a>,
                  <a href="tel:+919847502453"> +919847502453</a>
                </p>
              </li>
            </ul>
          </div>

         
        </div>
        {/* <DeliveryAvailableBtn/> */}
        {/* <div className="footer-bottom my-4">
          <div className="logo">
            <img width={100} src="/images/lebonLogo.png" alt="logo" />
          </div>
        </div> */}
        <ChatWithUs />
        <hr />
        <div className="text-white f-6 text-align-left w-100">
          © Copyright &amp; All Rights Reserved 2024 - <a className="f-6" href="https://www.igoraza.com/">IGORAZA PRIVATE LIMITED</a>. 
        </div>
      </section>
    </>
  );
};

export default Footer;
