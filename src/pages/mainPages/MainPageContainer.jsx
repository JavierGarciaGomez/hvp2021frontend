import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPagesNavbar } from "../../components/mainPageComponents/common/MainPagesNavbar";
import { MainPageFooter } from "../../components/mainPageComponents/MainPageFooter";
import { MainPageRouter } from "../../routes/MainPageRouter";
import { MainPageIndex } from "./index/MainPageIndex";
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
