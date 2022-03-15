import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FcmSelectDogOptions } from "./FcmSelectDogOptions";
import { FcmDogFormWrapper } from "./FcmDogFormWrapper";

const initialStepProps = {
  isEditable: true,
  formTitle: "Llena el formulario",
  formWrapperTitle: "Llena el formulario",
};
// show the selector or the data if already selected
export const FcmDogStepLayout = () => {
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps, activeStep } = fcmPackage;
  const { stepData, stepLabel, needsConfirmation } = steps[activeStep];
  const [stepProps, setstepProps] = useState(initialStepProps);

  const handleStepProps = (newProps) => {
    setstepProps((prevProps) => ({ ...prevProps, ...newProps }));
  };
  const handleResetStepProps = () => {
    setstepProps(initialStepProps);
  };

  useEffect(() => {
    handleResetStepProps();
  }, [activeStep]);

  useEffect(() => {
    if (needsConfirmation) {
      handleStepProps({
        isEditable: false,
        formWrapperTitle: "Confirma el formulario",
      });
    }
  }, [needsConfirmation]);

  useEffect(() => {
    if (stepData) {
      handleStepProps({
        formWrapperTitle: "Perro seleccionado",
        isEditable: false,
      });
    }
  }, [stepData]);

  return (
    <Fragment>
      <Typography variant="h4" component="h2" mb="3rem" mt="3rem">
        {stepLabel}
      </Typography>
      {!stepData ? (
        <FcmSelectDogOptions
          stepData={stepData}
          handleStepProps={handleStepProps}
          stepProps={stepProps}
          handleResetStepProps={handleResetStepProps}
        />
      ) : (
        <FcmDogFormWrapper
          stepData={stepData}
          stepProps={stepProps}
          handleStepProps={handleStepProps}
          handleResetStepProps={handleResetStepProps}
        />
      )}
    </Fragment>
  );
};
