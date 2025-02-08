import React from "react";

import "./deliveryAvailableBtn.css";
import { adminPhoneNumber } from "../../utils/api";

const DeliveryAvailableBtn = () => {
  const onDeliveryClick = () => {
    const message = "Can I know more about delivery options?";
    // const encodedMessage = encodeURIComponent(message);
    // const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodedMessage}`;
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div
        className="d-flex gap-2 align-center delivery-container"
        onClick={onDeliveryClick}
      >
        <img
          width={50}
          src="/images/deliveryAvailable.png"
          alt="delivery available"
        />
        <p className="delivery-available">Delivery Available</p>
      </div>
    </>
  );
};

export default DeliveryAvailableBtn;
