// 366

import { types } from "../types/types";

const initialState = {
  client: {},
  clientsIsLoading: true,
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.clientsIsLoading:
      console.log("is loading");
      return { ...state, clientsIsLoading: true };

    case types.clientsFinishedLoading:
      console.log("finished loading");
      return { ...state, clientsIsLoading: false };

    case types.clientLoaded:
      return { ...state, client: action.payload };

    default:
      return state;
  }
};
