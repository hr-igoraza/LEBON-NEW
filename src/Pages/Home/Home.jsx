import React from "react";
import "./home.css";
import "./responsive.css";
import NavBar from "../../components/navBar/NavBar";
import Button from "../../components/buttons/Button";
import ItemCard from "../../components/itemCards/ItemCard";
import Tab from "../../components/tabs/Tab";
import { tabs } from "../../data/specialities.jsx";
import { events } from "../../data/diningEvents.jsx";
// import FWNavBar from "../../components/FWNavBar.jsx";
const Home = () => {
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };
  return (
    <>
      {/* <NavBar /> */}

      {/* =====Hero Section ======= */}

      <section className="container-fluid m-0 p-3 p-lg-5 hero-section">
        <div className="hero-content">
          <p className="overline f-3 ls-1 ">Best Cakes In Town</p>
          <h1 className="heading f-1">
            Taste the rich flavor of <br /> high quality cakes
          </h1>
          <p className="bottomline f-4 fw-300">
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
          <div className="section-heading mb-lg-4">
            <p className="overline f-5 ls-2">Special Menu</p>
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
      </section>

      {/* =========== Dining Events ======== */}

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

      <section className="container my-5" id="aboutUs">
        <div className="our-story  ">
          <div className="section-heading mb-lg-4">
            <p className="overline f-5 ls-2 ">About Us</p>
            <h2 className="title f-2">Our Story</h2>
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




      {/* =========vd0 ====== */}
      <section className="container my-5 p-3 p-lg-5">
        <div className="section-heading mb-lg-4">
          {/* <p className="overline f-5 ls-2 "><Gallary></Gallary></p> */}
          <h2 className="title f-2">Gallary</h2>
          {/* <p className="bottomline">
              A journey for making successful luxury restaurant
              <br /> with the best services
            </p> */}
        </div>

        
      {/* <div className="my-5 p-0">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/images/home/carouselImg-1.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/home/carouselImg-2.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/home/carousalImg-3.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="load-more">
          <Button
            className={"button txt-yellow"}
            divClass={"bt-container mt-5"}
            stroke={"#f5be32"}
          >
            Learn More
          </Button>
        </div>
      </div> */}



{/* ================== */}

<div class="row">
  <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Boat on Calm Water"
    />

    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Wintry Mountain Landscape"
    />
  </div>

  <div class="col-lg-4 mb-4 mb-lg-0">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Mountains in the Clouds"
    />

    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Boat on Calm Water"
    />
  </div>

  <div class="col-lg-4 mb-4 mb-lg-0">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Waves at Sea"
    />

    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
      class="w-100 shadow-1-strong rounded mb-4"
      alt="Yosemite National Park"
    />
  </div>
</div>

{/* ======================= */}


        <div className="row mt-lg-5">
          <div className="col-12 col-lg-6 ">
            <div className="text-white bottomline our-story-text">
              <div className="p-2 p-md-5 mt-2  mt-md-0">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer feugiat urna id leo euismod rhoncus. Aliquam erat
                  volutpat. Nulla id aliquam neque, at dignissim quam. Praesent
                  et lacus accumsan, consequat nisl a, mattis sapien.
                </p>
                <p>
                  Nam sodales ullamcorper aliquet. Phasellus ut pretium libero,
                  vitae imperdiet purus. Sed sed tincidunt velit. Aliquam vitae
                  ipsum molestie, vehicula nisi quis, finibus leo.
                </p>

                <Button
                  className={"button txt-yellow"}
                  divClass={"bt-container mt-5"}
                  stroke={"#f5be32"}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12">
            {/* <iframe
              width="100%"
              height={"500px"}
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              frameborder="0"
            ></iframe> */}

<iframe width="560" height="400" src="https://www.youtube.com/embed/L8S89BCjQvo?si=1hiCQXYpk4UqHxb5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </section>

      {/* bootstrap image carousel  */}


      {/* ======== Footer ======== */}

      <section className="container-fluid footer" id="footer">
        <h2 className="footer-title  f-55">
          We ready to have you <br />
          the best dining experiences
        </h2>

        <div className="row contacts">
          <div className="col-lg-6 text-white d-flex gap-2">
            <div className="pt-1">
              <img className="icon " src="/images/location.svg" alt="" />
            </div>
            <p className="f-col-w f-4 dm-sans">
              Village Office, Cherthala Road, North gate of devi temple,
              <br /> Opposte of, Cherthala, Kerala 688524
            </p>
          </div>
          <div className="col-lg-6 text-white d-flex gap-2 ">
            <div className="pt-1">
              <img className="icon " src="/images/phone.svg" alt="" />
            </div>

            <span className="f-col-w f-4 dm-sans ">
              Call Us : <br /> <a href="tel:+1234567890">+85938 80999</a>
            </span>
          </div>
        </div>

        <Button
          className={"button fw-300"}
          divClass={`bt-container txt-black bt-ct-yellow my-5`}
        >
          Reserve A Table
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
