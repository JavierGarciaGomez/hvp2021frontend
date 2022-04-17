import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLoadingAllFcm } from "../../actions/fcmActions";

export const ClientPendingProcedures = () => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const auth = useSelector((state) => state.auth);
  const { allFcmPackages } = allFcm;
  const [filteredPackages, setFilteredPackages] = useState([]);

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
            <Link to={`/clients/procedure/${params.row._id}`}>
              <Button>Ver</Button>
            </Link>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(startLoadingAllFcm());
  }, []);

  useEffect(() => {
    setFilteredPackages(allFcmPackages.filter((fcmPackage) => fcmPackage.creator._id === auth.uid));
  }, [allFcmPackages]);

  console.log("allfcmpacka", allFcmPackages);
  console.log({ ...auth });
  console.table(filteredPackages);

  return (
    <Box>
      <Box>
        <Typography variant="h4" component="h2" mb="2rem">
          Paquetes registrados
        </Typography>
      </Box>

      {filteredPackages.length === 0 && <Typography>Ningún paquete registrado</Typography>}
      {filteredPackages.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DataGrid
            columns={columns}
            rows={filteredPackages}
            autoHeight
            getRowId={(row) => {
              return row._id;
            }}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};
