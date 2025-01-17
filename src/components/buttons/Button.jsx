import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <>
      <div className={props.divClass} onClick={props.onClick}>
        <button className={props.className} >
          {props.children}
        </button>

        <svg
          width="53"
          height="2"
          viewBox="0 0 53 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L52 1"
            stroke={props.stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default Button;
