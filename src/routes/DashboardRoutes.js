// ..., 176
import React, { Fragment } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { HomeDashPage } from "../components/pages/dashboard/home/HomeDashPage";
import UserList from "../components/pages/dashboard/userList/UserList";
import User from "../components/pages/dashboard/user/User";
import NewUser from "../components/pages/dashboard/users/newUser/NewUser";
import Collaborators from "../components/pages/dashboard/collaborators/Collaborators";
import NewCollaborator from "../components/pages/dashboard/collaborators/NewCollaborator";
import Collaborator from "../components/pages/dashboard/collaborators/Collaborator";

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

            <Route path="collaborators" element={<Collaborators />} />
            <Route
              path="collaborators/newCollaborator"
              element={<NewCollaborator />}
            />
            <Route
              path="collaborators/:collaboratorId"
              element={<Collaborator />}
            />
            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};
