import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "/images/logo.png";
import { IoIosDocument } from "react-icons/io";
import { IconContext } from "react-icons";
import { FaShippingFast } from "react-icons/fa";
import { PiGpsFixBold } from "react-icons/pi";
import { VscDashboard } from "react-icons/vsc";
import { MdNotifications, MdMessage } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <IconContext.Provider
      value={{ color: "black", size: "2rem", className: "global-class-name" }}
    >
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Amazon SMB" className="logo-image" />
            </Link>
          </div>
          <ul className="navbar-menu">
            <li>
              <span>Company</span>
            </li>
            <li>
              <span>Solutions</span>
            </li>
            <li>
              <span>Products</span>
            </li>
            <li className="navbar-dropdown">
              <span>Services</span>
              <ul className="dropdown-menu">
                <li>
                  <IoIosDocument />
                  <Link to="/services/document-generator">
                    Document Generator
                  </Link>
                </li>
                <li>
                  <FaShippingFast />
                  <Link to="/services/carrier-comparison">
                    Carrier Comparison
                  </Link>
                </li>
                <li>
                  <PiGpsFixBold />
                  <Link to="/services/shipment-tracker">Shipment Tracker</Link>
                </li>
                <li>
                  <VscDashboard />
                  <Link to="/services/dashboard">Dashboard</Link>
                </li>
              </ul>
            </li>
          </ul>
          <IconContext.Provider
            value={{
              color: "white",
              size: "1.7em",
              className: "global-class-name",
            }}
          >
            <div className="navbar-actions">
              <div className="icon-container">
                <Link to="/messaging">
                  <MdMessage />
                </Link>
                <span className="badge">2</span>
              </div>
              <div className="icon-container">
                <Link to="/notifications">
                  <MdNotifications />
                </Link>
                <span className="badge">1</span>
              </div>
              <div className="icon-container" onClick={toggleDropdown}>
                <FaUserCircle />
                {showDropdown && (
                  <div className="user-dropdown">
                    <Link to="/profile">Profile</Link>
                    <Link to="/">Logout</Link>
                  </div>
                )}
              </div>
            </div>
          </IconContext.Provider>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
