import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  activityRegisterStartUpdate,
  createActivityRegister,
} from "../../../../actions/activityRegisterActions";
import { fireSwalError, getKeyByValue } from "../../../../helpers/utilities";
import { useForm } from "../../../../hooks/useForm";

export const ActivityRegisterForm = ({
  activityRegister,
  handleShowForm,
  showCancel,
  showEndDate,
  isNewActivity,
}) => {
  const dispatch = useDispatch();
  const { activityRegisterTypes, activeRegister } = useSelector(
    (state) => state.activityRegister
  );

  console.log("ACTIVITY REGISTER FORM", activityRegister);

  let initialValues = {
    ...activityRegister,
    activity: getKeyByValue(activityRegisterTypes, activityRegister.activity),
    startingTime: dayjs(activityRegister.startingTime).format(
      "YYYY-MM-DDTHH:mm"
    ),
    endingTime: dayjs(activityRegister.endingTime).format("YYYY-MM-DDTHH:mm"),
  };
  if (!showEndDate) {
    delete initialValues.endingTime;
  }
  if (isNewActivity) {
    initialValues = {
      activity: "",
      startingTime: "",
      endingTime: "",
      desc: "",
    };
  }

  const { values, handleInputChange } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNewActivity) {
      if (values.activity === "" || values.startingTime === "") {
        return fireSwalError(
          "No puedes crear un registro sin determinar primero una actividad y una hora de inicio"
        );
      }
      dispatch(
        createActivityRegister({
          ...values,
          activity: activityRegisterTypes[values.activity],
        })
      );
      handleShowForm();
    } else {
      dispatch(
        activityRegisterStartUpdate({
          ...values,
          activity: activityRegisterTypes[values.activity],
        })
      );
      handleShowForm();
    }
  };

  return (
    <div className="activityRegisterNewActivityForm l-singleCardContainer mb-3r">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6 mb-3">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ fontSize: "1.6rem" }}
            >
              Actividad
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.activity}
              name="activity"
              label="Actividad"
              onChange={handleInputChange}
              sx={{ fontSize: "1.6rem" }}
            >
              {Object.keys(activityRegisterTypes).map((key) => {
                return (
                  <MenuItem key={key} value={key} sx={{ fontSize: "1.6rem" }}>
                    {activityRegisterTypes[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="" className="form-label mb-3">
            Descripción (opcional)
          </label>
          <input
            type="text"
            className="form-control mb-3"
            name="desc"
            placeholder="Descripción"
            value={values.desc}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="" className="form-label mb-3">
            Fecha y hora de inicio
          </label>
          <input
            type="datetime-local"
            className="form-control mb-3"
            name="startingTime"
            placeholder="Fecha y hora de inicio"
            value={values.startingTime}
            onChange={handleInputChange}
          />
        </div>
        {showEndDate && (
          <div className="col-md-6 mb-3">
            <label htmlFor="" className="form-label mb-3">
              Fecha y hora de fin
            </label>
            <input
              type="datetime-local"
              className="form-control mb-3"
              name="endingTime"
              placeholder="Fecha y hora de conclusión"
              value={values.endingTime}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className="d-flex justify-content-evenly">
          <button className="btn btn-primary" type="submit">
            Guardar
          </button>
          {showCancel && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleShowForm}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
