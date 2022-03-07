import { Box, Typography } from "@mui/material";
import React from "react";

export const LostPartnerCard = () => {
  return (
    <Box>
      <Typography mb="2rem">
        En caso de que el socio haya extraviado su tarjeta, nuestra
        recomendación es ponerse en contacto con la Federación Canófila Mexicana
        para solicitar su reposición o, al menos, los datos de la tarjeta. Sin
        embargo, es posible realizar el trámite, siempre que el cliente suscriba
        una carta responsiva.
      </Typography>

      <Box
        sx={{
          bgcolor: "primary.main",
          padding: "2rem",
          color: "primary.contrastText",
          lineHeight: 1.5,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        Por medio, del presente, señalo que no tengo en mi posesión la
        credencial de la Federación Canófila Mexicana en la que constan mis
        datos de afiliación, sin embargo, aseguro que soy socio VIGENTE de esta
        asociación. Por lo que autorizo a esta a obtener los datos
        correspondientes en su base de datos. En este orden de ideas, asumo las
        consecuencias que pudieran ocurrir por no ser socio vigente como es el
        caso de retrasos en el trámite o la necesidad de hacer trámites
        posteriores.
      </Box>
    </Box>
  );
};
