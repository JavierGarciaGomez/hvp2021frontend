import React from "react";
import "./topbar.css";
// material icons
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>

        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://art.pixilart.com/efac919934a1b24.png"
            alt=""
            className="topAvatar"
          />

          <div></div>
        </div>
      </div>
    </div>
  );
};
