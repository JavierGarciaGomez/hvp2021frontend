import { fcmPackageStatusTypes, types } from "../types/types";

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
    status: fcmPackageStatusTypes.filling,
    creator: "",
    packageType: "",
    creationDate: "",
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
          steps: state.fcmPackage.steps.map((element, index) => (index === state.fcmPackage.activeStep ? action.payload : element)),
        },
      };
    }

    case types.fcmSetStepProperties: {
      return {
        ...state,
        fcmPackage: { ...state.fcmPackage, steps: action.payload },
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

    case types.fcmPackageSetType:
      return { ...state, fcmPackage: { ...state.fcmPackage, packageType: action.payload } };

    default:
      return state;
  }
};
