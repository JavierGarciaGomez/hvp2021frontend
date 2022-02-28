import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { FcmCalculator } from "../pages/mainPages/FCM/components/FcmCalculator";

import { FcmContestCertificate } from "../pages/mainPages/FCM/FcmContestCertificate";
import { FcmInitialRacePurity } from "../pages/mainPages/FCM/FcmInitialRacePurity";
import { FcmInitialRegister } from "../pages/mainPages/FCM/FcmInitialRegister";
import { FcmPartnership } from "../pages/mainPages/FCM/FcmPartnership";
import { FCMPedigree } from "../pages/mainPages/FCM/FCMPedigree";
import { FcmRacePurity } from "../pages/mainPages/FCM/FcmRacePurity";
import { FcmTransfer } from "../pages/mainPages/FCM/FcmTransfer";

export const FCMRouter = () => {
  return (
    <Routes>
      <Route path="fcmCalc" element={<FcmCalculator />} />
      <Route path="pedigree" element={<FCMPedigree />} />
      <Route path="racePurity" element={<FcmRacePurity />} />
      <Route path="initialRacePurity" element={<FcmInitialRacePurity />} />
      <Route path="initialRegister" element={<FcmInitialRegister />} />
      <Route path="contestCertificate" element={<FcmContestCertificate />} />
      <Route path="transfer" element={<FcmTransfer />} />
      <Route path="partnership" element={<FcmPartnership />} />
    </Routes>
  );
};
