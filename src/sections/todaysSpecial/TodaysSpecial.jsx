import React from "react";
import "./todaysSpecial.css";
import ItemCard from "../../components/cards/ItemCard";

const TodaysSpecial = () => {
  return (
    <>
      <section className="todays-special">
        <div className="section-heading">
          <p className="overline font-sm">Special Menu</p>
          <h2 className="title">Today's Special</h2>
          <p className="bottomline w-50 my-5">
            Special menu oftenly comes different everyday, this is our special
            food for today
          </p>
        </div>
        <div className="special-items">
          <ItemCard
            img={"/images/item-1.png"}
            title={"Tuna Sushi"}
            rating={5}
          />
          <ItemCard
            img={"/images/item-2.png"}
            title={"Salmon Sushi"}
            rating={4}
          />
          <ItemCard
            img={"/images/item-3.png"}
            title={"Just Sushi"}
            rating={5}
          />
        </div>
      </section>
    </>
  );
};

export default TodaysSpecial;
