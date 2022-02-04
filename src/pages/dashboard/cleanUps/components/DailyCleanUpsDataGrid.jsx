import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  updateDailyCleanUp,
  dailyCleanUpsStartLoading,
} from "../../../../actions/cleanUpsActions";
import {
  convertCollectionDatesToString,
  formatAndOrderCollection,
} from "../../../../helpers/utilites";
import { cleanUpActions } from "../../../../types/types";

export const DailyCleanUpsDataGrid = () => {
  const { branch } = useParams();
  const dispatch = useDispatch();
  const { dailyCleanUps, isLoadingDailyCleanUps } = useSelector(
    (state) => state.cleanups
  );
  // this state uses a slightly change of the cleanups changing its date form
  const [formattedDailyCleanUps, setformattedDailyCleanUps] = useState([]);

  useEffect(() => {
    dispatch(dailyCleanUpsStartLoading(branch));
  }, [dispatch, branch]);

  useEffect(() => {
    console.log("daily", dailyCleanUps);
    if (dailyCleanUps.length > 0) {
      setformattedDailyCleanUps(formatAndOrderCollection(dailyCleanUps));
    }
  }, [dailyCleanUps]);

  const handleClean = (id) => {
    const data = { action: cleanUpActions.addCleaner };
    dispatch(updateDailyCleanUp(id, branch, data));
  };

  const handleSupervise = (id) => {
    const data = { action: cleanUpActions.addSupervisor };
    dispatch(updateDailyCleanUp(id, branch, data));
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

  if (isLoadingDailyCleanUps) {
    return <CircularProgress />;
  }

  if (formattedDailyCleanUps.length === 0) {
    return <p>No hay registros</p>;
  }
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <DataGrid
        rows={formattedDailyCleanUps}
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
  );
};
