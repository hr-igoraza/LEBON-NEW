import React from "react";
import "./home.css";
import "./responsive.css";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../components/buttons/Button";
import ItemCard from "../../components/itemCards/ItemCard";
import Tab from "../../components/tabs/Tab";
import { tabs } from "../../data/specialities.jsx";
import { events } from "../../data/diningEvents.jsx";
const Home = () => {
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };
  return (
    <>
      <NavBar />

      {/* =====Hero Section ======= */}

      <section className="container-fluid m-0 p-3 p-lg-0 hero-section">
        <div className="hero-content">
          <p className="overline f-3 letter-space ">Best Cakes In Town</p>
          <h1 className="heading f-1">
            Taste The Rich Flavor Of <br /> High Quality Cakes
          </h1>
          <p className="bottomline">
            We only use the five star quality for <br /> our menu, come and get
            the richness in <br />
            every food we serve.
          </p>
          <Button
            className={"button "}
            stroke={"#000000"}
            divClass={`bt-container txt-black bt-ct-yellow mt-5`}
          >
            GO TO MENU
          </Button>
        </div>
      </section>

      {/* ======== Todays Special ========= */}

      <section className="container p-lg-5 p-3">
        <div className="todays-special">
          <div className="section-heading">
            <p className="overline f-4 ls-2">Special Menu</p>
            <h2 className="title">Today's Special</h2>
            <p className="bottomline">
              Special menu oftenly comes different everyday,
              <br /> this is our special food for today
            </p>
          </div>
          <div className="special-items row ">
            <ItemCard
              img={"/images/item-1.png"}
              title={"Tuna Sushi"}
              rating={5}
            />
            <ItemCard
              img={"/images/item-2.png"}
              title={"Salmon Sushi"}
              rating={4}
            />
            <ItemCard
              img={"/images/item-3.png"}
              title={"Just Sushi"}
              rating={5}
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
        <div className="our-specialities">
          <div className="section-heading ">
            <p className="overline  f-4 ls-2">Quality Food For You</p>
            <h2 className="title">Our Specialities</h2>
            <p className="bottomline">
              Authentic food from our restaurant served with high quality
              ingredients
            </p>
          </div>

          <div className="specialities-tab col-12">
            <Tab tabs={tabs} onTabChange={handleTabChange} />
          </div>
        </div>
      </section>

      {/* =========== Dining Events ======== */}

      <section className="container my-5">
        <div className="dining-events">
          <div className="section-heading">
            <p className="overline f-4 ls-2">Choose your event</p>
            <h2 className="title">Dining Events</h2>
            <p className="bottomline">
              We provide dining event for your special day with your important
              people
            </p>
          </div>

          <div className="event-specialities-tab ">
            <Tab tabs={events} onTabChange={handleTabChange} />
          </div>
        </div>
      </section>

      {/* ===== Our Story ===== */}

      <section className="dividerImage">
        <img
          className="w-100"
          src="/images/imgDivider-2.png"
          alt="imgDivider-2"
        />
      </section>

      <section className="container my-5">
        <div className="our-story  ">
          <div className="section-heading">
            <p className="overline f-4 ls-2 ">About Us</p>
            <h2 className="title">Our Story</h2>
            <p className="bottomline">
              A journey for making successful luxury restaurant
              <br /> with the best services
            </p>
          </div>
          <div className="row mt-lg-5">
            <div className="col-lg-6 col-12">
              <img
                className="w-100"
                src="/images/ourStory.png"
                alt="ourStory"
              />
            </div>
            <div className="col-12 col-lg-6 ">
              <div className="text-white bottomline our-story-text">
                <div className="p-2 p-md-5 mt-2  mt-md-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer feugiat urna id leo euismod rhoncus. Aliquam erat
                    volutpat. Nulla id aliquam neque, at dignissim quam.
                    Praesent et lacus accumsan, consequat nisl a, mattis sapien.
                  </p>
                  <p>
                    Nam sodales ullamcorper aliquet. Phasellus ut pretium
                    libero, vitae imperdiet purus. Sed sed tincidunt velit.
                    Aliquam vitae ipsum molestie, vehicula nisi quis, finibus
                    leo.
                  </p>

                  <Button
                    className={"button txt-yellow"}
                    divClass={"bt-container mt-5"}
                    stroke={"#f5be32"}
                  >
                    MORE ABOUT US
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== Footer ======== */}

      <section className="container-fluid footer">
        <h2 className="footer-title">
          We ready to have you <br />
          the best dining experiences
        </h2>

        <div className="row contacts">
          <div className="col-lg-6 text-white d-flex gap-2">
            <img className="icon" src="/images/location.svg" alt="" />
            <p>
              Village Office, Cherthala Road, North gate of devi temple,
              <br /> Opposte of,Cherthala, Kerala 688524
            </p>
          </div>
          <div className="col-lg-6 text-white d-flex  ">
            <img className="icon" src="/images/phone.svg" alt="" />

            <span>
              Call Us : <a href="tel:+1234567890">+85938 80999</a>
            </span>
          </div>
        </div>

        <Button
          className={"button"}
          divClass={`bt-container txt-black bt-ct-yellow my-5`}
        >
          RESERVE A TABLE
        </Button>

        <div className="footer-bottom">
          <div className="logo">
            <img className="w-25" src="/images/lebonLogo.png" alt="logo" />
          </div>
          <div className="links">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
