import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deepCleanUpsStartLoading } from "../../../../actions/cleanUpsActions";
import {
  convertCollectionDatesToString,
  formatAndOrderCollection,
  getAColumn,
} from "../../../../helpers/utilites";
import { deepCleanUpActivities } from "../../../../types/types";

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
    <div style={{ height: "300px", width: "100%" }}>
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
  );
};
