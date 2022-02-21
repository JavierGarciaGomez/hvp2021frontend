import { DataGrid } from "@material-ui/data-grid";

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allMiscStartLoading, miscUpdate } from "../../../actions/miscActions";
import {
  checkIfLabelAndValueAreUnique,
  findObjectByProperty,
  fireSwalError,
} from "../../../helpers/utilities";
import Paper from "@mui/material/Paper";
import { useForm } from "../../../hooks/useForm";
import { MiscForm } from "./components/MiscForm";

export const Misc = () => {
  // todo css file
  const dispatch = useDispatch();
  const { allMisc = [], isLoadingMisc } = useSelector((state) => state.misc);

  const [keyRows, setkeyRows] = useState([]);
  const [miscKey, setMiscKey] = useState(null);
  const [showForm, setshowForm] = useState(false);

  const [formData, setformData] = useState({});

  useEffect(() => {
    dispatch(allMiscStartLoading());
  }, [dispatch]);

  const handleSelectKey = (key) => {
    setMiscKey(key);
    setkeyRows(findObjectByProperty(allMisc, "key", key).data);
  };

  const handleShowCreateForm = () => {
    setformData({
      title: "Crea un nuevo registro",
      handleShowForm: handleShowForm,
      initialValues: { label: "", value: "" },
      handleData: handleAddNewValue,
    });
    handleShowForm();
  };

  const handleShowForm = () => {
    setshowForm((prev) => !prev);
  };

  const handleShowEditForm = (row) => {
    setformData({
      title: "Edita el registro",
      handleShowForm: handleShowForm,
      initialValues: { ...row },
      handleData: handleEdit,
    });
    handleShowForm();
  };

  const miscColumns = [
    { field: "key", headerName: "Identificador", flex: 1 },

    {
      field: "numValues",
      headerName: "Número de valores",
      flex: 1,
      renderCell: (params) => {
        return <div>{params.row.data.length}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSelectKey(params.row.key);
            }}
          >
            Mostrar registros
          </button>
        );
      },
    },
  ];

  const handleAddNewValue = (values) => {
    if (!checkIfLabelAndValueAreUnique(values, keyRows)) {
      return fireSwalError("No puedes repetir valores ni etiquetas");
    }
    let newKeyRows = [...keyRows];
    newKeyRows.push({ ...values });
    dispatch(miscUpdate(miscKey, newKeyRows));
    setkeyRows(newKeyRows);
    setshowForm();
  };

  const handleEdit = (values) => {
    let newKeyRows = [...keyRows];
    let existentValue = findObjectByProperty(newKeyRows, "value", values.value);
    let existentLabel = findObjectByProperty(newKeyRows, "label", values.label);
    console.log("handle update", existentValue, existentLabel);

    if (existentValue && existentLabel) {
      return fireSwalError(
        "No puedes cambiar al mismo tiempo la etiqueta y el valor. Solo puedes cambiar uno."
      );
    }
    if (existentValue) {
      existentValue.label = values.label;
    }
    if (existentLabel) {
      existentLabel.value = values.value;
    }

    dispatch(miscUpdate(miscKey, newKeyRows));
    setkeyRows([...newKeyRows]);
    setshowForm();
  };

  const handleDelete = (row) => {
    const newKeyRows = keyRows.filter((element) => element.value !== row.value);

    dispatch(miscUpdate(miscKey, newKeyRows));
    setkeyRows(newKeyRows);
  };

  if (isLoadingMisc) {
    return <CircularProgress />;
  }

  console.log("all misc", allMisc);
  return (
    <div className="p-5">
      <div className="">
        <h2 className="heading--secondary">Selecciona una actividad</h2>
      </div>
      <div className="mb-5r">
        {/* // todo: specialGridTable */}
        <div style={{ height: "30vh", width: "100%" }}>
          <DataGrid
            rows={allMisc}
            disableSelectionOnClick
            columns={miscColumns}
            pageSize={7}
            getRowId={(row) => {
              console.log("row", row);
              return row._id;
            }}
            rowHeight={40}
            rowsPerPageOptions={[7, 50, 100]}
          />
        </div>
      </div>
      {keyRows.length !== 0 && (
        <div>
          <div className="row d-flex">
            <div className="left col p-4">
              <div className="db-rfc__header fs-2 mb-5">Registros</div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "50%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="fs-4">Etiqueta</TableCell>
                      <TableCell align="right" className="fs-4">
                        Valor
                      </TableCell>
                      <TableCell align="right" className="fs-4">
                        Editar
                      </TableCell>
                      <TableCell align="right" className="fs-4">
                        Borrar
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {keyRows.map((row) => (
                      <TableRow
                        key={row.label}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" className="fs-4">
                          {row.label}
                        </TableCell>
                        <TableCell align="right" className="fs-4">
                          {row.value}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleShowEditForm(row)}
                          >
                            Editar
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(row)}
                          >
                            Borrar
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="right col p-4">
              <button
                className="btn btn-success d-block mx-auto mb-5"
                onClick={handleShowCreateForm}
              >
                Agrega un nuevo valor
              </button>

              {showForm && <MiscForm {...formData} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
