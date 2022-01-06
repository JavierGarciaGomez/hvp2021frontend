// ..., 176
import React, { Fragment } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { HomeDashPage } from "../components/pages/dashboard/home/HomeDashPage";
import UserList from "../components/pages/dashboard/userList/UserList";
import User from "../components/pages/dashboard/user/User";
import NewUser from "../components/pages/dashboard/users/newUser/NewUser";

export const DashboardRoutes = () => {
  return (
    <Fragment>
      <Topbar />

      <div className="dashboard-bottom-container">
        <Sidebar />
        <div className="dashboard-main">
          <Routes>
            <Route path="home" element={<HomeDashPage />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/newUser" element={<NewUser />} />
            <Route path="users/:userId" element={<User />} />
            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};
