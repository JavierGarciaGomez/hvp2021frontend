import React, { Fragment } from "react";

import { DashboardRouter } from "../../routes/DashboardRouter";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Topbar } from "./components/topbar/Topbar";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { setMenuView, setSmallScreen } from "../../actions/dbUiActions";
import { useEffect } from "react";

export const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isMenuOpen, isSmallScreen } = useSelector((state) => state.dbUi);

  const isASmallScreen = useMediaQuery({ query: "(max-width: 900px)" });
  useEffect(() => {
    dispatch(setSmallScreen(isASmallScreen));
  }, [isASmallScreen]);

  // set the view according both values
  useEffect(() => {
    dispatch(setMenuView(isMenuOpen, isSmallScreen));
  }, [isMenuOpen, isSmallScreen]);

  return (
    <Fragment>
      <Topbar />

      <div className="l-dashboardBottomContainer">
        <Sidebar />
        <div className="l-dashboardMain">
          <DashboardRouter />
        </div>
      </div>
    </Fragment>
  );
};
