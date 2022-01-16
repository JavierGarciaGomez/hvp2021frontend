// ..., 176
import React, { Fragment } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { Topbar } from "../components/topbar/Topbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import { HomeDashPage } from "../pages/dashboard/home/HomeDashPage";
import NewUser from "../pages/dashboard/users/newUser/NewUser";
import User from "../pages/dashboard/user/User";
import UserList from "../pages/dashboard/userList/UserList";
import Collaborators from "../pages/dashboard/collaborators/Collaborators";
import NewCollaborator from "../pages/dashboard/collaborators/NewCollaborator";
import Collaborator from "../pages/dashboard/collaborators/Collaborator";
import { CleanUpsPage } from "../pages/dashboard/cleanUps/CleanUpsPage";

export const DashboardRoutes = () => {
  return (
    <Fragment>
      <Topbar />

      <div className="dashboard-bottom-container">
        <Sidebar />
        <div className="dashboard-main">
          <Routes>
            {/* HOME */}
            <Route path="home" element={<HomeDashPage />} />

            <Route path="users" element={<UserList />} />
            <Route path="users/newUser" element={<NewUser />} />
            <Route path="users/:userId" element={<User />} />

            {/* Collaborators */}
            <Route path="collaborators" element={<Collaborators />} />
            <Route
              path="collaborators/newCollaborator"
              element={<NewCollaborator />}
            />
            <Route
              path="collaborators/:collaboratorId"
              element={<Collaborator />}
            />
            <Route path="cleanups" element={<CleanUpsPage />} />

            {/* Cleanups */}
            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};
