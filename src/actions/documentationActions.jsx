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

export const allDocumentationStartLoading = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(documentationIsLoading());
      let resp = await fetchConToken(`documentation/`);
      let body = await resp.json();

      let allDocumentation = body.allDocumentation;

      formatDatePropertyJustDate(allDocumentation, "creationDate");
      formatDatePropertyJustDate(allDocumentation, "lastUpdateDate");
      if (body.ok) {
        dispatch(allDocumentationLoaded(body.allDocumentation));
      }
    } catch (error) {
      console.log(error);
      fireSwalError(error.message);
    }
    dispatch(documentationFinishedLoading());
  };
};

const documentationIsLoading = () => ({
  type: types.documentationIsLoading,
});

const documentationFinishedLoading = () => ({
  type: types.documentationFinishedLoading,
});

const allDocumentationLoaded = (data) => {
  return {
    type: types.allDocumentationLoaded,
    payload: data,
  };
};

export const documentationUpdate = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `documentation/${object._id}`,
        object,
        "PUT"
      );
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
export const createDocumentation = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`documentation/`, object, "POST");
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
