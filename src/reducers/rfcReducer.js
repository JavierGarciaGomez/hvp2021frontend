// 366

import { types } from "../types/types";

const initialState = {
  allRfc: [],
  activeRfc: null,
  rfcIsLoading: true,
};

export const rfcReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.rfcLoaded:
      return {
        ...state,
        allRfc: [...action.payload],
        rfcIsLoading: false,
      };

    case types.rfcIsLoading:
      return {
        ...state,
        rfcIsLoading: true,
      };

    default:
      return state;
  }
};
