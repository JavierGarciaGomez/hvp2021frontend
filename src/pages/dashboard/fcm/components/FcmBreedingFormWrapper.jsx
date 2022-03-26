import React, { Fragment, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useSelector } from "react-redux";
import { FcmBreedingForm } from "./FcmBreedingForm";

// todo set breed by step data
export const FcmBreedingFormWrapper = (props) => {
  return (
    <Fragment>
      <Typography component="h2" variant="h5" mb="2rem">
        Llena el formulario
      </Typography>

      {/* Nota */}
      <Box
        sx={{
          bgcolor: "grey.300",
          p: "2rem",
          borderRadius: 2,
          boxShadow: 5,
          mb: "5rem",
        }}
      >
        <Typography component="h3" variant="h6" mb="1rem" fontWeight="bold">
          Notas:
        </Typography>
        <Typography mb="1rem">
          Solo llenar los datos de los cachorros de los cuales se pretenda
          obtener el registro.
        </Typography>
        <Typography mb="1rem">
          En el llenado de los cachorros, primero poner los machos y después las
          hembras.
        </Typography>
      </Box>

      <FcmBreedingForm {...props} />
    </Fragment>
  );
};
