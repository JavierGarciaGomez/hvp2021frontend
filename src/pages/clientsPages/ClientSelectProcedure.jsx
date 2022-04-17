import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFcmPackageType } from "../../actions/fcmActions";
import { fcmPackagesTypes } from "../../types/types";

const linksData = [
  {
    label: "Pedigrí",
    packageType: fcmPackagesTypes.PEDIGREE,
  },
  {
    label: "Certificado de pureza racial",
    packageType: fcmPackagesTypes.RACEPURITY,
  },
  {
    label: "Certificado de pureza racial inicial",
    packageType: fcmPackagesTypes.INITIALRACEPURITY,
  },
  {
    label: "Registro inicial",
    packageType: fcmPackagesTypes.INITIALREGISTER,
  },
  {
    label: "Certificado para concurso",
    packageType: fcmPackagesTypes.INITIALREGISTER,
  },
  {
    label: "Alta o renovación de socio",
    packageType: fcmPackagesTypes.PARTNERSHIP,
  },
  {
    label: "Transferencia o cambio de propietario",
    packageType: fcmPackagesTypes.PARTNERSHIP,
  },
];

export const ClientSelectProcedure = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLink = (linkData) => {
    dispatch(setFcmPackageType(linkData.packageType));
    navigate("/clients/procedure/");
  };

  return (
    <Fragment>
      <Box sx={{ mb: "2rem" }}>
        <Typography variant="h4" component="h3">
          Inicia un nuevo trámite
        </Typography>
      </Box>

      <Grid container>
        {linksData.map((link) => (
          <Grid item xs={6} sx={{ padding: "1rem" }}>
            <Button
              fullWidth
              onClick={() => {
                handleClickLink(link);
              }}
              variant="outlined"
              size="large"
              sx={{ height: "100%" }}
            >
              {link.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};
