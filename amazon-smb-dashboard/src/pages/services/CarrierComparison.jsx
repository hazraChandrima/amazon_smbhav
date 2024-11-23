import React, { useState, useEffect } from "react";
import { fetchData } from "../services/api";
import "./CarrierComparison.css";

function CarrierComparison() {
  const [filters, setFilters] = useState({
    src: "",
    dest: "",
    weight: "",
    idealShippingDuration: "",
    itemType: "",
    shippingCategory: "",
  });
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // You can fetch initial data for filters if needed (e.g., countries for `src` and `dest`)
    // This is optional, depending on your data setup.
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleGenerateCarriers = async () => {
    setLoading(true);
    setError(null); // Reset error before making the request
  
    // Check if all filters are filled
    if (!filters.src || !filters.dest || !filters.weight || !filters.idealShippingDuration || !filters.itemType || !filters.shippingCategory) {
      setError("All filters must be selected.");
      setLoading(false);
      return;
    }
  
    // Convert weight (from range like "5-10 kg") to just a number (max value)
    const weightValue = parseInt(filters.weight.split('-')[1], 10); // Get the max weight value
  
    // Convert shipping duration to just the minimum value
    const shippingDurationValue = parseInt(filters.idealShippingDuration.split('-')[0], 10); // Get the min value
  
    const formattedFilters = {
      src: filters.src,
      dest: filters.dest,
      weight: weightValue,  // Ensure weight is an integer
      idealShippingDuration: shippingDurationValue,  // Ensure it's an integer
      itemType: filters.itemType.toLowerCase(),  // Convert to lowercase for backend
      shippingCategory: filters.shippingCategory.toLowerCase(),  // Convert to lowercase for backend
    };
  
    console.log("Sending data to backend:", formattedFilters); // Debugging: check the request body
  
    try {
      // Pass filters to backend as request body
      const data = await fetchData("carrier-comparison", {
        method: "POST",  // Set the method to POST
        body: formattedFilters,  // Send formatted filters as request body
      });
  
      console.log("Response from backend:", data); // Debugging: check the response
  
      // If successful, update carriers state
      setCarriers(data.carriers || []); // Assuming the response contains 'carriers' in JSON
    } catch (err) {
      setError("Failed to fetch carrier data. Please try again later.");
      console.error("Error fetching data:", err); // Log any error that occurs during the API call
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="comparison-container">
      <h1 className="title">Carrier Comparisons</h1>
      <div className="filters">
        {[ 
          { name: "src", label: "Source Location", options: ["Mumbai", "Kolkata", "Delhi", "Chennai"] },
          { name: "dest", label: "Destination Location", options: ["UAE", "Japan", "LA"] },
          { name: "weight", label: "Parcel Weight", options: ["0-5 kg", "5-10 kg", "10-20 kg"] },
          { name: "idealShippingDuration", label: "Ideal Shipping Duration", options: ["3-5 days", "5-7 days", "7-10 days"] },
          { name: "itemType", label: "Item Type", options: ["Standard", "Cold", "Fragile"] },
          { name: "shippingCategory", label: "Shipping Category", options: ["Green", "Normal", "Express"] },
        ].map((filter) => (
          <div className="filter-group" key={filter.name}>
            <label htmlFor={filter.name} className="filter-label">{filter.label}</label>
            <select
              name={filter.name}
              id={filter.name}
              className="filter"
              value={filters[filter.name]}
              onChange={handleFilterChange}
            >
              <option value="">Select {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button onClick={handleGenerateCarriers} className="generate-button">
        Generate Carriers
      </button>

      <div className="results-table">
  <div className="table-header">
    <span>Courier</span>
    <span>Delivery Time</span>
    <span>Service Options</span>
    <span>Rating</span>
    <span>Carbon Emissions</span>
    <span>Cost</span>
  </div>

  {loading && <p>Loading data...</p>}
  {error && <p className="error-message">{error}</p>}
  {!loading && !error && carriers.length === 0 && <p>No data available</p>}

  {!loading &&
    !error &&
    carriers.map((carrier, index) => (
      <div className="table-row" key={index}>
        <span>{carrier?.name || "N/A"}</span>
        <span>{carrier?.deliveryTime || "N/A"}</span>
        <span>{carrier?.serviceOptions?.join(", ") || "N/A"}</span>  {/* If service options is an array */}
        <span>{carrier?.rating ? `${carrier?.rating} ⭐` : "N/A"}</span>
        <span>{carrier?.carbonEmissions ? `${carrier?.carbonEmissions} kCO2` : "N/A"}</span>
        <span>{carrier?.cost ? `${carrier?.cost} USD` : "N/A"}</span>
      </div>
    ))}
</div>

    </div>
  );
}

export default CarrierComparison;
