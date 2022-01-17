// 366

import { types } from "../types/types";

const initialState = {
  dailyCleanUps: [],
  deepCleanUps: [],
  activeDailyCleanUp: null,

  isLoadingDailyCleanUps: true,
  isLoadingDeepCleanUps: true,
};

export const cleanUpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.dailyCleanUpsIsLoading:
      return {
        ...state,
        isLoadingDailyCleanUps: true,
      };

    case types.dailyCleanUpsLoaded:
      console.log("action", action);
      return {
        ...state,
        dailyCleanUps: [...action.payload],
        isLoadingDailyCleanUps: false,
      };

    case types.deepCleanUpsIsLoading:
      return {
        ...state,
        isLoadingDeepCleanUps: true,
      };

    case types.deepCleanUpsLoaded:
      console.log("action aca estamo", action);
      return {
        ...state,
        deepCleanUps: [...action.payload],
        isLoadingDeepCleanUps: false,
      };

    default:
      return state;
  }
};
