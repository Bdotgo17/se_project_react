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
  clothingItems = [], // Default empty array if not provided
}) {
  if (!isOpen) return null;

  const currentUser = useContext(CurrentUserContext); // Consume CurrentUserContext

  // Check if currentUser is null or undefined
  if (!currentUser) {
    return null; // Render nothing if currentUser is null
  }

  // Filter clothing items owned by the current user
  const sidebarClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="profile">
      {/* Use the SideBar component for the sidebar layout */}
      <SideBar
        currentUser={currentUser}
        onSignOut={onSignOut}
        onChangeProfileData={onChangeProfileData}
      />
        {/* Render the ClothesSection with filtered clothing items */}
        {sidebarClothingItems.length > 0 && (
          <div className="profile__content">
            <ClothesSection
              showHeader={true}
              clothingItems={sidebarClothingItems}
              onCardClick={onCardClick}
              onAddGarmentClick={onAddGarmentClick}
            />
          </div>
        )}
      </div>
  );
}

export default Profile;
