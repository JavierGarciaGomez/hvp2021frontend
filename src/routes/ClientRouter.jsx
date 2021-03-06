// ..., 176
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ClientPendingProcedures } from "../pages/clientsPages/ClientPendingProcedures";
import { ClientProfile } from "../pages/clientsPages/ClientProfile";
import { ClientSelectProcedure } from "../pages/clientsPages/ClientSelectProcedure";
import { ClientWelcome } from "../pages/clientsPages/ClientWelcome";
import { FcmDogFormik } from "../pages/clientsPages/FcmDogFormik";
import { FcmPartnerFormik } from "../pages/clientsPages/FcmPartnerFormik";
import { FcmProcedureLayout } from "../pages/clientsPages/layouts/FcmProcedureLayout";

import { ProcedurePedigree } from "../pages/clientsPages/ProcedurePedigree";

export const ClientRouter = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="home" element={<ClientWelcome />} />

      {/* FCMPartner */}
      {/* CreateNew */}
      <Route path="fcmPartner/:id" element={<FcmPartnerFormik />} />
      <Route path="fcmDog/:id" element={<FcmDogFormik />} />
      <Route path="fcmSelectProcedure" element={<ClientSelectProcedure />} />
      <Route path="fcmPendingProcedures" element={<ClientPendingProcedures />} />
      <Route path="clientProfile" element={<ClientProfile />} />
      <Route path="procedure/pedigree" element={<ProcedurePedigree />} />
      <Route path="procedure/pedigree/:id" element={<ProcedurePedigree />} />
      <Route path="procedure/" element={<FcmProcedureLayout />} />
      <Route path="procedure/:id" element={<FcmProcedureLayout />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
};
