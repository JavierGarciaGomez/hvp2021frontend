import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFcmPackage, startLoadingAllFcm } from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";

// todo try to convert it to a layout component for fcm
export const FcmPackagesIndex = () => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmPackages } = allFcm;

  const handleDelete = async (id) => {
    if (!(await fireSwalConfirmation("¿Estás seguro de borrar este objeto de la base de datos? Esta acción es irreversible y podría afectar trámites comenzados"))) return;

    // todo
    dispatch(deleteFcmPackage(id, true));
  };

  // Todo
  const columns = [
    {
      field: "type",
      headerName: "Tipo",
      flex: 1,
      editable: false,
      // todo review
      valueGetter: (params) => params.row.packageType,
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      editable: false,
      // todo review
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
      editable: false,
      // todo review
    },
    {
      field: "createdBy",
      headerName: "Creado por",
      flex: 1,
      editable: false,
      valueGetter: (params) => params.row.creator.email,
      // todo review
    },
    {
      field: "date",
      headerName: "Fecha de inicio",
      flex: 1,
      editable: false,
      valueGetter: (params) => dayjs(params.row.creationDate),
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

            <DeleteOutline sx={{ color: "error.main", cursor: "pointer" }} onClick={() => handleDelete(params.id)} />
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
          Paquetes registrados
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
          rows={allFcmPackages}
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
