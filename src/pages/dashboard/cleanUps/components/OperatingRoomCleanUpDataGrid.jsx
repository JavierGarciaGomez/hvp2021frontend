import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  operatingRoomCleanUpsStartLoading,
  updateOperatingRoomCleanUp,
} from "../../../../actions/cleanUpsActions";
import { formatAndOrderCollection } from "../../../../helpers/utilities";
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
    <Fragment>
      <div
        className="db-cleanUps__table-wrapper"
        style={{ height: "400px", width: "100%" }}
      >
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
      <div className="db-cleanUps__card-wrapper">
        {/* TODO: do components */}
        {formattedOperRoomCleanUps.map((element) => {
          return (
            <div className="db-cleanUps__dailyCard">
              <div className="db-cleanUps__card-top">
                <h3 className="db-cleanUps__date">{element.date}</h3>
              </div>

              <div className="db-cleanUps__card-body">
                <p className="db-cleanUps__card-text">
                  Limpieza:{" "}
                  {element.cleaners.map((cleaner, index) => {
                    return (
                      <img
                        className="db-cleanUps__img"
                        src={cleaner.cleaner?.imgUrl}
                        alt=""
                        key={cleaner.cleaner?.imgUrl}
                      />
                    );
                  })}
                </p>
                <p className="db-cleanUps__card-text">
                  Supervisión:{" "}
                  {element.supervisors.map((supervisor, index) => {
                    return (
                      <img
                        className="db-cleanUps__img"
                        src={supervisor.supervisor?.imgUrl}
                        alt=""
                        key={supervisor.supervisor?.imgUrl}
                      />
                    );
                  })}
                </p>
              </div>
              <div className="db-cleanUps__card-footer">
                <button
                  className="btn btn-primary db-cleanUps__btn"
                  onClick={() => handleClean(element._id)}
                >
                  Realicé
                </button>

                <button
                  className="btn btn-danger db-cleanUps__btn"
                  onClick={() => handleSupervise(element._id)}
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
