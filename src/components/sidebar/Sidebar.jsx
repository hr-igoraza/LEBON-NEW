import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import "./sidebar.css";

const Sidebar = ({ setActiveSection, setActiveTab }) => {
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
          <button className="nav-link" onClick={() => setActiveSection("menu")}>
            Menu
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => setActiveSection("gallery")}>
            Gallery
          </button>
        </li>
      </ul>
      <div className="logout-btn-container mt-5">
        <button className="btn btn-danger w-75" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
