// 366

import { types } from "../types/types";

const initialState = {
  collaborators: [
    // {
    //   id: new Date().getTime(),
    //   title: "Mi primer evento",
    //   start: moment().toDate(),
    //   end: moment().add(2, "hours").toDate(),
    //   bgcolor: "#fafafa",
    //   notes: "Una nota del evento",
    //   user: {
    //     uid: 123,
    //     name: "JGG",
    //   },
    // },
  ],
  activeCollaborator: null,
};

export const collaboratorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.collaboratorsLoaded:
      return {
        ...state,
        collaborators: [...action.payload],
      };

    case types.collaboratorSetActive:
      return {
        ...state,
        activeCollaborator: action.payload,
      };

    case types.collaboratorUpdate:
      return {
        ...state,
        activeCollaborator: action.payload,
      };

    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authLogout:
      return {
        checking: false,
      };

    default:
      return state;
  }
};
