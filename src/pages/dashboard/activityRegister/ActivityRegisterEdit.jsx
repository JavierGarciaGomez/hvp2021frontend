import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { hour, minute, second } from "../../../helpers/constants";

import { useForm } from "../../../hooks/useForm";
import { getKeyByValue, isObjectEmpty } from "../../../helpers/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  activeActivityRegisterStartLoading,
  activityRegistersStartLoading,
  activityRegistersStartLoadingActive,
  activityRegisterStartUpdate,
  createActivityRegister,
  setActiveActivityRegister,
} from "../../../actions/activityRegisterActions";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { ActivityRegisterForm } from "./components/ActivityRegisterForm";
dayjs.extend(duration);

export const ActivityRegisterEdit = () => {
  const { actRegId } = useParams();

  // todo check what is need it
  const dispatch = useDispatch();
  const { activeRegister, isLoadingAcitivityRegisters } = useSelector(
    (state) => state.activityRegister
  );

  // load active register
  useEffect(() => {
    dispatch(activeActivityRegisterStartLoading(actRegId));
  }, [dispatch]);

  if (isLoadingAcitivityRegisters) {
    return <CircularProgress />;
  }
  return (
    <div className="p-5">
      <div className="activityRegisterHeading mb-3r">
        <h2 className="heading--secondary">Editar actividad</h2>
      </div>

      <ActivityRegisterForm
        activityRegister={activeRegister}
        showCancel={false}
        showEndDate={true}
      />
    </div>
  );
};
