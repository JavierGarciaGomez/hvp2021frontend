import { types } from "../types/types";

export const toggleMenu = () => ({ type: types.dbUiMenuToggle });
export const setMenuState = (isMenuOpen) => ({
  type: types.dbUiSetMenuState,
  payload: isMenuOpen,
});

export const setSmallScreen = (isSmall) => ({
  type: types.dbUiIsSmallScreen,
  payload: isSmall,
});

export const setMenuView = (isMenuOpen, isSmallScreen) => {
  let value = "open";
  if (!isMenuOpen) {
    if (isSmallScreen) {
      value = "close";
    } else {
      value = "minimized";
    }
  }

  return { type: types.dbUiSetMenuView, payload: value };
};
