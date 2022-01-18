import React, { useEffect, useState } from "react";
import "./topbar.css";
// material icons
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";

export const Topbar = () => {
  const { uid, imgUrl } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
    navigate("/");
  };

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
          <div className="topbarIconContainer" onClick={handleLogout}>
            <Logout />
          </div>
          <img src={imgUrl} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};
