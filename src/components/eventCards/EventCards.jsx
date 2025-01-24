import React from "react";
import "./eventCards.css";

const EventCards = (props) => {
  return (
    <>
      <div className="event-tab-card">
        <div className="row">
        <div className="col-lg-4 col-md-12 ">
            <div className="event-tab-item-details">
              <div className="d-flex">
                <p className="event-title title">
                  {props.price ? `${props.price}` : "500"}
                </p>
                <div className="event-details pt-4 px-3">
                  <h3 className="item-name">
                    {props.title ? `${props.title}` : "Title"}
                  </h3>
                  <p className="event-description">
                    {props.description
                      ? `${props.description}`
                      : ` Bottle of Champagne
                    <br />
                    Fine Sushi Tower For 2+ <br />
                    Dessert`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 image">
            <div className="event-cardImg"
            style={{backgroundImage: `url(${props.img})`}}
            >
              <img src={props.img} alt={props.title} />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default EventCards;
