// 366

import { FcmStepperDogSelector } from "../pages/clientsPages/FcmStepperDogSelector";
import { FcmStepperPartnerSelector } from "../pages/clientsPages/FcmStepperPartnerSelector";
import { types } from "../types/types";

const initialState = {
  // client: {},
  fcmsIsLoading: true,
  fcmPartners: [],
  fcmDogs: [],
  fcmPackage: {
    steps: [
      {
        label: "Propietario del padre",
        component: <FcmStepperPartnerSelector label="Propietario del padre" />,
      },
      {
        label: "Propietario de la madre",
        component: (
          <FcmStepperPartnerSelector label="Propietario de la madre" />
        ),
      },
      {
        label: "Padre camada",
        component: <FcmStepperDogSelector label="Padre de la camada" />,
      },
      {
        label: "Madre camada",
        component: <FcmStepperDogSelector label="Madre de la camada" />,
      },
    ],
    procedures: [],
    activeStep: 0,
    skippedSteps: new Set(),
    completedSteps: {},
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

    default:
      return state;
  }
};
