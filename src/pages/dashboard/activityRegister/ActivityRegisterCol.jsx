import { CircularProgress, MenuItem, TextField } from "@material-ui/core";
import { FormControl, InputLabel, Select } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { hour, minute, second } from "../../../helpers/constants";

import { useForm } from "../../../hooks/useForm";
import {
  calculateMonthHours,
  calculateTotalHours,
  calculateWeekHours,
  calculateYesterdayHours,
  getConcludedActivityRegisters,
  getKeyByValue,
  isObjectEmpty,
} from "../../../helpers/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  activityRegisterDelete,
  activityRegistersStartLoading,
  activityRegisterStartUpdate,
  createActivityRegister,
} from "../../../actions/activityRegisterActions";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
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

export const ActivityRegisterCol = () => {
  // todo check what is need it
  const dispatch = useDispatch();
  const {
    activeColRegisters,
    currentRegister,
    isLoadingAcitivityRegisters,
    activityRegisterTypes,
    lastActivityRegister,
  } = useSelector((state) => state.activityRegister);

  const { uid } = useSelector((state) => state.auth);

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

  const handleDelete = async (id) => {
    console.log("voy a borrar");
    dispatch(activityRegisterDelete(id));
  };

  const lastRegistersColumns = [
    { field: "activity", headerName: "Actividad", flex: 1 },
    {
      field: "Inicio",
      headerName: "Inicio",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            {dayjs(params.row.startingTime).format("DD/MMM/YY HH:mm")}
          </div>
        );
      },
    },
    {
      field: "Fin",
      headerName: "Fin",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            {dayjs(params.row.endingTime).format("DD/MMM/YY HH:mm")}
          </div>
        );
      },
    },
    {
      field: "Duración",
      headerName: "Duración",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            {dayjs
              .duration(
                dayjs(params.row.endingTime).diff(params.row.startingTime)
              )
              .format("HH:mm")}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${uid}/${params.row._id}`}>
              <button className="btn btn-primary">Editar</button>
            </Link>
            {
              <DeleteOutline
                className="collaboratorsDelete"
                onClick={() => handleDelete(params.id)}
              />
            }
          </>
        );
      },
    },
  ];

  if (isLoadingAcitivityRegisters) {
    return <CircularProgress />;
  }
  return (
    <div className="p-5">
      <div className="activityRegisterTopButton right-content me-10r">
        <Link to="all">
          <div className="btn btn-primary mb-3r">Ver otros</div>
        </Link>
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
        <ActivityRegisterForm
          activityRegister={currentRegister}
          handleShowForm={handleShowEditForm}
          showCancel={true}
          showEndDate={false}
        />
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
        <ActivityRegisterForm
          isNewActivity={true}
          activityRegister={{}}
          handleShowForm={handleShowCreateForm}
          showCancel={true}
          showEndDate={true}
        />
      )}
      <div className="activityRegisterBottomPage">
        <div className="activityRegisterLeft">
          <div className="activityRegisterLastRecords">
            <h3 className="headingTertiary">Últimos registros</h3>
            <div style={{ height: "75vh", width: "100%" }}>
              <DataGrid
                rows={getConcludedActivityRegisters(activeColRegisters)}
                disableSelectionOnClick
                columns={lastRegistersColumns}
                pageSize={20}
                rowsPerPageOptions={[20, 50, 100]}
                getRowId={(row) => row._id}
              />
            </div>
          </div>
        </div>
        <div className="activityRegisterRight">
          <div className="activityRegisterStatistics">
            <h3 className="headingTertiary">Estadísticas</h3>
            <p className="paragraph">
              Horas registradas ayer:{" "}
              <span className="text-primary fw-bold">
                {calculateYesterdayHours(activeColRegisters)}
              </span>
            </p>
            <p className="paragraph">
              Horas registradas en este mes:{" "}
              <span className="text-primary fw-bold">
                {calculateMonthHours(activeColRegisters)}
              </span>
            </p>
            <p className="paragraph">
              Horas registradas en esta semana:{" "}
              <span className="text-primary fw-bold">
                {calculateWeekHours(activeColRegisters)}
              </span>
            </p>
            <p className="paragraph">
              Total de horas registradas:{" "}
              <span className="text-primary fw-bold">
                {calculateTotalHours(activeColRegisters)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
