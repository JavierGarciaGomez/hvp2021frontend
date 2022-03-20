import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";

export const ButtonFormWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};
