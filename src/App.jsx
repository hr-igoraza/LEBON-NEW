import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router";
import NewArrivals from "./Pages/NewArrivals/NewArrivals";
import Cakes from "./Pages/Cakes/Cakes";
import Pastries from "./Pages/Pastries/Pastries";
import Menu from "./Pages/Menu/Menu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newarrivals" element={<NewArrivals />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/pastries" element={<Pastries />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

export default App;
