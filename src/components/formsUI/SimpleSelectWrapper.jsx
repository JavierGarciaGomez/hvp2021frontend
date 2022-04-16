import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

export const SimpleSelectWrapper = ({ options, label, value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl fullWidth sx={{ mb: "3rem" }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={value} label={label} onChange={handleChange}>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
