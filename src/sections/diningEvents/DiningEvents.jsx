import React from "react";
import "./diningEvents.css";
import PillsTab from "../../components/tabs/Tab.jsx";
import TabCards from "../../components/tabCards/TabCards.jsx";
import { tabs } from "../../utils/diningEvents.jsx";

const DiningEvents = () => {
  const handleTabChange = (index) => {
    console.log(`Active Tab Index: ${index}`);
  };

  return (
    <>
      <div className="section-heading">
        <p className="overline font-sm">Choose your event</p>
        <h2 className="title">Dining Events</h2>
        <p className="bottomline w-50 my-5">
          We provide dining event for your special day with your important
          people
        </p>
      </div>

      <div className="specialities-tab my-6">
        <PillsTab tabs={tabs} onTabChange={handleTabChange} />
      </div>
    </>
  );
};

export default DiningEvents;
