import { Box, Button, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { FcmPartnerFormikNew } from "./FcmPartnerFormikNew";

export const FcmConfirmFormData = ({ stepProps, stepData }) => {
  const { needsConfirmation, isEditable } = stepProps;
  return (
    <Fragment>
      <Fragment>
        <Typography component="h2" variant="h5" mb="2rem">
          Confirmación del socio
        </Typography>

        <Box sx={{ mb: "3rem" }}>
          <Typography sx={{ mb: "2rem", lineHeight: "1.5" }}>
            {needsConfirmation
              ? "Socio seleccionado. Confirma los datos, edítalos o remueve para seleccionar otro socio."
              : "Los datos de socio del propietario del han sido llenados, puedes continuar con el paso siguiente, editar los datos o remover la selección."}
          </Typography>
          <Box sx={{ display: "flex", width: "100%", gap: "3rem", mb: "3rem" }}>
            {needsConfirmation ? (
              <Button
                fullWidth={true}
                onClick={() => {
                  //   handleConfirmation();
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
                  //   dispatch(handleNextFcmPackageStep());
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
                // dispatch(setFcmCurrentStepEditable(true));
              }}
              color="primary"
            >
              Editar información
            </Button>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={() => {
                // dispatch(cleanFcmStep());
              }}
              color="error"
            >
              Remover
            </Button>
          </Box>
        </Box>

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
            Si se va a realizar la renovación de un nuevo socio, es importante
            que el comprobante domiciliario no sea anterior a 3 meses. En su
            caso, reemplazar la imagen
          </Typography>
        </Box>
        <FcmPartnerFormikNew
        //   handleSubmitForm={handleSubmit}
        //   handleCancel={handleCancel}
        //   isEditable={isEditable}
        //   isFirstRegister={isFirstRegister}
        //   isCardLost={isCardLost}
        //   fcmPartnerData={null}
        />
      </Fragment>
    </Fragment>
  );
};
