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
    console.log("ESTO ES EL FORM", values);
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
        })
      );
      handleShowForm();
    } else {
      dispatch(
        activityRegisterStartUpdate({
          ...values,
        })
      );
      if (showCancel) {
        handleShowForm();
      }
    }
  };

  return (
    <div className="activityRegisterNewActivityForm l-singleCardContainer mb-3r">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6 mb-3">
          <label htmlFor="" className="form-label mb-3">
            Selecciona actividad
          </label>
          <select
            className="form-select mb-3 form-control"
            aria-label="Default select example"
            value={values.activity}
            name="activity"
            onChange={handleInputChange}
          >
            {activityRegisterTypes.map((element) => {
              return (
                <option key={element.value} value={element.value}>
                  {element.label}
                </option>
              );
            })}
          </select>
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
