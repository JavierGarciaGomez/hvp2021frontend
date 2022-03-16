import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addAndRemoveFcmProcedures,
  addNewFcmStep,
  addOrRemoveFcmTransferSteps,
  cleanFcmStep,
  handleFcmCompleteStep,
  removeFcmSteps,
  setFcmCurrentStepConfig,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { getTransferStepLabel } from "../../../helpers/fcmUtilities";
import { FcmDogFormikNew } from "./FcmDogFormikNew";

export const FcmDogFormWrapper = (props) => {
  /*************************************************************************************************** */
  /************************** hooks and props ******** ***************************************/
  /*************************************************************************************************** */
  const {
    handleCancel,
    stepProps,
    stepData,
    handleResetStepProps,
    handleStepProps,
  } = props;
  const dispatch = useDispatch();
  const { isEditable, formWrapperTitle } = stepProps;

  const fcmPackage = useSelector((state) => state.fcm.fcmPackage);
  const { steps, activeStep } = fcmPackage;
  const { needsConfirmation } = steps[activeStep];
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const handleCancelFormWrapper = () => {
    if (handleCancel) {
      handleCancel();
    } else {
      handleStepProps({ isEditable: false });
    }
  };

  const handleConfirmTransfer = async (values) => {
    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "Se ha marcado que se realizará una transferencia. Por lo que se agregará al paquete, si no es correcto, edite el formulario."
      );

      if (!confirmation) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (fcmDog) => {
    dispatch(updateStepReferences(fcmDog));
    dispatch(addOrRemoveFcmTransferSteps(fcmDog));
    dispatch(handleFcmCompleteStep());
  };

  // todo review
  const handleConfirmation = async () => {
    if (!(await handleConfirmTransfer(stepData))) {
      return;
    }
    dispatch(addOrRemoveFcmTransferSteps(stepData));
    dispatch(handleFcmCompleteStep());
  };

  return (
    <Fragment>
      <div>FcmPartnerFormWrapper</div>
      <Typography component="h2" variant="h5" mb="2rem">
        {formWrapperTitle}
      </Typography>

      {!isEditable && (
        <Box sx={{ mb: "3rem" }}>
          <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
            {needsConfirmation
              ? "Perro seleccionado. Confirma los datos, edítalos o remueve para seleccionar otro perro."
              : "Los datos de la FCM del perro han sido llenados, puedes editar los datos o remover la selección."}
          </Typography>
          <Box sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}>
            {needsConfirmation && (
              <Button
                fullWidth={true}
                onClick={handleConfirmation}
                color="primary"
              >
                Confirmar
              </Button>
            )}

            <Button
              fullWidth={true}
              onClick={() => {
                handleResetStepProps({ isEditable: true });
              }}
              color="primary"
            >
              Editar información
            </Button>
            <Button
              fullWidth={true}
              onClick={() => {
                dispatch(cleanFcmStep());
                handleResetStepProps();
              }}
              color="error"
            >
              Remover
            </Button>
          </Box>
        </Box>
      )}
      {/* Nota */}
      <Box
        sx={{
          bgcolor: "grey.300",
          p: "2rem",
          borderRadius: 2,
          boxShadow: 5,
          mb: "5rem",
        }}
      >
        <Typography component="h3" variant="h6" mb="1rem" fontWeight="bold">
          Notas:
        </Typography>
        <Typography mb="1rem">
          Las imágenes deben tener un tamaño máximo de 1mb.
        </Typography>
        <Typography mb="1rem">
          Si el pedigrí o CPR está endosado, es necesario marcar que se requiere
          transferencia, para que se incluya el formato en el paquete.
        </Typography>
      </Box>
      <FcmDogFormikNew
        handleSubmitForm={handleSubmit}
        handleCancel={handleCancelFormWrapper}
        {...props}
      />
    </Fragment>
  );
};
