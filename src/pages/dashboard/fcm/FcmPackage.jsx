import { Box, Button, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  createFcmPackage,
  fcmPackageLoaded,
  setFcmPackageStatus,
  startLoadingAllFcm,
  updateFcmPackage,
  updateFcmPackageProperty,
} from "../../../actions/fcmActions";
import { checkProcedureStatus } from "../../../helpers/fcmUtilities";
import { fireSwalError } from "../../../helpers/utilities";
import { fcmPackageStatusTypes } from "../../../types/types";
import { FcmMedicalInspectionForm } from "./components/FcmMedicalInspectionForm";
import { FcmRevisionPanel } from "./components/FcmRevisionPanel";
import { FormatItem } from "./components/FormatItem";

export const FcmPackage = () => {
  const dispatch = useDispatch();

  // let formValidation = Yup.object().shape(validationParams);
  const { allFcm } = useSelector((state) => state.fcm);
  const { allFcmPackages = [] } = allFcm;
  const { fcmPackage } = useSelector((state) => state.fcm);
  const { steps, status, medicalInspection } = fcmPackage;

  // const [initialFormValues, setInitialFormValues] = useState(emptyFormValues);
  // todo. change it to false

  const [showRevisionPanel, setShowRevisionPanel] = useState(false);
  const [selectedStepIndexToReview, setSelectedStepIndexToReview] =
    useState("");
  const [stepsToValidate, setStepsToValidate] = useState([]);

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

      dispatch(fcmPackageLoaded(fcmPackage));

      // setInitialFormValues({ ...fcmDogFormattedDate });
    } else {
    }
  }, [allFcmPackages]);

  useEffect(() => {
    setStepsToValidate(steps.slice(0, steps.length - 1));

    // check if are not all validated. set to send by user
    if (
      status === fcmPackageStatusTypes.preliminarilyReviewed ||
      status === fcmPackageStatusTypes.inspectionDone
    ) {
      const validatedSteps = steps.reduce((acc, obj) => {
        if (obj.isValidated) {
          return (acc = acc + 1);
        } else {
          return acc;
        }
      }, 0);
      if (validatedSteps < steps.length - 1) {
        dispatch(setFcmPackageStatus(fcmPackageStatusTypes.sentByClient));
      }
    }
  }, [steps]);

  //#endregion
  /*************************************************************************************************** */
  /************************** Handlers *******************************************************/
  /*************************************************************************************************** */
  //#region

  const handleSelect = (stepIndex) => {
    setSelectedStepIndexToReview(stepIndex);
    setShowRevisionPanel(true);
  };

  const handleSave = async () => {
    if (fcmPackageId) {
      await dispatch(updateFcmPackage(fcmPackageId));
    } else {
      await dispatch(createFcmPackage());
    }
  };

  const handleValidatePackage = async () => {
    const validatedSteps = steps.reduce((acc, obj) => {
      if (obj.isValidated) {
        return (acc = acc + 1);
      } else {
        return acc;
      }
    }, 0);

    if (validatedSteps < steps.length - 1) {
      return fireSwalError("Necesitar validar todos los pasos para continuar");
    }
    dispatch(setFcmPackageStatus(fcmPackageStatusTypes.preliminarilyReviewed));
    handleSave();
  };

  const handleSaveInspection = (values) => {
    dispatch(updateFcmPackageProperty("medicalInspection", values));
    dispatch(setFcmPackageStatus(fcmPackageStatusTypes.inspectionDone));
    handleSave();
  };

  //#endregion

  return (
    <Box>
      <Typography component="h2" variant="h4" mb="2rem">
        Paquete FCM. Pedigrí.
      </Typography>
      <Typography component="h2" variant="h5" mb="2rem">
        Estado del paquete: {status}
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
        <Typography mb="1rem">
          Para que el estado de avance de la revisión y los ajustes realizados
          se conserven, es necesario guardar los avances.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: "3rem" }}>
        <Button onClick={handleSave} size="large">
          Guardar avances
        </Button>
      </Box>
      <Box mb="4rem">
        <Box mb="2rem">
          <Typography component="h3" variant="h5">
            Formatos
          </Typography>
        </Box>

        {stepsToValidate.map((step, index) => (
          <FormatItem
            key={step.stepLabel}
            step={step || {}}
            onSelect={handleSelect}
            stepIndex={index}
          ></FormatItem>
        ))}
      </Box>

      {showRevisionPanel && (
        <FcmRevisionPanel
          stepIndex={selectedStepIndexToReview}
          setShowRevisionPanel={setShowRevisionPanel}
          onCancel={() => setShowRevisionPanel(false)}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: "3rem" }}>
        <Button onClick={handleValidatePackage} size="large">
          Marcar paquete como validado
        </Button>
      </Box>

      {checkProcedureStatus(
        fcmPackageStatusTypes.preliminarilyReviewed,
        status
      ) && (
        <Box>
          <Typography component="h2" variant="h4" mb="2rem">
            Revisión médica
          </Typography>
          <FcmMedicalInspectionForm
            onSave={handleSaveInspection}
            medicalInspectionData={medicalInspection}
          />
        </Box>
      )}

      {checkProcedureStatus(fcmPackageStatusTypes.inspectionDone, status) && (
        <Box>
          <Typography component="h2" variant="h4" mb="2rem">
            Imprimir paquete
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-evenly", mb: "3rem" }}
          >
            <Link
              to={`/other/print/fcmPackage/${fcmPackageId}`}
              target="_blank"
            >
              <Button onClick={() => {}} size="large">
                Imprimir paquete
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </Box>
  );
};
