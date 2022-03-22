// ..., 176
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomeDashPage } from "../pages/dashboard/home/HomeDashPage";
import NewUser from "../pages/dashboard/users/newUser/NewUser";
import User from "../pages/dashboard/user/User";
import Users from "../pages/dashboard/users/newUser/Users";
import Collaborators from "../pages/dashboard/collaborators/Collaborators";
import NewCollaborator from "../pages/dashboard/collaborators/NewCollaborator";
import Collaborator from "../pages/dashboard/collaborators/Collaborator";
import { CleanUpsLayoutPage } from "../pages/dashboard/cleanUps/CleanUpsLayout";
import { CreateNewRFC } from "../pages/dashboard/rfc/CreateNewRFC";
import { EditRFC } from "../pages/dashboard/rfc/EditRFC";
import { AuthLogPage } from "../pages/dashboard/authLogs/AuthLogPage";
import { ActivityRegisterCol } from "../pages/dashboard/activityRegister/ActivityRegisterCol";

import { ActivityRegisterSelect } from "../pages/dashboard/activityRegister/ActivityRegisterSelect";
import { ActivityRegisterEdit } from "../pages/dashboard/activityRegister/ActivityRegisterEdit";
import { Misc } from "../pages/dashboard/misc/Misc";
import { Documentation } from "../pages/dashboard/documentation/Documentation";
import { DocumentationForm } from "../pages/dashboard/documentation/components/DocumentationForm";
import { TestPage } from "../pages/test/TestPage";
import { FcmIndex } from "../pages/dashboard/fcm/FcmIndex";
import { FcmPartnersIndex } from "../pages/dashboard/fcm/FcmPartnersIndex";

import { FcmPartner } from "../pages/dashboard/fcm/FcmPartner";
import { FcmDogsIndex } from "../pages/dashboard/fcm/FcmDogsIndex";
import { FcmDog } from "../pages/dashboard/fcm/FcmDog";
import { FcmTransfersIndex } from "../pages/dashboard/fcm/FcmTransfersIndex.jsx";
import { FcmTransfer } from "../pages/dashboard/fcm/FcmTransfer";
import { FcmPackagesIndex } from "../pages/dashboard/fcm/FcmPackagesIndex";
import { FcmPackage } from "../pages/dashboard/fcm/FcmPackage";

export const DashboardRouter = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="home" element={<HomeDashPage />} />

      {/* Users */}
      <Route path="users" element={<Users />} />
      <Route path="users/newUser" element={<NewUser />} />
      <Route path="users/:userId" element={<User />} />

      {/* Collaborators */}
      <Route path="collaborators" element={<Collaborators />} />
      <Route
        path="collaborators/newCollaborator"
        element={<NewCollaborator />}
      />
      <Route path="collaborators/:collaboratorId" element={<Collaborator />} />
      {/* Cleanups */}
      <Route path="cleanups/*" element={<CleanUpsLayoutPage />} />

      {/* RFC */}
      <Route path="rfc" element={<CreateNewRFC />} />
      <Route path="rfc/:rfcId" element={<EditRFC />} />

      {/* AuthLogs */}
      <Route path="authLogs" element={<AuthLogPage />} />

      {/* Activity Register */}
      <Route path="activityRegister" element={<ActivityRegisterCol />} />
      <Route path="activityRegister/all" element={<ActivityRegisterSelect />} />
      <Route
        path="activityRegister/:colId"
        element={<ActivityRegisterEdit />}
      />
      <Route
        path="activityRegister/:colId/:actRegId"
        element={<ActivityRegisterEdit />}
      />

      {/* Misc */}
      <Route path="misc" element={<Misc />} />
      {/* Documentation */}
      <Route path="documentation" element={<Documentation />} />
      <Route path="documentation/:docId" element={<DocumentationForm />} />

      {/* FCM */}
      <Route path="fcm" element={<FcmIndex />} />
      <Route path="fcm/fcmPartners" element={<FcmPartnersIndex />} />
      <Route path="fcm/fcmPartners/createNew" element={<FcmPartner />} />
      <Route path="fcm/fcmPartners/:id" element={<FcmPartner />} />
      <Route path="fcm/fcmDogs" element={<FcmDogsIndex />} />
      <Route path="fcm/fcmDogs/createNew" element={<FcmDog />} />
      <Route path="fcm/fcmDogs/:id" element={<FcmDog />} />
      <Route path="fcm/fcmTransfers" element={<FcmTransfersIndex />} />
      <Route path="fcm/fcmTransfers/createNew" element={<FcmTransfer />} />
      <Route path="fcm/fcmTransfers/:id" element={<FcmTransfer />} />
      <Route path="fcm/fcmPackages" element={<FcmPackagesIndex />} />
      <Route path="fcm/fcmPackages/createNew" element={<FcmPackage />} />
      <Route path="fcm/fcmPackages/:fcmPackageId" element={<FcmPackage />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="home" />} />
    </Routes>
  );
};
