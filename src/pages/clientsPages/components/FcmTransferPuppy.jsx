import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { FcmStepperPartnerSelector } from "../FcmStepperPartnerSelector";

export const FcmTransferPuppy = ({ ...props }) => {
  return (
    <Fragment>
      <Box sx={{ mt: "3rem", mb: "3rem" }}>
        <Typography>
          Los certificados de los cachorros se expiden a nombre de la madre. Has
          seleccionado la transferencia de este cachorro, por lo que el nuevo
          propietario debe ser socio de la FCM, o solicitar su inscripción.
        </Typography>
      </Box>
      <FcmStepperPartnerSelector {...props} />
    </Fragment>
  );
};
