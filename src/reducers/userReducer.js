// 366

import { types } from "../types/types";

const initialState = {
  users: [],
  activeUser: null,
  isLoadingUsers: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.usersLoaded:
      return {
        ...state,
        users: [...action.payload],
        isLoadingUsers: false,
      };

    case types.usersIsLoading:
      return {
        ...state,
        isLoadingUsers: true,
      };

    case types.usersFinishedLoading:
      return {
        ...state,
        isLoadingUsers: false,
      };

    default:
      return state;
  }
};
