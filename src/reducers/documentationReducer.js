// 366

import { types } from "../types/types";

const initialState = {
  allDocumentation: [],
  isLoadingDocumentation: true,
};

export const documentationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.documentationIsLoading: {
      return { ...state, isLoadingDocumentation: true };
    }
    case types.documentationFinishedLoading: {
      return { ...state, isLoadingDocumentation: false };
    }
    case types.allDocumentationLoaded: {
      return { ...state, allDocumentation: action.payload };
    }
    default:
      return state;
  }
};
