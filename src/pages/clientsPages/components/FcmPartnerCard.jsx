import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { Fragment } from "react";

export const FcmPartnerCard = ({
  fcmPartner,
  usedInProcedure = false,
  handleClickBtn,
}) => {
  return (
    <Card
      key={fcmPartner._id}
      sx={{ backgroundColor: "#d5c8c8", boxShadow: 3 }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h3"
          mb="2rem"
          sx={{
            textAlign: "center",
            borderBottom: "3px primary.main solid",
            borderBottomColor: "primary.main",
            borderBottomWidth: "3px",
            borderBottomStyle: "solid",
            fontWeight: "bold",
          }}
        >
          {fcmPartner.partnerNum}
        </Typography>
        <Typography mb="2rem">
          <span className="fw-bold">Nombre: </span>{" "}
          {` ${fcmPartner.firstName} ${fcmPartner.paternalSurname} ${fcmPartner.maternalSurname}`}
        </Typography>
        <Typography mb="2rem">
          <span className="fw-bold">Fecha de expiración: </span>
          {` ${dayjs(fcmPartner.expirationDate).format("DD-MMM-YYYY")}`}
        </Typography>
        {fcmPartner.homePhone && (
          <Typography mb="2rem">
            <span className="fw-bold">Teléfono: </span>{" "}
            {` ${fcmPartner.homePhone}`}
          </Typography>
        )}
        {fcmPartner.mobilePhone && (
          <Typography mb="2rem">
            <span className="fw-bold">Teléfono móvil: </span>{" "}
            {` ${fcmPartner.mobilePhone}`}
          </Typography>
        )}
        {fcmPartner.email && (
          <Typography mb="2rem">
            <span className="fw-bold">Correo electrónico: </span>{" "}
            {` ${fcmPartner.email}`}
          </Typography>
        )}

        <Typography mb="2rem">
          <span className="fw-bold">Teléfóno móvil: </span> Javier García
        </Typography>
        <Typography mb="2rem">
          <span className="fw-bold">Correo electrónico: </span> Javier García
        </Typography>
        <Grid container spacing={1}>
          {usedInProcedure ? (
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth={true}
                onClick={handleClickBtn}
                color="primary"
              >
                Aceptar
              </Button>
            </Grid>
          ) : (
            <Fragment>
              {" "}
              <Grid item xs={6}>
                <Link to={`/clients/fcmPartner/${fcmPartner._id}`}>
                  <Button
                    variant="contained"
                    fullWidth={true}
                    // onClick={handleSubmit}
                    color="primary"
                  >
                    Editar
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth={true}
                  //   onClick={() => handleUnlink(fcmPartner._id)}
                  color="error"
                >
                  Desvincular
                </Button>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
