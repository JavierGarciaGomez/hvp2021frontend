import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { startLogout } from "../../actions/authActions";
import { clientStartLoading } from "../../actions/clientsActions";
import { createFcmPartner } from "../../actions/fcmActions";
import { InputGroupNew } from "../../components/ui/InputGroupNew";
import { uploadImg } from "../../helpers/uploadImg";
import {
  fireSwalError,
  getLabelsAndValuesFromCollection,
  getRoleTypesLabelsAndValues,
} from "../../helpers/utilities";
import { useForm } from "../../hooks/useForm";
import { ClientRouter } from "../../routes/ClientRouter";
import { Topbar } from "../dashboard/components/topbar/Topbar";
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
