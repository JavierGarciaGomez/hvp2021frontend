import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPagesNavbar } from "../components/mainPageComponents/common/MainPagesNavbar";
import { MainPageIndex } from "../pages/mainPages/index/MainPageIndex";
import { MainPagesAdvices } from "../pages/mainPages/MainPagesAdvices";
import { MainPagesServices } from "../pages/mainPages/MainPagesServices";

import "./mainPageRouter.css";
import { MainPageServicesRouter } from "./MainPagesServicesRouter";

export const MainPageRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<MainPageIndex />} />
      <Route path="advices" element={<MainPagesAdvices />} />
      <Route path="services/*" element={<MainPageServicesRouter />} />
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
