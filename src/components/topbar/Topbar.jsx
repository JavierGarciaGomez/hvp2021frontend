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
  const { uid } = useSelector((state) => state.auth);
  const [image, setimage] = useState("");
  const dispatch = useDispatch();

  useEffect(async () => {
    const collaborator = await getCollaboratorbyIdBis(uid);
    setimage(collaborator.imgUrl);
  }, [uid]);

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
          <img src={image} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};
