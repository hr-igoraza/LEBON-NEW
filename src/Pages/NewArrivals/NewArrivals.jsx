import React from "react";
import "./newArrivals.css";
import { useEffect } from "react";
import Tab from "../../components/tabs/Tab";
import { tabs } from "../../data/specialities.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Button from "../../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import ProductTab from "../../data/TabData.jsx";

const NewArrivals = () => {

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

    <NavBar/>
      <section className="dividerImage">
        <img
          className="w-100"
          src="/images/newArrivals/newArrivals.png"
          alt="imgDivider-1"
        />
      </section>

      {/* ======= Our Specialities ======= */}

      <section className="container p-3 p-lg-5">
        <div className="our-specialities mb-lg-4">
          <div className="section-heading ">
            <p className="overline  f-4 ls-2">Quality Food For You</p>
            <h2 className="title">New Arrivals</h2>
            <p className="bottomline">
            Discover our latest creations! From seasonal specials to innovative twists on classics,<br/> there's always something new to excite your taste buds.
            </p>
          </div>

          <div className="specialities-tab col-12">
            {/* <Tab tabs={tabs} onTabChange={handleTabChange} /> */}
            <ProductTab category="New Arrivals" /> 

          </div>
        </div>

        {/* <div className="load-more">
          <Button
            className={"button fw-300"}
            divClass={`bt-container txt-black bt-ct-yellow px-4`}
            onClick={navigatetoGallery}
          >
            Load More
          </Button>
        </div> */}
      </section>

      <Footer />
    </>
  );
};

export default NewArrivals;
