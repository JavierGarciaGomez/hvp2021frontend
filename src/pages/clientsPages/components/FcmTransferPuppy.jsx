import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFcmProcedure } from "../../../actions/fcmActions";
import { FcmStepperPartnerSelector } from "../FcmStepperPartnerSelector";

export const FcmTransferPuppy = ({ ...props }) => {
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { activeStep, steps } = fcmPackage;

  const dispatch = useDispatch();
  dispatch(
    addFcmProcedure({
      stepFromOrigin: activeStep,
      type: "transfer",
      data: steps[activeStep].stepObject.puppyName,
      dataId: null,
    })
  );

  return (
    <Fragment>
      <Box sx={{ mt: "3rem", mb: "3rem" }}>
        <Typography>
          Los certificados de los cachorros se expiden a nombre de la madre. Has
          seleccionado la transferencia de este cachorro, por lo que el nuevo
          propietario debe ser socio de la FCM, o solicitar su inscripción.
        </Typography>
      </Box>
      <FcmStepperPartnerSelector {...props} />
    </Fragment>
  );
};
