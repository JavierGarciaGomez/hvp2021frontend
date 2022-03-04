// ..., 176
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ClientProfile } from "../pages/clientsPages/ClientProfile";
import { ClientSelectProcedure } from "../pages/clientsPages/ClientSelectProcedure";
import { ClientWelcome } from "../pages/clientsPages/ClientWelcome";
import { FcmPartnerForm } from "../pages/clientsPages/FcmPartnerForm";
import { FcmPartnerFormik } from "../pages/clientsPages/FcmPartnerFormik";

export const ClientRouter = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="home" element={<ClientWelcome />} />

      {/* FCMPartner */}
      {/* CreateNew */}
      <Route path="fcmPartner/:id" element={<FcmPartnerFormik />} />
      <Route path="fcmSelectProcedure" element={<ClientSelectProcedure />} />
      <Route path="clientProfile" element={<ClientProfile />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
};
