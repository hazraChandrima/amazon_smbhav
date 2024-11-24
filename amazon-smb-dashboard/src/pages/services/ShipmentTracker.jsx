import React, { useState } from "react";
import config from "/src/chatbot/config";
import MessageParser from "/src/chatbot/MessageParser";
import ActionProvider from "/src/chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "/src/chatbot/chatbot.css";
import "./ShipmentTracker.css";

// Fix default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
  shadowSize: [41, 41],
});

const ShipmentTracker = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false); // New state for visibility
  const [trackingNumber, setTrackingNumber] = useState(""); // State to hold input value

  const shipmentCoordinates = [19.0760, 72.8777]; // Example coordinates
  const currentLocation = "Mumbai, India";

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const handleGoClick = () => {
    if (trackingNumber.trim() !== "") {
      setIsContentVisible(true);
    } else {
      alert("Please enter a valid tracking number.");
    }
  };

  return (
    <div className="shipment-tracker">
      <div className="left-sidebar">
        <h1 className="main-heading">Shipment Tracker & Live Updates</h1>

        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="tracking-input"
          />
          <button className="go-button" onClick={handleGoClick}>
            Go!
          </button>
        </div>

        {/* Chatbot */}
        <div className="chat-container">
          <img
            src="/images/chatbot.png"
            alt="Chatbot Icon"
            className="chatbot-icon"
            onClick={toggleChat}
          />
          {isChatOpen && (
            <div className="chat-box open">
              <div className="chat-header">
                <h3>Alexa</h3>
                <button className="close-chat" onClick={toggleChat}>
                  ✖
                </button>
              </div>
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
        {isContentVisible && (
          <>
            {/* Map Section */}
            <div className="map-section" style={{ height: "300px", width: "100%" }}>
              <MapContainer
                center={shipmentCoordinates}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={shipmentCoordinates}>
                  <Popup>{currentLocation}</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Alert Section */}
            <div className="info-box">
              <h3>Safety Alerts</h3>
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
            <div className="alert-box">
              <h2>Shipment Information</h2>
              <p>
              <h3>Shipment Details</h3>
              <ul>
                <li>Tracking ID: 1123</li>
                <li>Status: In Transit</li>
                <li>ETA: June 15, 2023 at 02:30 PM</li>
                <li>Carrier: FreshExpress Logistics</li>
                <li>Current Location: Dubai, UAE</li>
                <li>Origin: Delhi, India</li>
                <li>Destination: London, UK</li>
              </ul>
              </p>
            </div>
            {/* Notifications Section */}
            <div className="update-box">
              <h2>Notifications</h2>
              <p>
                ⚠️ Shipment #12345 has been rerouted to avoid the storm, expected
                to cross Port Kalinga next.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShipmentTracker;
