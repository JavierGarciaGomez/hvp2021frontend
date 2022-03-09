import {
  Box,
  Button,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBackFcmPackageStep,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  setFcmCompletedSteps,
  setFcmPackage,
  setFcmPackageCurrentProps,
  setFcmPackageSkipped,
  setFcmPackageStep,
} from "../../actions/fcmActions";
import {
  areAllStepsCompleted,
  totalCompletedSteps,
} from "../../helpers/fcmUtilities";
import { isStepSkipped } from "../../helpers/utilities";
import { FcmStepperDogSelector } from "./FcmStepperDogSelector";
import { FcmStepperPartnerSelector } from "./FcmStepperPartnerSelector";

export const ProcedurePedigree = () => {
  const dispatch = useDispatch();
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */

  // todo delete
  // const [skipped, setSkipped] = useState(new Set());
  // const [passedProps, setpassedProps] = useState({});

  // todo save the package in the reducer and in database

  // fcmPackage is the main object created through the stepper
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps, activeStep, skippedSteps, completedSteps } = fcmPackage;

  // TODO: PENDING

  // const totalSteps = () => {
  //   return steps.length;
  // }

  // const completedSteps = () => {
  //   return Object.keys(completed).length;
  // };
  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };
  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps();
  // };

  /*************************************************************************************************** */
  /**************************Functions related to the stepper *******************************************/
  /*************************************************************************************************** */
  // set the optional steps
  const isStepOptional = (step) => {
    return true;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    dispatch(handleNextFcmPackageStep());

    const newSkipped = new Set(skippedSteps.values());
    newSkipped.add(activeStep);

    dispatch(setFcmPackageSkipped(newSkipped));
  };

  const handleReset = () => {
    dispatch(setFcmPackageStep(0));
    dispatch(setFcmCompletedSteps({}));
  };

  /*************************************************************************************************** */
  /**************************Use effects  *****************************************************/
  /*************************************************************************************************** */

  const defaultFcmPackage = {
    isFirstRegister: false,
    packageProperty: "",
    isEditable: true,
    formTitle: "Llena el formulario",
    showCancel: false,
    needsConfirmation: false,
  };

  // TODO: Here i am
  // props according to step
  useEffect(() => {
    // default
    dispatch(
      setFcmPackage({
        ...fcmPackage,
        currentProps: {
          ...defaultFcmPackage,
        },
      })
    );

    if (activeStep === 0) {
      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          packageProperty: "fatherOwnerId",
          formTitle: "Identificación de socio",
        })
      );
    }

    if (activeStep === 1) {
      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          packageProperty: "motherOwnerId",
          formTitle: "Identificación de socio",
        })
      );
    }
    if (activeStep === 2) {
      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          packageProperty: "dogFatherId",
          formTitle: "Identificación del perro",
        })
      );
    }
    if (activeStep === 3) {
      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          packageProperty: "dogMotherId",
          formTitle: "Identificación del perro",
        })
      );
    }
  }, [activeStep]);

  /*************************************************************************************************** */
  /**************************Steps *********************************************************************/
  /*************************************************************************************************** */
  // const steps = [
  //   {
  //     label: "Propietario del padre",
  //     component: <FcmStepperPartnerSelector label="Propietario del padre" />,
  //   },
  //   {
  //     label: "Propietario de la madre",
  //     component: <FcmStepperPartnerSelector label="Propietario de la madre" />,
  //   },
  //   {
  //     label: "Padre camada",
  //     component: <FcmStepperDogSelector label="Padre de la camada" />,
  //   },
  //   {
  //     label: "Madre camada",
  //     component: <FcmStepperDogSelector label="Madre de la camada" />,
  //   },
  // ];

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  return (
    <Box sx={{ width: "100%" }}>
      {/* stepper (numbers and labels) */}
      <Stepper nonLinear activeStep={activeStep} sx={{ mb: "3rem" }}>
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
          if (isStepSkipped(skippedSteps, index)) {
            stepProps.completed = false;
          }

          return (
            <Step
              key={step.label}
              {...stepProps}
              completed={completedSteps[index]}
            >
              <StepButton
                color="inherit"
                onClick={() => {
                  dispatch(setFcmPackageStep(index));
                }}
              >
                {step.label}
              </StepButton>
              {/* <StepLabel {...labelProps}>{step.label}</StepLabel> */}
            </Step>
          );
        })}
      </Stepper>
      {console.log(
        "activeStep",
        activeStep,
        "stepslength",
        steps.length,
        "stepscompleted",
        completedSteps
      )}

      {/* Main content */}
      {areAllStepsCompleted(completedSteps, steps) ? (
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
          {console.log("******acá", steps[activeStep].component)}
          {steps[activeStep].component}
          {/* buttons */}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => {
                dispatch(handleBackFcmPackageStep());
              }}
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

            {/* change next after */}
            {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button> */}

            <Button
              onClick={() => {
                dispatch(handleNextFcmPackageStep());
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
            {activeStep !== steps.length &&
              (completedSteps[activeStep] ? (
                <Typography variant="caption" sx={{ display: "inline-block" }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button
                  onClick={() => {
                    dispatch(handleFcmCompleteStep());
                  }}
                >
                  {totalCompletedSteps(completedSteps) === steps.length - 1
                    ? "Finish"
                    : "Complete Step"}
                </Button>
              ))}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
