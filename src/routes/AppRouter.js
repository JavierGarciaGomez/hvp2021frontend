import { CircularProgress, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { AuthPage } from "../pages/authPages/loginPage/AuthPage";
import { LoginTab } from "../pages/authPages/loginPage/LoginTab";
import { RegisterColTab } from "../pages/authPages/loginPage/RegisterColTab";
import { MainPageLayout } from "../pages/mainPages/MainPageLayout";
import { TestPage } from "../pages/test/TestPage";

import { DashboardRouter } from "./DashboardRouter";
import { MainPageRouter } from "./MainPageRouter";
import { createTheme } from "@mui/material/styles";
import { ClientWelcome } from "../pages/clientsPages/ClientWelcome";
import { roleTypes } from "../types/types";
import { checkAutorization } from "../helpers/utilities";
import { DashboardLayout } from "../pages/dashboard/DashboardLayout";

export const AppRouter = () => {
  const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { checking, role } = useSelector((state) => state.auth);
  const [isCollaborator, setisCollaborator] = useState(false);

  // todo: doing google login

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch, checking]);

  useEffect(() => {
    setisCollaborator(checkAutorization(role, roleTypes.collaborator));
  }, [role]);

  console.log("checking", checking);
  if (checking) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          {isCollaborator && (
            <Route path="/dashboard/*" element={<DashboardLayout />}></Route>
          )}
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/auth/:token" element={<AuthPage />}></Route>
          <Route path="/clients" element={<ClientWelcome />}></Route>
          <Route path="/*" element={<MainPageLayout />}></Route>
          <Route path="/test" element={<TestPage />}></Route>

          {/* <Route path="*" element={<LoginPage />} /> */}

          {/* <Route path="/auth/register" element={<LoginPage />} /> */}
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};
