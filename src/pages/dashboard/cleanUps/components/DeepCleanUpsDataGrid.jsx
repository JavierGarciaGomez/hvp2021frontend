import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deepCleanUpsStartLoading } from "../../../../actions/cleanUpsActions";
import {
  formatAndOrderCollection,
  getAColumn,
} from "../../../../helpers/utilites";

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
              <button className="btn btn-success btn-sm">Ver</button>
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
                    className="collaboratorsImg"
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
                    className="collaboratorsImg"
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
        className="db-cleanUps__table-wrapper"
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
      <div className="db-cleanUps__card-wrapper">
        {/* TODO: do components */}
        {formattedDeepCleanUps.map((element) => {
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
                <Link to={`${element._id}`}>
                  <button
                    className="btn btn-primary db-cleanUps__btn"
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
