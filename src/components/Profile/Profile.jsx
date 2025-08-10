import React, { useContext } from "react";
import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { onSignOut } from "../../utils/auth";
import "./Profile.css";

function Profile({
  clothingItems,
  onAddItemClick,
  username,
  onSignOut,
  onSignOutcurrentUser,
  onChangeProfileData,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext); // Consume CurrentUserContext

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
