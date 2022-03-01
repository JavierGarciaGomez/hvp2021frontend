import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export const SidebarLink = ({ link, muiIcon, handleNavLinkClick, label }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => {
        return `c-sidebar_navlink ${isActive ? "active" : ""}`;
      }}
      onClick={handleNavLinkClick}
    >
      <li className="c-sidebar_listItem">
        {muiIcon}
        <span className="c-sidebar_label u-ms-1r">{label}</span>
      </li>
    </NavLink>
  );
};
