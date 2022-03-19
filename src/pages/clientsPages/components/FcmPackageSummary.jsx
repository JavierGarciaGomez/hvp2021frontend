import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  generateProcedureData,
  getGeneralData,
} from "../../../helpers/fcmUtilities";
import { getFullNameOfObject } from "../../../helpers/utilities";

export const FcmPackageSummary = () => {
  const { fcmPackage, allFcm } = useSelector((state) => state.fcm);
  const { client } = useSelector((state) => state.clients);

  const [generalData, setgeneralData] = useState({ puppies: [] });
  const [procedureData, setProcedureData] = useState({});
  const {
    partnerRegistrationsProcedures,
    partnerRenewalsProcedures,
    partnerResponsiveLetterProcedures,
    transfersProcedures,
    certificateProcedures,
  } = procedureData;

  useEffect(() => {
    setgeneralData(getGeneralData(fcmPackage, client));
    setProcedureData(generateProcedureData(fcmPackage));
  }, []);

  console.log("que tenemos por acá");
  console.dir(procedureData);

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
            <Box key={element.petName} sx={{ display: "flex" }}>
              <Typography>Nombre: </Typography>
              <Typography>{element.petName} </Typography>
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
      {partnerRegistrationsProcedures &&
        partnerRegistrationsProcedures.length > 0 && (
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
      {partnerResponsiveLetterProcedures &&
        partnerResponsiveLetterProcedures.length > 0 && (
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
