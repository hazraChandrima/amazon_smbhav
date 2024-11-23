import React from "react";
import "./CarrierComparison.css";

function CarrierComparison() {
  return (
    <div className="comparison-container">
    <h1 className="title">Carrier Comparisons</h1>
    <div className="filters">
      {/* Filter Boxes */}
      <div className="filter-group">
        <h2>From</h2>
        <select className="filter">
          <option>Source</option>
        </select>
        <input type="text" placeholder="zip code" className="filter-input" />
      </div>
      <div className="filter-group">
      <h2>To</h2>
        <select className="filter">
          <option>Destination</option>
        </select>
        <input type="text" placeholder="zip code" className="filter-input" />
      </div>
      <div className="filter-group">
      <h2>Parcel Weight</h2>
        <select className="filter">
        <option> (kg/lb)</option>
      </select>
      <select className="filter">
        <option>Ideal Shipping Duration</option>
      </select>
      </div>
      <div className="filter-group">
      <h2>Item Type</h2>
      <select className="filter">
        <option>Type</option>
      </select>
      <select className="filter">
        <option>Special Requirements</option>
      </select>

      </div>
      {/* <select className="filter">
        <option>Parcel Weight (kg/lb)</option>
      </select> */}
      {/* <select className="filter">
        <option>Ideal Shipping Duration</option>
      </select> */}
      {/* <select className="filter">
        <option>Special Requirements</option>
      </select> */}
      {/* <select className="filter">
        <option>Insurance</option>
      </select> */}
  
    </div>

    {/* Results Table */}
    <div className="results-table">
      <div className="table-header">
        <span>Courier</span>
        <span>Delivery Time</span>
        <span>Service Options</span>
        <span>Rating</span>
        <span>Carbon Emissions</span>
        <span>Cost</span>
      </div>
      {/* Sample Data Rows */}
      <div className="table-row">
        <span>Carrier A</span>
        <span>1-2 Days</span>
        <span>Drop-off, Free Pickup</span>
        <span>4.0/5 ⭐</span>
        <span>2.38kCO2</span>
        <span>USD 4.62</span>
      </div>
      <div className="table-row">
        <span>Carrier B</span>
        <span>1-3 Days</span>
        <span>Drop-off, Free Pickup</span>
        <span>4.5/5 ⭐</span>
        <span>2.08kCO2</span>
        <span>USD 4.62</span>
      </div>
      <div className="table-row">
        <span>Carrier C</span>
        <span>1-3 Days</span>
        <span>Drop-off, Free Pickup</span>
        <span>3.5/5 ⭐</span>
        <span>3.00kCO2</span>
        <span>USD 4.62</span>
      </div>
      <div className="table-row">
        <span>Carrier D</span>
        <span>1-3 Days</span>
        <span>Drop-off, Free Pickup</span>
        <span>3.5/5 ⭐</span>
        <span>3.00kCO2</span>
        <span>USD 4.62</span>
      </div>
      <div className="table-row">
        <span>Carrier E</span>
        <span>1-5 Days</span>
        <span>Drop-off, Free Pickup</span>
        <span>3.5/5 ⭐</span>
        <span>3.00kCO2</span>
        <span>USD 4.62</span>
      </div>
      {/* Add more rows as needed */}
    </div>
  </div>
  );
}

export default CarrierComparison;