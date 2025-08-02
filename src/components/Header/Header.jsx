import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import "./Header.css";

function Header({
  handleAdClick,
  handleLoginClick,
  weatherData,
  username,
  onProfileClick,
  currentTemperatureUnit,
  onToggleSwitchChange,
}) {
  const [isProfileLinkVisible, setIsProfileLinkVisible] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const toggleProfileLink = () => {
    setIsProfileLinkVisible((prev) => !prev);
  };

  // Declare currentDate as a local variable
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
        {currentTemperatureUnit === "F"
          ? weatherData.temp?.F
          : weatherData.temp?.C}
        ° {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />{" "}
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
        {currentUser ? (
          <Link to="/profile" className="header__profile-link">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={`${currentUser.name}'s avatar`}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="header__username">{currentUser.name}</p>
          </Link>
        ) : (
          <button
            onClick={handleLoginClick} // Use the new handleLoginClick prop
            className="header__login-button"
          >
            Log In
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
