import React, { Fragment, useEffect, useState } from "react";
// material icons
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import { Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

import { Link, useNavigate } from "react-router-dom";
import { startLogout } from "../../../../actions/authActions";
import { toggleMenu } from "../../../../actions/dbUiActions";
import { Icon } from "@mui/material";

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

  console.log("topbar", uid, imgUrl);

  return (
    <Fragment>
      <div className="topbar">
        <div className="topbar_wrapper">
          <div className="topbar_hambContainer">
            <MenuIcon
              className="topbar_hamb"
              onClick={handleMenuClick}
              sx={{ fontSize: "3.6rem" }}
            />
          </div>

          <div className="topbar_logoContainer">
            <Link className="" to="/">
              <img
                className="topbar_imgLogo"
                src="assets/imgs/Logo_HVP.png"
                alt=""
              />
            </Link>
            <span className="topbar_title">Administración HVP</span>
          </div>

          <div className="topbar_right">
            {/* <div className="topbar--iconContainer">
            <NotificationsNone />
            <span className="topbar--topIconBadge">2</span>
          </div>
          <div className="topbar--iconContainer">
            <Language />
            <span className="topbar--topIconBadge">2</span>
          </div>
          <div className="topbar--iconContainer">
            <Settings />
          </div> */}
            <div className="topbar_iconContainer" onClick={handleLogout}>
              <div className="topbar_icon">
                <Logout />
              </div>
            </div>
            <img src={imgUrl} alt="" className="c-avatar" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
