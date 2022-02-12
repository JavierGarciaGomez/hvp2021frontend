import React, { useEffect, useState } from "react";
// material icons
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { startLogout } from "../../../../actions/authActions";
import { toggleMenu } from "../../../../actions/dbUiActions";

export const Topbar = () => {
  const { uid, imgUrl } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    dispatch(startLogout());
    navigate("/");
  };

  return (
    <div className="db-topbar">
      <div className="db-topbar--main-wrapper">
        <div className="db-topbar--hamb-container">
          <MenuIcon className="db-topbar--hamb" onClick={handleMenuClick} />
        </div>
        <div className="db-topbar--wrapper">
          <div className="db-topbar--topLeft">
            <span className="db-topbar--logo">Admin</span>
          </div>

          <div className="db-topbar--topRight">
            <div className="db-topbar--iconContainer">
              <NotificationsNone />
              <span className="db-topbar--topIconBadge">2</span>
            </div>
            <div className="db-topbar--iconContainer">
              <Language />
              <span className="db-topbar--topIconBadge">2</span>
            </div>
            <div className="db-topbar--iconContainer">
              <Settings />
            </div>
            <div className="db-topbar--iconContainer" onClick={handleLogout}>
              <Logout />
            </div>
            <img src={imgUrl} alt="" className="db-topbar--topAvatar" />
          </div>
        </div>
      </div>
    </div>
  );
};
