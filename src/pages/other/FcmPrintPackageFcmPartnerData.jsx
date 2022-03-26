import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React from "react";
import {
  getFullNameOfObject,
  transformBooleanToString,
} from "../../helpers/utilities";
import { BoxLabelValueData } from "./components/BoxLabelValueData";

export const FcmPrintPackageFcmPartnerData = ({ fcmPartner }) => {
  const {
    address,
    email,
    expirationDate,
    firstName,
    homePhone,
    isCardLost,
    isPending,
    maternalSurname,
    mobilePhone,
    partnerNum,
    paternalSurname,
    urlBackIne,
    urlFrontIne,
    urlPartnerCard,
    urlProofOfResidency,
  } = fcmPartner;
  const { street, number, suburb, city, state, country, postalCode } = address;

  return (
    <Box mb="10rem">
      <Box>
        <Typography component="h3" variant="h5">
          Socio {partnerNum} - {getFullNameOfObject(fcmPartner)}
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
              value={transformBooleanToString(isPending)}
            />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Tarjeta extraviada"
              value={transformBooleanToString(isCardLost)}
            />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Socio" value={partnerNum} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Expiración"
              value={dayjs(expirationDate).format("DD-MMM-YYYY")}
            />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData label="Nombres" value={firstName} />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "grey.300",
          }}
        >
          <Typography>Dirección</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <BoxLabelValueData label="Calle" value={street} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Número" value={number} />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData
              label="Colonia o fraccionamiento"
              value={suburb}
            />
          </Grid>
          <Grid item xs={3}>
            <BoxLabelValueData label="Código Postal" value={postalCode} />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData label="Ciudad" value={city} />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData label="Estado" value={state} />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData label="País" value={country} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "grey.300",
          }}
        >
          <Typography>Contacto</Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <BoxLabelValueData label="Teléfono" value={homePhone} />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData label="Teléfono móvil" value={mobilePhone} />
          </Grid>
          <Grid item xs={4}>
            <BoxLabelValueData label="Correo electrónico" value={email} />
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
        <div className="u-pagebreak"> </div>
        <Box>
          <Typography component="h3" variant="h5">
            Socio {partnerNum} - {getFullNameOfObject(fcmPartner)}
          </Typography>
          <Box>
            <Typography>Tarjeta de socio</Typography>
            <Box sx={{ maxWidth: "100%" }}>
              <Box
                component="img"
                src={urlPartnerCard}
                sx={{ maxWidth: "100%", maxHeight: "800px" }}
              ></Box>
            </Box>
          </Box>
        </Box>

        <div className="u-pagebreak"> </div>
        <Box>
          <Typography component="h3" variant="h5">
            Socio {partnerNum} - {getFullNameOfObject(fcmPartner)}
          </Typography>
          <Box>
            <Typography>Comprobante domiciliario</Typography>
            <Box sx={{ maxWidth: "100%" }}>
              <Box
                component="img"
                src={urlProofOfResidency}
                sx={{ maxWidth: "100%", maxHeight: "800px" }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
