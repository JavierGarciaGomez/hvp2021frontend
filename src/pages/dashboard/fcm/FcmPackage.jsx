import { Box, Button, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fcmPackageLoaded,
  startLoadingAllFcm,
} from "../../../actions/fcmActions";
import { FcmRevisionPanel } from "./components/FcmRevisionPanel";
import { FormatItem } from "./components/FormatItem";

export const FcmPackage = () => {
  const dispatch = useDispatch();

  // let formValidation = Yup.object().shape(validationParams);
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmPackages = [] } = allFcm;
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps } = fcmPackage;

  // const [initialFormValues, setInitialFormValues] = useState(emptyFormValues);
  // todo. change it to false

  const [showRevisionPanel, setShowRevisionPanel] = useState(false);
  const [selectStepFormat, setSelectStepFormat] = useState(null);
  const [selectedStepIndexToReview, setSelectedStepIndexToReview] =
    useState("");

  const { fcmPackageId } = useParams();

  /*************************************************************************************************** */
  /************************** useeffects *******************************************************/
  /*************************************************************************************************** */
  //#region
  //   load the fcmParther if there is an fcmPackageId

  useEffect(() => {
    if (allFcmPackages.length === 0) {
      dispatch(startLoadingAllFcm());
    }
  }, []);

  useEffect(() => {
    if (fcmPackageId && allFcmPackages.length > 0) {
      const fcmPackage = allFcmPackages.find(
        (element) => element._id === fcmPackageId
      );

      console.log(fcmPackage);
      dispatch(fcmPackageLoaded(fcmPackage));

      // setInitialFormValues({ ...fcmDogFormattedDate });
    } else {
    }
  }, [allFcmPackages]);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const handleSelect = (stepIndex) => {
    setShowRevisionPanel(true);
    setSelectedStepIndexToReview(stepIndex);

    console.log(steps[stepIndex]);
  };

  const handleReviewFormat = (step) => {};

  //#endregion

  return (
    <Box>
      <Typography component="h2" variant="h4" mb="2rem">
        Paquete FCM. Pedigrí.
      </Typography>
      {/* Notas */}
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
          Se debe validar cada uno de los formatos, y, una vez validados,
          concluir la revisión o bien regresar al estado de llenado por el
          cliente, para que este haga las correcciones; sin embargo, de ser
          posible, es mejor hacer las correcciones en esta etapa.
        </Typography>
      </Box>
      <Box mb="4rem">
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Formatos
          </Typography>
        </Box>

        {steps.map((step, index) => (
          <FormatItem
            key={step.stepLabel}
            step={step || {}}
            onSelect={handleSelect}
            stepIndex={index}
          ></FormatItem>
        ))}
      </Box>
      {showRevisionPanel && (
        <FcmRevisionPanel stepIndex={selectedStepIndexToReview} />
      )}
    </Box>
  );
};
