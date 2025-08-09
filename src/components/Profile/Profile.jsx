import React from "react";
import SideBar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onAddItemClick, username, onSignOut }) {
  return (
    <div className="profile">
      <SideBar username={username} />
      <h1 className="profile__welcome">Welcome, {username}!</h1>

      <ClothesSection
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
      />
      <button onClick={onSignOut} className="profile__sign-out-button">
        Sign Out
      </button>
    </div>
  );
}

export default Profile;
