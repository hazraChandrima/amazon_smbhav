import React, { useState } from "react";
import "./DocumentGenerator.css";

const DocumentGenerator = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({
    from: "",
    invoiceNumber: "",
    date: "",
    buyerReference: "",
    deliveryDate: "",
    portOfLoading: "",
    portOfDischarge: "",
    packingInformation: "",
    productCode: "",
    guidelines: "",
  });
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  const documents = [
    {
      title: "Quotation",
      description:
        "Looking for a ready-to-use, professionally designed quotation? Create a quote in less than a minute with Smart Docs.",
    },
    {
      title: "Proforma Invoice",
      description:
        "A proforma invoice works as an invoice draft. It lets customers know the final price and allows vendors to proceed.",
    },
    {
      title: "Commercial Invoice",
      description:
        "Ready to start invoicing? Create and send professional invoices in less than a minute with the Smart Docs invoicing tool.",
    },
    {
      title: "Purchase Order",
      description:
        "Make a seamless order transaction with your suppliers by using our purchase order template.",
    },
    {
      title: "Gross Mass Declaration",
      description:
        "Looking for a ready-to-use accurate verified gross weight declaration template? Create the document instantly.",
    },
    {
      title: "Bill of Lading",
      description:
        "Create a customizable bill of lading form, quickly submitting your shipping transactions.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = () => {
    setPreviewVisible(true);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setSuccessVisible(true);
    setFormData({
      from: "",
      invoiceNumber: "",
      date: "",
      buyerReference: "",
      deliveryDate: "",
      portOfLoading: "",
      portOfDischarge: "",
      packingInformation: "",
      productCode: "",
      guidelines: "",
    });
    setSelectedDoc(null);
  };

  const isFormValid = () =>
    formData.from &&
    formData.invoiceNumber &&
    formData.date &&
    formData.buyerReference &&
    formData.deliveryDate &&
    formData.portOfLoading &&
    formData.portOfDischarge &&
    formData.packingInformation &&
    formData.productCode;

  return (
    <div className="document-generator-container">
      <div className="text-section">
        <h1>Smart Documents</h1>
        <p>
          Streamline Your Shipping with our Smart Documents. Smart Documents is
          an innovative logistics tool that{" "}
          <b>automates your intelligent document generation process</b>.
        </p>
        <p>
          Say goodbye to paperwork delays with automated document processing.
          Smart Documentation eliminates manual errors and generates accurate
          shipment documents quickly and easily, offering numerous advantages.
        </p>
        <div className="document-options">
          {documents.map((doc, index) => (
            <div
              key={index}
              className={`option ${selectedDoc === doc.title ? "active" : ""}`}
              onClick={() => setSelectedDoc(doc.title)}
            >
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedDoc && (
        <div className="form-section">
          <div className="form-header">
            <h3>{selectedDoc}</h3>
          </div>
          <form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpload();
            }}
          >
            <div className="form-grid">
              <div className="form-row">
                <label>From</label>
                <select
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option>Location A</option>
                  <option>Location B</option>
                </select>
              </div>
              <div className="form-row">
                <label>Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Buyer Reference</label>
                <input
                  type="text"
                  name="buyerReference"
                  value={formData.buyerReference}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Port of Loading</label>
                <select
                  name="portOfLoading"
                  value={formData.portOfLoading}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option>Port A</option>
                  <option>Port B</option>
                </select>
              </div>
              <div className="form-row">
                <label>Port of Discharge</label>
                <input
                  type="text"
                  name="portOfDischarge"
                  value={formData.portOfDischarge}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Packing Information</label>
                <textarea
                  name="packingInformation"
                  rows="3"
                  value={formData.packingInformation}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-row">
                <label>Product Code</label>
                <input
                  type="text"
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Guidelines</label>
                <textarea
                  name="guidelines"
                  rows="3"
                  value={formData.guidelines}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="upload-btn"
              disabled={!isFormValid()}
            >
              Upload
            </button>
          </form>
        </div>
      )}

      
      {isPreviewVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Preview</h3>
            <table className="preview-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(formData).map(([key, value]) => (
                  <tr key={key}>
                    <td>
                      {key
                        .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
                        .replace(/^./, (str) => str.toUpperCase())}{" "}
                      {/* Capitalize the first letter */}
                    </td>
                    <td>{value || "Not provided"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={closePreview} className="upload-btn">
              Confirm & Upload
            </button>
          </div>
        </div>
      )}


      {isSuccessVisible && (
        <div className="success-popup">
          <p>Form uploaded successfully!</p>
          <button
            onClick={() => setSuccessVisible(false)}
            className="upload-btn"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator;
   