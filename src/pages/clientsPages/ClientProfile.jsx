import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box, display } from "@mui/system";
import dayjs from "dayjs";
import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRemoveFcmPartner } from "../../actions/userActions";
import { ButtonFormWrapper } from "../../components/formsUI/ButtonFormWrapper";
import { SearchAndLinkPartner } from "./components/SearchAndLinkPartner";

export const ClientProfile = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.clients);
  const [showLinkPartnerForm, setshowLinkPartnerForm] = useState(false);

  const handleShowLinkForm = () => {
    setshowLinkPartnerForm((prev) => !prev);
  };

  const handleUnlink = (fcmPartnerId) => {
    dispatch(userRemoveFcmPartner(client._id, fcmPartnerId));
  };

  return (
    <Fragment>
      <Typography variant="h4" component="h2">
        Perfil del cliente
      </Typography>
      <Typography variant="h5" component="h3">
        Datos del perfil
      </Typography>
      <Typography variant="h5" component="h3" mb="2rem">
        Cuentas de socio asociadas a esta cuenta
      </Typography>
      {/* CardWrapper */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: "2rem",
          mb: "5rem",
        }}
      >
        {client.linkedFcmPartners.map((fcmPartner) => {
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
                  <span className="fw-bold">Teléfóno móvil: </span> Javier
                  García
                </Typography>
                <Typography mb="2rem">
                  <span className="fw-bold">Correo electrónico: </span> Javier
                  García
                </Typography>
                <Grid container spacing={1}>
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
                      onClick={() => handleUnlink(fcmPartner._id)}
                      color="error"
                    >
                      Desvincular
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      {/* link new partner */}
      <Box>
        <Button
          variant="contained"
          onClick={handleShowLinkForm}
          sx={{ mb: "2rem" }}
        >
          Vincula una nueva cuenta de socio
        </Button>
        {showLinkPartnerForm && <SearchAndLinkPartner />}
      </Box>

      <Box></Box>
      {/* CardWrapper */}
    </Fragment>
  );
};
