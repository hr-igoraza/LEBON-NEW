import React, { useState } from "react";
import "./adminPanel.css"
import Sidebar from "../../components/sidebar/Sidebar";
import ViewItem from "../../components/Dashboard/viewItem";
import AddItem from "../../components/Dashboard/addItem";
import EditItem from "../../components/Dashboard/editItem";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("view");

  const renderContent = () => {
    switch (activeTab) {
      case "view":
        return <ViewItem />;
      case "add":
        return <AddItem />;
      case "edit":
        return <EditItem />;
      default:
        return <ViewItem />;
    }
  };

  return (
    <div className="admin-panel d-flex">
      <Sidebar onTabChange={setActiveTab} />
      <div className="content-container flex-grow-1 p-4">{renderContent()}</div>
    </div>
  );
};

export default AdminPanel;
