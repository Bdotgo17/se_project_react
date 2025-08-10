import React from "react";
import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onAddItemClick,
  username,
  onSignOutcurrentUser,
  onChangeProfileData,
  onCardClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        onChangeProfileData={onChangeProfileData}
        onLogout={onSignOut}
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
        onCardClick={onCardClick}
      />
    </div>
  );
}

export default Profile;
