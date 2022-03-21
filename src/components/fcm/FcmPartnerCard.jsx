import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React from "react";
import {
  getFullNameOfObject,
  transformBooleanToString,
} from "../../helpers/utilities";
import { fcmCertificatesTypes } from "../../types/types";

export const FcmPartnerCard = (props) => {
  const { object: fcmPartner, onSelect } = props;
  const { partnerNum, expirationDate, isPending, isCardLost } = fcmPartner;

  const handleSubmit = (fcmPartner) => {
    onSelect(fcmPartner);
  };

  return (
    <Card
      key={fcmPartner._id}
      sx={{
        bgcolor: "primary.light",
        color: "primary.contrastText",
        p: 1,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h3"
          mb="2rem"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {partnerNum}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Nombre completo: </span>{" "}
          {getFullNameOfObject(fcmPartner)}
        </Typography>

        <Typography mb="1rem">
          <span className="fw-bold">Fecha de expiración: </span>{" "}
          {` ${dayjs(expirationDate).format("DD-MMM-YYYY")}`}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Registro pendiente: </span>{" "}
          {transformBooleanToString(isPending)}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Tarjeta extraviada: </span>{" "}
          {transformBooleanToString(isCardLost)}
        </Typography>

        <Box>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={() => {
              handleSubmit(fcmPartner);
            }}
            color="primary"
          >
            Seleccionar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
