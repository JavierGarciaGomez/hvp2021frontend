import { Typography } from "@mui/material";
import { borderBottom, Box } from "@mui/system";
import React from "react";
import { getFullNameOfObject } from "../../helpers/utilities";

export const FcmPrintResponsiveLetter = ({ responsiveLetter }) => {
  return (
    <Box>
      <Box mb="3rem">
        <Typography variant="h4" component="h2">
          Carta responsiva por extravío de credencial de{" "}
          {getFullNameOfObject(responsiveLetter)}
        </Typography>
      </Box>
      <Box>
        <Typography>
          Por medio, del presente, señalo que no tengo en mi posesión la
          credencial de la Federación Canófila Mexicana en la que constan mis
          datos de afiliación, sin embargo, aseguro que soy socio VIGENTE de
          esta asociación. Por lo que autorizo a esta a obtener los datos
          correspondientes en su base de datos. En este orden de ideas, asumo
          las consecuencias que pudieran ocurrir por no ser socio vigente como
          es el caso de retrasos en el trámite o la necesidad de hacer trámites
          posteriores.
        </Typography>
        <Box
          sx={{
            mt: "3rem",
            minHeight: "100px",
            borderBottom: "1px solid black",
            margin: "0rem 10rem",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
