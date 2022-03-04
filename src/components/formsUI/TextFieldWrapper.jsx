import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

export const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [field, metaData] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  };

  // check if it has been touched
  if (metaData && metaData.touched && metaData.error) {
    configTextField.error = true;
    configTextField.helperText = metaData.error;
  }
  return <TextField {...configTextField} />;
};
