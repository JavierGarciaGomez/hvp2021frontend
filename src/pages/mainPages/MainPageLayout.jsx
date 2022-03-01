import React from "react";
import { MainPagesNavbar } from "./components/MainPagesNavbar";
import { MainPageFooter } from "./components/MainPageFooter";
import { MainPageRouter } from "../../routes/MainPageRouter";

export const MainPageLayout = () => {
  return (
    <div className="mainPage">
      <MainPagesNavbar />
      <main className="l-pageContent u-bgPrimaryLightest">
        <MainPageRouter />
        <MainPageFooter />
      </main>
    </div>
  );
};
