// 367

import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import {
  fireSwalSuccess,
  fireSwalError,
  formatDatePropertyJustDate,
} from "../helpers/utilities";
import { types } from "../types/types";
import { authLogin, startChecking } from "./authActions";

// export const allclientsStartLoading = () => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(clientsIsLoading());
//       let resp = await fetchConToken(`clients/`);
//       let body = await resp.json();

//       let allclients = body.allclients;

//       formatDatePropertyJustDate(allclients, "creationDate");
//       formatDatePropertyJustDate(allclients, "lastUpdateDate");
//       if (body.ok) {
//         dispatch(allclientsLoaded(body.allclients));
//       }
//     } catch (error) {
//       console.log(error);
//       fireSwalError(error.message);
//     }
//     dispatch(clientsFinishedLoading());
//   };
// };

export const clientStartLoading = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(clientsIsLoading());
      let resp = await fetchConToken(`users/${id}`);
      let body = await resp.json();

      let data = body.user;

      if (body.ok) {
        dispatch(clientLoaded(data));
      }
    } catch (error) {
      console.log(error);
      fireSwalError(error.message);
    }
    dispatch(clientsFinishedLoading());
  };
};

const clientsIsLoading = () => ({
  type: types.clientsIsLoading,
});

const clientsFinishedLoading = () => ({
  type: types.clientsFinishedLoading,
});

const clientLoaded = (data) => {
  return {
    type: types.clientLoaded,
    payload: data,
  };
};

// const allclientsLoaded = (data) => {
//   return {
//     type: types.allclientsLoaded,
//     payload: data,
//   };
// };

export const clientsUpdate = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`clients/${object._id}`, object, "PUT");
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: true,
        });
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

// todo
export const createclients = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`clients/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        fireSwalSuccess(body.msg);
        return true;
      } else {
        fireSwalError(body.msg);
        return false;
      }
    } catch (error) {
      fireSwalError(error.message);
      return false;
    }
  };
};

export const updateClientReducer = (data) => ({
  type: types.updateClientReducer,
  payload: data,
});
