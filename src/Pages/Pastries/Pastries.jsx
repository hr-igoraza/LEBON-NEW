import React from "react";
import "./pastries.css";

// import Tab from "../../components/tabs/Tab";
import Tab from "../../components/tabs/Tab.jsx";
import { tabs } from "../../data/specialities.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Button from "../../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import ProductTab from "../../data/TabData.jsx";


const Pastries = () => {
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
          src="/images/pastries/pastriesImg.png"
          alt="imgDivider-1"
        />
      </section>

      {/* ======= Our Specialities ======== */}

      <section className="container p-3 p-lg-5">
        <div className="our-specialities mb-lg-4">
          <div className="section-heading ">
            <p className="overline  f-4 ls-2">Quality Food For You</p>
            <h2 className="title">Pastries</h2>
            <p className="bottomline">
              Authentic food from our restaurant served <br /> with high quality
              ingredients
            </p>
          </div>

          <div className="specialities-tab col-12">
            {/* <Tab tabs={tabs} onTabChange={handleTabChange} /> */}
            <ProductTab category="Pastries" />

          </div>
        </div>

        <div className="load-more">
        <Button
          className={"button fw-300"}
          divClass={`bt-container txt-black bt-ct-yellow  mt-2 px-4`}
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
export default Pastries;
