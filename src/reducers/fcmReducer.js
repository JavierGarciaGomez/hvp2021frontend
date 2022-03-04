// 366

import { types } from "../types/types";

const initialState = {
  // client: {},
  fcmsIsLoading: true,
  fcmPartners: [],
};

export const fcmReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.fcmsIsLoading:
      return { ...state, fcmsIsLoading: true };

    case types.fcmsFinishedLoading:
      return { ...state, fcmsIsLoading: false };

    case types.fcmPartnersLoaded:
      return { ...state, fcmPartners: action.payload, fcmsIsLoading: false };

    default:
      return state;
  }
};
