import React from "react";
import "./tabCards.css";

const TabCards = (props) => {
  return (
    <>
      <div className="tab-card">
        <div className="cardImg">
          <img src={props.img} alt={props.title} />
        </div>
        <div className="tab-item-details">
          <h3 className="card-item-name fs-3">
            {props.title ? `${props.title}` : "Title"}
          </h3>
          <p className="bottomline">
            {props.description
              ? `${props.description}`
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus."}
          </p>

          <p className="title fs-2">{props.price ? `${props.price}` : "500"}</p>
        </div>
      </div>  
    </>
  );
};

export default TabCards;
