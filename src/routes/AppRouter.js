import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../components/pages/dashboard/DashboardPage";
import { HomeDashPage } from "../components/pages/dashboard/home/HomeDashPage";
import { Topbar } from "../components/topbar/Topbar";
import { LoginPage } from "../pages/LoginPage";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<DashboardRoutes />}></Route>

        <Route path="*" element={<LoginPage />} />

        {/* <Route path="/auth/register" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
