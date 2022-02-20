import { DataGrid } from "@material-ui/data-grid";
import { CircularProgress, Link } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allActivityRegistersStartLoading } from "../../../actions/activityRegisterActions";
import {
  getColsActivityRegisters,
  getDuration,
} from "../../../helpers/utilities";

export const ActivityRegisterSelect = () => {
  // todo css file
  const dispatch = useDispatch();
  const { allActivityRegisters, isLoadingAcitivityRegisters } = useSelector(
    (state) => state.activityRegister
  );
  // todo: load the activity registers
  // Load all
  useEffect(() => {
    dispatch(allActivityRegistersStartLoading());
  }, [dispatch]);

  const columns = [
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
    { field: "registers", headerName: "Registros", flex: 1 },
    { field: "totalTime", headerName: "Horas totales registradas", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Link to={`${params.row._id}`}>
            <button className="btn btn-primary">Mostrar registros</button>
          </Link>
        );
      },
    },
  ];

  const colsActivityRegisters = getColsActivityRegisters(allActivityRegisters);
  console.log("colsact", colsActivityRegisters);

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
        <div style={{ height: "75vh", width: "100%" }}>
          <DataGrid
            rows={colsActivityRegisters}
            disableSelectionOnClick
            columns={columns}
            pageSize={7}
            getRowId={(row) => {
              return row._id;
            }}
            rowHeight={40}
            rowsPerPageOptions={[7, 50, 100]}
          />
        </div>
      </div>
    </div>
  );
};
