import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFcmStepProperty } from "../../../../actions/fcmActions";
import { fcmStepTypes } from "../../../../types/types";
import { FcmPartner } from "../FcmPartner";

export const FcmRevisionPanel = ({ stepIndex }) => {
  console.log("step", stepIndex);
  const dispatch = useDispatch();
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps } = fcmPackage;
  const reviewedStep = steps[stepIndex];
  const { stepType, isValidated } = reviewedStep;

  const handleValidate = () => {
    dispatch(setFcmStepProperty(stepIndex, "isValidated", !isValidated));
  };

  return (
    <Box mb="4rem">
      <Box>
        <Typography component="h3" variant="h5">
          Panel de revisión
        </Typography>
      </Box>

      {stepType === fcmStepTypes.fcmPartnerStep && (
        <FcmPartner fcmPartnerid={reviewedStep.dataId} />
      )}
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button onClick={handleValidate}>
          {isValidated ? "Invalidar" : "Validar"}
        </Button>
        <Button>Editar</Button>
        <Button>Seleccionar otro</Button>
        <Button>Cancelar</Button>
      </Box>
    </Box>
  );
};
