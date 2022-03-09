import * as Yup from "yup";

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
