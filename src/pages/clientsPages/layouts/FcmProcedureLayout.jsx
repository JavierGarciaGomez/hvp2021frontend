import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFcmPackage, startLoadingAllFcm, startLoadingFcmPackage } from "../../../actions/fcmActions";
import { checkProcedureStatus } from "../../../helpers/fcmUtilities";
import { fcmPackageStatusTypes, fcmPackagesTypes, fcmStepTypes } from "../../../types/types";
import { FcmPackageSummary } from "../components/FcmPackageSummary";
import { FcmStepper } from "../components/FcmStepper";

const defaultStep = {
  stepLabel: "Propietario del padre",
  stepType: fcmStepTypes.fcmPartnerStep,
  dataId: null,
  stepData: null,
  needsConfirmation: false,
  stepFromOrigin: null,
};

const initialFcmPackage = {
  steps: [],
  activeStep: 0,
  completedSteps: { 0: false },
  procedures: [],
  documentation: [],
  status: fcmPackageStatusTypes.filling,
  creator: "",
  creationDate: new Date(),
};

const initialFcmPackagePedigree = {
  ...initialFcmPackage,
  steps: [
    {
      ...defaultStep,
      stepLabel: "Propietario del padre",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Propietario de la madre",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Padre de la camada",
      stepType: fcmStepTypes.fcmDogStep,
      props: { label: "Padre de la camada" },
    },
    {
      ...defaultStep,
      stepLabel: "Madre de la camada",
      stepType: fcmStepTypes.fcmDogStep,
    },
    {
      ...defaultStep,
      stepLabel: "Formato de cruza",
      stepType: fcmStepTypes.fcmBreedingStep,
    },
    {
      ...defaultStep,
      stepLabel: "Resumen",
      stepType: fcmStepTypes.fcmSummaryStep,
    },
  ],
};

const initialFcmPackageInitialRacePurity = {
  ...initialFcmPackage,
  steps: [
    {
      ...defaultStep,
      stepLabel: "Datos del propietario",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Datos del perro",
      stepType: fcmStepTypes.fcmNewDogStep,
    },
    {
      ...defaultStep,
      stepLabel: "Resumen",
      stepType: fcmStepTypes.fcmSummaryStep,
    },
  ],
};

const initialFcmPackagePartnerShip = {
  ...initialFcmPackage,
  steps: [
    {
      ...defaultStep,
      stepLabel: "Datos del socio",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Resumen",
      stepType: fcmStepTypes.fcmSummaryStep,
    },
  ],
};

const initialFcmPackageTransfer = {
  ...initialFcmPackage,
  steps: [
    {
      ...defaultStep,
      stepLabel: "Datos del propietario",
      stepType: fcmStepTypes.fcmPartnerStep,
    },
    {
      ...defaultStep,
      stepLabel: "Datos del perro",
      stepType: fcmStepTypes.fcmDogStep,
      props: { label: "Datos del perro" },
    },
    {
      ...defaultStep,
      stepLabel: "Resumen",
      stepType: fcmStepTypes.fcmSummaryStep,
    },
  ],
};

export const FcmProcedureLayout = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fcmPackage } = useSelector((state) => state.fcm);
  const [fcmPackageType, setFcmPackageType] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const { steps, activeStep, completedSteps, status } = fcmPackage;
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);

  /*************************************************************************************************** */
  /**************************Use effects  *****************************************************/
  /*************************************************************************************************** */
  // #region

  useEffect(() => {
    !id && fcmPackage.packageType && setFcmPackageType(fcmPackage.packageType);
  }, [fcmPackage]);

  useEffect(() => {
    const executeAsync = async () => {
      console.log("use effect", { id, fcmPackageType, ...fcmPackage });
      await dispatch(startLoadingAllFcm());
      if (id) {
        await dispatch(startLoadingFcmPackage(id));

        setisLoading(false);
      } else {
        if (fcmPackageType) {
          if (fcmPackageType === fcmPackagesTypes.PEDIGREE || fcmPackageType === fcmPackagesTypes.RACEPURITY) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackagePedigree }));
          }

          if (
            fcmPackageType === fcmPackagesTypes.INITIALRACEPURITY ||
            fcmPackageType === fcmPackagesTypes.INITIALREGISTER ||
            fcmPackageType === fcmPackagesTypes.CONTESTCERTIFICATE
          ) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackageInitialRacePurity }));
          }
          if (fcmPackageType === fcmPackagesTypes.PARTNERSHIP) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackagePartnerShip }));
          }
          if (fcmPackageType === fcmPackagesTypes.TRANSFER) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackageTransfer }));
          }

          setisLoading(false);
        }
      }
    };
    executeAsync();
  }, [fcmPackageType]);

  useEffect(() => {
    setIsAlreadyReviewed(!(status === fcmPackageStatusTypes.filling || status === fcmPackageStatusTypes.sentByClient));
  }, [status]);

  // #endregion
  console.log("is already reviewed", isAlreadyReviewed);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isAlreadyReviewed) {
    return <FcmPackageSummary />;
  }

  return <FcmStepper />;
};
