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
import { FcmTransferFormikNew } from "../pages/clientsPages/FcmTransferFormikNew";
import { FcmTransferFormWrapper } from "../pages/clientsPages/FcmTransferFormWrapper";
import { fcmStepTypes } from "../types/types";
import { isObjectEmpty } from "./utilities";

export const isLastStep = (activeStep, steps) => {
  return activeStep === steps.length - 1;
};

export const areAllStepsCompleted = (completedSteps, steps) => {
  return totalCompletedSteps(completedSteps) === steps.length;
};

export const totalCompletedSteps = (completedSteps) => {
  return Object.keys(completedSteps).length;
};

export const checkIfStepsAreCompleted = (
  completedSteps = {},
  stepsToCheck = []
) => {
  let areCompleted = true;
  stepsToCheck.map((element) => {
    if (!completedSteps[element]) {
      areCompleted = false;
    }
  });
  return areCompleted;
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

export const getGeneralData = (fcmPackage, client) => {
  const {
    fatherOwnerId,
    motherOwnerId,
    dogFatherId,
    dogMotherId,
    breedingForm,
  } = fcmPackage;

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
  const fatherOwnerFcm = client.linkedFcmPartners.find(
    (element) => element._id === fatherOwnerId
  );
  const motherOwnerFcm = client.linkedFcmPartners.find(
    (element) => element._id === motherOwnerId
  );
  const dogFatherFcm = client.linkedDogs.find(
    (element) => element._id === dogFatherId
  );
  const dogMotherFcm = client.linkedDogs.find(
    (element) => element._id === dogMotherId
  );

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
  if (!isObjectEmpty(breedingForm)) {
    generalData.puppies = [...breedingForm.puppies];
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
