import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { generateProcedureData } from "../../../helpers/fcmUtilities";
import { getFullNameOfObject } from "../../../helpers/utilities";

export const FcmProceduresSummary = () => {
  const { fcmPackage } = useSelector((state) => state.fcm);
  const [procedureData, setProcedureData] = useState({});
  const { partnerRegistrationsProcedures, partnerRenewalsProcedures, partnerResponsiveLetterProcedures, transfersProcedures, certificateProcedures } = procedureData;

  useEffect(() => {
    setProcedureData(generateProcedureData(fcmPackage));
  }, []);

  console.log({ ...procedureData });

  return (
    <Box>
      <Typography component="h2" variant="h4" mb="2rem">
        Trámites incluidos en el paquete
      </Typography>

      {partnerRegistrationsProcedures && partnerRegistrationsProcedures.length > 0 && (
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Registros de nuevos socios
          </Typography>
          {partnerRegistrationsProcedures.map((element) => (
            <Box key={element._id} sx={{ display: "flex" }}>
              <Typography>Nombre: </Typography>
              <Typography>{getFullNameOfObject(element)} </Typography>
            </Box>
          ))}
        </Box>
      )}
      {partnerRenewalsProcedures && partnerRenewalsProcedures.length > 0 && (
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Renovaciones de socios
          </Typography>
          {partnerRenewalsProcedures.map((element) => (
            <Box key={element._id} sx={{ display: "flex" }}>
              <Typography>Nombre: </Typography>
              <Typography>{getFullNameOfObject(element)} </Typography>
            </Box>
          ))}
        </Box>
      )}
      {partnerResponsiveLetterProcedures && partnerResponsiveLetterProcedures.length > 0 && (
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Cartas responsivas de socios
          </Typography>
          {partnerResponsiveLetterProcedures.map((element) => (
            <Box key={element._id} sx={{ display: "flex" }}>
              <Typography>Nombre: </Typography>
              <Typography>{getFullNameOfObject(element)} </Typography>
            </Box>
          ))}
        </Box>
      )}
      {transfersProcedures && transfersProcedures.length > 0 && (
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Transferencias
          </Typography>
          {transfersProcedures.map((element) => (
            <Box key={element._id} sx={{ display: "flex" }}>
              <Typography>{element.stepLabel} </Typography>
            </Box>
          ))}
        </Box>
      )}
      {certificateProcedures && certificateProcedures.length > 0 && (
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Certificados FCM
          </Typography>
          {certificateProcedures.map((element) => (
            <Box key={element._id} sx={{ display: "flex" }}>
              <Typography>{element.petName} </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
