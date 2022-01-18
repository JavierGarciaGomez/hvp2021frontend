import "./collaborators.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { collaboratorsStartLoading } from "../../../actions/collaboratorActions";
import { userRows } from "../../../data/dummyData";
import { CircularProgress } from "@material-ui/core";

export default function Collaborators() {
  const dispatch = useDispatch();

  const [data, setData] = useState(userRows);
  const { collaborators, isLoading } = useSelector(
    (state) => state.collaborator
  );

  useEffect(() => {
    dispatch(collaboratorsStartLoading(false));
  }, [dispatch]);

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const columns2 = [
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
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${params.row._id}`}>
              <button className="collaboratorsEdit">Show</button>
            </Link>
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
      <div style={{ height: "80vh", width: "100%" }}>
        <DataGrid
          rows={collaborators}
          disableSelectionOnClick
          columns={columns2}
          pageSize={20}
          getRowId={(row) => row._id}
        />
      </div>
      <Link to="newCollaborator">
        <button className="createNewUserButton">
          Create a new collaborator
        </button>
      </Link>
    </Fragment>
  );
}
