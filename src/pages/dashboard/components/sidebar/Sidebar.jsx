import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
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
  Article,
} from "@mui/icons-material";
import { setMenuState } from "../../../../actions/dbUiActions";
import { SidebarLink } from "../SidebarLink";

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
    <div className={`c-sidebar ${menuState}`}>
      <div className="c-sidebar_menu">
        <h3 className="c-sidebar_title">Dashboard</h3>
        <ul className="c-sidebar_linksWrapper">
          <SidebarLink
            link="/dashboard/Home"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<LineStyle className="c-sidebar_icon" />}
            label="Home"
          />
          <SidebarLink
            link="/dashboard/collaborators"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<Badge className="db-c-sidebar__icon" />}
            label="Colaboradores"
          />
          <SidebarLink
            link="/dashboard/cleanups/summary"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<CleaningServices className="db-c-sidebar__icon" />}
            label="Limpieza"
          />

          <SidebarLink
            link="/dashboard/rfc"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<Grid3x3 className="db-c-sidebar__icon" />}
            label="RFC"
          />

          <SidebarLink
            link="/dashboard/users"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<PermIdentity className="db-c-sidebar__icon" />}
            label="Usuarios"
          />

          <SidebarLink
            link="/dashboard/authLogs"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<AccessTime className="db-c-sidebar__icon" />}
            label="Log de acceso"
          />

          <SidebarLink
            link="/dashboard/activityRegister"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<WorkOutline className="db-c-sidebar__icon" />}
            label="Registro de actividades"
          />

          <SidebarLink
            link="/dashboard/misc"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={
              <MiscellaneousServicesOutlined
                className="db-c-sidebar__icon"
                fontSize="large"
              />
            }
            label="Misc"
          />
          <SidebarLink
            link="/dashboard/documentation"
            handleNavLinkClick={handleNavLinkClick}
            muiIcon={<Article className="db-c-sidebar__icon" />}
            label="Documentación"
          />
        </ul>
      </div>
      {/* <div className="c-sidebarMenu">
          <h3 className="c-sidebarTitle">Inactivo</h3>
          <ul className="c-sidebarList">
            {isAuthorized && (
              <li className="c-sidebarListItem">
                <Timeline className="c-sidebarIcon" />
                Analytics
              </li>
            )}

            <li className="c-sidebarListItem">
              <TrendingUp className="c-sidebarIcon" />
              Sales
            </li>

            <Link to="/products" className="link">
              <li className="c-sidebarListItem">
                <Storefront className="c-sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="c-sidebarListItem">
              <AttachMoney className="c-sidebarIcon" />
              Transactions
            </li>
            <li className="c-sidebarListItem">
              <BarChart className="c-sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="c-sidebarMenu">
          <h3 className="c-sidebarTitle">Notifications</h3>
          <ul className="c-sidebarList">
            <li className="c-sidebarListItem">
              <MailOutline className="c-sidebarIcon" />
              Mail
            </li>
            <li className="c-sidebarListItem">
              <DynamicFeed className="c-sidebarIcon" />
              Feedback
            </li>
            <li className="c-sidebarListItem">
              <ChatBubbleOutline className="c-sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="c-sidebarMenu">
          <h3 className="c-sidebarTitle">Staff</h3>
          <ul className="c-sidebarList">
            <li className="c-sidebarListItem">
              <WorkOutline className="c-sidebarIcon" />
              Manage
            </li>
            <li className="c-sidebarListItem">
              <Timeline className="c-sidebarIcon" />
              Analytics
            </li>
            <li className="c-sidebarListItem">
              <Report className="c-sidebarIcon" />
              Reports
            </li>
          </ul>
        </div> */}
    </div>
  );
};
