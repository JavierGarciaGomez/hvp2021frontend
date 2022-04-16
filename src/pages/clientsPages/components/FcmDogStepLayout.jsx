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
  const [requiredSex, setRequiredSex] = useState(null);

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
    if (stepData) {
      if (needsConfirmation) {
        handleStepProps({
          isEditable: false,
          formWrapperTitle: "Confirma el formulario",
        });
      } else {
        handleStepProps({
          isEditable: false,
          formWrapperTitle: "Perro seleccionado",
        });
      }
    }
  }, [stepData, needsConfirmation]);

  useEffect(() => {
    if (activeStep === 2) {
      setRequiredSex("MALE");
    }
    if (activeStep === 3) {
      setRequiredSex("FEMALE");
    }
  }, [activeStep]);

  console.log({ ...steps[activeStep] });
  console.log({ ...stepProps });

  return (
    <Fragment>
      <Typography variant="h4" component="h2" mb="3rem" mt="3rem">
        {stepLabel}
      </Typography>
      {!stepData ? (
        <FcmSelectDogOptions stepData={stepData} handleStepProps={handleStepProps} stepProps={stepProps} handleResetStepProps={handleResetStepProps} requiredSex={requiredSex} />
      ) : (
        <FcmDogFormWrapper stepData={stepData} stepProps={stepProps} handleStepProps={handleStepProps} handleResetStepProps={handleResetStepProps} requiredSex={requiredSex} />
      )}
    </Fragment>
  );
};
