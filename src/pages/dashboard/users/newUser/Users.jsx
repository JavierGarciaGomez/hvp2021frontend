import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { CircularProgress } from "@material-ui/core";
import { usersStartLoading, userDelete } from "../../../../actions/userActions";
import { checkAutorization } from "../../../../helpers/utilities";
import { roleTypes } from "../../../../types/types";

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
    setisAuthorizedToDelete(checkAutorization(role, roleTypes.admin));
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
            <img className="collaboratorsImg" src={params.row.imgUrl} alt="" />
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
