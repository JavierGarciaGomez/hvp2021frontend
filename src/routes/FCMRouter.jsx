import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { AddNewDeepCleanup } from "../pages/dashboard/cleanUps/AddNewDeepCleanUp";
import { CleanUpsBranch } from "../pages/dashboard/cleanUps/CleanUpsBranch";
import { DeepCleanUpShow } from "../pages/dashboard/cleanUps/DeepCleanUpShow";
import { SummaryCleanUps } from "../pages/dashboard/cleanUps/SummaryCleanUps";
import { HomeDashPage } from "../pages/dashboard/home/HomeDashPage";
import { FCMCalc } from "../pages/mainPages/FCM/FCMCalc";
import { FCMIndex } from "../pages/mainPages/FCM/FCMIndex";
import { FCMLayout } from "../pages/mainPages/FCM/FCMLayout";
import { FCMPedigree } from "../pages/mainPages/FCM/FCMPedigree";
import { TestPage } from "../pages/test/TestPage";

import { MainPageServicesRouter } from "./MainPagesServicesRouter";

export const FCMRouter = () => {
  return (
    <Routes>
      {/* <Route path="*" element={<MainPageIndex />} /> */}

      <Route path="fcmCalc" element={<FCMCalc />} />
      <Route path="pedigree" element={<FCMPedigree />} />
    </Routes>
  );
};
