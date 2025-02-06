import React from "react";
import "./footer.css";
import Button from "../buttons/Button";

const NewFooter = () => {
  return (
    <>
      <section className="container-fluid lebon-footer p-3 p-lg-5" id="footer">
        <h2 className="footer-title  f-55">
          We ready to have you <br />
          the best dining experiences
        </h2>

        <div className="row w-100 mt-lg-5 mt-2">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase f-col-w">Heading</h5>

            <ul className="list-unstyled mb-0 ">
              <li>
                <a className="text-body " href="#!">
                  Quote Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae
                </a>
              </li>
            </ul>

            <section class="mb-4">
              <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating btn-lg text-body m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i class="fab fa-facebook-f"></i>
              </a>

              <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating btn-lg text-body m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i class="fab fa-twitter"></i>
              </a>

              <a
                data-mdb-ripple-init
                class="btn btn-link btn-floating btn-lg text-body m-1"
                href="#!"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i class="fab fa-instagram"></i>
              </a>
            </section>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase f-col-w">Contact Us</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-body" href="#!">
                  email@gmail.com
                </p>
              </li>
              <li>
                <p className="text-body" href="#!">
                  +910000045
                </p>
              </li>
              <li>
                <p className="text-body" href="#!">
                  Village Office, Cherthala Road, North gate of devi temple,
                  Opposte of, Cherthala, Kerala, 688524
                </p>
              </li>
              <li>
                <p className="text-body" href="#!">
                  Timing : 9.00 to 10.00pm
                </p>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase f-col-w">Customer Service</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a className="text-body" href="#!">
                  About Lebon
                </a>
              </li>
              <li>
                <a className="text-body" href="#!">
                  Menu
                </a>
              </li>
              <li>
                <a className="text-body" href="#!">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="text-body" href="#!">
                  Gallery
                </a>
              </li>
              <li></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 outlets">
            <h5 className="text-uppercase f-col-w"> Outlets</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <p className="text-body">
                  Lebon cakes and delicacies
                  <br /> North gate of Karthyayini Devi temple
                  <br /> Cherthala,
                  <a href="tel:+918593880999">+918593880999</a>
                </p>
              </li>
              <li>
                <p className="text-body">
                  Opposite to Moham hospital
                  <br /> Eramallore,
                  <a href="tel:+918593882999">+918593882999</a>
                </p>
              </li>
              <li>
                <p className="text-body">
                  Opposite to Joy Alukkas
                  <br /> Near iron bridge
                  <br /> Alappuzha,
                  <a href="tel:+918593883999">+918593883999</a>
                </p>
              </li>
              <li>
                <p className="text-body">
                  Fourth cross road,
                  <br /> Panambilly nagar, <br />
                  <a href="tel:+918593882999">+919562576114</a>,
                  <a href="tel:+919847502453">+919847502453</a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* <Button
          className={"button fw-300"}
          divClass={`bt-container txt-black bt-ct-yellow my-5`}
        >
          Reserve A Table
        </Button> */}

        <div className="d-flex gap-2 align-center delivery-container">
          <img
            width={50}
            src="/images/deliveryAvailable.png"
            alt="delivery available"
          />
          <p className="delivery-available">Delivery Available</p>
        </div>

        <div className="footer-bottom my-4">
          <div className="logo">
            <img width={100} src="/images/lebonLogo.png" alt="logo" />
          </div>
          {/* <div className="links">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default NewFooter;
