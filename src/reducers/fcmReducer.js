// 366

import { FcmBreedingFormik } from "../pages/clientsPages/FcmBreedingFormik";
import { FcmStepperDogSelector } from "../pages/clientsPages/FcmStepperDogSelector";
import { FcmStepperPartnerSelector } from "../pages/clientsPages/FcmStepperPartnerSelector";
import { types } from "../types/types";

const defaultConfig = {
  isFirstRegister: false,
  isCardLost: false,
  packageProperty: "",
  isEditable: true,
  formTitle: "Llena el formulario",
  showCancel: false,
  needsConfirmation: false,
};

const initialState = {
  allFcm: {
    allFcmPartners: [],
    allFcmDogs: [],
    allFcmTransfers: [],
    allFcmPackages: [],
  },
  fcmsIsLoading: true,
  fcmPartners: [],
  fcmDogs: [],

  fcmPackage: {
    steps: [],
    activeStep: 0,
    completedSteps: { 0: false },
    procedures: [],
    documentation: [],
    status: null,
    creator: "",
  },
};

export const fcmReducer = (state = initialState, action) => {
  switch (action.type) {
    // ALL
    case types.fcmUpdateAll:
      return { ...state, allFcm: action.payload };

    case types.fcmAllLoaded:
      return { ...state, allFcm: action.payload };

    // packages

    case types.fcmPackageUpdateStepReferences: {
      console.log("*****esto recibí", action.payload);
      return { ...state, fcmPackage: action.payload };
    }

    case types.fcmUpdatePackageProperty: {
      return { ...state, fcmPackage: action.payload };
    }

    // packages. steps
    case types.fcmSetActiveStepProperties: {
      return {
        ...state,
        fcmPackage: {
          ...state.fcmPackage,
          steps: state.fcmPackage.steps.map((element, index) =>
            index === state.fcmPackage.activeStep ? action.payload : element
          ),
        },
      };
    }

    case types.fcmsIsLoading:
      return { ...state, fcmsIsLoading: true };

    case types.fcmsFinishedLoading:
      return { ...state, fcmsIsLoading: false };

    case types.fcmPartnersLoaded:
      return { ...state, fcmPartners: action.payload, fcmsIsLoading: false };

    case types.fcmDogsLoaded:
      return { ...state, fcmDogs: action.payload, fcmsIsLoading: false };

    case types.fcmSetPackage: {
      console.log("***************esto he recibido", action);
      return { ...state, fcmPackage: action.payload };
    }

    case types.fcmPackageSetStep: {
      return {
        ...state,
        fcmPackage: {
          ...state.fcmPackage,
          activeStep: action.payload,
        },
      };
    }

    case types.fcmPackageSetSkipped: {
      return {
        ...state,
        fcmPackage: {
          ...state.fcmPackage,
          skippedSteps: action.payload,
        },
      };
    }

    case types.fcmPackageCurPropNeedsConfirmation: {
      return {
        ...state,
        fcmPackage: {
          ...state.fcmPackage,
          currentProps: {
            ...state.fcmPackage.currentProps,
            needsConfirmation: action.payload,
          },
        },
      };
    }

    case types.fcmPackageLoaded: {
      return {
        ...state,
        fcmPackage: action.payload,
        fcmsIsLoading: false,
      };
    }

    case types.fcmPackageUpdateProcedures: {
      return {
        ...state,
        fcmPackage: { ...state.fcmPackage, procedures: action.payload },
      };
    }

    default:
      return state;
  }
};
