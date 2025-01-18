import React from "react";
import "./gallery.css";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import Button from "../../components/buttons/Button";

const Gallery = () => {
  return (
    <>
      <NavBar />

      <section className="container my-500px mt-5 p-3 p-lg-5">
        <div className="section-heading mb-lg-4 mt-5">
          {/* <p className="overline f-5 ls-2 "><Gallary></Gallary></p> */}
          <h2 className="title f-2 ">Gallary</h2>
          {/* <p className="bottomline">
              A journey for making successful luxury restaurant
              <br /> with the best services
            </p> */}
        </div>

        {/* ================== */}

        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Wintry Mountain Landscape"
            />
          </div>

          <div className="col-lg-4 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Mountains in the Clouds"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />
          </div>

          <div className="col-lg-4 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Waves at Sea"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Yosemite National Park"
            />
          </div>
          
        </div>

        {/* rows of 3 images in a row  with same height */}

        
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Wintry Mountain Landscape"
            />
          </div>

          <div className="col-lg-4 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Mountains in the Clouds"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Boat on Calm Water"
            />
          </div>

          <div className="col-lg-4 mb-4 mb-lg-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
              className="w-100 shadow-1-strong rounded mb-4"
              alt="Waves at Sea"
            />

            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
              className="w-100 shadow-1-strong rounded mb-4"
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

            <iframe
              width="560"
              height="400"
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

      <Footer />
    </>
  );
};

export default Gallery;
