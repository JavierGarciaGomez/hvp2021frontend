// 366

import { types } from "../types/types";

const initialState = {
  // client: {},
  fcmsIsLoading: true,
  fcmPartners: [],
  fcmPackage: {
    procedures: [],
    activeStep: 0,
    skippedSteps: new Set(),
    currentProps: {
      handleSetPackageData: () => {},
      setneedsConfirmation: () => {},
      isFirstRegister: false,
      packageProperty: "",
      isEditable: true,
      formTitle: "Agrega una identificación de socio.",
      showCancel: false,
      needsConfirmation: false,
    },
    fatherFcm: {},
    motherFcm: {},
    maleDogFcm: {},
    femaleDogFcm: {},
    fatherOwnerId: "",
    motherOwnerId: "",
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

    case types.fcmSetPackage: {
      console.log("esto he recibido", action);
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
