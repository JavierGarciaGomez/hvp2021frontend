import { Check } from "@mui/icons-material";
import { Box, Button, CircularProgress, Step, StepButton, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleBackFcmPackageStep,
  handleNextFcmPackageStep,
  createFcmPackage,
  setFcmPackage,
  setFcmPackageStep,
  startLoadingAllFcm,
  startLoadingFcmPackage,
  updateFcmPackage,
  updateFcmPackageProperty,
} from "../../actions/fcmActions";
import { areAllStepsCompleted, getComponent } from "../../helpers/fcmUtilities";

import { fcmStepTypes } from "../../types/types";

/*************************************************************************************************** */
/**************************Initial FcmPackage Data  ***************************************************/
/*************************************************************************************************** */
//#region
// todo check and simplify
const defaultStep = {
  stepLabel: "Propietario del padre",
  stepType: fcmStepTypes.fcmPartnerStep,
  dataId: null,
  stepData: null,
  needsConfirmation: false,
  stepFromOrigin: null,
};

const initialFcmPackage = {
  steps: [
    {
      ...defaultStep,
      stepLabel: "Propietario del padre",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Propietario de la madre",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Padre de la camada",
      stepType: fcmStepTypes.fcmDogStep,
      props: { label: "Padre de la camada" },
    },
    {
      ...defaultStep,
      stepLabel: "Madre de la camada",
      stepType: fcmStepTypes.fcmDogStep,
    },
    {
      ...defaultStep,
      stepLabel: "Formato de cruza",
      stepType: fcmStepTypes.fcmBreedingStep,
    },
    {
      ...defaultStep,
      stepLabel: "Resumen",
      stepType: fcmStepTypes.fcmSummaryStep,
    },
  ],
  activeStep: 0,
  completedSteps: { 0: false },
  procedures: [],
  documentation: [],
  status: null,
  creator: "",
  // todo: delete
};

//#endregion
export const ProcedurePedigree = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  // fcmPackage is the main object created through the stepper
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps, activeStep, completedSteps } = fcmPackage;
  const [isLoading, setisLoading] = useState(true);
  const [displayStepper, setdisplayStepper] = useState({
    display: { xs: "none", md: "flex" },
  });
  const [displayBoxStepper, setdisplayBoxStepper] = useState({
    display: { xs: "flex", md: "none" },
  });

  /*************************************************************************************************** */
  /**************************Functions related to the stepper *******************************************/
  /*************************************************************************************************** */
  const handleReset = () => {
    dispatch(setFcmPackageStep(0));
    dispatch(updateFcmPackageProperty("completedSteps", {}));
  };

  /*************************************************************************************************** */
  /**************************Use effects  *****************************************************/
  /*************************************************************************************************** */

  useEffect(() => {
    const executeAsync = async () => {
      await dispatch(startLoadingAllFcm());
      if (id) {
        // todo: change. check the package in
        await dispatch(startLoadingFcmPackage(id));
      } else {
        await dispatch(setFcmPackage(initialFcmPackage));
      }
      setisLoading(false);
    };
    executeAsync();
  }, []);

  useEffect(() => {
    if (steps.length > 9) {
      setdisplayStepper({ display: "none" });
      setdisplayBoxStepper({ display: "flex" });
    } else {
      setdisplayStepper({ display: { xs: "none", md: "flex" } });
      setdisplayBoxStepper({ display: { xs: "flex", md: "none" } });
    }
  }, [steps.length]);

  /*************************************************************************************************** */
  /**************************HANDLERS *********************************************************************/
  /*************************************************************************************************** */

  const handleSaveFcmPackage = async () => {
    if (id) {
      dispatch(updateFcmPackage(id));
    } else {
      const savedId = await dispatch(createFcmPackage());
      navigate(`${savedId}`);
    }
  };

  /*************************************************************************************************** */
  /**************************RENDER *********************************************************************/
  /*************************************************************************************************** */

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* stepper (numbers and labels) */}
      <Stepper nonLinear activeStep={activeStep} sx={{ mb: "3rem", ...displayStepper }}>
        {steps.map((step, index) => {
          return (
            <Step key={`${index} ${step.stepLabel}.`} completed={completedSteps[index]}>
              <StepButton
                color="inherit"
                onClick={() => {
                  dispatch(setFcmPackageStep(index));
                }}
              >
                {step.stepLabel}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ justifyContent: "center", ...displayBoxStepper }}>
        <Typography component="h3" variant="h3">
          {activeStep + 1}/{steps.length}
        </Typography>
        {completedSteps[activeStep] && <Check sx={{ fontSize: "4.8rem" }} color="primary" />}
      </Box>

      {/* Main content */}
      {areAllStepsCompleted(completedSteps, steps) ? (
        //When all steps are completed
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        // When there are not completed show reset
        <React.Fragment>
          {/* Main content: the step component */}

          {/* buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              justifyContent: "space-between",
            }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() => {
                dispatch(handleBackFcmPackageStep());
              }}
              sx={{ mr: 1 }}
            >
              PASO ANTERIOR
            </Button>

            <Button color="inherit" onClick={handleSaveFcmPackage} sx={{ mr: 1 }}>
              GUARDAR AVANCES
            </Button>

            <Button
              onClick={() => {
                dispatch(handleNextFcmPackageStep());
              }}
            >
              PASO SIGUIENTE
            </Button>
            {/* if this step is not equal to the steps lenght and is not completed: show "STEP COMPLETED". */}
            {activeStep !== steps.length &&
              (completedSteps[activeStep] ? (
                <Typography variant="caption" sx={{ display: "inline-block" }}>
                  Paso {activeStep + 1} completado
                </Typography>
              ) : (
                ""
              ))}
          </Box>
          {getComponent(steps[activeStep].stepType, steps[activeStep].props)}
        </React.Fragment>
      )}
    </Box>
  );
};
