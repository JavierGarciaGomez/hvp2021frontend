import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/authPages/loginPage/LoginPage";
import { RegisterPage } from "../pages/authPages/loginPage/RegisterPage";
import { MainPageContainer } from "../pages/mainPages/MainPageContainer";

import { DashboardRoutes } from "./DashboardRoutes";
import { MainPageRouter } from "./MainPageRouter";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardRoutes />}></Route>
        <Route path="/auth/login" element={<LoginPage />}></Route>
        <Route path="/auth/register" element={<RegisterPage />}></Route>

        <Route path="/*" element={<MainPageContainer />}></Route>

        {/* <Route path="*" element={<LoginPage />} /> */}

        {/* <Route path="/auth/register" element={<LoginPage />} /> */}
      </Routes>
    </HashRouter>
  );
};
