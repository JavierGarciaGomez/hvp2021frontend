import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { transformBooleanToString } from "../../../helpers/utilities";

export const BoxLabelValueData = ({ label, value, vertical = false, ...props }) => {
  if (vertical) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          ...props.sx,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>{`${label}:`}&nbsp;</Typography>
        <Typography>{value} </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...props.sx }}>
      <Typography sx={{ fontWeight: "bold" }}>{`${label}:`}&nbsp; </Typography>
      <Typography>{value} </Typography>
    </Box>
  );
};
