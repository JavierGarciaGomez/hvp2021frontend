import { CircularProgress, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { AuthPage } from "../pages/authPages/loginPage/AuthPage";
import { LoginTab } from "../pages/authPages/loginPage/LoginTab";
import { RegisterColTab } from "../pages/authPages/loginPage/RegisterColTab";
import { MainPageContainer } from "../pages/mainPages/MainPageContainer";
import { TestPage } from "../pages/test/TestPage";

import { DashboardRoutes } from "./DashboardRoutes";
import { MainPageRouter } from "./MainPageRouter";
import { createTheme } from "@mui/material/styles";

export const AppRouter = () => {
  const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 10,
    },
  });
  const dispatch = useDispatch();
  const { checking, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch, checking]);

  if (checking) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          {isAuthenticated && (
            <Route path="/dashboard/*" element={<DashboardRoutes />}></Route>
          )}
          <Route path="/auth" element={<AuthPage />}></Route>

          <Route path="/*" element={<MainPageContainer />}></Route>
          <Route path="/test" element={<TestPage />}></Route>

          {/* <Route path="*" element={<LoginPage />} /> */}

          {/* <Route path="/auth/register" element={<LoginPage />} /> */}
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
};
