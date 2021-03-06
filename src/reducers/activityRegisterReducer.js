// 366

import { types } from "../types/types";

const initialState = {
  allActivityRegisters: [],
  activeColRegisters: [],
  activeRegister: [],
  currentRegister: {},
  lastActivityRegister: {},
  // todo: isItNeedIt?
  isLoadingAcitivityRegisters: true,
  activityRegisterTypes: [],
};

export const activityRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.colActivityRegistersLoaded:
      return {
        ...state,
        activeColRegisters: action.payload,
      };

    case types.activityRegisterIsLoading: {
      return { ...state, isLoadingAcitivityRegisters: true };
    }

    case types.activityRegisterFinishedLoading: {
      return { ...state, isLoadingAcitivityRegisters: false };
    }

    case types.setCurrentActivityRegister: {
      return { ...state, currentRegister: action.payload };
    }

    case types.setLastActivityRegister: {
      return { ...state, lastActivityRegister: action.payload };
    }

    case types.setActiveActivityRegister: {
      return { ...state, activeRegister: action.payload };
    }

    case types.activityTypesLoaded: {
      return { ...state, activityRegisterTypes: action.payload };
    }

    case types.allActivityRegistersLoaded: {
      return { ...state, allActivityRegisters: action.payload };
    }

    default:
      return state;
  }
};
