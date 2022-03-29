import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BoxLabelValueData } from "./components/BoxLabelValueData";

export const FcmPrintPackageFcmPrevOwner = ({ prevOwner }) => {
  const {
    firstName,
    paternalSurname,
    maternalSurname,
    urlFrontIne,
    urlBackIne,
  } = prevOwner;

  return (
    <Box mb="10rem">
      <Box>
        <Typography component="h3" variant="h5">
          Antiguo propietario
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "grey.300",
          }}
        >
          <Typography>Datos generales</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <BoxLabelValueData label="Nombre (s)" value={firstName} />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData
              label="Primer apellido"
              value={paternalSurname}
            />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData
              label="Segundo apellido"
              value={maternalSurname}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Box>
          <Typography>INE frontal</Typography>
          <Box sx={{ maxHeight: "300px" }}>
            <Box component="img" src={urlFrontIne}></Box>
          </Box>
        </Box>

        <Box>
          <Typography>INE trasero</Typography>
          <Box sx={{ maxHeight: "300px" }}>
            <Box component="img" src={urlBackIne}></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
