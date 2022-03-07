import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmPackage } from "../../actions/fcmActions";
import { FcmStepperPartnerSelector } from "./FcmStepperPartnerSelector";

export const ProcedurePedigree = () => {
  const dispatch = useDispatch();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [passedProps, setpassedProps] = useState({});
  const [needsConfirmation, setneedsConfirmation] = useState(false);

  // todo save the package in the reducer and in database

  // fcmPackage is the main object created through the stepper
  const { fcmPackage } = useSelector((state) => state.fcm);

  /*************************************************************************************************** */
  /**************************Functions to update the fcmPackabe ***************************************/
  /*************************************************************************************************** */
  const handleSetFatherOwnerId = (id) => {
    dispatch(setFcmPackage({ ...fcmPackage, fcmFatherOwnerId: id }));
  };

  /*************************************************************************************************** */
  /**************************Functions related to the stepper *******************************************/
  /*************************************************************************************************** */
  // set the optional steps
  const isStepOptional = (step) => {
    return step === 0;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    console.log("PROCPEDIGREE NEXT");
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  /*************************************************************************************************** */
  /**************************Steps *********************************************************************/
  /*************************************************************************************************** */

  /*************************************************************************************************** */
  /**************************Use effects  *****************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    setpassedProps({
      handleSetPackageData: handleSetFatherOwnerId,
      handleNext,
      packageProperty: "fcmFatherOwnerId",
      editable: true,
      usedInProcedure: true,
      formTitle: "Agrega una identificación de socio...",
      showCancel: false,
      needsConfirmation: false,
      setneedsConfirmation,
    });
  }, []);

  console.log("Este es el paquete", fcmPackage, passedProps);

  useEffect(() => {
    if (fcmPackage.fcmFatherOwnerId) {
      setpassedProps((prev) => ({
        ...prev,
        editable: false,
        formTitle: "Paso cumplido",
      }));
    }

    if (needsConfirmation) {
      setpassedProps((prev) => ({
        ...prev,
        needsConfirmation: true,
        formTitle: "Confirma al socio",
      }));
    }
    if (!needsConfirmation) {
      setpassedProps((prev) => ({
        ...prev,
        needsConfirmation: false,
      }));
    }
  }, [fcmPackage.fcmFatherOwnerId, needsConfirmation]);

  console.log("PASSED PROPS", passedProps);

  const steps = [
    {
      label: "Propietario del padre",
      component: <FcmStepperPartnerSelector {...passedProps} />,
    },
    { label: "Padre camada", component: <Box>Boxarrón</Box> },
    { label: "Propietario de la madre", component: <Box>Boxarrón</Box> },
    { label: "Madre camada", component: <Box>Boxarrón</Box> },
  ];

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  return (
    <Box sx={{ width: "100%" }}>
      {/* stepper (numbers and labels) */}
      <Stepper activeStep={activeStep} sx={{ mb: "3rem" }}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          // if is optional add a prop to stepLabel
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          // if skipped dont show the completed icon
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* Main content */}
      {activeStep === steps.length ? (
        //When all steps are completed
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        // When there are not completed show reset
        <React.Fragment>
          {/* Main content: the step component */}

          {steps[activeStep].component}
          {/* buttons */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
