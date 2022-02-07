// 366

import { types } from "../types/types";

const initialState = {
  collaboratorLogs: [],
  userLogs: [],
  isLoadingLogs: true,
};

export const authLogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogsLoaded:
      return {
        ...state,
        userLogs: [...action.payload.userLogs],
        collaboratorLogs: [...action.payload.collaboratorLogs],
        isLoadingLogs: false,
      };

    case types.authLogsIsLoading:
      return {
        ...state,
        isLoadingLogs: true,
      };

    case types.authLogsFinishedLoading:
      return {
        ...state,
        isLoadingLogs: false,
      };

    default:
      return state;
  }
};
