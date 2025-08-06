import React from "react";
import "./Sidebar.css";
import avatar from "../../assets/avatar.svg"; // Import the same avatar image used in Header
import ClothesSection from "../ClothesSection/ClothesSection";

function SideBar({
  currentUser,
  onChangeProfileData,
  onLogout,
  isProfileOpen,
  isOpen,
  onClose,
  onAddGarmentClick = () => {}, // Default empty function if not provided
  onCardClick = () => {}, // Default empty function if not provided
  clothingItems = [], // Default empty array if not provided
  onCardLike = () => {}, // Default empty function if not provided
  weatherData = { temp: { F: 0, C: 0 }, type: "" }, // Default weather data
  updatedClothingItems = [], // Default empty array if not provided
}) {
  console.log("Current User in Sidebar:", currentUser); // Debug log
  // Check if currentUser is null or undefined
  if (!currentUser) {
    return null; // Render nothing if currentUser is null
  }

  if (!isOpen) return null;

  return (
    <div className="sidebar-layout">
      {/* Sidebar Profile and Actions */}
      <div className="sidebar__content">
        <div className="sidebar__profile">
          <img
            src={currentUser.avatar || avatar} // Use fallback avatar if currentUser.avatar is undefined
            alt={`${currentUser.name || "User"}'s avatar`}
            className="sidebar__avatar"
          />
          <p className="sidebar__username">{currentUser.name || "User"}</p>
        </div>
        <div className="sidebar__actions">
          <button
            className="sidebar__button"
            onClick={onChangeProfileData} // Function to handle profile data change
          >
            Change Profile Data
          </button>
          <button
            className="sidebar__button"
            onClick={() => {
              console.log("Log Out button clicked");
              onLogout();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      {/* Cards Section */}
      <ClothesSection onAddGarmentClick={onAddGarmentClick} />{" "}
      <ul
        className={`cards__list ${isProfileOpen ? "cards__list--shifted" : ""}`}
      ></ul>
    </div>
  );
}

export default SideBar;
