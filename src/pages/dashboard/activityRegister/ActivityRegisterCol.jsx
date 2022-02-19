import { CircularProgress, MenuItem, TextField } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { hour, minute, second } from "../../../helpers/constants";

import { useForm } from "../../../hooks/useForm";
import { getKeyByValue, isObjectEmpty } from "../../../helpers/utilites";
import { useDispatch, useSelector } from "react-redux";
import {
  activityRegistersStartLoading,
  activityRegisterStartUpdate,
  createActivityRegister,
} from "../../../actions/activityRegisterActions";

// todo: delete
const initialNewActivityFormValues = {
  activity: "",
  startingTime: "",
  endingTime: "",
  desc: "",
};

export const ActivityRegisterCol = () => {
  // todo check what is need it
  const dispatch = useDispatch();
  const {
    currentRegister,
    isLoadingAcitivityRegisters,
    activityRegisterTypes,
    lastActivityRegister,
  } = useSelector((state) => state.activityRegister);

  const [showEditForm, setshowEditForm] = useState(false);
  const [showCreateNewForm, setshowCreateNewForm] = useState(false);
  const [isTimerActive, setisTimerActive] = useState(false);
  const [time, setTime] = useState(dayjs().diff(""));
  const [showCreateNewActivity, setshowCreateNewActivity] = useState(false);

  const {
    values: newActivityValues,
    handleInputChange: handleNewActivityInputChange,
  } = useForm(initialNewActivityFormValues);

  const {
    values: currentActivityValues,
    handleInputChange: handleCurrentActivityInputChange,
    setFullValues: setCurrentActivityFullValues,
    reset: resetCurrentActivityValues,
  } = useForm({});

  // Load all
  useEffect(() => {
    dispatch(activityRegistersStartLoading());
  }, [dispatch]);

  // check if there is a current activity with no endingtime
  useEffect(() => {
    if (!isObjectEmpty(currentRegister) && !currentRegister.endingTime) {
      setisTimerActive(true);
      setshowCreateNewActivity(false);
    } else {
      setisTimerActive(false);
      setshowCreateNewActivity(true);
    }
  }, [currentRegister]);

  // start the timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTime(dayjs().diff(dayjs(currentRegister.startingTime)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, currentRegister]);

  /**********HANDLERS********/
  const handleShowEditForm = async () => {
    // set the values for the form
    setCurrentActivityFullValues({
      ...currentRegister,
      startingTime: dayjs(currentRegister.startingTime).format(
        "YYYY-MM-DDTHH:mm"
      ),
      activity: getKeyByValue(activityRegisterTypes, currentRegister.activity),
    });
    setshowEditForm((prevState) => !prevState);
  };

  const handleFinishActivity = () => {
    // ask confirmation
    Swal.fire({
      title: "¿Estás seguro en dar por terminada esta actividad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          activityRegisterStartUpdate({
            ...currentRegister,
            endingTime: dayjs(),
          })
        );
      }
    });
  };

  const handleFinishAndStartActivity = async () => {
    const { value: activity } = await Swal.fire({
      title: "Termina e inicia nueva actividad",
      icon: "question",
      input: "select",
      inputOptions: activityRegisterTypes,
      inputPlaceholder: "Selecciona una actividad",
      showCancelButton: true,
    });

    if (activity) {
      const { value: desc } = await Swal.fire({
        title: "Nueva actividad",
        icon: "question",
        input: "text",
        inputLabel: "Agrega un detalle a la actividad, si deseas",
      });

      dispatch(
        activityRegisterStartUpdate({
          ...currentRegister,
          endingTime: dayjs(),
        })
      );

      dispatch(
        createActivityRegister({
          startingTime: dayjs(),
          activity: activityRegisterTypes[activity],
          desc,
        })
      );

      // generate new activity
    }
  };

  const handleEditCurrentActivity = async (e) => {
    e.preventDefault();
    dispatch(
      activityRegisterStartUpdate({
        ...currentActivityValues,
        activity: activityRegisterTypes[currentActivityValues.activity],
      })
    );
    resetCurrentActivityValues();
    setshowEditForm(false);
  };

  const handleContinueLastActivity = async () => {
    if (isObjectEmpty(lastActivityRegister)) {
      return Swal.fire({
        title: "No tienes ninguna actividad previa registrada",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    Swal.fire({
      title: `¿Quieres continuar con la actividad de ${lastActivityRegister.activity}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createActivityRegister({
            ...lastActivityRegister,
            startingTime: dayjs(),
            endingTime: null,
          })
        );
      }
    });
  };

  const handleCreateNewActivity = async () => {
    const { value: activity } = await Swal.fire({
      title: "Inicia nueva actividad",
      icon: "question",
      input: "select",
      inputOptions: activityRegisterTypes,
      inputPlaceholder: "Selecciona una actividad",
      showCancelButton: true,
    });

    if (activity) {
      const { value: desc } = await Swal.fire({
        title: "Nueva actividad",
        icon: "question",
        input: "text",
        inputLabel: "Agrega un detalle a la actividad, si deseas",
      });
      dispatch(
        createActivityRegister({
          startingTime: dayjs(),
          activity: activityRegisterTypes[activity],
          desc,
        })
      );
    }
  };

  const handleShowCreateForm = async () => {
    setshowCreateNewForm((prevState) => !prevState);
  };

  const handleRegisterPastActivity = async (e) => {
    dispatch(createActivityRegister({ ...newActivityValues }));
    setshowCreateNewForm(false);
  };

  if (isLoadingAcitivityRegisters) {
    return <CircularProgress />;
  }
  return (
    <div className="container m-5">
      <div className="activityRegisterTopButton right-content me-10r">
        <div className="btn btn-primary mb-3r">Ver otros</div>
      </div>
      <div className="activityRegisterHeading mb-3r">
        <h2 className="heading--secondary">Actividades de Javier García</h2>
      </div>

      {isTimerActive && (
        <div className="activityRegisterActive l-singleCardContainer mb-3r">
          <div className="card">
            <div className="card__top  card__top--col">
              <h3 className="card__title">{currentRegister.activity}</h3>
              <p className="paragraph">{currentRegister.desc}</p>
            </div>
            <div className="card__body">
              <p className="paragraph">
                Fecha de inicio:{" "}
                {dayjs(currentRegister.startingTime).format("DD/MMM/YYYY")}
              </p>
              <p className="paragraph">
                Hora de inicio:{" "}
                {dayjs(currentRegister.startingTime).format("HH:mm")}
              </p>
              <div className="activityRegisterActive__time mb-2r">
                <span>{("0" + Math.floor((time / hour) % 60)).slice(-2)}:</span>
                <span>
                  {("0" + Math.floor((time / minute) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + Math.floor((time / second) % 60)).slice(-2)}
                </span>
              </div>
            </div>
            <div className="card__footer">
              <button className="btn btn-primary" onClick={handleShowEditForm}>
                Editar tarea actual
              </button>
              <button
                className="btn btn-primary"
                onClick={handleFinishActivity}
              >
                Terminar tarea actual
              </button>
              <button
                className="btn btn-primary"
                onClick={handleFinishAndStartActivity}
              >
                Terminar y empezar nueva tarea
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="activityRegisterNewActivityForm l-singleCardContainer mb-3r">
          <form className="row" onSubmit={handleEditCurrentActivity}>
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
                  value={currentActivityValues.activity}
                  name="activity"
                  label="Actividad"
                  onChange={handleCurrentActivityInputChange}
                  sx={{ fontSize: "1.6rem" }}
                >
                  {Object.keys(activityRegisterTypes).map((key) => {
                    return (
                      <MenuItem
                        key={key}
                        value={key}
                        sx={{ fontSize: "1.6rem" }}
                      >
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
                value={currentActivityValues.desc}
                onChange={handleCurrentActivityInputChange}
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
                value={currentActivityValues.startingTime}
                onChange={handleCurrentActivityInputChange}
              />
            </div>

            <div className="d-flex justify-content-evenly">
              <button className="btn btn-primary" type="submit">
                Guardar cambios
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleShowEditForm}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {showCreateNewActivity && (
        <div className="activityRegisterNewActivity l-singleCardContainer mb-3r">
          <div className="card">
            <div className="card__top">
              <h3 className="card__title">Crear nueva actividad</h3>
            </div>
            <div className="card__footer">
              <button
                className="btn btn-primary"
                onClick={handleContinueLastActivity}
              >
                Continuar última actividad
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateNewActivity}
              >
                Crear nueva actividad
              </button>
              <button
                className="btn btn-primary"
                onClick={handleShowCreateForm}
              >
                Registrar actividad ya concluida
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateNewForm && (
        <div className="activityRegisterNewActivityForm l-singleCardContainer mb-3r">
          <form className="row" onSubmit={handleRegisterPastActivity}>
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
                  value={newActivityValues.activity}
                  name="activity"
                  label="Actividad"
                  onChange={handleNewActivityInputChange}
                  sx={{ fontSize: "1.6rem" }}
                >
                  {Object.keys(activityRegisterTypes).map((key) => {
                    return (
                      <MenuItem
                        key={key}
                        value={key}
                        sx={{ fontSize: "1.6rem" }}
                      >
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
                value={newActivityValues.desc}
                onChange={handleNewActivityInputChange}
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
                value={newActivityValues.startingTime}
                onChange={handleNewActivityInputChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="" className="form-label mb-3">
                Fecha y hora de conclusión
              </label>
              <input
                type="datetime-local"
                className="form-control mb-3"
                name="endingTime"
                placeholder="Fecha y hora de conclusión"
                value={newActivityValues.endingTime}
                onChange={handleNewActivityInputChange}
              />
            </div>

            <div className="d-flex justify-content-evenly">
              <button className="btn btn-primary" type="submit">
                Registrar
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleShowCreateForm}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
