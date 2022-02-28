import { Switch } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { deepCleanUpCreate } from "../../../actions/cleanUpsActions";
import { useForm } from "../../../hooks/useForm";
import { deepCleanUpActivities } from "../../../types/types";
import querystring from "query-string";
import Swal from "sweetalert2";

const initialState = {};
Object.keys(deepCleanUpActivities).map((key) => {
  initialState[key] = false;
});

export const AddNewDeepCleanup = () => {
  const { branch } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleInputChange } = useForm(initialState);
  const [iscleaner, setiscleaner] = useState(false);
  const [issupervisor, setissupervisor] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!iscleaner && !issupervisor) {
      return Swal.fire({
        icon: "error",
        title: "Debes marcar una actividad de limpieza o de supervisión",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    const data = {
      branch,
      iscleaner,
      issupervisor,
      activities: [],
      comment: values.comment,
    };
    Object.keys(values).map((key) => {
      if (values[key] && key !== "comment") {
        data.activities.push(key);
      }
    });

    console.log("*********************esta es la data", data);

    await dispatch(deepCleanUpCreate(data));
    navigate(-1);
  };

  return (
    <div className="container">
      <h4 className="mb-1">
        Agregar nueva limpieza profunda en{" "}
        <span className="fw-bold text-info">{branch}</span>
      </h4>

      <div className="border u-borderPrimary">
        <div className="p-2 fw-bold">Selecciona tu participación</div>
        <div className="d-flex flex-wrap">
          <div className="col-12 col-md-6 d-flex p-2 align-items-center">
            <div className="col-8">Limpieza</div>
            <div className="col-4">
              <Switch
                checked={iscleaner}
                onChange={() => setiscleaner((prevState) => !prevState)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex p-2 align-items-center">
            <div className="col-8">Supervisión</div>
            <div className="col-4">
              <Switch
                checked={issupervisor}
                onChange={() => setissupervisor((prevState) => !prevState)}
              />
            </div>
          </div>
        </div>
      </div>

      {issupervisor && (
        <Fragment>
          <div className="p-2 fw-bold">Actividades supervisadas</div>
          {/* participation container */}

          <div className="d-flex flex-wrap">
            {Object.keys(deepCleanUpActivities).map((key) => {
              return (
                <div
                  key={key}
                  className="col-12 col-md-6 d-flex p-2 align-items-center"
                >
                  <div className="col-8">{deepCleanUpActivities[key]}</div>
                  <div className="col-4">
                    <Switch
                      checked={values[key]}
                      onChange={handleInputChange}
                      name={key}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-12 py-2">
            <div className="form-label">Comentarios</div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              name="comment"
              value={values.comment}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </Fragment>
      )}
      <button className="btn btn-success col-12 m-2" onClick={handleSubmit}>
        Crear nuevo registro
      </button>
    </div>
  );
};
