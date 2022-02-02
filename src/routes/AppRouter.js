import { CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { LoginPage } from "../pages/authPages/loginPage/LoginPage";
import { RegisterPage } from "../pages/authPages/loginPage/RegisterPage";
import { MainPageContainer } from "../pages/mainPages/MainPageContainer";
import { TestPage } from "../pages/test/TestPage";

import { DashboardRoutes } from "./DashboardRoutes";
import { MainPageRouter } from "./MainPageRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, isAuthenticated } = useSelector((state) => state.auth);

  console.log("checking now is", checking, isAuthenticated);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch, checking]);

  if (checking) {
    return <CircularProgress />;
  }

  return (
    <HashRouter>
      <Routes>
        {isAuthenticated && (
          <Route path="/dashboard/*" element={<DashboardRoutes />}></Route>
        )}

        <Route path="/auth/login" element={<LoginPage />}></Route>
        <Route path="/auth/register" element={<RegisterPage />}></Route>

        <Route path="/*" element={<MainPageContainer />}></Route>
        <Route path="/test" element={<TestPage />}></Route>

        {/* <Route path="*" element={<LoginPage />} /> */}

        {/* <Route path="/auth/register" element={<LoginPage />} /> */}
      </Routes>
    </HashRouter>
  );
};
