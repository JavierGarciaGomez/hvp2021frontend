import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  dailyCleanUpsAddCleaner,
  dailyCleanUpsStartLoading,
} from "../../../actions/cleanUpsActions";
import {
  convertCollectionDatesToString,
  getIdOrEmpty,
} from "../../../helpers/utilites";

export const CleanUpsPage = () => {
  const dispatch = useDispatch();
  const [formattedDailyCleanups, setformattedDailyCleanups] = useState([]);

  const { dailyCleanUps, isLoadingDailyCleanUps } = useSelector(
    (state) => state.cleanups
  );

  useEffect(() => {
    dispatch(dailyCleanUpsStartLoading());
  }, [dispatch]);

  useEffect(() => {
    setformattedDailyCleanups(convertCollectionDatesToString(dailyCleanUps));
    console.log("loading or not", isLoadingDailyCleanUps);
  }, [dailyCleanUps]);

  const columns = [
    { field: "date", headerName: "Fecha", width: 120 },
    { field: "branch", headerName: "Branch", width: 100 },
    {
      field: "cleaners",
      headerName: "Realizado",
      width: 200,
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
      width: 200,
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
      field: "comments",
      headerName: "Comentarios",
      width: 400,
      renderCell: (params) => {
        return (
          <Fragment>
            <div className="d-flex align-items-center">
              {params.row.comments.map((comment, index) => {
                return <div>{comment?.comment} </div>;
              })}
            </div>
          </Fragment>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
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

  const handleClean = (id) => {
    console.log(id);
    dispatch(dailyCleanUpsAddCleaner(id));
    dispatch(dailyCleanUpsStartLoading());
  };

  const handleSupervise = (id) => {
    console.log(id);
  };

  if (isLoadingDailyCleanUps) return <CircularProgress />;

  return (
    <Fragment>
      <h1 className="text-center m-4">Control de limpieza diario</h1>
      <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid
          rows={formattedDailyCleanups}
          disableSelectionOnClick
          columns={columns}
          pageSize={50}
          checkboxSelection
          getRowId={(row) => row._id}
          rowHeight={40}
        />
      </div>
    </Fragment>
  );
};
