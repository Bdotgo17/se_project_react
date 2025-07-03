import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData, username, onProfileClick }) {
  const [isProfileLinkVisible, setIsProfileLinkVisible] = useState(false);

  const toggleProfileLink = () => {
    setIsProfileLinkVisible((prev) => !prev);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Company logo" />
      </Link>
      <p className="header__date-and-location">
        {" "}
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={() => {
          console.log("Header button clicked!"); // Debug log
          handleAddClick();
        }}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <Link to="/profile" className="header__profile-link">
          <p className="header__username">{username}</p>
          <img src={avatar} alt={username} className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
