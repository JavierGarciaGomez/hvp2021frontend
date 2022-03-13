import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { clientStartLoading } from "../../actions/clientsActions";
import { ClientRouter } from "../../routes/ClientRouter";

import { ClientsTopbar } from "./components/ClientsTopbar";

export const ClientLayout = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { clientsIsLoading } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(clientStartLoading(uid));
  }, [dispatch]);

  return (
    <Fragment>
      <ClientsTopbar />
      <div className="l-clientsMain">
        <div className="container">
          {clientsIsLoading ? <CircularProgress /> : <ClientRouter />}
        </div>
      </div>
    </Fragment>
  );
};
