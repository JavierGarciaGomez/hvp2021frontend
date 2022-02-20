import { CircularProgress, MenuItem, TextField } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@mui/material";
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
  activityRegistersStartLoading,
  activityRegistersStartLoadingActive,
  activityRegisterStartUpdate,
  createActivityRegister,
  setActiveActivityRegister,
} from "../../../actions/activityRegisterActions";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useParams } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { ActivityRegisterForm } from "./components/ActivityRegisterForm";
dayjs.extend(duration);

// todo: delete
const initialNewActivityFormValues = {
  activity: "",
  startingTime: "",
  endingTime: "",
  desc: "",
};

export const ActivityRegisterEdit = () => {
  const { colId, actRegId } = useParams();
  const [isLoading, setisLoading] = useState(true);
  // todo check what is need it
  const dispatch = useDispatch();
  const {
    activeColRegisters,

    isLoadingAcitivityRegisters,
    activityRegisterTypes,
    lastActivityRegister,
    activeRegister,
  } = useSelector((state) => state.activityRegister);

  const [isTimerActive, setisTimerActive] = useState(false);

  // Todo: DOING
  // Load register
  useEffect(() => {
    // if there are no registers, load them
    if (isObjectEmpty(activeColRegisters)) {
      dispatch(activityRegistersStartLoading());
    } else {
      const activeRegister = activeColRegisters.find(
        (element) => element._id === actRegId
      );
      dispatch(setActiveActivityRegister(activeRegister));
      setisLoading(false);
    }
  }, [dispatch, activeColRegisters]);

  if (isLoading) {
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
