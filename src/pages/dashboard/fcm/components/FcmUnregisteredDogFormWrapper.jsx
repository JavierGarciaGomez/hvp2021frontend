import React, { Fragment, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { FcmBreedingForm } from "./FcmBreedingForm";
import { FcmUnregisteredDogForm } from "../../../clientsPages/components/FcmUnregisteredDogForm";
import { propertiesToUpperCase } from "../../../../helpers/objectUtilities";
import { updateStepReferencesByStep } from "../../../../actions/fcmActions";

// todo set breed by step data
export const FcmUnregisteredDogFormWrapper = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const upperCaseValues = propertiesToUpperCase(values);
    dispatch(updateStepReferencesByStep(props.stepIndex, upperCaseValues));
    props.onSave();
  };

  return (
    <Fragment>
      <Typography component="h2" variant="h5" mb="2rem">
        Llena el formulario
      </Typography>

      <FcmUnregisteredDogForm onSubmit={handleSubmit} {...props} />
    </Fragment>
  );
};
