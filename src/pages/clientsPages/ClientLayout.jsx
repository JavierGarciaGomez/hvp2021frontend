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
import { ClientRouter } from "../../routes/ClientRouter";
import { Topbar } from "../dashboard/components/topbar/Topbar";
import { ClientsTopbar } from "./components/ClientsTopbar";

export const ClientLayout = () => {
  const dispatch = useDispatch();
  const { values, handleInputChange, reset, setFullValues } = useForm();
  const [imgUrl, setimgUrl] = useState(null);

  console.log("estos son values,", values);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createFcmPartner(values));
  };

  return (
    <Fragment>
      <ClientsTopbar />
      <div className="l-clientsMain">
        <ClientRouter />
      </div>
    </Fragment>
  );
};
