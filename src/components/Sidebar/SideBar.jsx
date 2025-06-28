import React from "react";
import "./Sidebar.css";
import avatar from "../../assets/avatar.svg"; // Import the same avatar image used in Header

function SideBar({ username }) {
  return (
    <div className="sidebar">
      <img src={avatar} alt={username} className="sidebar__avatar" />
      <p className="sidebar__username">{username}</p>
    </div>
  );
}

export default SideBar;
