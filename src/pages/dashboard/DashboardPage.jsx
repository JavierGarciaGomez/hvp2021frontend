import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import { HomeDashPage } from "../../components/pages/dashboard/home/HomeDashPage";

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
