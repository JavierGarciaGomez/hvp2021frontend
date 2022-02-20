import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collaboratorsStartLoading,
  collaboratorDelete,
} from "../../../actions/collaboratorActions";
import { CircularProgress } from "@material-ui/core";
import { roleTypes } from "../../../types/types";

export default function Collaborators() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const { collaborators, isLoading } = useSelector(
    (state) => state.collaborator
  );
  const [isAdmin, setisAdmin] = useState(false);

  // load collaborators and set authorizations
  useEffect(() => {
    dispatch(collaboratorsStartLoading(false));
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
      <h1 className="text-center m-4">Colaboradores</h1>
      {/* Display bigger than smaller tablets */}
      <div
        className="db-collaborators__datagrid-wrapper"
        style={{ height: "70vh", width: "100%" }}
      >
        <DataGrid
          rows={collaborators}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20, 50, 100]}
          getRowId={(row) => row._id}
        />
      </div>
      {/* Display smaller than smaller tablets */}
      <div className="db-collaborators__cards-wrapper">
        {/* TODO: do components */}
        {collaborators.map((collaborator) => {
          return (
            <div
              className="db-collaborators__collaborator-card"
              key={collaborator._id}
            >
              <div className="db-collaborators__card-top">
                <div className="db-collaborators__img-container">
                  <img
                    className="db-collaborators__img"
                    src={collaborator.imgUrl}
                    alt=""
                  />
                </div>
                <div className="db-collaborators__card-code">
                  {collaborator.col_code}
                </div>
              </div>

              <div className="db-collaborators__card-body">
                <p>{`${collaborator.first_name} ${collaborator.last_name}`}</p>
                <p>{collaborator.position}</p>
                <p>{collaborator.role}</p>
              </div>
              <div className="db-collaborators__card-footer">
                <Link to={`${collaborator._id}`}>
                  <button className="btn btn-primary db-collaborators__btn">
                    Ver
                  </button>
                </Link>
                {isAdmin && (
                  <Link to={`${collaborator._id}`}>
                    <button className="btn btn-danger db-collaborators__btn">
                      Eliminar
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Link to="newCollaborator">
        <button className="createNewUserButton">
          Crear un nuevo colaborador
        </button>
      </Link>
    </Fragment>
  );
}
