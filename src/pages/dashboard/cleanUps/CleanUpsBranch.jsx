import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  dailyCleanUpsAddCleaner,
  dailyCleanUpsStartLoading,
} from "../../../actions/cleanUpsActions";
import { DailyCleanUpsDataGrid } from "./components/DailyCleanUpsDataGrid";
import { DeepCleanUpsDataGrid } from "./components/DeepCleanUpsDataGrid";

export const CleanUpsBranch = () => {
  const dispatch = useDispatch();

  const { dailyCleanUps, isLoadingDailyCleanUps } = useSelector(
    (state) => state.cleanups
  );

  useEffect(() => {
    // dispatch(dailyCleanUpsStartLoading(branch));
  }, [dispatch]);

  useEffect(() => {
    // setformattedDailyCleanups(convertCollectionDatesToString(dailyCleanUps));
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
    dispatch(dailyCleanUpsAddCleaner(id));
    dispatch(dailyCleanUpsStartLoading());
  };

  const handleSupervise = (id) => {};

  // TODO
  // if (isLoadingDailyCleanUps) return <CircularProgress />;

  return (
    <Fragment>
      <div className="container border-top border-primary">
        <div className="row d-flex justify-content-center m-3 align-self-center">
          <div className="col-6 text-center fs-3">
            Control de limpieza profunda
          </div>
          <div className="col-4 text-start">
            <Link to="addNewDeepCleaning">
              <button type="button" className="btn btn-secondary mx-2">
                Agregar limpieza profunda
              </button>
            </Link>
          </div>
        </div>
        <DeepCleanUpsDataGrid />
        <div className="row d-flex justify-content-center m-3 align-self-center">
          <div className="col-12 text-center fs-3">
            Control de limpieza diario
          </div>
        </div>
        <DailyCleanUpsDataGrid />
      </div>

      <h3 className="text-center m-3 fs-3">Control de limpieza diario</h3>
      {/* <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid
          rows={formattedDailyCleanups}
          disableSelectionOnClick
          columns={columns}
          pageSize={50}
          checkboxSelection
          getRowId={(row) => row._id}
          rowHeight={40}
        />
      </div> */}
    </Fragment>
  );
};
