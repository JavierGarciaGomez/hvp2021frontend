import "./collaborators.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  collaboratorsStartLoading,
  collaboratorDelete,
} from "../../../actions/collaboratorActions";
import { userRows } from "../../../data/dummyData";
import { CircularProgress } from "@material-ui/core";
import { roleTypes } from "../../../types/types";

export default function Collaborators() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [isAdmin, setisAdmin] = useState(false);

  const [data, setData] = useState(userRows);
  const { collaborators, isLoading } = useSelector(
    (state) => state.collaborator
  );

  useEffect(() => {
    dispatch(collaboratorsStartLoading(false));
    console.log(role, roleTypes.admin);
    if (role === roleTypes.admin) {
      setisAdmin(true);
    }
  }, [dispatch, role]);

  const handleDelete = (id) => {
    dispatch(collaboratorDelete(id));
  };

  const columns = [
    { field: "col_numId", headerName: "IdNum", flex: 1 },
    {
      field: "Collaborator",
      headerName: "Collaborator",
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
    { field: "first_name", headerName: "Nombre", flex: 2 },
    { field: "last_name", headerName: "Apellidos", flex: 2 },
    { field: "position", headerName: "Posición", flex: 1 },
    { field: "role", headerName: "Rol", flex: 1 },
    { field: "isActive", headerName: "Activo", flex: 1 },
    { field: "isRegistered", headerName: "Registrado", flex: 1 },
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
            {isAdmin && (
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

  if (isLoading) return <CircularProgress />;

  return (
    <Fragment>
      {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={10}
          checkboxSelection
        />
      </div> */}
      <h1 className="text-center m-4">Colaboradores</h1>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={collaborators}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
        />
      </div>
      <Link to="newCollaborator">
        <button className="createNewUserButton">
          Crear un nuevo colaborador
        </button>
      </Link>
    </Fragment>
  );
}
