import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPagesNavbar } from "./components/MainPagesNavbar";
import { MainPageFooter } from "./components/MainPageFooter";
import { MainPageRouter } from "../../routes/MainPageRouter";
import "./mainPageLayout.css";

export const MainPageLayout = () => {
  return (
    <div className="mainPage">
      <MainPagesNavbar />
      <main className="mp-content">
        <MainPageRouter />
        <MainPageFooter />
      </main>
    </div>
  );
};
