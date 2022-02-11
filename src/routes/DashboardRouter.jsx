// ..., 176
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeDashPage } from "../pages/dashboard/home/HomeDashPage";
import NewUser from "../pages/dashboard/users/newUser/NewUser";
import User from "../pages/dashboard/user/User";
import Users from "../pages/dashboard/users/newUser/Users";
import Collaborators from "../pages/dashboard/collaborators/Collaborators";
import NewCollaborator from "../pages/dashboard/collaborators/NewCollaborator";
import Collaborator from "../pages/dashboard/collaborators/Collaborator";
import { CleanUpsLayoutPage } from "../pages/dashboard/cleanUps/CleanUpsLayout";
import { CreateNewRFC } from "../pages/dashboard/rfc/CreateNewRFC";
import { EditRFC } from "../pages/dashboard/rfc/EditRFC";
import { AuthLogPage } from "../pages/dashboard/authLogs/AuthLogPage";

export const DashboardRouter = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="home" element={<HomeDashPage />} />

      {/* Users */}
      <Route path="users" element={<Users />} />
      <Route path="users/newUser" element={<NewUser />} />
      <Route path="users/:userId" element={<User />} />

      {/* Collaborators */}
      <Route path="collaborators" element={<Collaborators />} />
      <Route
        path="collaborators/newCollaborator"
        element={<NewCollaborator />}
      />
      <Route path="collaborators/:collaboratorId" element={<Collaborator />} />
      {/* Cleanups */}
      <Route path="cleanups/*" element={<CleanUpsLayoutPage />} />

      {/* RFC */}
      <Route path="rfc" element={<CreateNewRFC />} />
      <Route path="rfc/:rfcId" element={<EditRFC />} />

      {/* AuthLogs */}
      <Route path="authLogs" element={<AuthLogPage />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
};
