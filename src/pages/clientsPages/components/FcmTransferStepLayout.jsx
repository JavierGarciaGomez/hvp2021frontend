import React, { Fragment, useEffect, useState } from "react";

import { Box, Button, Card, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FcmSelectDogOptions } from "./FcmSelectDogOptions";

import { checkIfStepsAreCompleted } from "../../../helpers/fcmUtilities";
import { FcmTransferTable } from "./FcmTransferTable";
import { FcmPrevOwnerFormik } from "./FcmPrevOwnerFormik";
import { fireSwalWait } from "../../../helpers/sweetAlertUtilities";
import {
  handleFcmCompleteStep,
  setFcmActiveStepProperty,
  updateStepReferences,
  createFcmtransfer,
  updateFcmtransfer,
  addAndRemoveFcmTransfersProcedures,
} from "../../../actions/fcmActions";
import { findElementBYId } from "../../../helpers/arrayUtilities";

const initialStepProps = {
  isEditable: true,
  formTitle: "Llena el formulario",
  formWrapperTitle: "Llena el formulario",
};
// show the selector or the data if already selected
export const FcmTransferStepLayout = () => {
  /**************************props and hooks ***********************************************/
  const dispatch = useDispatch();
  const { fcmPackage, allFcm } = useSelector((state) => state.fcm);
  const { steps, activeStep, completedSteps } = fcmPackage;

  const [stepProps, setstepProps] = useState(initialStepProps);
  const [prevOwner, setprevOwner] = useState(null);
  const [newOwner, setnewOwner] = useState(null);
  const [dog, setdog] = useState(null);
  const [isEditable, setisEditable] = useState(true);
  const [arePrevStepsCompleted, setAreprevStepsCompleted] = useState(false);
  const [isDataFull, setisDataFull] = useState(false);
  const currentStep = steps[activeStep];
  const { isPuppy, stepFromOrigin, stepData, stepLabel, needsConfirmation } =
    currentStep;
  const [modality, setModality] = useState("missingPrevOwner");
  const [isStepCompleted, setisStepCompleted] = useState(false);

  /************************** Initial values and validation *******************************************************/

  /**************************use effects  **************************************************************/

  // check if this step is completed
  useEffect(() => {
    setisStepCompleted(checkIfStepsAreCompleted(completedSteps, [activeStep]));
  }, [activeStep]);

  // check if the previous steps are completed
  useEffect(() => {
    if (isPuppy) {
      setAreprevStepsCompleted(
        checkIfStepsAreCompleted(completedSteps, [0, 1, 2, 4, activeStep - 1])
      );
    } else {
      setAreprevStepsCompleted(
        checkIfStepsAreCompleted(completedSteps, [0, 1, 2, 4])
      );
    }
  }, [isPuppy]);

  // if the step change, reset data
  useEffect(() => {
    setisEditable(false);
    if (isPuppy) {
      if (isStepCompleted) {
        dispatch(setFcmActiveStepProperty("needsConfirmation", false));
      } else {
        dispatch(setFcmActiveStepProperty("needsConfirmation", true));
      }
    } else {
      dispatch(setFcmActiveStepProperty("needsConfirmation", false));
    }
  }, [isPuppy, isStepCompleted]);

  useEffect(() => {
    setisEditable(false);
  }, [activeStep]);

  // if there is stepdata set it
  useEffect(() => {
    if (stepData) {
      setdog(findElementBYId(allFcm.allFcmDogs, stepData.dog) || null);

      setprevOwner(stepData.prevOwner || null);
      setnewOwner(
        findElementBYId(allFcm.allFcmPartners, stepData.newOwner) || null
      );
    }
  }, [stepData]);

  // if all the data is filled, set datafull
  useEffect(() => {
    if (prevOwner && newOwner && dog) {
      setisDataFull(true);
    } else {
      setisDataFull(false);
    }
  }, [prevOwner, newOwner, dog]);

  // if the data is not full set it
  useEffect(() => {
    if (arePrevStepsCompleted) {
      if (!isDataFull) {
        if (stepFromOrigin === 2) {
          setnewOwner(steps[0].stepData);
          return setdog(steps[2].stepData);
        }
        if (stepFromOrigin === 3) {
          setnewOwner(steps[1].stepData);
          return setdog(steps[3].stepData);
        }
        if (stepFromOrigin === 4) {
          setprevOwner(steps[1].stepData);
          setnewOwner(steps[activeStep - 1].stepData);
        }
      } else {
        setisEditable(false);
      }
    }
  }, [arePrevStepsCompleted, isDataFull, stepData]);

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

  // useEffect(() => {
  //   if (stepData) {
  //     handleStepProps({
  //       formWrapperTitle: "Perro seleccionado",
  //       isEditable: false,
  //     });
  //   }
  // }, [stepData]);
  /************************** Handlers *******************************************************/

  const handleStepProps = (newProps) => {
    setstepProps((prevProps) => ({ ...prevProps, ...newProps }));
  };
  const handleResetStepProps = () => {
    setstepProps(initialStepProps);
  };

  const handleSubmitForm = (values) => {
    setprevOwner(values);
    setisEditable(false);
    dispatch(setFcmActiveStepProperty("needsConfirmation", true));
  };

  const handleShowEdit = () => {
    setisEditable((prev) => !prev);
  };

  const handleConfirmation = async () => {
    fireSwalWait();
    let fcmTransfer = null;
    if (stepData._id) {
      fcmTransfer = await dispatch(
        updateFcmtransfer({ dog, prevOwner, newOwner, _id: stepData._id })
      );
    } else {
      fcmTransfer = await dispatch(
        createFcmtransfer({ dog, prevOwner, newOwner })
      );
    }
    if (!fcmTransfer) {
      return;
    }

    dispatch(addAndRemoveFcmTransfersProcedures(fcmTransfer));
    dispatch(updateStepReferences(fcmTransfer));
    dispatch(handleFcmCompleteStep());
  };

  const handleRemove = () => {
    setprevOwner(null);
  };

  console.log({ prevOwner, newOwner, dog });
  console.log("arePrevStepsCompleted", arePrevStepsCompleted);
  console.log("isdatafull", isDataFull);
  console.log("isstepcompleted", isStepCompleted);

  /************************** RENDER *******************************************************/
  return (
    <Fragment>
      {/* Top section */}
      <Typography variant="h4" component="h2" mb="3rem" mt="3rem">
        {stepLabel}
      </Typography>
      {!arePrevStepsCompleted && (
        <Card sx={{ padding: "2rem", mt: "3rem" }}>
          <Typography>
            {isPuppy
              ? "Para poder realizar este paso antes es necesario completar los 4 primeros pasos así como el referente al nuevo propietario del cachorro, las ediciones a pasos anteriores podrán afectar e incluso borrar los datos de este paso."
              : "Para poder realizar este paso antes es necesario completar los 4 primeros pasos, las ediciones a pasos anteriores podrán afectar e incluso borrar los datos de este paso."}
          </Typography>
        </Card>
      )}
      {arePrevStepsCompleted && (
        <Fragment>
          <Typography mb="3rem">
            {isStepCompleted
              ? "Paso completado exitosamente."
              : needsConfirmation
              ? "Confirma los datos"
              : "Para poder realizar este paso se deben completar los datos del perro, del dueño anterior y del nuevo dueño. Llena los datos faltantes."}
          </Typography>

          {!isEditable && (
            <Fragment>
              <FcmTransferTable
                newOwner={newOwner}
                prevOwner={prevOwner}
                dog={dog}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {needsConfirmation && (
                  <Button fullWidth onClick={handleConfirmation}>
                    Confirma los datos
                  </Button>
                )}

                {!isPuppy && (
                  <Button fullWidth onClick={handleShowEdit}>
                    {!prevOwner ? "Llenar los datos faltantes" : "Editar"}
                  </Button>
                )}

                {!isPuppy && prevOwner && (
                  <Button fullWidth onClick={handleRemove} color="error">
                    Remover
                  </Button>
                )}
              </Box>
            </Fragment>
          )}

          {isEditable && (stepFromOrigin === 2 || stepFromOrigin === 3) && (
            <FcmPrevOwnerFormik
              handleSubmitForm={handleSubmitForm}
              prevOwner={prevOwner}
              handleCancel={handleShowEdit}
            />
          )}
        </Fragment>
      )}

      {/* {!stepData ? (
        <FcmSelectDogOptions
          stepData={stepData}
          handleStepProps={handleStepProps}
          stepProps={stepProps}
          handleResetStepProps={handleResetStepProps}
        />
      ) : (
        <dogFormWrapper
          stepData={stepData}
          stepProps={stepProps}
          handleStepProps={handleStepProps}
          handleResetStepProps={handleResetStepProps}
        />
      )} */}
    </Fragment>
  );
};
