import "./App.css";
import HeroSection from "./sections/heroSection/HeroSection";
import NavBar from "./components/navBar/NavBar";
import TodaysSpecial from "./sections/todays-special/TodaysSpecial";
import OurSpecialities from "./sections/ourSpecialities/OurSpecialities";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <TodaysSpecial/>
      <div className="imgDividerSection my-6">
      {/* <img className="my-6" src="/images/imgDivider.png" alt="imageDivider" /> */}

      </div>
      <OurSpecialities/>  
    </>
  );
}

export default App;
