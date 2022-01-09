import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/loginPage/LoginPage";

import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardRoutes />}></Route>
        <Route path="*" element={<DashboardRoutes />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="*" element={<LoginPage />} /> */}

        {/* <Route path="/auth/register" element={<LoginPage />} /> */}
      </Routes>
    </HashRouter>
  );
};
