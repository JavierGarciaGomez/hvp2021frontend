import * as Yup from "yup";
import { FcmBreedingFormik } from "../pages/clientsPages/FcmBreedingFormik";
import { FcmStepperDogSelector } from "../pages/clientsPages/FcmStepperDogSelector";
import { FcmStepperPartnerSelector } from "../pages/clientsPages/FcmStepperPartnerSelector";
import { FcmTransferFormik } from "../pages/clientsPages/FcmTransferFormik";

export const isLastStep = (activeStep, steps) => {
  return activeStep === steps.length - 1;
};

export const areAllStepsCompleted = (completedSteps, steps) => {
  return totalCompletedSteps(completedSteps) === steps.length;
};

export const totalCompletedSteps = (completedSteps) => {
  return Object.keys(completedSteps).length;
};

export const generatePuppiesValues = (values = {}, registersAmount = 0) => {
  console.log("******registers amount", registersAmount);
  const newValues = { ...values };
  for (let i = registersAmount + 1; i <= 14; i++) {
    delete newValues[`puppyName${i}`];
    delete newValues[`puppySex${i}`];
    delete newValues[`puppyColor${i}`];
    delete newValues[`puppyNeedsTransfer${i}`];
  }

  for (let i = 1; i <= registersAmount; i++) {
    if (!newValues[`puppyName${i}`]) {
      newValues[`puppyName${i}`] = "";
    }
    if (!newValues[`puppySex${i}`]) {
      newValues[`puppySex${i}`] = "";
    }
    if (!newValues[`puppyColor${i}`]) {
      newValues[`puppyColor${i}`] = "";
    }
    if (!newValues[`puppyNeedsTransfer${i}`]) {
      newValues[`puppyNeedsTransfer${i}`] = false;
    }
  }

  return newValues;
};

export const generatePuppiesValidationParams = (
  validationParams = {},
  registersAmount = 0
) => {
  const newValidationParams = { ...validationParams };
  for (let i = registersAmount + 1; i <= 14; i++) {
    delete newValidationParams[`puppyName${i}`];
    delete newValidationParams[`puppySex${i}`];
    delete newValidationParams[`puppyColor${i}`];
    delete newValidationParams[`puppyNeedsTransfer${i}`];
  }

  for (let i = 1; i <= registersAmount; i++) {
    if (!newValidationParams[`puppyName${i}`]) {
      newValidationParams[`puppyName${i}`] = Yup.string()
        .trim()
        .required("Es obligatorio");
    }
    if (!newValidationParams[`puppySex${i}`]) {
      newValidationParams[`puppySex${i}`] = Yup.string()
        .trim()
        .required("Es obligatorio");
    }
    if (!newValidationParams[`puppyColor${i}`]) {
      newValidationParams[`puppyColor${i}`] = Yup.string()
        .trim()
        .required("Es obligatorio");
    }
    if (!newValidationParams[`puppyNeedsTransfer${i}`]) {
      newValidationParams[`puppyNeedsTransfer${i}`] =
        Yup.boolean().required("Es obligatorio");
    }
  }

  return newValidationParams;
};

export const getComponent = (componentName, props) => {
  switch (componentName) {
    case "FcmStepperPartnerSelector":
      return <FcmStepperPartnerSelector {...props} />;

    case "FcmStepperDogSelector":
      return <FcmStepperDogSelector {...props} />;

    case "FcmBreedingFormik":
      return <FcmBreedingFormik {...props} />;

    case "FcmBreedingFormik":
      return <FcmBreedingFormik {...props} />;

    case "FcmTransferFormik":
      return <FcmTransferFormik {...props} />;

    default:
      return null;
  }
};

export const getFcmDogIdByOriginStep = (fcmPackage, activeStep) => {
  const { steps } = fcmPackage;
  const { stepFromOrigin } = steps[activeStep];

  switch (stepFromOrigin) {
    case 2:
      return fcmPackage.dogFatherId;

    case 3:
      return fcmPackage.dogMotherId;
  }
};

export const getFcmParterIdByOriginStep = (fcmPackage, activeStep) => {
  const { steps } = fcmPackage;
  const { stepFromOrigin } = steps[activeStep];

  switch (stepFromOrigin) {
    case 2:
      return fcmPackage.fatherOwnerId;

    case 3:
      return fcmPackage.motherOwnerId;

    case 4:
      return fcmPackage.motherOwnerId;
  }
};

export const getTransferStepLabel = (activeStep) => {
  if (activeStep === 2) {
    return "Transferencia del padre";
  }
  if (activeStep === 3) {
    return "Transferencia de la madre";
  }
};

export const checkIfPreviousStepsAreFilled = (fcmPackage, activeStep) => {
  const { steps, fatherOwnerId, motherOwnerId, dogFatherId, dogMotherId } =
    fcmPackage;
  const { stepFromOrigin } = steps[activeStep];

  console.log(
    "a ver",
    "padre ",
    fatherOwnerId,
    dogFatherId,
    "madre",
    motherOwnerId,
    dogMotherId
  );

  switch (stepFromOrigin) {
    case 2:
      if (!fatherOwnerId || !dogFatherId) {
        return false;
      }
      return fatherOwnerId !== "" && dogFatherId !== "";

    case 3:
      if (!motherOwnerId || !dogMotherId) {
        return false;
      }
      return motherOwnerId !== "" && dogMotherId !== "";
  }
};
