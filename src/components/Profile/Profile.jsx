import React, { useContext } from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";

function Profile({
  onAddItemClick,
  onSignOut, // Use this for logging out
  onChangeProfileData,
  isOpen,
  onClose,
  onSubmit,
  onAddGarmentClick = () => {}, // Default empty function if not provided
  onCardClick = () => {}, // Default empty function if not provided
  onCardLike = () => {}, // <-- Add this default
  currentWeatherType = "", // Default value for currentWeatherType
  clothingItems = [], // Default empty array if not provided
}) {

  const currentUser = useContext(CurrentUserContext); // Consume CurrentUserContext

  // Check if currentUser is null or undefined
  if (!currentUser) {
    return null; // Render nothing if currentUser is null
  }

  const userItems = clothingItems.filter(
    (item) => String(item.owner) === String(currentUser?._id)
  );

  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        onSignOut={onSignOut}
        onChangeProfileData={onChangeProfileData}
      />
      <div className="profile__content">
        <ClothesSection
          showHeader={true}
          clothingItems={userItems}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          currentUser={currentUser}
          onAddItemClick={onAddItemClick} // <-- Use the prop, do NOT call setActiveModal directly!
          onAddGarmentClick={onAddGarmentClick}
          currentWeatherType={currentWeatherType}
        />
      </div>
    </div>
  );
}

export default Profile;
