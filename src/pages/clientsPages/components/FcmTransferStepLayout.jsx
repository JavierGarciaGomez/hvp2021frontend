import React, { Fragment, useEffect, useState } from "react";

import { Box, Button, Card, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FcmSelectDogOptions } from "./FcmSelectDogOptions";

import { checkIfStepsAreCompleted } from "../../../helpers/fcmUtilities";
import { FcmTransferTable } from "./FcmTransferTable";
import { FcmPrevOwnerFormik } from "./FcmPrevOwnerFormik";
import {
  handleFcmCompleteStep,
  setFcmActiveStepProperty,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { findElementBYId } from "../../../helpers/arrayUtilities";
import { FcmPartnerFormWrapper } from "./FcmPartnerFormWrapper";
import { FcmPartnerStepLayout } from "./FcmPartnerStepLayout";

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
  const { stepData, stepLabel, needsConfirmation } = steps[activeStep];
  const [stepProps, setstepProps] = useState(initialStepProps);
  const [prevOwner, setprevOwner] = useState(null);
  const [newOwner, setnewOwner] = useState(null);
  const [dog, setdog] = useState(null);
  const [isEditable, setisEditable] = useState(true);
  const [arePrevStepsCompleted, setAreprevStepsCompleted] = useState(false);
  const [isDataFull, setisDataFull] = useState(false);
  const currentStep = steps[activeStep];
  const [modality, setModality] = useState("missingPrevOwner");

  /************************** Initial values and validation *******************************************************/

  /**************************use effects  **************************************************************/

  // setthe modality
  useEffect(() => {
    if (currentStep.stepFromOrigin === 4) {
      setModality("missingNewOwner");
    }
  }, []);

  // check if the previous steps are completed
  useEffect(() => {
    setAreprevStepsCompleted(
      checkIfStepsAreCompleted(completedSteps, [0, 1, 2, 4])
    );
  }, []);

  // if the step change, reset data
  useEffect(() => {
    setisEditable(false);
    dispatch(setFcmActiveStepProperty("needsConfirmation", false));
  }, [activeStep]);

  // if there is stepdata set it
  useEffect(() => {
    if (currentStep.stepData) {
      setdog(findElementBYId(allFcm.allFcmDogs, stepData.dog) || null);
      setprevOwner(
        findElementBYId(allFcm.allFcmPartners, stepData.prevOwner) || null
      );
      setnewOwner(
        findElementBYId(allFcm.allFcmPartners, stepData.newOwner) || null
      );
    }
  }, [currentStep.stepData]);

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
        if (currentStep.stepFromOrigin === 2) {
          setnewOwner(steps[0].stepData);
          return setdog(steps[2].stepData);
        }
        if (currentStep.stepFromOrigin === 3) {
          setnewOwner(steps[1].stepData);
          return setdog(steps[3].stepData);
        }
        if (currentStep.stepFromOrigin === 4) {
          setprevOwner(steps[1].stepData);
        }
      } else {
        setisEditable(false);
      }
    }
  }, [arePrevStepsCompleted, isDataFull, currentStep.stepData]);

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

  const handleConfirmation = () => {
    console.log(dog, prevOwner, newOwner);
    dispatch(setFcmActiveStepProperty("needsConfirmation", false));
    dispatch(
      updateStepReferences({
        dog: dog._id,
        prevOwner: prevOwner,
        newOwner: newOwner._id,
      })
    );
    // dispatch(addAndRemoveFcmProcedures(fcmPartner));
    dispatch(handleFcmCompleteStep());
  };

  const handleRemove = () => {
    setprevOwner(null);
  };

  console.log({ prevOwner, newOwner, dog });
  console.log(arePrevStepsCompleted);
  console.log("isdatafull", isDataFull);

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
            {isDataFull
              ? "Paso completado exitosamente. Puedes editar o remover la información"
              : "Para poder realizar este paso antes es necesario completar los 5 pasos anteriores, las ediciones a pasos anteriores podrán afectar e incluso borrar los datos de este paso."}
          </Typography>
        </Card>
      )}
      {arePrevStepsCompleted && (
        <Fragment>
          <Typography mb="3rem">
            {needsConfirmation
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

                <Button fullWidth onClick={handleShowEdit}>
                  {!prevOwner ? "Llenar los datos faltantes" : "Editar"}
                </Button>

                {prevOwner && (
                  <Button fullWidth onClick={handleRemove} color="error">
                    Remover
                  </Button>
                )}
              </Box>
            </Fragment>
          )}

          {isEditable &&
            (currentStep.stepFromOrigin === 2 ||
              currentStep.stepFromOrigin === 3) && (
              <FcmPrevOwnerFormik
                handleSubmitForm={handleSubmitForm}
                prevOwner={prevOwner}
                handleCancel={handleShowEdit}
              />
            )}
          {isEditable && currentStep.stepFromOrigin === 4 && (
            <FcmPartnerStepLayout
              handleSubmitForm={handleSubmitForm}
              handleCancel={handleShowEdit}
              stepProps={{ isEditable: isEditable }}
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
