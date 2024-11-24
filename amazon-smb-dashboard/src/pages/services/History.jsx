import React from 'react';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const ShipmentTimeline = () => {
  const shipmentData = [
    { status: "Picked Up", location: "Delhi, India", time: "June 10, 2023 at 09:00 AM", icon: <FaMapMarkerAlt />, isFirst: true },
    { status: "In Transit", location: "Jaipur, India", time: "June 11, 2023 at 01:15 PM" },
    { status: "In Transit", location: "Mumbai, India", time: "June 12, 2023 at 02:30 PM" },
    { status: "Customs Clearance", location: "Dubai, UAE", time: "June 15, 2023 at 04:20 PM" },
    { status: "Delivered", location: "Abu Dhabi, UAE", time: "June 16, 2023 at 10:45 AM", isLast: true },
  ];

  return (
    <div className="shipment-timeline">
      <h2>Shipment Timeline</h2>
      <ul className="timeline-list">
        {shipmentData.map((item, index) => (
          <li
            key={index}
            className={`timeline-item ${item.isFirst ? 'first-item' : ''} ${item.isLast ? 'last-item' : ''}`}
          >
            <div className={`timeline-icon ${item.isFirst ? 'location-icon' : 'check-icon'}`}>
              {item.isFirst ? <FaMapMarkerAlt /> : <FaCheckCircle />}
            </div>
            <div className="timeline-details">
              <p className="status">{item.status}</p>
              <p className="location">{item.location}</p>
              <p className="time">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentTimeline;
