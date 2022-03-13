import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { AuthPage } from "../pages/authPages/loginPage/AuthPage";
import { MainPageLayout } from "../pages/mainPages/MainPageLayout";
import { TestPage } from "../pages/test/TestPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ClientWelcome } from "../pages/clientsPages/ClientWelcome";
import { roleTypes } from "../types/types";

import { DashboardLayout } from "../pages/dashboard/DashboardLayout";
import { checkAuthorization } from "../helpers/utilities";
import { ClientLayout } from "../pages/clientsPages/ClientLayout";
import { TestDynamicFormik } from "../pages/test/TestDynamicFormik";
import { FcmBreedingFormik2 } from "../pages/clientsPages/FcmBreedingFormik2";
import { TestFormikUpload } from "../pages/test/TestFormikUpload";
import { FcmTransferFormikNew } from "../pages/clientsPages/FcmTransferFormikNew";

export const AppRouter = () => {
  const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { checking, role } = useSelector((state) => state.auth);
  // const [isCollaborator, setisCollaborator] = useState(false);

  // todo: doing google login

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  // useEffect(() => {
  //   setisCollaborator(checkAuthorization(role, roleTypes.collaborator));
  // }, [role]);

  if (checking) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          {checkAuthorization(role, roleTypes.collaborator) && (
            <Route path="/dashboard/*" element={<DashboardLayout />}></Route>
          )}
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/auth/:token" element={<AuthPage />}></Route>
          {role === "User" && (
            <Route path="/clients/*" element={<ClientLayout />}></Route>
          )}

          <Route path="/*" element={<MainPageLayout />}></Route>
          <Route path="/test" element={<FcmTransferFormikNew />}></Route>

          {/* <Route path="*" element={<LoginPage />} /> */}

          {/* <Route path="/auth/register" element={<LoginPage />} /> */}
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};
