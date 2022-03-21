import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { mergeArraysWithoutDuplicates } from "../../helpers/arrayUtilities";
import { fireSwalError } from "../../helpers/utilities";

export const SearchBox = (props) => {
  const {
    onSelect,
    searchData,
    CardComponent,
    searchParams = [],
    searchFieldLabel,
  } = props;
  const [fieldValue, setfieldValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const handleSearch = () => {
    // if the search has less than 3 values. return
    if (fieldValue.length < 3) {
      return fireSwalError(
        "La búsqueda debe contar al menos con tres carácteres"
      );
    }

    let searchResults = [];

    searchParams.forEach((param) => {
      let filteredResults = searchData.filter((element) =>
        element[param]
          .toLowerCase()
          .includes(fieldValue.toLocaleLowerCase().trim())
      );
      searchResults = mergeArraysWithoutDuplicates(
        searchResults,
        filteredResults
      );
    });

    setFilteredData(searchResults);
    setIsSearchSubmitted(true);
  };

  const handleSelect = (selectedElement) => {
    setIsSearchSubmitted(false);
    onSelect(selectedElement);
  };

  const handleCancel = () => {
    setIsSearchSubmitted(false);
  };

  return (
    <Box>
      <Typography mb="3rem" color="text.secondary">
        Selecciona un elemento de nuestra base de datos. Si no lo encuentras,
        será necesario que lo registres previamente.
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
            label={searchFieldLabel}
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
        {isSearchSubmitted && !filteredData.length > 0 && (
          <Typography>No se obtuvo ningún resultado</Typography>
        )}
        {isSearchSubmitted && filteredData.length > 0 && (
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
              {filteredData.map((object) => {
                return (
                  <CardComponent
                    key={object._id}
                    object={object}
                    onSelect={handleSelect}
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
