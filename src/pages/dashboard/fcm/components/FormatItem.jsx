import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const FormatItem = ({ step, stepIndex, onSelect }) => {
  const { stepLabel, isValidated = false } = step;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "row", md: "row" },
        gap: "2rem",
      }}
    >
      <Box sx={{ flexBasis: "40%" }}>{stepLabel}</Box>
      {isValidated ? (
        <Box
          sx={{ flexBasis: "20%", display: "flex", justifyContent: "center" }}
        >
          <Typography color="success.main">Validado</Typography>
        </Box>
      ) : (
        <Box
          color="error"
          sx={{ flexBasis: "20%", display: "flex", justifyContent: "center" }}
        >
          <Typography color="error">No validado</Typography>
        </Box>
      )}

      <Box sx={{ flexBasis: "20%", display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            onSelect(stepIndex);
          }}
        >
          Revisar
        </Button>
      </Box>
    </Box>
  );
};
