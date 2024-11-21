import React, { useState } from "react";
import config from "/src/chatbot/config";
import MessageParser from "/src/chatbot/MessageParser";
import ActionProvider from "/src/chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css"; 
import "./ShipmentTracker.css";



const ShipmentTracker = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div className="shipment-tracker">
      {/* Left Sidebar */}
      <div className="left-sidebar">
        <h1 className="main-heading">Shipment Tracker & Live Updates</h1>
        <div className="chat-container">
          <img
            src="/images/chatbot.png"
            alt="Chatbot Icon"
            className="chatbot-icon"
            onClick={toggleChat}
          />
          {/* Toggle Chatbox visibility based on isChatOpen */}
          {isChatOpen && (
            <div className="chat-box open">
              <div className="chat-header">
                <h3>Alexa</h3>
                <button className="close-chat" onClick={toggleChat}>
                  ✖
                </button>
              </div>
              {/* Embed Chatbot */}
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="right-content">
        {/* Map Section */}
        <div className="map-section">
          <img
            src="/images/ShipmentTracker.png"
            alt="Shipment Tracker Map"
            className="map-image"
          />
        </div>

        {/* Alert Section */}
        <div className="alert-box">
          <h2>Safety Alerts</h2>
          <p>
            ⚠️ A severe storm is expected to impact the Indian Ocean region,
            bringing heavy rain, strong winds, and rough seas.
          </p>
        </div>

        {/* Time Left Section */}
        <div className="time-left">
          <h2>Time Left</h2>
          <p className="time">12:39:90 HRS</p>
        </div>

        {/* Notifications Section */}
        <div className="update-box">
          <h2>Notifications</h2>
          <p>
            ⚠️ Shipment #12345 has been rerouted to avoid the storm, expected
            to cross Port Kalinga next.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracker;

