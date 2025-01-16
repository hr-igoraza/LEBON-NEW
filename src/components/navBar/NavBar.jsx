import React from "react";
import { NavLink } from "react-router";
import Button from "../buttons/Button";
import "./navbar.css";
import DropDown from "../FWNavBar";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg px-lg-4 px-2 ">
        <div className="container-fluid p-2 px-lg-5">
          <a className="navbar-brand" href="#">
            <img width={100} src="/images/lebonLogo.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <img
              className="navbar-toggler-icon"
              src="/images/menu.png"
              alt="menu"
            />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  New Arrivals
                </NavLink>
              </li>

              {/* ========= */}
              {/* <select class="form-select" aria-label="Default select example">
                <option className="ib"selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select> */}

              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Cakes
                </NavLink>
              </li>

              {/* <DropDown /> */}

              {/* ============ */}

              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Pastries
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Menu
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <Button
                className="button txt-yellow"
                divClass="nav-item bt-container"
                stroke="#f5be32"
              >
                RESERVATION
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
