import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deepCleanUpsStartLoading } from "../../../../actions/cleanUpsActions";
import { convertCollectionDatesToString } from "../../../../helpers/utilites";

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
    console.log("esto recibí", formattedDeepCleanUps);
  }, [deepCleanUps]);

  const columns = [
    { field: "date", headerName: "Fecha", width: 120 },

    {
      field: "cleaners",
      headerName: "Orden",
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
            {/* <div className="d-flex align-items-center">
                <img className="collaboratorsImg" src="" alt="" />
                {getIdOrEmpty(params.row)}
              </div> */}
          </Fragment>
        );
      },
    },
    {
      field: "waste",
      headerName: "Desechos",
      width: 150,
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
      field: "equipment",
      headerName: "Equipo",
      width: 150,
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
      field: "cages",
      headerName: "Jaulas",
      width: 150,
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
      field: "lol",
      headerName: "Gavetas",
      width: 150,
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
      field: "ref",
      headerName: "Refrigerador",
      width: 150,
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
      field: "limp",
      headerName: "General",
      width: 150,
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
  return (
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
  );
};
