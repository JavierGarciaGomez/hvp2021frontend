import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { startLogout } from "../../actions/authActions";
import { createFcmPartner } from "../../actions/fcmActions";
import { InputGroupNew } from "../../components/ui/InputGroupNew";
import { uploadImg } from "../../helpers/uploadImg";
import {
  fireSwalError,
  getLabelsAndValuesFromCollection,
  getRoleTypesLabelsAndValues,
} from "../../helpers/utilities";
import { useForm } from "../../hooks/useForm";
import { Topbar } from "../dashboard/components/topbar/Topbar";
import { ClientsTopbar } from "./components/ClientsTopbar";

export const ClientWelcome = () => {
  return (
    <Fragment>
      <h2>Bienvenido</h2>
    </Fragment>
  );
};
