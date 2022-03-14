import React, { Fragment, useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FcmPartnerFormWrapper } from "./FcmPartnerFormWrapper";
import { FcmSelectPartnerOptions } from "./FcmSelectPartnerOptions";

const initialStepProps = {
  isFirstRegister: false,
  isCardLost: false,
  isEditable: true,
  formTitle: "Llena el formulario",
  showCancel: false,
  needsConfirmation: false,
  formWrapperTitle: "Llena el formulario",
};
// show the selector or the data if already selected
export const FcmPartnerStepLayout = () => {
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps, activeStep } = fcmPackage;
  const { stepData, stepLabel, isConfirmed } = steps[activeStep];
  const [stepProps, setstepProps] = useState(initialStepProps);

  console.dir(stepProps);

  const handleStepProps = (newProps) => {
    setstepProps((prevProps) => ({ ...prevProps, ...newProps }));
  };
  const handleResetStepProps = () => {
    console.log("voy a resetear");
    setstepProps(initialStepProps);
  };

  useEffect(() => {
    setstepProps({
      needsConfirmation: !isConfirmed,
      formWrapperTitle: "Socio seleccionado exitosamente",
    });
  }, [isConfirmed]);

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
