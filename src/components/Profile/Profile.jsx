import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onAddItemClick, username }) {
  return (
    <div className="profile">
      <SideBar username={username} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
      />
    </div>
  );
}

export default Profile;
