import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcmDogCard } from "../../../../components/fcm/FcmDogCard";
import { mergeArraysWithoutDuplicates } from "../../../../helpers/arrayUtilities";
import { fireSwalError } from "../../../../helpers/utilities";

export const FcmSelectDog = (props) => {
  const { onSelect } = props;
  const dispatch = useDispatch();
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmDogs } = allFcm;

  const [fieldValue, setfieldValue] = useState("");
  const [filteredFcmDogs, setfilteredFcmDogs] = useState([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const handleSearch = () => {
    // if the search has less than 3 values. return
    if (fieldValue.length < 3) {
      return fireSwalError(
        "La búsqueda debe contar al menos con tres carácteres"
      );
    }
    const fcmDogsFoundByRegisterNum = allFcmDogs.filter((data) =>
      data.registerNum
        .toLocaleLowerCase()
        .includes(fieldValue.toLocaleLowerCase())
    );

    const fcmDogsFoundByPetName = allFcmDogs.filter((data) =>
      data.petName.toLocaleLowerCase().includes(fieldValue.toLocaleLowerCase())
    );

    const mergedFcmDogs = mergeArraysWithoutDuplicates(
      fcmDogsFoundByPetName,
      fcmDogsFoundByRegisterNum
    );

    setfilteredFcmDogs(mergedFcmDogs);
    setIsSearchSubmitted(true);
  };

  const handleSelectDog = (fcmDog) => {
    setIsSearchSubmitted(false);
    onSelect(fcmDog);
  };

  const handleCancel = () => {
    setIsSearchSubmitted(false);
  };

  return (
    <Box>
      <Typography mb="3rem" color="text.secondary">
        Selecciona un perro de nuestra base de datos. Si no lo encuentras, será
        necesario que lo registres previamente.
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
        <FormControl fullWidth={true} sx={{ flex: 2 }}>
          <TextField
            name="registerNum"
            label="Nombre o número de registro"
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
        </Box>
      </Box>
      {/* SearchResults */}
      <Box>
        {isSearchSubmitted && !filteredFcmDogs.length > 0 && (
          <Typography>No se obtuvo ningún resultado</Typography>
        )}
        {isSearchSubmitted && filteredFcmDogs.length > 0 && (
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: "2rem",
                mb: "3rem",
              }}
            >
              {filteredFcmDogs.map((fcmDog) => {
                return (
                  <FcmDogCard
                    key={fcmDog._id}
                    fcmDog={fcmDog}
                    {...props}
                    onSelect={handleSelectDog}
                  />
                );
              })}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button color="error" onClick={handleCancel}>
                Cancelar
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
