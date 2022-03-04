import React, { Fragment } from "react";

import { useField, useFormikContext } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const SelectWrapper = ({ name, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const { label } = otherProps;

  const handleChange = (evt) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  console.log("el field", field, "el meta", meta, "los otherprops", otherProps);

  const configSelect = {
    ...field,
    ...otherProps,
    // select: true,
    // variant: "outlined",
    // fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  console.log("este es el config", configSelect);
  return (
    <Fragment>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select {...configSelect}>
          {Object.keys(options).map((item, pos) => {
            return (
              <MenuItem key={pos} value={item}>
                {options[item]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {/* <TextField {...configSelect}>
        {Object.keys(options).map((item, pos) => {
          return (
            <MenuItem key={pos} value={item}>
              {options[item]}
            </MenuItem>
          );
        })}
      </TextField> */}
    </Fragment>
  );
};
