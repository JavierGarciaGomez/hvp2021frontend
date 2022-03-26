import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React from "react";
import { transformBooleanToString } from "../../helpers/utilities";
import { dogSexTypes, fcmCertificatesTypes } from "../../types/types";
import { BoxLabelValueData } from "./components/BoxLabelValueData";

export const FcmPrintPackageFcmDog = ({ fcmDog }) => {
  const {
    petName,
    breed,
    color,
    sex,
    birthDate,
    registerNum,
    registerType,
    urlFront,
    urlBack,
    isRegisterPending,
    isTransferPending,
  } = fcmDog;

  return (
    <Box mb="10rem">
      <Box>
        <Typography component="h3" variant="h5">
          Perro {petName} - {registerNum}
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
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Registro pendiente"
              value={transformBooleanToString(isRegisterPending)}
            />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Transferencia pendiente"
              value={transformBooleanToString(isTransferPending)}
            />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Nombre" value={petName} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Raza" value={breed} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Color" value={color} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Sexo" value={dogSexTypes[sex]} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Fecha de nacimiento"
              value={dayjs(birthDate).format("DD-MMM-YYYY")}
            />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Tipo de registro"
              value={fcmCertificatesTypes[registerType]}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Box>
          <Typography>Certificado frontal</Typography>
          <Box sx={{ maxWidth: "100%" }}>
            <Box
              component="img"
              src={urlFront}
              sx={{ maxWidth: "100%", maxHeight: "700px" }}
            ></Box>
          </Box>
        </Box>
        <div className="u-pagebreak"> </div>
        <Box>
          <Box>
            <Typography>Certificado trasero</Typography>
            <Box sx={{ maxWidth: "100%" }}>
              <Box
                component="img"
                src={urlBack}
                sx={{ maxWidth: "100%", maxHeight: "800px" }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
