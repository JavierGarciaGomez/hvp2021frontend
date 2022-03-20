import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLoadingAllFcm } from "../../../actions/fcmActions";

export const FcmIndex = () => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  useEffect(() => {
    startLoadingAllFcm();
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h2" mb="2rem">
        Federación Canófila Mexicana
      </Typography>
      <Typography>Selecciona una opción</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="fcmPartners">
          <Button>Socios</Button>
        </Link>
        <Link to="fcmDogs">
          <Button>Perros</Button>
        </Link>
        <Link to="fcmTransfers">
          <Button>Transferencias</Button>
        </Link>
        <Link to="fcmPackages">
          <Button>Paquetes</Button>
        </Link>
      </Box>
    </Box>
  );
};
