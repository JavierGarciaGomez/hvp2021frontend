import { Switch } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import dayjs from "dayjs";

import {
  deepCleanUpCreate,
  deepCleanUpStartSetActive,
  deepCleanUpUpdate,
} from "../../../actions/cleanUpsActions";
import { useForm } from "../../../hooks/useForm";
import { deepCleanUpActivities } from "../../../types/types";
import Swal from "sweetalert2";
import { CircularProgress } from "@material-ui/core";

const initialState = {};
Object.keys(deepCleanUpActivities).map((key) => {
  initialState[key] = false;
});

export const DeepCleanUpShow = () => {
  const { branch } = useParams();
  const { deepCleanUpId } = useParams();
  const { activeDeepCleanUp } = useSelector((state) => state.cleanups);
  const { uid, role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleInputChange, setFullValues } = useForm(initialState);
  const [previousComments, setpreviousComments] = useState("");
  const [newComment, setnewComments] = useState("");
  const [iscleaner, setiscleaner] = useState(false);
  const [issupervisor, setissupervisor] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    dispatch(deepCleanUpStartSetActive(branch, deepCleanUpId));
  }, []);

  useEffect(async () => {
    if (activeDeepCleanUp) {
      // set supervisor state
      activeDeepCleanUp.supervisors.forEach((element) => {
        if (element.supervisor === uid) {
          setissupervisor(true);
        }
      });
      // set cleaner state
      activeDeepCleanUp.cleaners.forEach((element) => {
        if (element.cleaner === uid) {
          setissupervisor(true);
        }
      });
      setFullValues(activeDeepCleanUp.activities);

      const commentsArray = activeDeepCleanUp.comments.map((element) => {
        return element.comment;
      });

      setpreviousComments(commentsArray.join("; "));
      setisLoading(false);
      // todo
      // setFullValues({ ...activeDeepCleanUp });
    }
  }, [activeDeepCleanUp]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!iscleaner && !issupervisor) {
      return Swal.fire({
        icon: "error",
        title: "Debes marcar una actividad de participación",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    const data = {
      branch,
      iscleaner,
      issupervisor,
      activities: [],
      comment: newComment,
    };
    Object.keys(values).map((key) => {
      if (values[key] && key !== "comment") {
        data.activities.push(key);
      }
    });

    console.log("data que voy a enviar", data);

    await dispatch(deepCleanUpUpdate(branch, deepCleanUpId, data));
    navigate(-1);
  };

  if (isLoading) return <CircularProgress />;
  return (
    <div className="container">
      <h4 className="mb-1">
        {`Limpieza profunda del ${dayjs(activeDeepCleanUp.date).format(
          "DD/MM/YYYY"
        )} en `}
        <span className="fw-bold text-info">{branch}</span>
      </h4>

      <div className="border border-primary">
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
            <div className="form-label">Comentarios nuevos</div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              name="comment"
              value={newComment}
              onChange={(e) => setnewComments(e.target.value)}
            ></textarea>
          </div>
          <div className="col-12 py-2">
            <div className="form-label">Comentarios previos</div>
            <div>{previousComments}</div>
          </div>
        </Fragment>
      )}
      <button className="btn btn-success col-12 m-2" onClick={handleSubmit}>
        Actualizar registro
      </button>
    </div>
  );
};
