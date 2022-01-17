import { Switch } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deepCleanUpCreate } from "../../../actions/cleanUpsActions";
import { useForm } from "../../../hooks/useForm";
import { deepCleanUpActivities } from "../../../types/types";

const initialState = {};
Object.keys(deepCleanUpActivities).map((key) => {
  initialState[key] = false;
});

export const AddNewDeepCleaning = () => {
  const branch = "Urban";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleInputChange } = useForm(initialState);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const data = {
      branch,
      activities: [],
      comment: values.comment,
    };
    Object.keys(values).map((key) => {
      if (values[key] && key !== "comment") {
        data.activities.push(key);
      }
    });
    console.log("esta es la data", data);
    await dispatch(deepCleanUpCreate(data));
    navigate(-1);
  };

  return (
    <div className="container">
      <h4 className="mb-1">
        Agregar nueva limpieza profunda en{" "}
        <span className="fw-bold text-info">{branch}</span>
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="row d-flex flex-wrap">
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

        <button className="btn btn-success col-12" type="onSubmit">
          Crear nuevo registro
        </button>
      </form>
    </div>
  );
};
