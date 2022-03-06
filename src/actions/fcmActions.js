import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { fireSwalError, fireSwalSuccess } from "../helpers/utilities";
import { types } from "../types/types";
import { clientStartLoading, updateClientReducer } from "./clientsActions";

// todo
export const createFcmPartner = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcm/partners/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        const client = getState().clients.client;
        client.linkedFcmPartners.push(body.saved);
        dispatch(updateClientReducer({ ...client }));

        fireSwalSuccess(body.msg);
        return body.saved._id;
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

export const startLoadingFcmPartners = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fcmIsLoading());
      let resp = await fetchConToken(`fcm/partners/`);
      let body = await resp.json();

      if (body.ok) {
        dispatch(fcmPartnersLoaded(body.allFcmPartners));
      }
    } catch (error) {
      console.log(error);
      fireSwalError(error.message);
    }
    dispatch(fcmFinishedLoading());
  };
};

export const fcmIsLoading = () => ({
  type: types.fcmsIsLoading,
});

export const fcmFinishedLoading = () => ({
  type: types.fcmsFinishedLoading,
});

export const fcmPartnersLoaded = (data) => ({
  type: types.fcmPartnersLoaded,
  payload: data,
});

export const updateFcmPartner = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `fcm/partners/${object._id}`,
        object,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
        const client = getState().clients.client;
        client.linkedFcmPartners.push(body.saved);
        dispatch(updateClientReducer({ ...client }));
        fireSwalSuccess(body.msg);
        return body.saved._id;
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

export const setFcmPackage = (object) => ({
  type: types.fcmSetPackage,
  payload: object,
});
