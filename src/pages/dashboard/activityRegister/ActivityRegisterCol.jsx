import { MenuItem, TextField } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { hour, minute, second } from "../../../helpers/constants";

import { useForm } from "../../../hooks/useForm";
import { getKeyByValue } from "../../../helpers/utilites";

// Todo: delete
let selectDummyData = {
  payroll: "Nómina",
  orders: "Pedidos",
  webDevelopment: "Desarrollo web",
  audit: "Auditoría",
};

// todo: delete
const initialNewActivityFormValues = {
  activity: getKeyByValue(selectDummyData, selectDummyData.orders),
  startingTime: dayjs("2022-02-17T17:30:04.572Z").format("YYYY-MM-DDTHH:mm"),
  endingTime: "",
  desc: "",
};

export const ActivityRegisterCol = () => {
  let dummyCurrentActivity = {
    _id: "620bba90e3a783708942c696",
    startingTime: "2022-02-18T12:37:04.572Z",
    activity: "Desarrollo web",
    desc: "Módulo de registro de actividades",
  };

  let lastActivity = {
    _id: "620bba90e3a783708942c696",
    startingTime: "2022-02-17T14:37:04.572Z",
    endingTime: "2022-02-17T18:37:04.572Z",
    activity: "Nómina",
    desc: "",
  };

  const [currentActivity, setcurrentActivity] = useState({
    ...dummyCurrentActivity,
  });
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
  } = useForm({
    ...currentActivity,
    startingTime: dayjs(currentActivity.startingTime).format(
      "YYYY-MM-DDTHH:mm"
    ),
    activity: getKeyByValue(selectDummyData, currentActivity.activity),
  });

  // check if there is a current activity with no endingtime
  useEffect(() => {
    if (currentActivity && !currentActivity.endingTime) {
      setisTimerActive(true);
      setshowCreateNewActivity(false);
    } else {
      setisTimerActive(false);
      setshowCreateNewActivity(true);
    }
  }, [currentActivity]);

  // start the timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTime(dayjs().diff(dayjs(currentActivity.startingTime)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, currentActivity]);

  const handleShowEditForm = async () => {
    setCurrentActivityFullValues({
      ...currentActivity,
      startingTime: dayjs(currentActivity.startingTime).format(
        "YYYY-MM-DDTHH:mm"
      ),
      activity: getKeyByValue(selectDummyData, currentActivity.activity),
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
        setcurrentActivity((prevData) => ({
          ...prevData,
          endingTime: dayjs(),
        }));
      }

      currentActivity.endingTime = dayjs();
      setisTimerActive(false);
    });
  };

  const handleFinishAndStartActivity = async () => {
    const { value: activity } = await Swal.fire({
      title: "Termina e inicia nueva actividad",
      icon: "question",
      input: "select",
      inputOptions: selectDummyData,
      inputPlaceholder: "Selecciona una actividad",
      showCancelButton: true,
    });

    console.log("activity", activity);

    if (activity) {
      const { value: desc } = await Swal.fire({
        title: "Nueva actividad",
        icon: "question",
        input: "text",
        inputLabel: "Agrega un detalle a la actividad, si deseas",
      });
      // conclude last activity and save
      setcurrentActivity((prevData) => ({
        ...prevData,
        endingTime: dayjs(),
      }));

      console.log("a ver", {
        startingTime: dayjs(),
        activity: selectDummyData[activity],
        desc,
      });
      setcurrentActivity({
        startingTime: dayjs(),
        activity: selectDummyData[activity],
        desc,
      });

      // generate new activity

      setisTimerActive(false);
    }
  };

  const handleEditCurrentActivity = async (e) => {
    e.preventDefault();
    console.log("curActVal", currentActivityValues);
    setcurrentActivity({
      ...currentActivityValues,
      activity: selectDummyData[currentActivityValues.activity],
    });
    setshowEditForm(false);
  };

  const handleContinueLastActivity = async () => {
    Swal.fire({
      title: `¿Quieres continuar con la actividad de ${lastActivity.activity}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí!",
    }).then((result) => {
      if (result.isConfirmed) {
        setcurrentActivity({
          ...lastActivity,
          startingTime: dayjs(),
          endingTime: null,
        });
        setisTimerActive(true);
      }
    });
  };

  const handleCreateNewActivity = async () => {
    const { value: activity } = await Swal.fire({
      title: "Inicia nueva actividad",
      icon: "question",
      input: "select",
      inputOptions: selectDummyData,
      inputPlaceholder: "Selecciona una actividad",
      showCancelButton: true,
    });

    const { value: desc } = await Swal.fire({
      title: "Nueva actividad",
      icon: "question",
      input: "text",
      inputLabel: "Agrega un detalle a la actividad, si deseas",
      showCancelButton: true,
    });
    setcurrentActivity({ startingTime: dayjs(), activity, desc });
    setisTimerActive(true);
  };

  const handleShowCreateForm = async () => {
    setshowCreateNewForm((prevState) => !prevState);
  };

  const handleRegisterPastActivity = async (e) => {
    e.preventDefault();
    setcurrentActivity({ ...newActivityValues });
    console.log(newActivityValues);
  };

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
              <h3 className="card__title">{currentActivity.activity}</h3>
              <p className="paragraph">{currentActivity.desc}</p>
            </div>
            <div className="card__body">
              <p className="paragraph">
                Fecha de inicio:{" "}
                {dayjs(currentActivity.startingTime).format("DD/MMM/YYYY")}
              </p>
              <p className="paragraph">
                Hora de inicio:{" "}
                {dayjs(currentActivity.startingTime).format("HH:mm")}
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
                  {Object.keys(selectDummyData).map((key) => {
                    return (
                      <MenuItem
                        key={key}
                        value={key}
                        sx={{ fontSize: "1.6rem" }}
                      >
                        {selectDummyData[key]}
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
                  {Object.keys(selectDummyData).map((key) => {
                    return (
                      <MenuItem
                        key={key}
                        value={key}
                        sx={{ fontSize: "1.6rem" }}
                      >
                        {selectDummyData[key]}
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
