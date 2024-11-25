import React, { useState, useEffect } from "react";
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
  const [remainingTime, setRemainingTime] = useState(12 * 60 * 60); // Time in seconds (12 hours)

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

  // Countdown timer logic
  useEffect(() => {
    let timer;
    if (isContentVisible && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on unmount or visibility change
  }, [isContentVisible, remainingTime]);

  // Format the remaining time as HH:MM:SS
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

        {/* Shipment Information Section */}
        {isContentVisible && (
          <div className="shipment-info">
            <h2>Shipment Details</h2>
            <div>
              <span>Tracking ID:</span>
              <span>{trackingNumber}</span>
            </div>
            <div>
              <span>Status:</span>
              <span>In Transit</span>
            </div>
            <div>
              <span>ETA:</span>
              <span>{new Date(Date.now() + remainingTime * 1000).toLocaleString()}</span>
            </div>
            <div>
              <span>Carrier:</span>
              <span>DHL Express</span>
            </div>
            <div>
              <span>Current Location:</span>
              <span>Chennai, India</span>
            </div>
            <div>
              <span>Origin:</span>
              <span>Mumbai, India</span>
            </div>
            <div>
              <span>Destination:</span>
              <span>Dubai, UAE</span>
            </div>
          </div>
        )}

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
            <div className="map-section">
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

            {/* Bottom Row */}
            <div className="info-box">
              <h3>Safety Alerts</h3>
              <p>
                ⚠️ A severe storm is expected to impact the Indian Ocean region,
                bringing heavy rain, strong winds, and rough seas.
              </p>
            </div>

            <div className="time-left">
              <h2>Time Left</h2>
              <p className="time-rem">{formatTime(remainingTime)} HRS</p>
            </div>

            <div className="update-box">
              <h2>Notifications</h2>
              <p>
                ⚠️ Shipment #{trackingNumber} has been rerouted to avoid the storm, expected to
                cross Port Kalinga next.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShipmentTracker;
