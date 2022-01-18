// 366

import { types } from "../types/types";

const initialState = {
  dailyCleanUps: [],
  deepCleanUps: [],
  operatingRoomCleanUps: [],
  activeDailyCleanUp: null,
  activeDeepCleanUp: null,

  isLoadingDailyCleanUps: true,
  isLoadingDeepCleanUps: true,
  isLoadingOperatingRoomCleanUps: true,
};

export const cleanUpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.dailyCleanUpsIsLoading:
      return {
        ...state,
        isLoadingDailyCleanUps: true,
      };

    case types.dailyCleanUpsLoaded:
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
      return {
        ...state,
        deepCleanUps: [...action.payload],
        isLoadingDeepCleanUps: false,
      };

    case types.deepCleanUpsSetActive:
      return {
        ...state,
        activeDeepCleanUp: action.payload,
      };

    case types.operatingRoomCleanUpsIsLoading:
      return {
        ...state,
        isLoadingDailyCleanUps: true,
      };

    case types.operatingRoomCleanUpsLoaded:
      return {
        ...state,
        operatingRoomCleanUps: [...action.payload],
        isLoadingOperatingRoomCleanUps: false,
      };

    default:
      return state;
  }
};
