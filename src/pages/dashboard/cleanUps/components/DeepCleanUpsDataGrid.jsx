import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deepCleanUpsStartLoading } from "../../../../actions/cleanUpsActions";
import {
  formatAndOrderCollection,
  getAColumn,
} from "../../../../helpers/utilities";

export const DeepCleanUpsDataGrid = () => {
  const { branch } = useParams();

  const dispatch = useDispatch();
  const [formattedDeepCleanUps, setformattedDeepCleanUps] = useState([]);

  const { deepCleanUps, isLoadingDeepCleanUps } = useSelector(
    (state) => state.cleanups
  );

  useEffect(() => {
    dispatch(deepCleanUpsStartLoading(branch));
  }, [dispatch, branch]);

  useEffect(() => {
    setformattedDeepCleanUps(formatAndOrderCollection(deepCleanUps));
  }, [deepCleanUps]);

  const columns = [
    { field: "date", headerName: "Fecha", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${params.id}`}>
              <button className="c-button">Ver</button>
            </Link>
          </>
        );
      },
    },
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
                    key={supervisor.supervisor?.imgUrl}
                  />
                );
              })}
            </div>
          </Fragment>
        );
      },
    },

    getAColumn("correctOrder", "Orden", 1, "correctOrder"),
    getAColumn("wasteDisposal", "Desechos", 1, "wasteDisposal"),
    getAColumn("cleanedEquipment", "Equipamiento", 1, "cleanedEquipment"),
    getAColumn("cleanedCages", "Jaulas", 1, "cleanedCages"),
    getAColumn("cleanedDrawers", "Gavetas", 1, "cleanedDrawers"),
    getAColumn("everyAreaCleaned", "Áreas", 1, "cleanedDrawers"),
  ];

  if (isLoadingDeepCleanUps) {
    return <CircularProgress />;
  }

  if (formattedDeepCleanUps.length === 0) {
    return <p>No hay registros</p>;
  }
  return (
    <Fragment>
      <div
        className="cleanUpsTableWrapper"
        style={{ height: "400px", width: "100%" }}
      >
        <DataGrid
          rows={formattedDeepCleanUps}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          getRowId={(row) => {
            return row._id;
          }}
          rowHeight={40}
        />
      </div>
      <div className="cleanUpsCardsWrapper">
        {/* TODO: do components */}
        {formattedDeepCleanUps.map((element) => {
          return (
            <div className="c-card">
              <div className="c-card_top">
                <h3 className="heading--tertiary u-textPrimary">
                  {element.date}
                </h3>
              </div>

              <div className="db-cleanUps__card-body">
                <p className="">
                  Limpieza:{" "}
                  {element.cleaners.map((cleaner, index) => {
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
                  {element.supervisors.map((supervisor, index) => {
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
                <Link to={`${element._id}`}>
                  <button
                    className="btn btn-primary "
                    // onClick={() => handleClean(dailyCleanUp._id)}
                  >
                    Ver
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
