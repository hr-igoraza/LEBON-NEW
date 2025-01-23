import React, { useState } from "react";
import "./adminPanel.css";
import Sidebar from "../../components/sidebar/Sidebar";
import ViewItem from "../../components/Dashboard/viewItem";
import AddItem from "../../components/Dashboard/addItem";
import EditItem from "../../components/Dashboard/editItem";
import GalleryView from "../../components/Gallery/GalleryView"; 
import GalleryEdit from "../../components/Gallery/GalleryEdit"; 

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("menu");
  const [activeTab, setActiveTab] = useState("view");

  const renderContent = () => {
    if (activeSection === "menu") {
      switch (activeTab) {
        case "view":
          return <ViewItem setActiveTab={setActiveTab} />; // Pass setActiveTab to ViewItem
        case "add":
          return <AddItem />;
        case "edit":
          return <EditItem />;
        default:
          return <ViewItem setActiveTab={setActiveTab} />;
      }
    } else if (activeSection === "gallery") {
      switch (activeTab) {
        case "view":
          return <GalleryView />;
        case "edit":
          return <GalleryEdit />;
        default:
          return <GalleryView />;
      }
    }
  };

  return (
    <div className="admin-panel d-flex">
      <Sidebar 
        setActiveSection={setActiveSection}
        setActiveTab={setActiveTab} 
      />
      <div className="content-container flex-grow-1 p-4">
        <div className="tabs mb-4">
          {activeSection === "menu" && (
            <>
              <button
                className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
                onClick={() => setActiveTab("view")}
              >
                View Items
              </button>
              <button
                className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
                onClick={() => setActiveTab("add")}
              >
                Add Item
              </button>
            </>
          )}
          {activeSection === "gallery" && (
            <>
              <button
                className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
                onClick={() => setActiveTab("view")}
              >
                View Gallery
              </button>
              {/* <button
                className={`tab-btn ${activeTab === "edit" ? "active" : ""}`}
                onClick={() => setActiveTab("edit")}
              >
                Edit Gallery
              </button> */}
            </>
          )}
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
