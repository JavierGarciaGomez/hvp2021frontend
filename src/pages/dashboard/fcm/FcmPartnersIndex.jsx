import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteFcmPartner,
  startLoadingAllFcm,
} from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";

// todo try to convert it to a layout component for fcm
export const FcmPartnersIndex = () => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmPartners } = allFcm;

  const handleDelete = async (id) => {
    if (
      !(await fireSwalConfirmation(
        "¿Estás seguro de borrar este socio de la base de datos? Esta acción es irreversible y podría afectar trámites comenzados"
      ))
    )
      return;

    dispatch(deleteFcmPartner(id));
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Nombre completo",
      flex: 1,

      editable: false,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.paternalSurname || ""}`,
    },
    {
      field: "partnerNum",
      headerName: "Número de socio",
      flex: 1,

      editable: false,
    },
    {
      field: "expirationDate",
      headerName: "Expiración",
      flex: 1,

      editable: false,
      valueGetter: (params) =>
        `${dayjs(params.row.expirationDate).format("DD-MMM-YYYY") || ""} `,
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 2,
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
          Socios de la FCM
        </Typography>
      </Box>
      <Box>
        <Link to="createNew">
          <Button>Crear nuevo socio</Button>
        </Link>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DataGrid
          columns={columns}
          rows={allFcmPartners}
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
