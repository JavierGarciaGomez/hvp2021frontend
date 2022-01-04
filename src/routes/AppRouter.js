import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../components/pages/dashboard/DashboardPage";
import { Topbar } from "../components/topbar/Topbar";
import { LoginPage } from "../pages/LoginPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LoginPage />} />
        {/* <Route path="/auth/register" element={<LoginPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
