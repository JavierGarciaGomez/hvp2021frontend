import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FcmPartnerFormWrapper } from "./FcmPartnerFormWrapper";
import { FcmSelectPartnerOptions } from "./FcmSelectPartnerOptions";

const initialStepProps = {
  isFirstRegister: false,
  isCardLost: false,
  isEditable: true,
  formTitle: "Llena el formulario",
  formWrapperTitle: "Llena el formulario",
};
// show the selector or the data if already selected
export const FcmPartnerStepLayout = () => {
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
    if (stepData) {
      if(needsConfirmation){
        handleStepProps({
          isEditable: false,
          formWrapperTitle: "Confirma el formulario",
        });
      } else {
        handleStepProps({
          isEditable: false,
          formWrapperTitle: "Socio seleccionado",
        });
      } 
    }
  }, [stepData, needsConfirmation]);

  console.log('FcmPartnerStepLayout')
  return (
    <Fragment>
      <Typography variant="h4" component="h2" mb="3rem" mt="3rem">
        {stepLabel}
      </Typography>
      {!stepData ? (
        <FcmSelectPartnerOptions
          stepData={stepData}
          handleStepProps={handleStepProps}
          stepProps={stepProps}
          handleResetStepProps={handleResetStepProps}
        />
      ) : (
        <FcmPartnerFormWrapper
          stepData={stepData}
          stepProps={stepProps}
          handleStepProps={handleStepProps}
          handleResetStepProps={handleResetStepProps}
        />
      )}
    </Fragment>
  );
};
