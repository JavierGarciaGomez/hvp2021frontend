import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  updateDailyCleanUp,
  dailyCleanUpsStartLoading,
} from "../../../../actions/cleanUpsActions";
import { formatAndOrderCollection } from "../../../../helpers/utilities";
import { cleanUpActions } from "../../../../types/types";

export const DailyCleanUpsDataGrid = () => {
  const { branch } = useParams();
  const dispatch = useDispatch();
  const { dailyCleanUps, isLoadingDailyCleanUps } = useSelector(
    (state) => state.cleanups
  );
  // this state uses a slightly change of the cleanups changing its date form
  const [formattedDailyCleanUps, setformattedDailyCleanUps] = useState([]);

  // load cleanups
  useEffect(() => {
    dispatch(dailyCleanUpsStartLoading(branch));
  }, [dispatch, branch]);

  // load cleanups
  useEffect(() => {
    if (dailyCleanUps.length > 0) {
      setformattedDailyCleanUps(formatAndOrderCollection(dailyCleanUps));
    }
  }, [dailyCleanUps]);

  // add cleaner
  const handleClean = (id) => {
    const data = { action: cleanUpActions.addCleaner };
    dispatch(updateDailyCleanUp(id, branch, data));
  };

  // add supervisor
  const handleSupervise = (id) => {
    const data = { action: cleanUpActions.addSupervisor };
    dispatch(updateDailyCleanUp(id, branch, data));
  };

  // Grid data
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
                    className="c-avatar"
                    src={cleaner.cleaner?.imgUrl}
                    alt=""
                    key={cleaner.cleaner?.imgUrl}
                  />
                );
              })}
            </div>
            {/* <div className="d-flex align-items-center">
            <img className="c-avatar" src="" alt="" />
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
                    className="c-avatar"
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
    <Fragment>
      {/* Display bigger than smaller tablets */}
      <div
        className="cleanUpsTableWrapper"
        style={{ height: "400px", width: "100%" }}
      >
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
      {/* Display smaller than smaller tablets */}
      <div className="cleanUpsCardsWrapper">
        {/* TODO: do components */}
        {formattedDailyCleanUps.map((dailyCleanUp) => {
          return (
            <div className="c-card">
              <div className="c-card_top">
                <h3 className="heading--tertiary u-textPrimary">
                  {dailyCleanUp.date}
                </h3>
              </div>

              <div className="c-card_body">
                <p className="">
                  Limpieza:{" "}
                  {dailyCleanUp.cleaners.map((cleaner, index) => {
                    return (
                      <img
                        className="c-avatar"
                        src={cleaner.cleaner?.imgUrl}
                        alt=""
                        key={cleaner.cleaner?.imgUrl}
                      />
                    );
                  })}
                </p>
                <p className="">
                  Supervisión:{" "}
                  {dailyCleanUp.supervisors.map((supervisor, index) => {
                    return (
                      <img
                        className="c-avatar"
                        src={supervisor.supervisor?.imgUrl}
                        alt=""
                        key={supervisor.supervisor?.imgUrl}
                      />
                    );
                  })}
                </p>
              </div>
              <div className="c-card_footer">
                <button
                  className="btn btn-primary "
                  onClick={() => handleClean(dailyCleanUp._id)}
                >
                  Realicé
                </button>

                <button
                  className="btn btn-danger "
                  onClick={() => handleSupervise(dailyCleanUp._id)}
                >
                  Supervisé
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
