import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  activityRegisterDelete,
  allActivityRegistersStartLoading,
} from "../../../actions/activityRegisterActions";
import {
  findObjectByProperty,
  getColsActivityRegisters,
  getDuration,
  isObjectEmpty,
} from "../../../helpers/utilities";

export const ActivityRegisterSelect = () => {
  // todo css file
  const dispatch = useDispatch();
  const { allActivityRegisters, isLoadingAcitivityRegisters } = useSelector(
    (state) => state.activityRegister
  );

  const [colRegisters, setcolRegisters] = useState([]);
  const [colsActivityRegisters, setcolsActivityRegisters] = useState([]);
  const [selectedCollaborator, setselectedCollaborator] = useState(null);
  // todo: load the activity registers
  // Load all activity registers
  useEffect(() => {
    dispatch(allActivityRegistersStartLoading());
  }, [dispatch]);

  useEffect(() => {
    setcolsActivityRegisters(getColsActivityRegisters(allActivityRegisters));
  }, [allActivityRegisters]);

  useEffect(() => {
    if (!isObjectEmpty(allActivityRegisters)) {
      const foundElement = findObjectByProperty(
        colsActivityRegisters,
        "col_code",
        selectedCollaborator
      );

      if (foundElement) {
        setcolRegisters(foundElement.registers);
      }
    }
  }, [selectedCollaborator, colsActivityRegisters]);

  const handlseSelectCollaborator = (col_code) => {
    setselectedCollaborator(col_code);
  };

  const handleDelete = async (id) => {
    await dispatch(activityRegisterDelete(id));
    await dispatch(allActivityRegistersStartLoading());
  };

  const colColumns = [
    {
      field: "collaborator",
      headerName: "Colaborador",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <img
              className="collaboratorsImg"
              src={params.row.imgUrl}
              alt=""
              key={params.row.imgUrl}
            />
          </div>
        );
      },
    },
    { field: "registersAmount", headerName: "Registros", flex: 1 },
    { field: "totalTime", headerName: "Horas totales registradas", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => {
              handlseSelectCollaborator(params.row.col_code);
            }}
          >
            Mostrar registros
          </button>
        );
      },
    },
  ];

  const colActRegColumns = [
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
        console.log(
          `Link seleccionado: ${params.row.collaborator._id}/${params.row._id}`
        );
        return (
          <>
            <Link
              to={`/dashboard/activityRegister/${params.row.collaborator._id}/${params.row._id}`}
            >
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
    <div className="activityRegisterSelect p-5">
      <div className="activityRegisterSelect__Heading mb-3r">
        <h2 className="heading--secondary">Selecciona un colaborador</h2>
      </div>
      <div className="activityRegisterSelect__Table">
        {/* // todo: specialGridTable */}
        <div style={{ height: "50vh", width: "100%" }}>
          <DataGrid
            rows={colsActivityRegisters}
            disableSelectionOnClick
            columns={colColumns}
            pageSize={7}
            getRowId={(row) => {
              return row._id;
            }}
            rowHeight={40}
            rowsPerPageOptions={[7, 50, 100]}
          />
        </div>
      </div>
      {selectedCollaborator && (
        <div className="activityRegisterSelect__Col_Data">
          {/* // todo: specialGridTable */}
          <div style={{ height: "50vh", width: "100%" }}>
            <DataGrid
              rows={colRegisters}
              disableSelectionOnClick
              columns={colActRegColumns}
              pageSize={7}
              getRowId={(row) => {
                return row._id;
              }}
              rowHeight={40}
              rowsPerPageOptions={[7, 50, 100]}
            />
          </div>
        </div>
      )}
    </div>
  );
};
