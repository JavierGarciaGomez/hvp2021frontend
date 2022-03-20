import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteFcmDog,
  deleteFcmPartner,
  startLoadingAllFcm,
} from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";
import { dogSexTypes, fcmCertificatesTypes } from "../../../types/types";

// todo try to convert it to a layout component for fcm
export const FcmDogsIndex = () => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmDogs } = allFcm;

  const handleDelete = async (id) => {
    if (
      !(await fireSwalConfirmation(
        "¿Estás seguro de borrar este objeto de la base de datos? Esta acción es irreversible y podría afectar trámites comenzados"
      ))
    )
      return;

    // todo
    dispatch(deleteFcmDog(id, true));
  };

  const columns = [
    {
      field: "petName",
      headerName: "Nombre",
      flex: 1,
      editable: false,
    },
    {
      field: "registerNum",
      headerName: "Número de registro",
      flex: 1,
      editable: false,
    },
    {
      field: "registerType",
      headerName: "Tipo de registro",
      flex: 1,
      editable: false,
      valueGetter: (params) =>
        fcmCertificatesTypes[params.row.registerType] || "",
    },
    {
      field: "breed",
      headerName: "Raza",
      flex: 1,
      editable: false,
    },
    {
      field: "sex",
      headerName: "Sexo",
      flex: 1,
      editable: false,
      valueGetter: (params) => dogSexTypes[params.row.sex] || "",
    },

    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Link to={`${params.row._id}`}>
              <Button>Ver</Button>
            </Link>

            <DeleteOutline
              sx={{ color: "error.main", cursor: "pointer" }}
              onClick={() => handleDelete(params.id)}
            />
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(startLoadingAllFcm());
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h4" component="h2" mb="2rem">
          Perros registrados de la FCM
        </Typography>
      </Box>
      <Box>
        <Link to="createNew">
          <Button>Crear nuevo registro</Button>
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DataGrid
          columns={columns}
          rows={allFcmDogs}
          autoHeight
          getRowId={(row) => {
            return row._id;
          }}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};
