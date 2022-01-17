import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPagesNavbar } from "../components/mainPageComponents/common/MainPagesNavbar";
import { AddNewDeepCleaning } from "../pages/dashboard/cleanUps/AddNewDeepCleaning";
import { CleanUpsBranch } from "../pages/dashboard/cleanUps/CleanUpsBranch";
import { MainPageIndex } from "../pages/mainPages/index/MainPageIndex";
import { MainPagesAdvices } from "../pages/mainPages/MainPagesAdvices";
import { MainPagesCompany } from "../pages/mainPages/MainPagesCompay";
import { MainPagesContact } from "../pages/mainPages/MainPagesContact";
import { MainPagesServices } from "../pages/mainPages/MainPagesServices";
import { MainPagesTeam } from "../pages/mainPages/MainPagesTeam";

import "./mainPageRouter.css";
import { MainPageServicesRouter } from "./MainPagesServicesRouter";

export const CleanUpsRouter = () => {
  return (
    <Routes>
      {/* <Route path="*" element={<MainPageIndex />} /> */}
      <Route path=":branch" element={<CleanUpsBranch />} />
      <Route
        path=":branch/addNewDeepCleaning"
        element={<AddNewDeepCleaning />}
      />
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
