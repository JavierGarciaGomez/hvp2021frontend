import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleBackFcmPackageStep,
  handleNextFcmPackageStep,
  saveFcmPackage,
  setFcmCompletedSteps,
  setFcmPackageCurrentProps,
  setFcmPackageSkipped,
  setFcmPackageStep,
  startLoadingFcmPackage,
  updateFcmPackage,
} from "../../actions/fcmActions";
import { areAllStepsCompleted, getComponent } from "../../helpers/fcmUtilities";
import { isStepSkipped } from "../../helpers/utilities";

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

  // TODO: PENDING

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

  // TODO DELETE
  const defaultConfig = {
    isFirstRegister: false,
    packageProperty: "",
    isEditable: true,
    formTitle: "Llena el formulario",
    showCancel: false,
    needsConfirmation: false,
  };
  // find fcmPartner and set it active (searching from id)
  useEffect(() => {
    if (id) {
      dispatch(startLoadingFcmPackage(id));
    }
  }, [dispatch]);

  // props according to step

  // TODO: DELETE
  useEffect(() => {
    if (activeStep === 0) {
      // todo delete
      dispatch(
        setFcmPackageCurrentProps({
          ...fcmPackage.currentProps,
          packageProperty: "fatherOwnerId",
          formTitle: "Identificación de socio",
        })
      );
      // todo
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
          ...defaultConfig,
          packageProperty: "dogMotherId",
          formTitle: "Identificación del perro",
        })
      );
    }
  }, [activeStep]);

  const handleSaveFcmPackage = async () => {
    if (id) {
      dispatch(updateFcmPackage(id));
    } else {
      const savedId = await dispatch(saveFcmPackage());
      navigate(`${savedId}`);
    }
    // si existe id: actualizar
    // si no: crear nuevo
    // si es nuevo navegar a la página
  };

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
          {getComponent(
            steps[activeStep].componentName,
            steps[activeStep].props
          )}
        </React.Fragment>
      )}
    </Box>
  );
};
