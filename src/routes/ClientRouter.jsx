// ..., 176
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ClientSelectProcedure } from "../pages/clientsPages/ClientSelectProcedure";
import { ClientWelcome } from "../pages/clientsPages/ClientWelcome";
import { FcmPartnerForm } from "../pages/clientsPages/FcmPartnerForm";

export const ClientRouter = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="home" element={<ClientWelcome />} />

      {/* FCMPartner */}
      {/* CreateNew */}
      <Route path="fcmPartnerNew" element={<FcmPartnerForm />} />
      <Route path="fcmSelectProcedure" element={<ClientSelectProcedure />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
};