import React from "react";
import { TextareaAutosize, TextField } from "@mui/material";
import { useField } from "formik";

export const TextAreaWrapper = ({ name, ...otherProps }) => {
  const [field, metaData] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,

    variant: "outlined",
  };

  // check if it has been touched
  if (metaData && metaData.touched && metaData.error) {
    configTextField.error = true;
    configTextField.helperText = metaData.error;
  }
  return (
    <TextareaAutosize
      minRows={4}
      style={{ width: "100%", backgroundColor: "transparent", padding: "1rem" }}
      {...configTextField}
    />
  );
};
