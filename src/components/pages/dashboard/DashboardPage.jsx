import React, { Fragment } from "react";
import { Sidebar } from "../../sidebar/Sidebar";
import { Topbar } from "../../topbar/Topbar";
import { HomeDashPage } from "./home/HomeDashPage";

export const DashboardPage = () => {
  return (
    <Fragment>
      <Topbar></Topbar>
      <div className="dashboard-bottom-container">
        <Sidebar />
        <div className="dashboard-main">
          <HomeDashPage />
        </div>
      </div>
    </Fragment>
  );
};
