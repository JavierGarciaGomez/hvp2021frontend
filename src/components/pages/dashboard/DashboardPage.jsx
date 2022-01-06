import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../sidebar/Sidebar";
import { Topbar } from "../../topbar/Topbar";
import { HomeDashPage } from "./home/HomeDashPage";

export const DashboardPage = () => {
  return (
    <Fragment>
      <Topbar />
      <div className="dashboard-bottom-container">
        <Sidebar />
        <div className="dashboard-main"></div>
      </div>
    </Fragment>
  );
};
