import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getGeneralData } from "../../../helpers/fcmUtilities";

export const FcmPackageSummary = () => {
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { client } = useSelector((state) => state.clients);
  const [generalData, setgeneralData] = useState({ puppies: [] });
  const [procedureData, setProcedureData] = useState({});

  useEffect(() => {
    setgeneralData(getGeneralData(fcmPackage, client));
  }, []);

  console.log(generalData);

  return (
    <Box mt="4rem">
      {/* General data container */}
      <Box>
        <Typography component="h2" variant="h4" mb="2rem">
          Datos generales
        </Typography>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Propietario del padre
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre completo: </Typography>
            <Typography>{generalData.fatherOwnerFullName} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>
              Número de socio: {generalData.fatherOwnerPartnerNum}
            </Typography>
          </Box>
        </Box>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Propietario de la madre
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre completo: </Typography>
            <Typography>{generalData.motherOwnerFullName} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>
              Número de socio: {generalData.motherOwnerPartnerNum}
            </Typography>
          </Box>
        </Box>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Padre de la camada
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre: </Typography>
            <Typography>{generalData.fatherFcmDogName} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>
              Número de registro: {generalData.fatherFcmDogRegisterNum}
            </Typography>
          </Box>
        </Box>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Madre de la camada
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre: </Typography>
            <Typography>{generalData.motherFcmDogName} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>
              Número de registro: {generalData.motherFcmDogRegisterNum}
            </Typography>
          </Box>
        </Box>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Registros de la cruza
          </Typography>
          {generalData.puppies.map((element) => (
            <Box key={element.name} sx={{ display: "flex" }}>
              <Typography>Nombre: </Typography>
              <Typography>{element.puppyName} </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Procedures container */}
      <Box>
        <Typography component="h2" variant="h4" mb="2rem">
          Trámites incluidos en el paquete
        </Typography>
      </Box>
    </Box>
  );
};
