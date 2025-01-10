import React from "react";
import PillsTab from "../../components/tabs/Tab";
import TabCards from "../../components/tabCards/TabCards";
import { tabs } from "../../utils/specialities";

const OurSpecialities = () => {
  const handleTabChange = (index) => {
    console.log(`Active Tab Index: ${index}`);
  };

  return (
    <>
      <section className="our-specialites">
        <div className="section-heading">
          <p className="overline">Quality Food For You</p>
          <h2 className="title">Our Specialities</h2>
          <p className="bottomline w-50 my-3">
            Authentic food from our restaurant served with high quality
            ingredients
          </p>
        </div>

        <div className="specialities-tab my-6">
          <PillsTab tabs={tabs} onTabChange={handleTabChange} />
        </div>
      </section>
    </>
  );
};

export default OurSpecialities;
