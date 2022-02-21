// 366

import { types } from "../types/types";

const initialState = {
  allMisc: [],
  activeMisc: {},
  isLoadingMisc: true,
};

export const miscReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.miscLoaded:
      return {
        ...state,
        allMisc: action.payload,
      };

    case types.miscStartLoading: {
      return { ...state, isLoadingMisc: true };
    }

    case types.miscFinishedLoading: {
      return { ...state, isLoadingMisc: false };
    }

    default:
      return state;
  }
};
