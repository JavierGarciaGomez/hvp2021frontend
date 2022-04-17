import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getGeneralData } from "../../../helpers/fcmUtilities";
import { fireSwalConfirmation } from "../../../helpers/utilities";
import { useNavigate, useParams } from "react-router-dom";
import { createFcmPackage, setFcmPackageStatus, updateFcmPackage } from "../../../actions/fcmActions";
import { fcmPackageStatusTypes } from "../../../types/types";
import dayjs from "dayjs";
import { FcmProceduresSummary } from "./FcmProceduresSummary";

export const FcmPackageSummarySingleDog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fcmPackage } = useSelector((state) => state.fcm);

  const { client } = useSelector((state) => state.clients);

  const [generalData, setgeneralData] = useState({ puppies: [] });

  useEffect(() => {
    setgeneralData(getGeneralData(fcmPackage, client));
  }, []);

  const handleSendData = async () => {
    const confirmation = await fireSwalConfirmation("¿Estás seguro de enviar? Una vez enviado, no se podrá editar la información");
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
            Registro
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Tipo de paquete:&nbsp;</Typography>
            <Typography>{fcmPackage.packageType} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>Fecha de solicitud:&nbsp;</Typography>
            <Typography>{dayjs(fcmPackage.creationDate).format("DD-MMM-YYYY")} </Typography>
          </Box>
        </Box>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Propietario
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre completo: </Typography>
            <Typography>{generalData.ownerFullName} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>Número de socio: {generalData.ownerPartnerNum}</Typography>
          </Box>
        </Box>
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Perro a registrar
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre: </Typography>
            <Typography>{generalData.dogName} </Typography>
          </Box>
        </Box>
      </Box>
      <FcmProceduresSummary />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleSendData}>Enviar información</Button>
      </Box>
    </Box>
  );
};
