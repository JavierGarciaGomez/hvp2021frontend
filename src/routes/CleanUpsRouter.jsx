import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { AddNewDeepCleanup } from "../pages/dashboard/cleanUps/AddNewDeepCleanUp";
import { CleanUpsBranch } from "../pages/dashboard/cleanUps/CleanUpsBranch";
import { DeepCleanUpShow } from "../pages/dashboard/cleanUps/DeepCleanUpShow";
import { SummaryCleanUps } from "../pages/dashboard/cleanUps/SummaryCleanUps";
import { HomeDashPage } from "../pages/dashboard/home/HomeDashPage";

import { MainPageServicesRouter } from "./MainPagesServicesRouter";

export const CleanUpsRouter = () => {
  return (
    <Routes>
      {/* <Route path="*" element={<MainPageIndex />} /> */}
      <Route path="summary" element={<SummaryCleanUps />} />
      <Route path=":branch" element={<CleanUpsBranch />} />
      <Route
        path=":branch/addNewDeepCleaning"
        element={<AddNewDeepCleanup />}
      />
      <Route path=":branch/:deepCleanUpId" element={<DeepCleanUpShow />} />
      {/* <Route path="services/*" element={<MainPageServicesRouter />} />
      <Route path="team" element={<MainPagesTeam />} />
      <Route path="company" element={<MainPagesCompany />} />
      <Route path="contact" element={<MainPagesContact />} /> */}
      {/* <Route path="users" element={<UserList />} />
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
          <Route path="*" element={<Navigate to="home" />} /> */}
    </Routes>
  );
};
