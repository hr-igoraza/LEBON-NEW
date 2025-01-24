import React from "react";
import "./newArrivals.css";

import Tab from "../../components/tabs/Tab";
import { tabs } from "../../data/specialities.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Button from "../../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import NewArrivalTab from "../../data/NewArrivalsData.jsx";

const NewArrivals = () => {
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };

  const navigate = useNavigate();

  const navigatetoGallery = () => {
    navigate("/gallery");
  };
  return (
    <>

    <NavBar/>
      <section className="dividerImage">
        <img
          className="w-100"
          src="/images/imgDivider-1.png"
          alt="imgDivider-1"
        />
      </section>

      {/* ======= Our Specialities ======== */}

      <section className="container p-3 p-lg-5">
        <div className="our-specialities mb-lg-4">
          <div className="section-heading ">
            <p className="overline  f-4 ls-2">Quality Food For You</p>
            <h2 className="title">Our Specialities</h2>
            <p className="bottomline">
              Authentic food from our restaurant served <br /> with high quality
              ingredients
            </p>
          </div>

          <div className="specialities-tab col-12">
            {/* <Tab tabs={tabs} onTabChange={handleTabChange} /> */}

            <NewArrivalTab/>
          </div>
        </div>

        <div className="load-more">
          <Button
            className={"button fw-300"}
            divClass={`bt-container txt-black bt-ct-yellow px-4`}
            onClick={navigatetoGallery}
          >
            Load More
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NewArrivals;
