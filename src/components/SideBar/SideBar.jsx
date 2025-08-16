// File: se_project_react/src/components/SideBar/SideBar.jsx
import React from "react";
import "./SideBar.css";

function SideBar({ currentUser, onSignOut, onChangeProfileData }) {
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img
          src={currentUser?.avatar || "default-avatar.png"}
          alt={`${currentUser?.name || "User"}'s avatar`}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <div className="sidebar__actions">
        <button
          className="sidebar__button"
          onClick={onChangeProfileData}
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__button"
          onClick={onSignOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;