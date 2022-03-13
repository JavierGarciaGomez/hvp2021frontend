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
  // step: {label, componentName, props, stepFromOrigin, dataId, config {isFirstRegister, packageProperty, isEditable, formTitle, showCancel, needsConfirmation}},
  fcmsIsLoading: true,
  fcmPartners: [],
  fcmDogs: [],
  fcmPackage: {
    steps: [
      {
        label: "Propietario del padre",
        componentName: "FcmStepperPartnerSelector",
        props: { label: "Propietario del padre" },
        dataId: null,
        config: {
          ...defaultConfig,
          packageProperty: "fatherOwnerId",
          formTitle: "Identificación de socio",
        },
      },
      {
        label: "Propietario de la madre",
        componentName: "FcmStepperPartnerSelector",
        props: { label: "Propietario de la madre" },
        dataId: null,
        config: {
          ...defaultConfig,
          packageProperty: "motherOwnerId",
          formTitle: "Identificación de socio",
        },
      },
      {
        label: "Padre de la camada",
        componentName: "FcmStepperDogSelector",
        props: { label: "Padre de la camada" },
        dataId: null,
        config: {
          ...defaultConfig,
          packageProperty: "dogFatherId",
          formTitle: "Identificación del perro",
        },
      },
      {
        label: "Madre camada",
        componentName: "FcmStepperDogSelector",
        props: { label: "Madre de la camada" },
        dataId: null,
        config: {
          ...defaultConfig,
          packageProperty: "dogMotherId",
          formTitle: "Identificación del perro",
        },
      },
      {
        label: "Formato de cruza",
        componentName: "FcmBreedingFormik",
        props: { label: "Formato de cruza" },
        dataId: null,
        config: {
          ...defaultConfig,
          formTitle: "Formato de cruza",
        },
      },
      {
        label: "Resumen",
        componentName: "FcmPackageSummary",
        props: { label: "Resumen" },
        dataId: null,
        config: {
          ...defaultConfig,
          formTitle: "Identificación de socio",
        },
      },
    ],
    procedures: [],
    activeStep: 0,
    skippedSteps: new Set(),
    completedSteps: { 0: false },
    currentProps: {
      isFirstRegister: false,
      packageProperty: "",
      isEditable: true,
      formTitle: "Llena el formulario",
      showCancel: false,
      needsConfirmation: false,
    },

    fatherFcm: {},
    motherFcm: {},
    fatherDogFcm: {},
    motherDogFcm: {},
    fatherOwnerId: "",
    motherOwnerId: "",
    dogFatherId: "",
    dogMotherId: "",
    breedingForm: {},
    extraSteps: [],
    documentation: [],
    status: "",
    creator: "",
  },
};

export const fcmReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
