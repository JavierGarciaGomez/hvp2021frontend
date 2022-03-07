// 366

import { types } from "../types/types";

const initialState = {
  // client: {},
  fcmsIsLoading: true,
  fcmPartners: [],
  fcmPackage: {
    procedures: [],
  },
};

export const fcmReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.fcmsIsLoading:
      return { ...state, fcmsIsLoading: true };

    case types.fcmsFinishedLoading:
      return { ...state, fcmsIsLoading: false };

    case types.fcmPartnersLoaded:
      return { ...state, fcmPartners: action.payload, fcmsIsLoading: false };

    case types.fcmSetPackage: {
      return { ...state, fcmPackage: action.payload };
    }

    default:
      return state;
  }
};

export const includeInCollectionIfDoesntExist = (collection, object) => {
  let alreadyExists = false;
  collection.map((element) => {
    if (element._id === object._id) {
      alreadyExists = true;
    }
  });
  if (!alreadyExists) {
    collection.push(object);
  }
  return collection;
};
