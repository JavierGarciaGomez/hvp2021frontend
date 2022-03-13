import {
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmCurrentStepObject,
  setFcmPackageNeedsConfirmation,
  setFcmPackageProperty,
  startLoadingFcmDogs,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { userAddFcmDog } from "../../../actions/userActions";
import { excludeFromCollection } from "../../../helpers/utilities";

export const SearchAndLinkDog = () => {
  const dispatch = useDispatch();
  const { fcmDogs } = useSelector((state) => state.fcm);
  const { client } = useSelector((state) => state.clients);
  const { fcmPackage } = useSelector((state) => state.fcm);

  const [fieldValue, setfieldValue] = useState("");
  const [filteredFcmDogs, setfilteredFcmDogs] = useState([]);

  // todo: load the fcmpartners
  // start loading rfc
  useEffect(() => {
    dispatch(startLoadingFcmDogs());
  }, [dispatch]);

  const handleSearch = () => {
    //   exclude from fcmPartners the already linked
    console.log("****SEARCH", fcmDogs, client.linkedDogs);
    const fcmDogsExcludingLinked = excludeFromCollection(
      fcmDogs,
      client.linkedDogs
    );

    const fcmDogsFound = fcmDogsExcludingLinked.filter((data) =>
      data.registerNum
        .toLocaleLowerCase()
        .includes(fieldValue.toLocaleLowerCase())
    );
    setfilteredFcmDogs(fcmDogsFound);
  };

  const handleSubmit = async (object) => {
    await dispatch(userAddFcmDog(client._id, object));

    if (fcmPackage) {
      // handleNext();

      dispatch(updateStepReferences(object));
    }
  };

  return (
    <Box>
      {/* Input and button */}
      <Box sx={{ display: "flex", gap: "2rem", mb: "2rem" }}>
        <FormControl>
          <TextField
            name="registerNum"
            label="Número de registro"
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
        {filteredFcmDogs.length > 0 &&
          filteredFcmDogs.map((fcmDog) => {
            return (
              <Card
                key={fcmDog._id}
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
                    {fcmDog.registerNum}
                  </Typography>
                  <Typography mb="2rem">
                    <span className="fw-bold">Nombre: </span>{" "}
                    {` ${fcmDog.petName}`}
                  </Typography>
                  <Typography mb="2rem">
                    <span className="fw-bold">Raza: </span> {` ${fcmDog.breed}`}
                  </Typography>
                  <Typography mb="2rem">
                    <span className="fw-bold">Sexo: </span> {` ${fcmDog.sex}`}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth={true}
                    onClick={() => {
                      handleSubmit(fcmDog);
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
