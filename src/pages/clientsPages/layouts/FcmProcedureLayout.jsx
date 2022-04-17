import { CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFcmPackage, startLoadingAllFcm, startLoadingFcmPackage } from "../../../actions/fcmActions";
import { fcmPackagesTypes, fcmStepTypes } from "../../../types/types";
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
  status: null,
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

const initialFcmPackageRacePurity = {
  ...initialFcmPackagePedigree,
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

export const FcmProcedureLayout = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fcmPackage } = useSelector((state) => state.fcm);
  const [fcmPackageType, setFcmPackageType] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    !id && fcmPackage.packageType && setFcmPackageType(fcmPackage.packageType);
  }, [fcmPackage]);

  useEffect(() => {
    const executeAsync = async () => {
      console.log("use effect", { id, fcmPackageType, ...fcmPackage });
      await dispatch(startLoadingAllFcm());
      if (id) {
        // todo: change. check the package in
        await dispatch(startLoadingFcmPackage(id));
      } else {
        if (fcmPackageType) {
          if (fcmPackageType === fcmPackagesTypes.PEDIGREE) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackagePedigree }));
          }
          if (fcmPackageType === fcmPackagesTypes.RACEPURITY) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackageRacePurity }));
          }
          if (fcmPackageType === fcmPackagesTypes.INITIALRACEPURITY) {
            await dispatch(setFcmPackage({ ...fcmPackage, ...initialFcmPackageInitialRacePurity }));
          }
          setisLoading(false);
        }
      }
    };
    executeAsync();
  }, [fcmPackageType]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <FcmStepper />;
};
