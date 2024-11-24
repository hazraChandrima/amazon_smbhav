import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBusinessTime } from "react-icons/fa";
import { FaTruckFast, FaMoneyBills } from "react-icons/fa6";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdFactory } from "react-icons/md";
import { RiSkullFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "./Dashboard.css";


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

const Dashboard = () => {
  return (
    <IconContext.Provider
      value={{ color: "black", size: "2.5em", className: "global-class-name" }}
    >
      <div className="app">
        <div className="main-content">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="welcome-message">
              <FaUser style={{ fontSize: "0.5em", marginBottom: "10px" }} />
              <span className="welcome-text">
                <br />
                Welcome User!
              </span>
            </div>

            <div className="user-id">USER ID: 20034567</div>

            <div className="menu-container">
              <ul className="menu">
                <li className="menu-item highlighted">Dashboard</li>
                <li className="menu-item">Shipment</li>
                <li className="menu-item">Analysis</li>
                <li className="menu-item">
                  <Link to="/services/dashboard/history" className="history">History</Link>
                </li>
                <li className="menu-item">Notifications</li>
              </ul>
            </div>

            <div className="recent-trips-container">
              <div className="recent-trips">
                <h3>Recent Trips</h3>
                <p className="highlighted-trip">Delivery to Port A</p>
                <p>Delivered to Port B</p>
                <p>Delivered to Port C</p>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="dashboard">
            <h2 className="dashboard-title">Dashboard</h2>

            {/* Map Section */}
            <div
              className="map-container"
            >
              <MapContainer
                center={[19.076, 72.8777]} // Example coordinates (Mumbai, India)
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
            </div>

            {/* Seller Details */}
            <div className="seller-details">
              <h3>Seller Details</h3>
              <div className="ravi-label">RAVI098789</div>
              <div className="details-grid">
                <div>Parcels Paid: $27K</div>
                <div>Date of Arrival: 28.10.2024</div>
                <div>Status: Delivered</div>
                <div>Type of Parcels: Chemicals</div>
              </div>
            </div>

            {/* Metrics */}
            <div className="metrics">
              {renderMetric("Parcel Weight", "540 KG", <FaTruckFast />)}
              {renderMetric("Operational Costs", "$40K", <FaMoneyBills />)}
              {renderMetric("Transit Time", "7 days", <FaBusinessTime />)}
              {renderMetric("Fuel Efficiency", "789 L", <BsFillFuelPumpFill />)}
              {renderMetric("CO2 Emissions", "0.54 tonn", <MdFactory />)}
              {renderMetric("Risk Assessment", "32%", <RiSkullFill />)}
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

// Render individual metric cards
const renderMetric = (title, value, icon) => (
  <div className="metrics-card" key={title}>
    <div className="icon-container">{icon}</div>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default Dashboard;
