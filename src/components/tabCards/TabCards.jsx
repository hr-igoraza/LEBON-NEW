import React from "react";
import "./tabCards.css";
import Button from "../buttons/Button"
import { useNavigate } from "react-router-dom";

const TabCards = (props) => {

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/checkout");
  }
  return (
    <>
      <div className="tab-card">
        <div className="cardImg">
          <img src={props.img} alt={props.title} />
        </div>
        <div className="tab-item-details">
          <h3 className="card-item-name f-3">
            {props.title ? `${props.title}` : "Title"}
          </h3>
          <p className="bottomline">
            {props.description
              ? `${props.description}`
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus."}
          </p>

          <p className="title f-2 cinzel">{props.price ? `${props.price}` : "500"}</p>
        
          <Button
          className={"button txt-yellow "}
          divClass={"bt-container"}
          stroke={"#f5be32"}
          onClick ={handleNavigate}
        >
          ORDER NOW
        </Button>
        
        </div>
    
      </div>
    </>
  );
};

export default TabCards;
