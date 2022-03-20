import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  generateProcedureData,
  getGeneralData,
} from "../../../helpers/fcmUtilities";
import {
  fireSwalConfirmation,
  getFullNameOfObject,
} from "../../../helpers/utilities";
import { useNavigate, useParams } from "react-router-dom";
import {
  createFcmPackage,
  setFcmPackageStatus,
  updateFcmPackage,
} from "../../../actions/fcmActions";
import { fcmPackageStatusTypes } from "../../../types/types";

export const FcmPackageSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSendData = async () => {
    const confirmation = await fireSwalConfirmation(
      "¿Estás seguro de enviar? Una vez enviado, no se podrá editar la información"
    );
    if (!confirmation) {
      return;
    }

    dispatch(setFcmPackageStatus(fcmPackageStatusTypes.sentByClient));
    if (id) {
      await dispatch(updateFcmPackage(id));
    } else {
      await dispatch(createFcmPackage());
    }
    navigate("/clients");
  };

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
          <Typography mb="1rem">
            Revisa los datos y envía la información. Una vez enviado, no podrá
            editarse nuevamente.
          </Typography>
          <Typography mb="1rem">
            Si los datos son incorrectos, es necesario que se edite desde el
            paso respectivo.
          </Typography>
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
            <Box key={element._id} sx={{ display: "flex" }}>
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
      {/* Botón */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleSendData}>Enviar información</Button>
      </Box>
    </Box>
  );
};
