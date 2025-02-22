import React from "react";
import "./itemCard.css";
import { Rate } from "antd";
import { useNavigate } from "react-router";
import Button from "../buttons/Button";

const ItemCard = (props) => {
  const navigate = useNavigate();

  const onNameClick = (destination) => {
    navigate(`/${destination}`);
  };

  return (
    <>
      <div className="card col-10 col-md-4">
        {/* <div className="item-card-img"> */}
        <img src={props.img} className="card-img-top w-100" alt="images" />
        {/* </div> */}
        <div className="card-body item-details px-4 ">
          <h5 className="card-title f-3 item-name">{props.title}</h5>
          <p className="card-text bottomline ">
            {props.description
              ? `${props.description}`
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus."}
          </p>

          <Rate
            className="my-3"
            style={{}}
            disabled
            defaultValue={props.rating}
          />

          <Button
            className={"button txt-yellow "}
            divClass={"bt-container mt-3 mb-5"}
            stroke={"#f5be32"}
            onClick={() => onNameClick(props.destination)}
          >
            View More
          </Button>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
