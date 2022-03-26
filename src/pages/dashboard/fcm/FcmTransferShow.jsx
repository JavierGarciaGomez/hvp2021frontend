import { Box, Button, Typography } from "@mui/material";
import React, { Fragment } from "react";

export const FcmTransferShow = (props) => {
  const { fcmTransfer, setisEditable, extraProps } = props;
  const { showButtons = true } = extraProps;
  const { newOwner, prevOwner, dog } = fcmTransfer;

  const handleEdit = () => {
    setisEditable(true);
  };
  return (
    <Box>
      <Box mb="3rem">
        <Typography variant="h4" component="h2">
          Transferencia o cambio de propietario
        </Typography>
      </Box>
      <Box mb="3rem">
        <Typography component="h4" variant="h5" mb="2rem">
          Datos del perro a transferir
        </Typography>
        {dog ? (
          <Fragment>
            <Typography>Nombre: {dog.petName}</Typography>
            <Typography>Número de registro: {dog.registerNum}</Typography>
          </Fragment>
        ) : (
          <Typography color="error">Falta información</Typography>
        )}
      </Box>

      <Box mb="3rem">
        <Typography component="h4" variant="h5" mb="2rem">
          Datos del nuevo propietario
        </Typography>
        {newOwner ? (
          <Fragment>
            <Typography>
              Nombre:{" "}
              {`${newOwner.firstName} ${newOwner.paternalSurname} ${newOwner.maternalSurname}`}
            </Typography>
            <Typography>Número de registro: {newOwner.partnerNum}</Typography>
          </Fragment>
        ) : (
          <Typography color="error">Falta información</Typography>
        )}
      </Box>
      <Box mb="3rem">
        <Typography component="h4" variant="h5" mb="2rem">
          Datos del propietario anterior
        </Typography>
        {prevOwner ? (
          <Fragment>
            <Typography>{`Nombre: ${prevOwner.firstName} ${prevOwner.paternalSurname} ${prevOwner.maternalSurname}`}</Typography>
          </Fragment>
        ) : (
          <Typography color="error">Falta información</Typography>
        )}
      </Box>
      <Box>{showButtons && <Button onClick={handleEdit}>Editar</Button>}</Box>
    </Box>
  );
};
