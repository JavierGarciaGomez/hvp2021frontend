import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getGeneralData } from "../../../helpers/fcmUtilities";
import { fcmPackagesTypes } from "../../../types/types";
import { FcmProceduresSummary } from "./FcmProceduresSummary";
import { FcmPackageSummarySendButton } from "./FcmPackageSummarySendButton";

export const FcmPackageSummaryLitter = () => {
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { packageType } = fcmPackage;
  const { client } = useSelector((state) => state.clients);

  const [generalData, setgeneralData] = useState({ puppies: [] });

  useEffect(() => {
    setgeneralData(getGeneralData(fcmPackage, client));
  }, []);

  return (
    <Box mt="4rem">
      {/* Heading and notes */}
      <Box>
        <Typography component="h2" variant="h3" mb="2rem">
          Resumen
        </Typography>
        <Box
          sx={{
            bgcolor: "grey.300",
            p: "2rem",
            borderRadius: 2,
            boxShadow: 5,
            mb: "5rem",
          }}
        >
          <Typography mb="1rem">Revisa los datos y envía la información. Una vez enviado, no podrá editarse nuevamente.</Typography>
          <Typography mb="1rem">Si los datos son incorrectos, es necesario que se edite desde el paso respectivo.</Typography>
        </Box>
      </Box>
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
            <Typography>Número de socio: {generalData.fatherOwnerPartnerNum}</Typography>
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
            <Typography>Número de socio: {generalData.motherOwnerPartnerNum}</Typography>
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
            <Typography>Número de registro: {generalData.fatherFcmDogRegisterNum}</Typography>
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
            <Typography>Número de registro: {generalData.motherFcmDogRegisterNum}</Typography>
          </Box>
        </Box>
        {packageType === fcmPackagesTypes.PEDIGREE ||
          (packageType === fcmPackagesTypes.RACEPURITY && (
            <Box mb="2rem">
              <Typography component="h3" variant="h5">
                Registros de la cruza
              </Typography>
              {generalData.puppies.map((element) => (
                <Box key={element._id} sx={{ display: "flex" }}>
                  <Typography>Nombre: </Typography>
                  <Typography>{element.petName} </Typography>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
      {/* Procedures container */}
      <FcmProceduresSummary />
      <FcmPackageSummarySendButton />
    </Box>
  );
};
