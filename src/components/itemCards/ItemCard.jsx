import React from "react";
import "./itemCard.css";
import { Rate } from "antd";
import Button from "../buttons/Button";

const ItemCard = (props) => {
  return (
    <>


      <div className="card col-10 col-md-4">
        <img src={props.img} className="card-img-top" alt="images" />
        <div className="card-body item-details">
          <h5 className="card-title item-name">{props.title}</h5>
          <p className="card-text bottomline">
            {props.description
              ? `${props.description}`
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus."}
          </p>

          <Rate className="my-3" style={{}} defaultValue={props.rating} />

          <Button
            className={"button txt-yellow "}
            divClass={"bt-container"}
            stroke={"#f5be32"}
          >
            ORDER NOW
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
