import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPagesNavbar } from "./components/MainPagesNavbar";
import { MainPageFooter } from "./components/MainPageFooter";
import { MainPageRouter } from "../../routes/MainPageRouter";
import "./mainPageContainer.css";

export const MainPageContainer = () => {
  return (
    <div className="mainPage">
      <MainPagesNavbar />
      <main className="mainPageContent">
        <MainPageRouter />
      </main>
      <MainPageFooter />
    </div>
  );
};
