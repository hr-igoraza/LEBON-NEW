import React from "react";
import "./menu.css";

import Tab from "../../components/tabs/Tab.jsx";
import { tabs } from "../../data/specialities.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Button from "../../components/buttons/Button.jsx";

const Menu = () => {
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };
  return (
    <>
      <section className="dividerImage">
        <img
          className="w-100"
          src="/images/menu/menuImg.png"
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
            <Tab tabs={tabs} onTabChange={handleTabChange} />
          </div>
        </div>
        <div className="load-more">
      <Button
          className={"button fw-300"}
          divClass={`bt-container txt-black bt-ct-yellow px-4`}
        >
          Load More
        </Button>
        </div>
      </section>

     

      
      <Footer />
    </>
  );
};

export default Menu;
