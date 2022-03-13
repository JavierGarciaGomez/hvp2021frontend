import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepConfig,
  startLoadingFcmPartners,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { userAddFcmPartner } from "../../../actions/userActions";
import { excludeFromCollection } from "../../../helpers/utilities";

export const SearchAndLinkPartner = () => {
  const dispatch = useDispatch();
  const { fcmPartners } = useSelector((state) => state.fcm);
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);

  const [fieldValue, setfieldValue] = useState("");
  const [filteredFcmPartners, setfilteredFcmPartners] = useState([]);

  // loading fcm partners
  useEffect(() => {
    dispatch(startLoadingFcmPartners());
  }, [dispatch]);

  const handleSearch = () => {
    //   exclude from fcmPartners the already linked
    const fcmPartnersExcludingLinked = excludeFromCollection(
      fcmPartners,
      client.linkedFcmPartners
    );

    const fcmPartnersFound = fcmPartnersExcludingLinked.filter((data) =>
      data.partnerNum
        .toLocaleLowerCase()
        .includes(fieldValue.toLocaleLowerCase())
    );
    setfilteredFcmPartners(fcmPartnersFound);
  };

  const handleSubmit = async (fcmPartner) => {
    await dispatch(userAddFcmPartner(client._id, fcmPartner));

    // if is from a package
    if (fcmPackage) {
      // handleNext();
      dispatch(updateStepReferences(fcmPartner));
      dispatch(setFcmCurrentStepConfig({ needsConfirmation: true }));
    }
  };

  return (
    <Box>
      {/* Input and button */}
      <Box sx={{ display: "flex", gap: "2rem", mb: "2rem" }}>
        <FormControl>
          <TextField
            name="partnerNum"
            label="Número de socio"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setfieldValue(e.target.value)}
            value={fieldValue}
          />
        </FormControl>
        <Button onClick={handleSearch}>Buscar</Button>
      </Box>
      {/* SearchResults */}
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
        {filteredFcmPartners.length > 0 &&
          filteredFcmPartners.map((fcmPartner) => {
            return (
              <Card
                key={fcmPartner._id}
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  p: 1,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    mb="2rem"
                    sx={{
                      textAlign: "center",
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
                    {` ${dayjs(fcmPartner.expirationDate).format(
                      "DD-MMM-YYYY"
                    )}`}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={() => {
                      handleSubmit(fcmPartner);
                    }}
                    color="primary"
                  >
                    {fcmPackage ? "Seleccionar" : "Vincular a mi cuenta"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};
