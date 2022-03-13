import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addFcmProcedure,
  cleanFcmStep,
  handleFcmCompleteStep,
  handleNextFcmPackageStep,
  removeFcmProcedure,
  setFcmCurrentStepConfig,
  setFcmCurrentStepEditable,
  updateStepReferences,
} from "../../../actions/fcmActions";
import { fireSwalConfirmation } from "../../../helpers/utilities";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { FcmPartnerFormikNew } from "./FcmPartnerFormikNew";

export const FcmPartnerFormWrapper = ({ handleCancel }) => {
  /*************************************************************************************************** */
  /**************************usestates and useselectors ******** ***************************************/
  /*************************************************************************************************** */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps } = fcmPackage;

  const { dataId, config } = steps[activeStep];
  const {
    isEditable,
    isFirstRegister,
    isCardLost,
    needsConfirmation,
    formTitle,
  } = config;
  const [componentData, setcomponentData] = useState({});

  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region
  console.log("Voy a imprimir procedures");
  console.table(fcmPackage.procedures);
  const handleConfirmRenewal = async (values) => {
    if (dayjs(values.expirationDate).isBefore(dayjs().add(14, "days"))) {
      const confirmation = await fireSwalConfirmation(
        "La tarjeta ha expirado o expirará pronto. Se agregará al paquete una renovación de socio. Antes de confirmar, verificar que el comprobante domiciliario no sea anterior a 3 meses"
      );
      console.log("confirmation", confirmation);
      if (!confirmation) {
        return false;
      }
      dispatch(
        addFcmProcedure({
          stepFromOrigin: activeStep,
          type: "partnerRenewal",
          dataId: values._id,
          data: values,
        })
      );
    } else {
      dispatch(
        removeFcmProcedure({
          stepFromOrigin: activeStep,
          type: "partnerRenewal",
        })
      );
    }
    return true;
  };

  const handleSubmit = async (fcmPartner) => {
    console.log("lleguñe");
    //   todo try to reduce the numbers of dispatchs and do the work in actions
    // addfcmprocedure of renewal
    if (dayjs(fcmPartner.expirationDate).isBefore(dayjs().add(14, "days"))) {
      dispatch(
        addFcmProcedure({
          stepFromOrigin: activeStep,
          type: "partnerRenewal",
          dataId: fcmPartner._id,
          data: fcmPartner,
        })
      );
      // removefcmprocedure of renewals
    } else {
      dispatch(
        removeFcmProcedure({
          stepFromOrigin: activeStep,
          type: "partnerRenewal",
        })
      );
    }

    handleProcedures(fcmPartner);

    dispatch(updateStepReferences(fcmPartner));
    dispatch(
      setFcmCurrentStepConfig({ needsConfirmation: false, isEditable: false })
    );
    dispatch(handleFcmCompleteStep());
  };

  const handleConfirmation = async () => {
    const values = { ...componentData };

    if (!(await handleConfirmRenewal(values))) {
      return;
    }
    handleProcedures(values);
    dispatch(updateStepReferences(values));

    dispatch(setFcmCurrentStepConfig({ needsConfirmation: false }));
    // setneedsConfirmation(false);
    dispatch(handleFcmCompleteStep());
  };

  const handleProcedures = async (fcmPartner) => {
    // add or remove a procedure
    console.log("este es el fcm procedure", fcmPartner.isPending);
    if (fcmPartner.isPending) {
      dispatch(
        addFcmProcedure({
          stepFromOrigin: activeStep,
          type: "partnerRegistration",
          data: fcmPartner,
          dataId: fcmPartner._id,
        })
      );
    } else {
      dispatch(
        removeFcmProcedure({
          stepFromOrigin: activeStep,
          type: "partnerRegistration",
        })
      );
    }
    if (fcmPartner.isCardLost) {
      dispatch(
        addFcmProcedure({
          stepFromOrigin: activeStep,
          type: "responsiveLetter",
          data: fcmPartner,
          dataId: fcmPartner._id,
        })
      );
    } else {
      dispatch(
        removeFcmProcedure({
          stepFromOrigin: activeStep,
          type: "responsiveLetter",
        })
      );
    }
  };

  return (
    <div>
      <div>FcmPartnerFormWrapper</div>
      <Typography component="h2" variant="h5" mb="2rem">
        {formTitle}
      </Typography>

      {!isEditable && (
        <Box sx={{ mb: "3rem" }}>
          <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
            {needsConfirmation
              ? "Socio seleccionado. Confirma los datos, edítalos o remueve para seleccionar otro socio."
              : "Los datos de socio del propietario del han sido llenados, puedes continuar con el paso siguiente, editar los datos o remover la selección."}
          </Typography>
          <Box sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}>
            {needsConfirmation ? (
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => {
                  handleConfirmation();
                }}
                color="primary"
              >
                Confirmar
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth={true}
                onClick={() => {
                  dispatch(handleNextFcmPackageStep());
                }}
                color="primary"
              >
                Siguiente paso
              </Button>
            )}

            <Button
              variant="contained"
              fullWidth={true}
              onClick={() => {
                // todo delete
                dispatch(setFcmCurrentStepEditable(true));
              }}
              color="primary"
            >
              Editar información
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={() => {
                dispatch(cleanFcmStep());
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
        handleCancel={handleCancel}
        isEditable={isEditable}
        isFirstRegister={isFirstRegister}
        isCardLost={isCardLost}
        fcmPartnerData={null}
      />
    </div>
  );
};
