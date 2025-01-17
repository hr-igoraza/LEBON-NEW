import "./cakes.css";
import Button from "../../components/buttons/Button.jsx";
import Tab from "../../components/tabs/Tab";
import { cakes } from "../../data/cakes.jsx";

const Cakes = () => {
  const handleTabChange = (index) => {
    // console.log(`Active Tab Index: ${index}`);
  };
  return (
    <>
      <section className="dividerImage">
        <img className="w-100" src="/images/cakes/cakesImg.png" alt="cakes" />
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
            <Tab tabs={cakes} onTabChange={handleTabChange} />
          </div>
        </div>
      </section>

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

export default Cakes;
