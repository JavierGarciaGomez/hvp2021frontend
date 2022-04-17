import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getGeneralData } from "../../../helpers/fcmUtilities";
import { isObjectEmpty } from "../../../helpers/utilities";
import dayjs from "dayjs";
import { FcmProceduresSummary } from "./FcmProceduresSummary";
import { FcmPackageSummarySendButton } from "./FcmPackageSummarySendButton";

export const FcmPackageSummaryPartner = () => {
  const { fcmPackage } = useSelector((state) => state.fcm);

  const { client } = useSelector((state) => state.clients);

  const [generalData, setgeneralData] = useState({ puppies: [] });

  useEffect(() => {
    setgeneralData(getGeneralData(fcmPackage, client));
  }, []);

  if (isObjectEmpty(generalData)) return <CircularProgress />;

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
            Socio
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography>Nombre completo: </Typography>
            <Typography>{generalData.partnerFullName} </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography>Número de socio: {generalData.partnerPartnerNum}</Typography>
          </Box>
        </Box>
      </Box>
      <FcmProceduresSummary />
      <FcmPackageSummarySendButton />
    </Box>
  );
};
