import { CircularProgress } from "@mui/material";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { hour, minute, second } from "../../../helpers/constants";

import {
  calculateMonthHours,
  calculateTotalHours,
  calculateWeekHours,
  calculateYesterdayHours,
  convertArrayToObjectAndSort,
  findLabelByValue,
  findObjectByProperty,
  fireSwalConfirmation,
  fireSwalError,
  fireSwalQuestionInput,
  fireSwalQuestionSelect,
  getConcludedActivityRegisters,
  isObjectEmpty,
} from "../../../helpers/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  activityRegisterDelete,
  activityRegistersStartLoading,
  activityRegisterStartUpdate,
  createActivityRegister,
} from "../../../actions/activityRegisterActions";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { ActivityRegisterForm } from "./components/ActivityRegisterForm";
dayjs.extend(duration);

export const ActivityRegisterCol = () => {
  const dispatch = useDispatch();
  const {
    activeColRegisters,
    currentRegister,
    isLoadingAcitivityRegisters,
    activityRegisterTypes,
    lastActivityRegister,
  } = useSelector((state) => state.activityRegister);

  const { uid, col_code } = useSelector((state) => state.auth);

  const [showEditForm, setshowEditForm] = useState(false);
  const [showCreateNewForm, setshowCreateNewForm] = useState(false);
  const [isTimerActive, setisTimerActive] = useState(false);
  const [time, setTime] = useState(dayjs().diff(""));
  const [showCreateNewActivity, setshowCreateNewActivity] = useState(false);

  // Load all
  useEffect(() => {
    dispatch(activityRegistersStartLoading());
  }, [dispatch]);

  // check if there is a current register and set the timer
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
    setshowEditForm((prevState) => !prevState);
  };

  // todo working
  const handleFinishActivity = async () => {
    // ask confirmation
    const isConfirmed = await fireSwalConfirmation(
      "¿Estás seguro en dar por terminada esta actividad?"
    );

    if (isConfirmed) {
      dispatch(
        activityRegisterStartUpdate({
          ...currentRegister,
          endingTime: dayjs(),
        })
      );
    }
  };

  const handleFinishAndStartActivity = async () => {
    const activity = await fireSwalQuestionSelect(
      "¿Qué actividad quieres comenzar?",
      activityRegisterTypes,
      "Selecciona una actividad"
    );
    if (activity) {
      const desc = await fireSwalQuestionInput(
        "¿Qué actividad quieres comenzar?",
        "Agrega una descripción (opcional)"
      );
      dispatch(
        activityRegisterStartUpdate({
          ...currentRegister,
          endingTime: dayjs(),
        })
      );

      dispatch(
        createActivityRegister({
          startingTime: dayjs(),
          activity,
          desc,
        })
      );
    }
  };

  const handleContinueLastActivity = async () => {
    if (isObjectEmpty(lastActivityRegister)) {
      fireSwalError("No tienes ninguna actividad previa registrada");
    }
    const isConfirmed = await fireSwalConfirmation(
      `¿Quieres continuar con la actividad de ${findLabelByValue(
        activityRegisterTypes,
        lastActivityRegister.activity
      )}`
    );

    if (isConfirmed) {
      dispatch(
        createActivityRegister({
          ...lastActivityRegister,
          startingTime: dayjs(),
          endingTime: null,
        })
      );
    }
  };

  const handleCreateNewActivity = async () => {
    const activity = await fireSwalQuestionSelect(
      "¿Qué actividad quieres comenzar?",
      activityRegisterTypes,
      "Selecciona una actividad"
    );
    if (activity) {
      const desc = await fireSwalQuestionInput(
        "¿Qué actividad quieres comenzar?",
        "Agrega una descripción (opcional)"
      );
      dispatch(
        createActivityRegister({
          startingTime: dayjs(),
          activity,
          desc,
        })
      );
    }
  };

  const handleShowCreateForm = async () => {
    setshowCreateNewForm((prevState) => !prevState);
  };

  const handleDelete = async (id) => {
    dispatch(activityRegisterDelete(id));
  };

  const lastRegistersColumns = [
    {
      field: "activity",
      headerName: "Actividad",
      flex: 1,

      renderCell: (params) => {
        return (
          <div>
            {findLabelByValue(activityRegisterTypes, params.row.activity)}
          </div>
        );
      },
    },
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
              <button className="c-button">Editar</button>
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
      {/* Button to show other users */}
      <div className="activityRegisterTopButton right-content me-10r">
        <Link to="all">
          <button className="c-button -large mb-3r">Ver otros</button>
        </Link>
      </div>
      <div className="activityRegisterHeading mb-3r">
        <h2 className="heading--secondary">Actividades de {col_code}</h2>
      </div>

      {/* Current activity */}

      {isTimerActive && !isObjectEmpty(currentRegister) && (
        <div className="activityRegisterActive l-singleCardContainer mb-3r">
          <div className="c-card">
            <div className="c-card_top  c-card_top-col">
              <h3 className="c-card_title">
                {findLabelByValue(
                  activityRegisterTypes,
                  currentRegister.activity
                )}
              </h3>
              <p className="paragraph">{currentRegister.desc}</p>
            </div>
            <div className="c-card_body">
              <p className="paragraph">
                Fecha de inicio:{" "}
                {dayjs(currentRegister.startingTime).format("DD/MMM/YYYY")}
              </p>
              <p className="paragraph">
                Hora de inicio:{" "}
                {dayjs(currentRegister.startingTime).format("HH:mm")}
              </p>
              <div className="activityRegisterActive_time mb-2r">
                <span>{("0" + Math.floor((time / hour) % 60)).slice(-2)}:</span>
                <span>
                  {("0" + Math.floor((time / minute) % 60)).slice(-2)}:
                </span>
                <span>
                  {("0" + Math.floor((time / second) % 60)).slice(-2)}
                </span>
              </div>
            </div>
            <div className="c-card_footer">
              <button className="c-button" onClick={handleShowEditForm}>
                Editar tarea actual
              </button>
              <button className="c-button" onClick={handleFinishActivity}>
                Terminar tarea actual
              </button>
              <button
                className="c-button"
                onClick={handleFinishAndStartActivity}
              >
                Terminar y empezar nueva tarea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form */}
      {showEditForm && currentRegister && (
        <ActivityRegisterForm
          activityRegister={currentRegister}
          handleShowForm={handleShowEditForm}
          showCancel={true}
          showEndDate={false}
        />
      )}

      {/* CREATE NEW ACTIVITIES */}
      {showCreateNewActivity && (
        <div className="activityRegisterNewActivity l-singleCardContainer mb-3r">
          <div className="c-card">
            <div className="c-card_top">
              <h3 className="c-card_title">Crear nueva actividad</h3>
            </div>
            <div className="c-card_footer">
              <button className="c-button" onClick={handleContinueLastActivity}>
                Continuar última actividad
              </button>
              <button className="c-button" onClick={handleCreateNewActivity}>
                Crear nueva actividad
              </button>
              <button className="c-button" onClick={handleShowCreateForm}>
                Registrar actividad ya concluida
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW ACTIVITY FORM */}
      {showCreateNewForm && (
        <ActivityRegisterForm
          isNewActivity={true}
          activityRegister={{}}
          handleShowForm={handleShowCreateForm}
          showCancel={true}
          showEndDate={true}
        />
      )}

      {/* BOTTOM PAGE */}
      <div className="activityRegisterBottomPage mt-10r">
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
              <span className="u-textPrimary fw-bold">
                {calculateYesterdayHours(activeColRegisters)}
              </span>
            </p>
            <p className="paragraph">
              Horas registradas en este mes:{" "}
              <span className="u-textPrimary fw-bold">
                {calculateMonthHours(activeColRegisters)}
              </span>
            </p>
            <p className="paragraph">
              Horas registradas en esta semana:{" "}
              <span className="u-textPrimary fw-bold">
                {calculateWeekHours(activeColRegisters)}
              </span>
            </p>
            <p className="paragraph">
              Total de horas registradas:{" "}
              <span className="u-textPrimary fw-bold">
                {calculateTotalHours(activeColRegisters)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
