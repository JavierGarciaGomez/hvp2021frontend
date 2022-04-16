import dayjs from "dayjs";
import * as Yup from "yup";
import { FcmDogStepLayout } from "../pages/clientsPages/components/FcmDogStepLayout";
import { FcmPackageSummary } from "../pages/clientsPages/components/FcmPackageSummary";
import { FcmPartnerStepLayout } from "../pages/clientsPages/components/FcmPartnerStepLayout";
import { FcmSelectPartnerOptions } from "../pages/clientsPages/components/FcmSelectPartnerOptions";
import { FcmTransferPuppy } from "../pages/clientsPages/components/FcmTransferPuppy";
import { FcmTransferStepLayout } from "../pages/clientsPages/components/FcmTransferStepLayout";
import { FcmBreedingFormik } from "../pages/clientsPages/FcmBreedingFormik";
import { FcmStepperDogSelector } from "../pages/clientsPages/FcmStepperDogSelector";
import { FcmStepperPartnerSelector } from "../pages/clientsPages/FcmStepperPartnerSelector";
import { FcmTransferFormik } from "../pages/clientsPages/FcmTransferFormik";

import { FcmTransferFormWrapper } from "../pages/clientsPages/FcmTransferFormWrapper";
import { fcmPackageStatusTypes, fcmStepTypes } from "../types/types";

import { isObjectEmpty, objectContainsObjectProperties } from "./utilities";

export const isLastStep = (activeStep, steps) => {
  return activeStep === steps.length - 1;
};

export const areAllStepsCompleted = (completedSteps, steps) => {
  const completedStepsValues = Object.values(completedSteps);
  const amountCompletedSteps = completedStepsValues.reduce((prevValue, curValue) => curValue && prevValue++);

  return steps.length === amountCompletedSteps;
};

export const totalCompletedSteps = (completedSteps) => {
  return Object.keys(completedSteps).length;
};

export const checkIfStepsAreCompleted = (completedSteps = {}, stepsToCheck = []) => {
  let areCompleted = true;
  stepsToCheck.map((element) => {
    if (!completedSteps[element]) {
      areCompleted = false;
    }
  });
  return areCompleted;
};

export const generatePuppiesValues = (values = {}, registersAmount = 0) => {
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

export const generatePuppiesValidationParams = (validationParams = {}, registersAmount = 0) => {
  const newValidationParams = { ...validationParams };
  for (let i = registersAmount + 1; i <= 14; i++) {
    delete newValidationParams[`puppyName${i}`];
    delete newValidationParams[`puppySex${i}`];
    delete newValidationParams[`puppyColor${i}`];
    delete newValidationParams[`puppyNeedsTransfer${i}`];
  }

  for (let i = 1; i <= registersAmount; i++) {
    if (!newValidationParams[`puppyName${i}`]) {
      newValidationParams[`puppyName${i}`] = Yup.string().trim().required("Es obligatorio");
    }
    if (!newValidationParams[`puppySex${i}`]) {
      newValidationParams[`puppySex${i}`] = Yup.string().trim().required("Es obligatorio");
    }
    if (!newValidationParams[`puppyColor${i}`]) {
      newValidationParams[`puppyColor${i}`] = Yup.string().trim().required("Es obligatorio");
    }
    if (!newValidationParams[`puppyNeedsTransfer${i}`]) {
      newValidationParams[`puppyNeedsTransfer${i}`] = Yup.boolean().required("Es obligatorio");
    }
  }

  return newValidationParams;
};

export const getComponent = (stepType, props) => {
  switch (stepType) {
    case fcmStepTypes.fcmPartnerStep:
      return <FcmPartnerStepLayout />;

    case fcmStepTypes.fcmDogStep:
      return <FcmDogStepLayout />;

    case fcmStepTypes.fcmBreedingStep:
      return <FcmBreedingFormik {...props} />;

    case fcmStepTypes.fcmBreedingStep:
      return <FcmBreedingFormik {...props} />;

    case fcmStepTypes.fcmTransferStep:
      return <FcmTransferStepLayout {...props} />;

    case fcmStepTypes.fcmSummaryStep:
      return <FcmPackageSummary />;

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

export const getTransferStepLabel = (activeStep, puppyName) => {
  if (activeStep === 2) {
    return "Transferencia del padre";
  }
  if (activeStep === 3) {
    return "Transferencia de la madre";
  }
  if (activeStep === 4) {
    return `Transferencia de ${puppyName}`;
  }
};

export const checkIfPreviousStepsAreFilled = (fcmPackage, activeStep) => {
  const { steps, fatherOwnerId, motherOwnerId, dogFatherId, dogMotherId } = fcmPackage;
  const { stepFromOrigin } = steps[activeStep];

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

export const getGeneralData = (fcmPackage, client, allFcm) => {
  const { fatherOwnerId, motherOwnerId, dogFatherId, dogMotherId, breedingForm, steps } = fcmPackage;

  const generalData = {
    fatherOwnerFullName: "",
    fatherOwnerPartnerNum: "",
    motherOwnerFullName: "",
    motherOwnerPartnerNum: "",
    fatherFcmDogName: "",
    fatherFcmDogRegisterNum: "",
    motherFcmDogName: "",
    motherFcmDogRegisterNum: "",
    puppies: [],
  };
  const fatherOwnerFcm = steps[0].stepData;
  const motherOwnerFcm = steps[1].stepData;
  const dogFatherFcm = steps[2].stepData;
  const dogMotherFcm = steps[3].stepData;

  if (fatherOwnerFcm) {
    generalData.fatherOwnerFullName = `${fatherOwnerFcm.firstName} ${fatherOwnerFcm.paternalSurname} ${fatherOwnerFcm.maternalSurname} `;
    generalData.fatherOwnerPartnerNum = fatherOwnerFcm.partnerNum;
  }
  if (motherOwnerFcm) {
    generalData.motherOwnerFullName = `${motherOwnerFcm.firstName} ${motherOwnerFcm.paternalSurname} ${motherOwnerFcm.maternalSurname} `;
    generalData.motherOwnerPartnerNum = motherOwnerFcm.partnerNum;
  }
  if (dogFatherFcm) {
    generalData.fatherFcmDogName = dogFatherFcm.petName;
    generalData.fatherFcmDogRegisterNum = dogFatherFcm.registerNum;
  }
  if (dogMotherFcm) {
    generalData.motherFcmDogName = dogMotherFcm.petName;
    generalData.motherFcmDogRegisterNum = dogMotherFcm.registerNum;
  }
  if (!isObjectEmpty(steps[4].stepData)) {
    generalData.puppies = [...steps[4].stepData.puppies];
  }

  return generalData;
};

export const getProcedures = (fcmPackage, client) => {
  const procedures = {
    partnersRegistrations: [],
    partnersRenewals: [],
    transfers: [],
    certificates: [],
  };

  return procedures;
};

export const insertOrUpdateProcedureById = (array = [], id, object) => {
  const index = array.findIndex((element) => element.dataId === id);

  index >= 0
    ? (array[index] = {
        ...object,
        stepFromOrigin: array[index].stepFromOrigin,
      })
    : array.push(object);
  return array;
};

export const removeProcedureByIdAndType = (array, data) => {
  return array.filter((element) => !objectContainsObjectProperties(element, data));
};

export const generateProcedureData = (fcmPackage) => {
  const { steps } = fcmPackage;

  let fcmPartnerSteps = steps.filter((step) => step.stepType === fcmStepTypes.fcmPartnerStep);

  let partnerRenewalsProcedures = [];
  fcmPartnerSteps.forEach((step) => {
    if (step.stepData?.expirationDate && dayjs(step.stepData?.expirationDate).isBefore(dayjs().add(14, "days")) && !partnerRenewalsProcedures.find((element) => element._id === step.dataId)) {
      partnerRenewalsProcedures.push({ ...step.stepData });
    }
  });

  let partnerRegistrationsProcedures = [];
  fcmPartnerSteps.forEach((step) => {
    if (step.stepData?.isPending && !partnerRegistrationsProcedures.find((element) => element._id === step.dataId)) {
      partnerRegistrationsProcedures.push({ ...step.stepData });
    }
  });

  let partnerResponsiveLetterProcedures = [];
  fcmPartnerSteps.forEach((step) => {
    if (step.stepData?.isCardLost && !partnerResponsiveLetterProcedures.find((element) => element._id === step.dataId)) {
      partnerResponsiveLetterProcedures.push({ ...step.stepData });
    }
  });

  // let partnerRenewalsProcedures = fcmPartnerSteps.filter(
  //   (step) =>
  //     step.stepData?.expirationDate &&
  //     dayjs(step.stepData?.expirationDate).isBefore(dayjs().add(14, "days"))
  // );

  let transfersProcedures = steps.filter((step) => step.stepType === fcmStepTypes.fcmTransferStep);

  let certificateProcedures = steps[4].stepData?.puppies ? [...steps[4].stepData.puppies] : [];

  return {
    partnerRegistrationsProcedures,
    partnerRenewalsProcedures,
    partnerResponsiveLetterProcedures,
    transfersProcedures,
    certificateProcedures,
  };
};

export const removeDuplicates = (array) => array.filter((element, index) => array.indexOf(element.stepData._id) === index);

export const removeDuplicatesByProperty = (array = [], propertyName) => {
  let countList = array.reduce((p, c) => {
    p[c[propertyName]] = (p[c[propertyName]] || 0) + 1;
    return p;
  });

  let result = array.filter((element) => countList[element[propertyName]] > 1);

  return result;
};

export const checkProcedureStatus = (requiredStatus, status) => {
  let authorizedStatus = [fcmPackageStatusTypes.concluded];

  if (requiredStatus === fcmPackageStatusTypes.concluded) {
    if (authorizedStatus.includes(status)) {
      return true;
    }
    return false;
  }

  authorizedStatus.push(fcmPackageStatusTypes.FcmReceived);
  if (requiredStatus === fcmPackageStatusTypes.FcmReceived) {
    if (authorizedStatus.includes(status)) {
      return true;
    }
    return false;
  }

  authorizedStatus.push(fcmPackageStatusTypes.fcmSent);
  if (requiredStatus === fcmPackageStatusTypes.fcmSent) {
    if (authorizedStatus.includes(status)) {
      return true;
    }
    return false;
  }

  authorizedStatus.push(fcmPackageStatusTypes.inspectionDone);
  if (requiredStatus === fcmPackageStatusTypes.inspectionDone) {
    if (authorizedStatus.includes(status)) {
      return true;
    }
    return false;
  }

  authorizedStatus.push(fcmPackageStatusTypes.preliminarilyReviewed);
  if (requiredStatus === fcmPackageStatusTypes.preliminarilyReviewed) {
    if (authorizedStatus.includes(status)) {
      return true;
    }
    return false;
  }

  authorizedStatus.push(fcmPackageStatusTypes.sentByClient);
  if (requiredStatus === fcmPackageStatusTypes.sentByClient) {
    if (authorizedStatus.includes(status)) {
      return true;
    }
    return false;
  }

  authorizedStatus.push(fcmPackageStatusTypes.filling);
  if (requiredStatus === fcmPackageStatusTypes.filling) {
    return true;
  }
};

export const checkValidParentsAge = (breedingDate, steps = []) => {
  console.log(steps);
  const fatherBirthDate = steps[2].stepData.birthDate;
  const motherBirthDate = steps[3].stepData.birthDate;
  console.log(breedingDate, fatherBirthDate, motherBirthDate);

  const checkIfParentIsLessThanYearsOld = (parentBirthDate) => {
    return dayjs(breedingDate).isBefore(dayjs(parentBirthDate).add(10, "years"));
  };

  const checkIfParentIsMoreThanOneYearOld = (parentBirthDate) => {
    return dayjs(parentBirthDate).isBefore(dayjs(breedingDate).subtract(1, "years"));
  };

  if (!checkIfParentIsLessThanYearsOld(fatherBirthDate)) {
    return false;
  }
  if (!checkIfParentIsLessThanYearsOld(motherBirthDate)) {
    return false;
  }
  if (!checkIfParentIsMoreThanOneYearOld(fatherBirthDate)) {
    return false;
  }
  if (!checkIfParentIsMoreThanOneYearOld(motherBirthDate)) {
    return false;
  }

  return true;
};
