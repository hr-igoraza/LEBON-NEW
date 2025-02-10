import React from "react";
import "./home.css";
import "./responsive.css";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../components/buttons/Button";
import ItemCard from "../../components/itemCards/ItemCard";
import Tab from "../../components/tabs/Tab";
import Events from "../../data/diningEvents.jsx";
import { useNavigate } from "react-router-dom";
import ProductTab from "../../data/TabData.jsx";
import GalleryComponent from "../../components/GalleryComponent/GalleryComponent.jsx";
import Footer from "../../components/footer/Footer.jsx";

const Home = () => {
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };

  const navigate = useNavigate();

  const navigatetoGallery = () => {
    navigate("/gallery");
  };

  const navigatetoMenu = () => {
    navigate("/menu");
  };

  return (
    <>
      <NavBar />

      {/* =====Hero Section ======= */}

      <section className="container-fluid m-0 p-3 p-lg-5 hero-section">
        <div className="hero-content">
          <p className="overline f-3 ls-1 ">Best Cakes In Town</p>
          <h1 className="heading f-1">
            Taste the rich flavor of <br /> high quality cakes
          </h1>
          <p className="bottomline f-4 fw-300">
            we bake with love and perfection,
            <br /> bringing you the richest flavors and the finest quality!
            {/* Whether it's a birthday, wedding, or a sweet craving, our cakes make every moment special! */}
          </p>
          <Button
            className={"button "}
            stroke={"#000000"}
            onClick={navigatetoMenu}
            divClass={`bt-container txt-black bt-ct-yellow mt-5`}
          >
            GO TO MENU
          </Button>
        </div>
      </section>

      {/* ======== Todays Special ========= */}

      <section className="container p-lg-5 p-3">
        <div className="todays-special">
          <div className="section-heading mb-lg-4">
            <p className="overline f-5 ls-2">Special Menu</p>
            <h2 className="title">Fresh & Delicious</h2>
            <p className="bottomline">
              Explore our newest arrivals, from mouthwatering cakes to freshly
              <br />
              baked pastries. Indulge in our irresistible treats!
            </p>
          </div>
          <div className="special-items row ">
            <ItemCard
              img={"/images/item-1.png"}
              title={"New Arrivals"}
              description={
                "Discover our latest creations! From seasonal specials to innovative twists on classics, there's always something new to excite your taste buds."
              }
              rating={5}
              destination={"newarrivals"}
            />
            <ItemCard
              img={"/images/item-2.png"}
              title={"Cakes"}
              rating={5}
              description={
                "Indulge in perfection. Our cakes are crafted with premium ingredients, layered with flavor, and designed to celebrate every moment."
              }
              destination={"cakes"}
            />
            <ItemCard
              img={"/images/item-3.png"}
              title={"Pastries"}
              rating={5}
              description={
                "Freshly baked daily. Flaky, buttery, and irresistibly light—our pastries are the ideal treat for any time of day."
              }
              destination={"pastries"}
            />
          </div>
        </div>
      </section>
      {/* =================== */}
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
            <ProductTab category={"Our Specialities"} />
          </div>
        </div>
      </section>

      {/* =========== Dining Events ======== */}
      {/* 
      <section className="container my-5">
        <div className="dining-events">
          <div className="section-heading mb-lg-4">
            <p className="overline f-5 ls-2">Choose your event</p>
            <h2 className="title">Dining Events</h2>
            <p className="bottomline">
              We provide dining event for your special day <br /> with your
              important people
            </p>
          </div>

          <div className="event-specialities-tab ">
            
            <Events category={"Dining Events"} />
          </div>
        </div>
      </section> */}

      {/* ===== Our Story ===== */}

      <section className="dividerImage">
        <img
          className="w-100"
          src="/images/imgDivider-2.png"
          alt="imgDivider-2"
        />
      </section>

      <section className="container my-5" id="aboutUs">
        <div className="our-story  ">
          <div className="section-heading mb-lg-4">
            <p className="overline f-5 ls-2 ">About Us</p>
            <h2 className="title f-2">Our Story</h2>
            <p className="bottomline">
            Crafting a fine dining experience with <br/>exceptional flavors and hospitality.
            </p>
          </div>
          <div className="row mt-lg-5">
            <div className="col-lg-6 col-12 d-flex justify-content-center">
              <img
                className="w-75 "
                src="/images/ourStory.png"
                alt="ourStory"
              />
            </div>
            <div className="col-12 col-lg-6 ">
              <div className="text-white bottomline our-story-text">
                <div className="p-2 p-md-5 mt-md-5">
                  <p>
                    Founded in July 2019, LEBONCAKES has grown to become one of
                    the most loved confectioneries in Alappuzha. We are
                    passionate about crafting high-quality cakes with rich
                    flavors and premium ingredients, making every bite a
                    delight.
                  </p>
                  <p>
                    We offer fast home delivery, ensuring that every cake order
                    reaches you within 1 hour in and around Kochi, Alappuzha,
                    and Kottayam. Whether it's a last-minute celebration or a
                    sweet craving, LEBONCAKES is here to deliver happiness—fresh
                    and on time!
                  </p>

                  {/* <Button
                    className={"button txt-yellow"}
                    divClass={"bt-container mt-5"}
                    stroke={"#f5be32"}
                  >
                    MORE ABOUT US
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======gallery===== */}

      <section className="container">
        <GalleryComponent limit={6} />

        {/* ======================= */}

        <div className="row mt-lg-5 mb-3 mb-lg-5  youtube-vdo">
          <div className="col-12 col-lg-6 ">
            <div className="text-white bottomline our-story-text">
              <div className="">
                <p>
                  Welcome to our cake gallery! At LEBONCAKES, we take pride in
                  crafting visually stunning and irresistibly delicious cakes
                  for every occasion. Whether you're celebrating a birthday,
                  wedding, or simply indulging in a sweet treat, our cakes are
                  designed to leave a lasting impression.
                </p>
                <p>
                  Browse through our face book page Lebon cakes and delicacies
                  and insta pages @Leboncakes to see the varieties....Call or
                  whatsapp anytime at <strong>8593880999</strong> or{" "}
                  <strong>8593882999</strong> for your orders...
                </p>

                <Button
                  className={"button txt-yellow"}
                  divClass={"bt-container mt-5"}
                  stroke={"#f5be32"}
                  onClick={navigatetoGallery}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 my-4 my-lg-0">

            <iframe
              // width="560"
              // height="400"
              src="https://www.youtube.com/embed/L8S89BCjQvo?si=1hiCQXYpk4UqHxb5"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ======== Footer ======== */}
      <Footer />

      {/* ======== */}
    </>
  );
};

export default Home;
