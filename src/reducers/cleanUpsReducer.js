// 366

import { types } from "../types/types";

const initialState = {
  dailyCleanUps: [],
  activeDailyCleanUp: null,

  isLoadingDailyCleanUps: true,
};

export const cleanUpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.collaboratorIsLoading:
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

    default:
      return state;
  }
};
