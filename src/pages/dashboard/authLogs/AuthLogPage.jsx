import { CircularProgress } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogsStartLoading } from "../../../actions/authLogActions";

export const AuthLogPage = () => {
  const dispatch = useDispatch();
  const { collaboratorLogs, userLogs, isLoadingLogs } = useSelector(
    (state) => state.authLogs
  );

  useEffect(() => {
    dispatch(authLogsStartLoading());
  }, [dispatch]);

  const columns = [
    {
      field: "collaborator",
      headerName: "User",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <img
              className="collaboratorsImg"
              src={
                params.row.collaborator
                  ? params.row.collaborator?.imgUrl
                  : params.row.user?.imgUrl
              }
              alt=""
            />
            {params.row.collaborator
              ? params.row.collaborator?.col_code
              : params.row.user?.col_code}
          </div>
        );
      },
    },

    { field: "date", headerName: "fecha", flex: 1 },
  ];

  if (isLoadingLogs) return <CircularProgress />;

  return (
    <Fragment>
      <h2 className="text-center m-4">Accesos de colaboradores</h2>
      <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid
          rows={collaboratorLogs}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
        />
      </div>

      <h2 className="text-center m-4">Accesos de usuarios</h2>
      <div style={{ height: "50vh", width: "100%" }}>
        <DataGrid
          rows={userLogs}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
        />
      </div>
    </Fragment>
  );
};
