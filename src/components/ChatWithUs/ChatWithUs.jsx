import React from "react";
import "./chatWithUs.css";
import chat from "/images/footer/chatbox.svg";
import whatsapp from "/images/footer/whatsappIcon.svg";
import { adminPhoneNumber } from "../../utils/api";

const ChatWithUs = () => {
  return (
    <>
      <div className="footer-whatsapp">
        <a
        className="chat-with-us"
          href={`https://wa.me/${adminPhoneNumber}?text=Hi,%20I%20want%20to%20know%20more%20about%20Lebon`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={chat} alt="Chat With Us" />
        </a>

        <a
        className="chat-with-us-icon"
          href={`https://wa.me/${adminPhoneNumber}?text=Hi,%20I%20want%20to%20know%20more%20about%20Lebon`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsapp} alt="Chat With Us" />
        </a>

      </div>

      {/* ==== */}


      {/* ==== */}
    </>
  );
};

export default ChatWithUs;
