import "./tab.css";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const Tab = ({ tabs = [], onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabConfig = tabs[activeTab];

  // Use React Query to fetch data for the active tab if configured
  const { data, isLoading, isError, error } = useQuery({
    queryKey: activeTabConfig?.queryKey,
    queryFn: activeTabConfig?.queryFn,
    enabled: !!activeTabConfig?.queryKey && !!activeTabConfig?.queryFn,
    staleTime: 350_000, // Cache data for 1 minute
  });



  const handleTabClick = (index) => {
    setActiveTab(index);
    onTabChange?.(index); 
  };

 

  // Memoize the content rendering logic
  const content = useMemo(() => {
    if (!activeTabConfig) return "No content available";

    // Check if tab uses React Query
    if (activeTabConfig.queryKey && activeTabConfig.queryFn) {
      if (isLoading) return <div className="loading-state">Loading...</div>;
      if (isError)
        return <div className="error-state">Error: {error.message}</div>;
      return activeTabConfig.content(data);
    }

    // Regular static content
    return activeTabConfig.content;
  }, [activeTabConfig, data, isLoading, isError, error]);

  // Memoize the tab list rendering
  const tabList = useMemo(() => {
    return (
      <div className="tab-list mb-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
            aria-selected={activeTab === index}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }, [tabs, activeTab]);

  return (
    <div className="pills-tab col-lg-12">
      {tabList}
      <div className="tab-content">{content}</div>
    </div>
  );
};

export default Tab;
