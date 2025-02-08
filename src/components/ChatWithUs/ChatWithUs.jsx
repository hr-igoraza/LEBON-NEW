import React from "react";
import "./chatWithUs.css";
import chat from "/images/footer/ChatWithUs.svg";


const ChatWithUs = () => {
  return (
    <>
      <div className="footer-whatsapp">

        <a
          href="https://wa.me/+918921655023?text=Hi,%20I%20want%20to%20know%20more%20about%20Lebon"
          target="_blank"
          rel="noopener noreferrer"
        >
      
          <img  src={chat} alt="Chat With Us" />
        
          
        </a>
      </div>
    </>
  );
};

export default ChatWithUs;
