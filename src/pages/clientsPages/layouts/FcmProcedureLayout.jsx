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
  activeStep: 0,
  completedSteps: { 0: false },
  procedures: [],
  documentation: [],
  status: null,
  creator: "",
  creationDate: new Date(),
  // todo: delete
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
      await dispatch(startLoadingAllFcm());
      if (id) {
        // todo: change. check the package in
        await dispatch(startLoadingFcmPackage(id));
      } else {
        await dispatch(setFcmPackage({ ...fcmPackage, initialFcmPackage }));
      }
      setisLoading(false);
    };
    executeAsync();
  }, []);

  console.log({ id, fcmPackageType, ...fcmPackage });

  if (fcmPackageType === fcmPackagesTypes.RACEPURITY) {
    return <FcmStepper />;
  }

  return <Fragment>{}</Fragment>;
};
