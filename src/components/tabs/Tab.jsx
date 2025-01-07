    import "./tab.css";
import React, { useState } from "react";
import "./tab.css"; 

const PillsTab = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="pills-tab">
      <div className="tab-list">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab]?.content || "No content available"}
      </div>
    </div>
  );
};

export default PillsTab;
