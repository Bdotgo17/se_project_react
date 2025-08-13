import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import "./Header.css";

function Header({
  onSidebarToggle,
  handleChangeProfileData,
  handleLogout,
  handleAddClick,
  handleLoginClick,
  weatherData,
  username,
  onProfileClick,
  currentTemperatureUnit,
  onToggleSwitchChange,
  isLoggedIn, // Add this prop to determine login state
  setShowRegisterModal, // Add this prop for the Sign Up button
  setShowLoginModal, // Add this prop for the Log In button
  setActiveModal,
}) {
  const currentUser = useContext(CurrentUserContext); // Use CurrentUserContext directly

  const [isProfileLinkVisible, setIsProfileLinkVisible] = useState(false);

  const toggleProfileLink = () => {
    setIsProfileLinkVisible((prev) => !prev);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
    onProfileClick(); // Trigger the parent logic for opening the sidebar
  };

  // Declare currentDate as a local variable
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

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

      <ToggleSwitch onToggleSwitchChange={onToggleSwitchChange} />

      {isLoggedIn && (
        <button
          onClick={() => setActiveModal("ADD_GARMENT")}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}

      <div className="header__user-container">
        {isLoggedIn && currentUser ? (
          <div className="header__user-info">
            <Link
              to="/profile"
              className="header__profile-link"
              onClick={handleSidebarToggle} // Trigger the sidebar opening
            >
              <p className="header__username">{currentUser?.name || "User"}</p>
              {/* Username first */}
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={`${currentUser.name}'s avatar`}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </Link>
          </div>
        ) : (
          <>
            {/* Sign Up and Log In Buttons */}
            <button
              onClick={() => setShowRegisterModal(true)}
              className="header__signup-button"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="header__login-button"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
