import "./collaborators.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { userRows } from "../../../../data/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { collaboratorsStartLoading } from "../../../../actions/collaboratorActions";

export default function Collaborators() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(collaboratorsStartLoading());
  }, [dispatch]);

  const [data, setData] = useState(userRows);
  const { collaborators } = useSelector((state) => state.collaborator);
  console.log("getting state from redux", collaborators);

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <img className="collaboratorsImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`${params.row.id}`}>
              <button className="collaboratorsEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="collaboratorsDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const columns2 = [
    { field: "col_numId", headerName: "IdNum", width: 20 },
    {
      field: "Collaborator",
      headerName: "Collaborator",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <img className="collaboratorsImg" src={params.row.imgUrl} alt="" />
            {params.row.col_code}
          </div>
        );
      },
    },
    { field: "first_name", headerName: "Nombre", width: 150 },
    { field: "last_name", headerName: "Apellidos", width: 150 },
    { field: "role", headerName: "Rol", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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

  return (
    <Fragment>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={10}
          checkboxSelection
        />
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={collaborators}
          disableSelectionOnClick
          columns={columns2}
          pageSize={50}
          checkboxSelection
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
