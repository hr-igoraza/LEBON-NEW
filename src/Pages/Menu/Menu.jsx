import React from "react";
import "./menu.css";
import { useEffect } from "react";
import Tab from "../../components/tabs/Tab.jsx";
import { tabs } from "../../data/specialities.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Button from "../../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import ProductTab from "../../data/TabData.jsx";

const Menu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };

  const navigate = useNavigate();

  const navigatetoGallery = () => {
    navigate("/gallery");
  };
  return (
    <>
      <NavBar />
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
            <h2 className="title">Menu</h2>
            <p className="bottomline">
              Savor a curated selection of delicious dishes <br />
              crafted with the finest ingredients.
            </p>
          </div>

          <div className="specialities-tab col-12">
            {/* <Tab tabs={tabs} onTabChange={handleTabChange} /> */}

            <ProductTab category="Menu" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Menu;
