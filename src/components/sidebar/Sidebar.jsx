import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import "./sidebar.css";

const Sidebar = ({ onTabChange }) => {
  const { logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sidebar px-2">
      <h2 className="text-center text-white py-3">Admin Panel</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="nav-link" onClick={() => onTabChange("view")}>
            View Items
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => onTabChange("add")}>
            Add Item
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => onTabChange("edit")}>
            Edit Item
          </button>
        </li>
      </ul>
      <div className="logout-btn-container mt-5 ">
        <button className="btn btn-danger w-75" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
