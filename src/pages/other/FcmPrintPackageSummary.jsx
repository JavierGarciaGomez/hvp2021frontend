import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

import React from "react";
import { getFullNameOfObject } from "../../helpers/utilities";
import { BoxLabelValueData } from "./components/BoxLabelValueData";

export const FcmPrintPackageSummary = ({ summaryData }) => {
  console.log({ ...summaryData });

  const {
    applicationDate,
    certificates,
    inspectionDate,
    newRegisters,
    renewals,
    transfers,
    user,
  } = summaryData;
  return (
    <Box mb="10rem">
      <Box mb="2rem">
        <Typography component="h2" variant="h4">
          Resumen
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography component="h3" variant="h5">
            Datos generales
          </Typography>
        </Box>
        <Box sx={{ paddingLeft: "4rem" }}>
          <BoxLabelValueData label="Usuario solicitante" value={user} />
        </Box>
        <Box sx={{ paddingLeft: "4rem" }}>
          <BoxLabelValueData
            label="Fecha de solicitud"
            value={dayjs(applicationDate).format("DD-MMM-YYYY")}
          />
        </Box>
        <Box sx={{ paddingLeft: "4rem" }}>
          <BoxLabelValueData
            label="Médico inspector"
            value="Rafael García López"
          />
        </Box>
        <Box sx={{ paddingLeft: "4rem" }}>
          <BoxLabelValueData
            label="Fecha de inspección"
            value={dayjs(inspectionDate).format("DD-MMM-YYYY")}
          />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography component="h3" variant="h5">
            Trámites
          </Typography>
        </Box>
        {certificates.length > 0 && (
          <Box sx={{ paddingLeft: "4rem" }}>
            <Box>
              <Typography component="h4" variant="h6">
                Obtención de certificados
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: "4rem" }}>
              {certificates.map((element) => (
                <Typography key={element.petName}>{element.petName}</Typography>
              ))}
            </Box>
          </Box>
        )}
        {newRegisters.length > 0 && (
          <Box sx={{ paddingLeft: "4rem" }}>
            <Box>
              <Typography component="h4" variant="h6">
                Inscripción de nuevos socios
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: "4rem" }}>
              {newRegisters.map((element) => (
                <Typography key={element._id}>
                  {getFullNameOfObject(element)}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
        {renewals.length > 0 && (
          <Box sx={{ paddingLeft: "4rem" }}>
            <Box>
              <Typography component="h4" variant="h6">
                Renovaciones
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: "4rem" }}>
              {renewals.map((element) => (
                <Typography key={element._id}>
                  {getFullNameOfObject(element)}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
        {transfers.length > 0 && (
          <Box sx={{ paddingLeft: "4rem" }}>
            <Box>
              <Typography component="h4" variant="h6">
                Transferencias
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: "4rem" }}>
              {transfers.map((element) => (
                <Typography key={element._id}>
                  {`Transferencia de ${
                    element.dog.petName
                  }. Propietario anterior: ${getFullNameOfObject(
                    element.prevOwner
                  )}. Nuevo propietario: ${getFullNameOfObject(
                    element.newOwner
                  )}`}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Box>
        <Box>
          <Typography component="h3" variant="h5">
            Formatos físicos a incluir
          </Typography>
        </Box>
        {newRegisters.length > 0 && (
          <Box sx={{ paddingLeft: "4rem" }}>
            <Box>
              <Typography component="h4" variant="h6">
                Inscripción de nuevos socios
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: "4rem" }}>
              {newRegisters.map((element) => (
                <Typography key={element._id}>
                  {getFullNameOfObject(element)}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
        {renewals.length > 0 && (
          <Box sx={{ paddingLeft: "4rem" }}>
            <Box>
              <Typography component="h4" variant="h6">
                Renovaciones
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: "4rem" }}>
              {renewals.map((element) => (
                <Typography key={element._id}>
                  {getFullNameOfObject(element)}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
