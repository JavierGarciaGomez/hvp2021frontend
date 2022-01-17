import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deepCleanUpsStartLoading } from "../../../../actions/cleanUpsActions";
import {
  convertCollectionDatesToString,
  getAColumn,
} from "../../../../helpers/utilites";
import { deepCleanUpActivities } from "../../../../types/types";

export const DeepCleanUpsTable = ({
  formattedDailyCleanups,
  handleClean,
  handleSupervise,
}) => {
  const { branch } = useParams();

  const dispatch = useDispatch();
  const [formattedDeepCleanUps, setformattedDeepCleanUps] = useState([]);

  const { deepCleanUps, isLoadingDeepCleanUps } = useSelector(
    (state) => state.cleanups
  );

  useEffect(() => {
    dispatch(deepCleanUpsStartLoading(branch));
  }, [dispatch]);

  useEffect(() => {
    setformattedDeepCleanUps(convertCollectionDatesToString(deepCleanUps));
  }, [deepCleanUps]);

  const columns = [
    { field: "date", headerName: "Fecha", width: 120 },
    {
      field: "cleaners",
      headerName: "Realizado",
      width: 120,
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
      width: 120,
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

    getAColumn("correctOrder", "Orden", 120, "correctOrder"),
    getAColumn("wasteDisposal", "Desechos", 120, "wasteDisposal"),
    getAColumn("cleanedEquipment", "Equipamiento", 120, "cleanedEquipment"),
    getAColumn("cleanedCages", "Jaulas", 120, "cleanedCages"),
    getAColumn("cleanedDrawers", "Gavetas", 120, "cleanedDrawers"),
    getAColumn("everyAreaCleaned", "Áreas", 120, "cleanedDrawers"),
  ];

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
        rows={formattedDeepCleanUps}
        disableSelectionOnClick
        columns={columns}
        pageSize={50}
        checkboxSelection
        getRowId={(row) => row._id}
        rowHeight={40}
      />
    </div>
  );
};
