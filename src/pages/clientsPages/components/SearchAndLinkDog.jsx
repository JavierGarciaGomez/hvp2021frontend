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
  setFcmActiveStepProperty,
  startLoadingFcmDogs,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { userAddFcmDog } from "../../../actions/userActions";
import { excludeFromCollection } from "../../../helpers/utilities";

export const SearchAndLinkDog = ({
  handleCancelSelection,
  handleStepProps,
}) => {
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmDogs } = allFcm;

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
    const fcmDogsExcludingLinked = excludeFromCollection(
      allFcmDogs,
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
      handleStepProps({
        isEditable: false,
        formWrapperTitle: "Confirma la información",
      });
      dispatch(setFcmActiveStepProperty("needsConfirmation", true));
    }
  };

  return (
    <Box>
      <Typography mb="3rem">
        Selecciona un perro de nuestra base de datos. Si no lo encuentras, será
        necesario que lo registres, con lo que automáticamente estará vinculado
        a tu cuenta.
      </Typography>
      {/* Input and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "2rem",
          mb: "2rem",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth={true} sx={{ flex: 1 }}>
          <TextField
            name="registerNum"
            label="Número de registro"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setfieldValue(e.target.value)}
            value={fieldValue}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: "1rem",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button onClick={handleSearch} fullWidth={true}>
            Buscar
          </Button>
          <Button color="error" fullWidth onClick={handleCancelSelection}>
            Cancelar
          </Button>
        </Box>
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
