import React from "react";
import "./fwNav.css";

const DropDown = () => {
  return (
    <>

<div className="dropdown">
  <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Cakes
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item active" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
    <li><hr className="dropdown-divider"/></li>
    <li><a className="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
    </>
  );
};

export default DropDown;
