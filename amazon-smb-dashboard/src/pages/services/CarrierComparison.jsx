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
  const [negotiationCarrier, setNegotiationCarrier] = useState(null);
const [desiredPrice, setDesiredPrice] = useState("");
const [negotiationResponse, setNegotiationResponse] = useState("");
const [isModalOpen, setModalOpen] = useState(false);

const handleNegotiateClick = (carrier) => {
  setNegotiationCarrier(carrier);
  setDesiredPrice("");
  setNegotiationResponse("");
  setModalOpen(true);
};

const handleSubmitNegotiation = () => {
  if (!desiredPrice) {
    setNegotiationResponse("Please enter a valid price.");
    return;
  }
  

  // Simulate carrier response
  const acceptedPrice = Math.random() > 0.5; // Random accept/reject
  if (acceptedPrice) {
    setNegotiationResponse(`Offer accepted! Your price: $${desiredPrice}`);
  } else {
    setNegotiationResponse(
      `Offer rejected. Carrier suggests: $${negotiationCarrier.cost}`
    );
  }
};

// Generate random data for market trends
const generateRandomTrend = () => {
  return {
    trend: (Math.random() * 100).toFixed(2), // Random number between 0 and 100
    percentageChange: (Math.random() * 10 - 5).toFixed(2), // Random percentage change between -5 and 5
  };
};

const marketTrend = generateRandomTrend();

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Reset filters
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

  // Generate carriers based on filters
  const handleGenerateCarriers = async () => {
    setLoading(true);
    setError(null);

    // Validate filters
    if (Object.values(filters).some((value) => !value)) {
      setError("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      // Prepare query parameters
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

      <div className="filters">
  {/* Filters Row 1 */}
  <div className="filter-row">
    <div className="filter-group">
      <label htmlFor="src" className="filter-label">
        Source Location
      </label>
      <select
        name="src"
        id="src"
        className="filter"
        value={filters.src}
        onChange={handleFilterChange}
      >
        <option value="">Select Source</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Delhi">Delhi</option>
        <option value="Chennai">Chennai</option>
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="weight" className="filter-label">
        Parcel Weight
      </label>
      <select
        name="weight"
        id="weight"
        className="filter"
        value={filters.weight}
        onChange={handleFilterChange}
      >
        <option value="">Select Weight</option>
        <option value="0-5 kg">0-5 tonnes</option>
        <option value="5-10 kg">5-10 tonnes</option>
        <option value="10-20 kg">10-20 tonnes</option>
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="idealShippingDuration" className="filter-label">
        Ideal Shipping Duration
      </label>
      <select
        name="idealShippingDuration"
        id="idealShippingDuration"
        className="filter"
        value={filters.idealShippingDuration}
        onChange={handleFilterChange}
      >
        <option value="">Select Duration</option>
        <option value="3-5 days">3-5 days</option>
        <option value="5-7 days">5-7 days</option>
        <option value="7-10 days">7-10 days</option>
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="shippingCategory" className="filter-label">
        Shipping Category
      </label>
      <select
        name="shippingCategory"
        id="shippingCategory"
        className="filter"
        value={filters.shippingCategory}
        onChange={handleFilterChange}
      >
        <option value="">Select Category</option>
        <option value="Green">Green</option>
        <option value="Normal">Normal</option>
        <option value="Express">Express</option>
      </select>
    </div>
  </div>

  {/* Filters Row 2 */}
  <div className="filter-row">
    <div className="filter-group">
      <label htmlFor="dest" className="filter-label">
        Destination Location
      </label>
      <select
        name="dest"
        id="dest"
        className="filter"
        value={filters.dest}
        onChange={handleFilterChange}
      >
        <option value="">Select Destination</option>
        <option value="UAE">UAE</option>
        <option value="Japan">Japan</option>
        <option value="LA">LA</option>
      </select>
    </div>

    <div className="filter-group">
      <label htmlFor="itemType" className="filter-label">
        Item Type
      </label>
      <select
        name="itemType"
        id="itemType"
        className="filter"
        value={filters.itemType}
        onChange={handleFilterChange}
      >
        <option value="">Select Item Type</option>
        <option value="Standard">Standard</option>
        <option value="Cold">Cold</option>
        <option value="Fragile">Fragile</option>
      </select>
    </div>

    {/* Mode of Transport Dropdown */}
    <div className="filter-group">
      <label htmlFor="modeOfTransport" className="filter-label">
        Mode of Transport
      </label>
      <select
        name="modeOfTransport"
        id="modeOfTransport"
        className="filter"
      >
        <option value="">Select Mode</option>
        <option value="Air">Air</option>
        <option value="Sea">Sea</option>
        <option value="Road">Road</option>
      </select>
    </div>

    <div className="filter-row buttons-group">
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
  </div>
</div>

<div className="results-table">
  <div className="table-header">
    <span>Courier</span>
    <span>Delivery Time</span>
    <span>Service Options</span>
    <span>Rating</span>
    <span>Carbon Emissions</span>
    <span>Cost</span>
    <span>Action</span> {/* New Column */}
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
        <span>{carrier?.serviceOptions?.join(", ") || "N/A"}</span>
        <span>{carrier?.rating ? `${carrier?.rating} ⭐` : "N/A"}</span>
        <span>
          {carrier?.carbonEmissions
            ? `${carrier?.carbonEmissions} kCO2`
            : "N/A"}
        </span>
        <span>{carrier?.cost ? `${carrier?.cost} USD` : "N/A"}</span>
        {/* Action Button */}
        <span>
          <button
            className="negotiate-button"
            onClick={() => handleNegotiateClick(carrier)}
          >
            Negotiate
          </button>
        </span>
      </div>
    ))}
</div>

{negotiationCarrier && (
  <div className="negotiation-modal">
    <div className="modal-content">
      <h2>Negotiate Price with {negotiationCarrier.name}</h2>

      {/* Market Trends Section */}
      <div className="market-trend">
        <h3>Market Trends</h3>
        <p>
          The current market trend is at a value of <strong>{marketTrend.trend}</strong>.
          <br />
          There has been a <strong>{marketTrend.percentageChange}%</strong> change in the market.
        </p>
      </div>

      <label htmlFor="desiredPrice">Enter Your Price (USD):</label>
      <input
  type="number"
  id="desiredPrice"
  className="price-input-container"
  value={desiredPrice}  // Ensure this is bound to your component's state
  onChange={(e) => setDesiredPrice(e.target.value)}  // Make sure setDesiredPrice is properly defined
  min="0"
  style={{
    width: '80%',  /* Adjust the width */
    maxWidth: '250px',  /* Optional: set a maximum width */
    padding: '10px',  /* Add padding to make it look better */
    fontSize: '14px',  /* Adjust font size */
    margin: '0 auto',  /* Center align the input */
    display: 'block',  /* Ensure it's a block element */
    backgroundColor: 'white' , /* Set background color */
    color : 'black',
  }}
/>


      <button className="submit-button" onClick={handleSubmitNegotiation}>
        Submit
      </button>
      <button className="close-button" onClick={() => setNegotiationCarrier(null)}>
        Cancel
      </button>
      {negotiationResponse && <p className="response">{negotiationResponse}</p>}
    </div>
  </div>
)}


    </div>
  );
}

export default CarrierComparison;
