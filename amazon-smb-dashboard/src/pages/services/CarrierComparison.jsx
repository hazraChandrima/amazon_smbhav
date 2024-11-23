import React, { useState } from "react";
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

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      src: "",
      dest: "",
      weight: "",
      idealShippingDuration: "",
      itemType: "",
      shippingCategory: "",
    });
    setCarriers([]);
    setError(null);
  };

  const handleGenerateCarriers = async () => {
    setLoading(true);
    setError(null);

    // Validate all filters
    if (Object.values(filters).some((value) => !value)) {
      setError("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      // Prepare query params for the GET request
      const params = {
        src: filters.src,
        dest: filters.dest,
        weight: filters.weight.split("-")[1].trim(),
        idealShippingDuration: filters.idealShippingDuration
          .split("-")[0]
          .trim(),
        itemType: filters.itemType.toLowerCase(),
        shippingCategory: filters.shippingCategory.toLowerCase(),
      };

      const data = await fetchData("", {
        method: "GET",
        params,
      });

      setCarriers(data.carriers || []);
      if (!data.carriers?.length) {
        setError("No carriers found for the selected criteria.");
      }
    } catch (err) {
      setError("Failed to fetch carrier data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comparison-container">
      <h1 className="title">Carrier Comparisons</h1>

      {/* Filters Section */}
      <div className="filters">
        {[
          {
            name: "src",
            label: "Source Location",
            options: ["Mumbai", "Kolkata", "Delhi", "Chennai"],
          },
          {
            name: "dest",
            label: "Destination Location",
            options: ["UAE", "Japan", "LA"],
          },
          {
            name: "weight",
            label: "Parcel Weight",
            options: ["0-5 kg", "5-10 kg", "10-20 kg"],
          },
          {
            name: "idealShippingDuration",
            label: "Ideal Shipping Duration",
            options: ["3-5 days", "5-7 days", "7-10 days"],
          },
          {
            name: "itemType",
            label: "Item Type",
            options: ["Standard", "Cold", "Fragile"],
          },
          {
            name: "shippingCategory",
            label: "Shipping Category",
            options: ["Green", "Normal", "Express"],
          },
        ].map((filter) => (
          <div className="filter-group" key={filter.name}>
            <label htmlFor={filter.name} className="filter-label">
              {filter.label}
            </label>
            <select
              name={filter.name}
              id={filter.name}
              className="filter"
              value={filters[filter.name]}
              onChange={handleFilterChange}
            >
              <option value="">Select {filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button
          onClick={handleGenerateCarriers}
          className="generate-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Carriers"}
        </button>
        <button onClick={resetFilters} className="reset-button">
          Reset
        </button>
      </div>

      {/* Results Section */}
      <div className="results-table">
        <div className="table-header">
          <span>Courier</span>
          <span>Delivery Time</span>
          <span>Service Options</span>
          <span>Rating</span>
          <span>Carbon Emissions</span>
          <span>Cost</span>
        </div>

        {/* Loading State */}
        {loading && <p>Loading data...</p>}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* No Data Available */}
        {!loading && !error && carriers.length === 0 && (
          <p>No data available</p>
        )}

        {/* Display Data */}
        {!loading &&
          !error &&
          carriers.map((carrier, index) => (
            <div className="table-row" key={index}>
              <span>{carrier?.name || "N/A"}</span>
              <span>{carrier?.deliveryTime || "N/A"}</span>
              <span>{carrier?.serviceOptions?.join(", ") || "N/A"}</span>
              <span>{carrier?.rating ? `${carrier?.rating} ⭐` : "N/A"}</span>
              <span>
                {carrier?.carbonEmissions
                  ? `${carrier?.carbonEmissions} kCO2`
                  : "N/A"}
              </span>
              <span>{carrier?.cost ? `${carrier?.cost} USD` : "N/A"}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CarrierComparison;
