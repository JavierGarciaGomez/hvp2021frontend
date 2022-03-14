import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addAndRemoveFcmPartnerProcedures,
  cleanFcmStep,
  handleFcmCompleteStep,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FcmPartnerFormikNew } from "./FcmPartnerFormikNew";

export const FcmPartnerFormWrapper = (props) => {
  const {
    handleCancel,
    stepProps,
    stepData,
    handleResetStepProps,
    handleStepProps,
  } = props;

  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();

  const { isEditable, needsConfirmation, formWrapperTitle } = stepProps;

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

  const handleConfirmRenewal = async (values) => {
    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
      );
      if (!confirmation) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (fcmPartner) => {
    dispatch(updateStepReferences(fcmPartner));
    dispatch(addAndRemoveFcmPartnerProcedures(fcmPartner));
    dispatch(handleFcmCompleteStep());
  };

  const handleConfirmation = async () => {
    if (!(await handleConfirmRenewal({ ...stepData }))) {
      return;
    }
    dispatch(addAndRemoveFcmPartnerProcedures(stepData));
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
              ? "Socio seleccionado. Confirma los datos, edítalos o remueve para seleccionar otro socio."
              : "Los datos de socio del propietario del han sido llenados, puedes editar los datos o remover la selección."}
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
          Si la tarjeta ya está vencida y cuentas con una nueva, es necesario
          reemplazar la imagen.
        </Typography>
        <Typography mb="1rem">
          Si se va a realizar la renovación de un nuevo socio, es importante que
          el comprobante domiciliario no sea anterior a 3 meses. En su caso,
          reemplazar la imagen
        </Typography>
      </Box>
      <FcmPartnerFormikNew
        handleSubmitForm={handleSubmit}
        handleCancel={handleCancelFormWrapper}
        {...props}
      />
    </Fragment>
  );
};
