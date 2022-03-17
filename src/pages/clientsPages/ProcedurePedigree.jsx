import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleBackFcmPackageStep,
  handleNextFcmPackageStep,
  createFcmPackage,
  setFcmCompletedSteps,
  setFcmPackage,
  setFcmPackageStep,
  startLoadingAllFcm,
  startLoadingFcmPackage,
  updateFcmPackage,
  updateFcmPackageProperty,
} from "../../actions/fcmActions";
import { areAllStepsCompleted, getComponent } from "../../helpers/fcmUtilities";
import { isStepSkipped } from "../../helpers/utilities";
import { fcmStepTypes } from "../../types/types";

export const ProcedurePedigree = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [isLoading, setisLoading] = useState(true);

  // TODO: PENDING

  /*************************************************************************************************** */
  /**************************Functions related to the stepper *******************************************/
  /*************************************************************************************************** */
  // set the optional steps
  const isStepOptional = (step) => {
    return true;
  };

  const handleReset = () => {
    dispatch(setFcmPackageStep(0));
    dispatch(updateFcmPackageProperty("completedSteps", {}));
  };

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

    // todo: delete
    config: {
      isFirstRegister: false,
      isCardLost: false,
      packageProperty: "",
      isEditable: true,
      formTitle: "Llena el formulario",
      showCancel: false,
      needsConfirmation: false,
    },
    // todo: delete
    props: { label: "Propietario del padre" },
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
        stepLabel: "Madre camada",
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
    dogFatherId: "",
    dogMotherId: "",
    fatherFcm: {},
    motherFcm: {},
    fatherDogFcm: {},
    motherDogFcm: {},
    fatherOwnerId: "",
    motherOwnerId: "",
    breedingForm: {},
    currentProps: {
      isFirstRegister: false,
      packageProperty: "",
      isEditable: true,
      formTitle: "Llena el formulario",
      showCancel: false,
      needsConfirmation: false,
    },
  };

  //#endregion
  /*************************************************************************************************** */
  /**************************Use effects  *****************************************************/
  /*************************************************************************************************** */

  // TODO DELETE
  // const defaultConfig = {
  //   isFirstRegister: false,
  //   packageProperty: "",
  //   isEditable: true,
  //   formTitle: "Llena el formulario",
  //   showCancel: false,
  //   needsConfirmation: false,
  // };

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

  // TODO: DELETE
  // useEffect(() => {
  //   if (activeStep === 0) {
  //     // todo delete
  //     // todo
  //     dispatch(
  //       setFcmPackageCurrentProps({
  //         ...fcmPackage.currentProps,
  //         packageProperty: "fatherOwnerId",
  //         formTitle: "Identificación de socio",
  //       })
  //     );
  //   }

  //   if (activeStep === 1) {
  //     dispatch(
  //       setFcmPackageCurrentProps({
  //         ...fcmPackage.currentProps,
  //         packageProperty: "motherOwnerId",
  //         formTitle: "Identificación de socio",
  //       })
  //     );
  //   }
  //   if (activeStep === 2) {
  //     dispatch(
  //       setFcmPackageCurrentProps({
  //         ...fcmPackage.currentProps,
  //         packageProperty: "dogFatherId",
  //         formTitle: "Identificación del perro",
  //       })
  //     );
  //   }
  //   if (activeStep === 3) {
  //     dispatch(
  //       setFcmPackageCurrentProps({
  //         ...fcmPackage.currentProps,
  //         packageProperty: "dogMotherId",
  //         ...defaultConfig,
  //         packageProperty: "dogMotherId",
  //         formTitle: "Identificación del perro",
  //       })
  //     );
  //   }
  // }, [activeStep]);

  /*************************************************************************************************** */
  /**************************HADNLERS *********************************************************************/
  /*************************************************************************************************** */

  const handleSaveFcmPackage = async () => {
    if (id) {
      dispatch(updateFcmPackage(id));
    } else {
      const savedId = await dispatch(createFcmPackage());
      navigate(`${savedId}`);
    }
    // si existe id: actualizar
    // si no: crear nuevo
    // si es nuevo navegar a la página
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
              key={`${index} ${step.stepLabel}.`}
              {...stepProps}
              completed={completedSteps[index]}
            >
              <StepButton
                color="inherit"
                onClick={() => {
                  dispatch(setFcmPackageStep(index));
                }}
              >
                {step.stepLabel}
              </StepButton>
              {/* <StepLabel {...labelProps}>{step.label}</StepLabel> */}
            </Step>
          );
        })}
      </Stepper>

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

            <Button
              color="inherit"
              onClick={handleSaveFcmPackage}
              sx={{ mr: 1 }}
            >
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
          {/* esto es */}
          {getComponent(steps[activeStep].stepType, steps[activeStep].props)}
        </React.Fragment>
      )}
    </Box>
  );
};
