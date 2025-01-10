
import React from "react";
import { NavLink } from "react-router";
import Button from "../buttons/Button";
import "./navbar.css"

const NavBar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg px-lg-4 px-2 ">
        <div class="container-fluid p-2 px-lg-5">
          <a class="navbar-brand" href="#">
            <img width={100} src="/images/lebonLogo.png" alt="" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span class="navbar-toggler-icon"></span> */}
<img className="navbar-toggler-icon" src="/images/menu.png" alt="menu" />
            
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Find Dining
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
            <div class="d-flex">
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
