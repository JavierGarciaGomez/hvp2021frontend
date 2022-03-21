import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React from "react";
import { transformBooleanToString } from "../../helpers/utilities";
import { fcmCertificatesTypes } from "../../types/types";

export const FcmDogCard = (props) => {
  const { object: fcmDog, onSelect } = props;
  const {
    petName,
    breed,
    color,
    sex,
    birthDate,
    registerNum,
    registerType,
    isRegisterPending,
    isTransferPending,
  } = fcmDog;

  const handleSubmit = (fcmDog) => {
    onSelect(fcmDog);
  };

  return (
    <Card
      key={fcmDog._id}
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
          {registerNum}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Nombre: </span> {` ${petName}`}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Raza: </span> {` ${breed}`}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Sexo: </span> {` ${sex}`}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Color: </span> {` ${color}`}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Fecha de nacimiento: </span>{" "}
          {` ${dayjs(birthDate).format("DD-MMM-YYYY")}`}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Tipo de registro: </span>{" "}
          {fcmCertificatesTypes[registerType]}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Registro pendiente: </span>{" "}
          {transformBooleanToString(isRegisterPending)}
        </Typography>
        <Typography mb="1rem">
          <span className="fw-bold">Transferencia pendiente: </span>{" "}
          {transformBooleanToString(isTransferPending)}
        </Typography>

        <Box>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={() => {
              handleSubmit(fcmDog);
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
