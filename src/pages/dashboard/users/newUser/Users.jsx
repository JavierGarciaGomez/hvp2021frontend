import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { usersStartLoading, userDelete } from "../../../../actions/userActions";

import { roleTypes } from "../../../../types/types";
import { checkAuthorization } from "../../../../helpers/utilities";

export default function Users() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [isAuthorizedToDelete, setisAuthorizedToDelete] = useState(false);

  // const [data, setData] = useState([]);

  const { users, isLoadingUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersStartLoading());
  }, [dispatch]);

  useEffect(() => {
    setisAuthorizedToDelete(checkAuthorization(role, roleTypes.admin));
  }, [role]);

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  const columns = [
    {
      field: "User",
      headerName: "User",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <img className="c-avatar" src={params.row.imgUrl} alt="" />
            {params.row.col_code}
          </div>
        );
      },
    },

    { field: "email", headerName: "email", flex: 1 },
    { field: "role", headerName: "Rol", flex: 1 },

    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${params.row._id}`}>
              <button className="collaboratorsEdit">Ver</button>
            </Link>
            {isAuthorizedToDelete && (
              <DeleteOutline
                className="collaboratorsDelete"
                onClick={() => handleDelete(params.id)}
              />
            )}
          </>
        );
      },
    },
  ];

  if (isLoadingUsers) return <CircularProgress />;

  return (
    <Fragment>
      <h1 className="text-center m-4">Usuarios</h1>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
        />
      </div>
    </Fragment>
  );
}
