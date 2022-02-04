import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  operatingRoomCleanUpsStartLoading,
  updateOperatingRoomCleanUp,
} from "../../../../actions/cleanUpsActions";
import {
  convertCollectionDatesToString,
  formatAndOrderCollection,
} from "../../../../helpers/utilites";
import { cleanUpActions } from "../../../../types/types";

export const OperatingRoomCleanUpDataGrid = () => {
  const { branch } = useParams();

  const dispatch = useDispatch();
  const [formattedOperRoomCleanUps, setformattedOperRoomCleanUps] = useState(
    []
  );

  const { operatingRoomCleanUps, isLoadingOperatingRoomCleanUps } = useSelector(
    (state) => state.cleanups
  );

  useEffect(() => {
    dispatch(operatingRoomCleanUpsStartLoading(branch));
  }, [dispatch, branch]);

  useEffect(() => {
    setformattedOperRoomCleanUps(
      formatAndOrderCollection(operatingRoomCleanUps)
    );
  }, [operatingRoomCleanUps]);

  const handleClean = (id) => {
    const data = { action: cleanUpActions.addCleaner };
    dispatch(updateOperatingRoomCleanUp(id, branch, data));
  };

  const handleSupervise = (id) => {
    const data = { action: cleanUpActions.addSupervisor };
    dispatch(updateOperatingRoomCleanUp(id, branch, data));
  };

  const columns = [
    { field: "date", headerName: "Fecha", flex: 1 },

    {
      field: "cleaners",
      headerName: "Realizado",
      flex: 1,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="d-flex align-items-center">
              {params.row.cleaners.map((cleaner, index) => {
                return (
                  <img
                    className="collaboratorsImg"
                    src={cleaner.cleaner?.imgUrl}
                    alt=""
                    key={cleaner.cleaner?.imgUrl}
                  />
                );
              })}
            </div>
            {/* <div className="d-flex align-items-center">
            <img className="collaboratorsImg" src="" alt="" />
            {getIdOrEmpty(params.row)}
          </div> */}
          </Fragment>
        );
      },
    },
    {
      field: "supervisors",
      headerName: "Supervisado",
      flex: 1,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="d-flex align-items-center">
              {params.row.supervisors.map((supervisor, index) => {
                return (
                  <img
                    className="collaboratorsImg"
                    src={supervisor.supervisor?.imgUrl}
                    alt=""
                    key={supervisor.supervisor?._id}
                  />
                );
              })}
            </div>
          </Fragment>
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
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={() => handleClean(params.id)}
            >
              Realicé
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleSupervise(params.id)}
            >
              Supervisé
            </button>
          </>
        );
      },
    },
  ];

  if (isLoadingOperatingRoomCleanUps) {
    return <CircularProgress />;
  }

  if (formattedOperRoomCleanUps.length === 0) {
    return <p>No hay registros</p>;
  }
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <DataGrid
        rows={formattedOperRoomCleanUps}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        getRowId={(row) => {
          return row._id;
        }}
        rowHeight={40}
        rowsPerPageOptions={[5, 50, 100]}
      />
    </div>
  );
};
