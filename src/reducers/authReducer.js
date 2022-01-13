// 366

import { types } from "../types/types";

const initialState = {
  checking: true,
  uid: null,
  col_code: null,
  role: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
        isAuthenticated: true,
      };

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authLogout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
