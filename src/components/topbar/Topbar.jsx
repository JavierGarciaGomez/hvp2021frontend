import React, { useEffect, useState } from "react";
import "./topbar.css";
// material icons
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollaboratorbyId,
  getCollaboratorbyIdBis,
} from "../../helpers/miscFecth";
import { startLogout } from "../../actions/authActions";

export const Topbar = () => {
  const { uid, imgUrl } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
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
