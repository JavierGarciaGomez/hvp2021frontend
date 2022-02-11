// 366

import { types } from "../types/types";

const initialState = {
  isMenuOpen: true,
  isSmallScreen: false,
  menuState: "open",
};

export const dbUiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.dbUiMenuToggle:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case types.dbUiSetMenuState:
      return {
        ...state,
        isMenuOpen: action.payload,
      };

    case types.dbUiIsSmallScreen:
      return {
        ...state,
        isSmallScreen: action.payload,
      };

    case types.dbUiSetMenuView:
      return {
        ...state,
        menuState: action.payload,
      };

    default:
      return state;
  }
};
