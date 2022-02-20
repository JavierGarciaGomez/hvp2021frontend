import React, { useEffect } from "react";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { roleTypes } from "../../../../types/types";
import {
  Badge,
  CleaningServices,
  Grid3x3,
  AccessTime,
  LineStyle,
  PermIdentity,
  WorkOutline,
  MiscellaneousServicesOutlined,
} from "@mui/icons-material";
import { setMenuState } from "../../../../actions/dbUiActions";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { menuState } = useSelector((state) => state.dbUi);
  const { role } = useSelector((state) => state.auth);
  const { isSmallScreen } = useSelector((state) => state.dbUi);
  const [isAuthorized, setisAuthorized] = useState(false);

  useEffect(() => {
    if (role === roleTypes.admin) {
      setisAuthorized(true);
    }
  }, [role]);

  const handleNavLinkClick = () => {
    if (isSmallScreen) {
      dispatch(setMenuState(false));
    }
  };

  return (
    <div className={`db-sidebar ${menuState}`}>
      <div className="db-sidebar__wrapper">
        <div className="db-sidebar__menu">
          <h3 className="db-sidebar__title">Dashboard</h3>
          <ul className="db-sidebar__list">
            <NavLink
              to="/dashboard/Home"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <LineStyle className="db-sidebar__icon" fontSize="large" />
                <span>Home</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/collaborators"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <Badge className="db-sidebar__icon" fontSize="large" />
                <span>Colaboradores</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/cleanups/summary"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <CleaningServices
                  className="db-sidebar__icon"
                  fontSize="large"
                />
                <span>Control de Limpieza</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/rfc"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <Grid3x3 className="db-sidebar__icon" fontSize="large" />
                <span>RFC</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <PermIdentity className="db-sidebar__icon" fontSize="large" />
                <span>Usuarios</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/authLogs"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <AccessTime className="db-sidebar__icon" fontSize="large" />
                <span>Log de Acceso</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/activityRegister"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <WorkOutline className="db-sidebar__icon" fontSize="large" />
                <span>Registro de actividades</span>
              </li>
            </NavLink>
            <NavLink
              to="/dashboard/misc"
              className={({ isActive }) => {
                return `db-sidebar__navlink ${isActive ? "active" : ""}`;
              }}
              onClick={handleNavLinkClick}
            >
              <li className="db-sidebar__listItem">
                <MiscellaneousServicesOutlined
                  className="db-sidebar__icon"
                  fontSize="large"
                />
                <span>Misc</span>
              </li>
            </NavLink>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Inactivo</h3>
          <ul className="sidebarList">
            {isAuthorized && (
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            )}

            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>

            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};
