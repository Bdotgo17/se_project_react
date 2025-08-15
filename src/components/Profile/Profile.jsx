import React, { useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({
  onAddItemClick,
  onSignOut, // Use this for logging out
  onChangeProfileData,
  isOpen,
  onClose,
  onSubmit,
  onAddGarmentClick = () => {}, // Default empty function if not provided
  onCardClick = () => {}, // Default empty function if not provided
  clothingItems = [], // Default empty array if not provided
}) {
  const currentUser = useContext(CurrentUserContext); // Consume CurrentUserContext

  // Check if currentUser is null or undefined
  if (!currentUser) {
    return null; // Render nothing if currentUser is null
  }

  // Check if the profile modal is open
  if (!isOpen) return null;

  // Filter clothing items owned by the current user
  const sidebarClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="sidebar-layout">
      {/* Sidebar Profile and Actions */}
      <div className="sidebar__content">
        <div className="sidebar__profile">
          <img
            src={currentUser.avatar || "default-avatar.png"} // Use fallback avatar if currentUser.avatar is undefined
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
            onClick={onSignOut} // Use the onSignOut prop for logging out
          >
            Log Out
          </button>
        </div>
      </div>
      {sidebarClothingItems.length > 0 && (
        <ClothesSection
          showHeader={true}
          clothingItems={sidebarClothingItems}
          onCardClick={onCardClick}
          onAddGarmentClick={onAddGarmentClick}
        />
      )}
    </div>
  );
}

export default Profile;
