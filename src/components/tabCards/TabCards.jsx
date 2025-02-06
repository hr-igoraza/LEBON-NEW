import React from "react";
import "./tabCards.css";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { useContext, useState } from "react";

const TabCards = (props) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  async function handleOrderNow() {
    setIsLoading(true);
    try {
      if (!props.title || !props.price || !props.img) {
        console.error("Missing required product information.");
        return;
      }

      addToCart({
        id: props.id,
        title: props.title,
        description: props.description,
        price: props.price,
        img: props.img,
        isVeg: props.isVeg,
        isDeliverable: props.isDeliverable,
        category: props.category
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="tab-card ">
        <div className="cardImg "
        
        style={{backgroundImage: `url(${props.img})`}}
        >
          {/* <img src={props.img} alt={props.title} /> */}
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

          <p className="title f-2 cinzel">
            {props.price ? `${props.price}` : "60"}
          </p>

          <Button
            className={"button txt-yellow "}
            divClass={"bt-container"}
            stroke={"#f5be32"}
            onClick={handleOrderNow}
          >
            ORDER NOW
          </Button>
        </div>
      </div>
    </>
  );
};

export default TabCards;
