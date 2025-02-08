import "./cakes.css";
import Button from "../../components/buttons/Button.jsx";
import Tab from "../../components/tabs/Tab";
import Footer from "../../components/footer/Footer.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar.jsx";
import ProductTab from "../../data/TabData.jsx";

const Cakes = () => {

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
        <img className="w-100" src="/images/cakes/cakesImg.png" alt="cakes" />
      </section>

      {/* ======= Our Specialities ======== */}

      <section className="container p-3 p-lg-5">
        <div className="our-specialities mb-lg-4">
          <div className="section-heading ">
            <p className="overline  f-4 ls-2">Quality Food For You</p>
            <h2 className="title">Cakes</h2>
            <p className="bottomline">
              Authentic food from our restaurant served <br /> with high quality
              ingredients
            </p>
          </div>

          <div className="specialities-tab col-12">
            {/* <Tab tabs={CakesTab} onTabChange={handleTabChange} /> */}
            {/* <CakesTab/> */}
            <ProductTab category="Cakes" />
          </div>
        </div>

        {/* <div className="load-more">
          <Button
            className={"button fw-300"}
            divClass={`bt-container txt-black bt-ct-yellow my-5`}
            onClick={navigatetoGallery}

          >
            Load More
          </Button>
        </div> */}
      </section>

      {/* ===========foote ====== */}

      <Footer />
    </>
  );
};

export default Cakes;
