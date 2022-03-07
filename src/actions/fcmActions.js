import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import {
  fireSwalError,
  fireSwalSuccess,
  isStepSkipped,
  replaceElementInCollection,
} from "../helpers/utilities";
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
        client.linkedFcmPartners = replaceElementInCollection(
          object,
          client.linkedFcmPartners
        );
        dispatch(updateClientReducer({ ...client }));
        fireSwalSuccess(body.msg);
        return body.updatedData._id;
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

export const setFcmPackageStep = (step) => ({
  type: types.fcmPackageSetStep,
  payload: step,
});

export const setFcmPackageSkipped = (object) => ({
  type: types.fcmPackageSetSkipped,
  payload: object,
});

export const handleNext = () => {
  return async (dispatch, getState) => {
    let newSkipped = getState().fcm.fcmPackage.skippedSteps;
    let activeStep = getState().fcm.fcmPackage.activeStep;

    if (isStepSkipped(newSkipped, activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    // set active step to 2
    dispatch(setFcmPackageStep(activeStep + 1));

    // set the new skipped
    dispatch(setFcmPackageSkipped(newSkipped));
  };
};

export const handleBack = () => {
  return async (dispatch, getState) => {
    console.log("***************solo quiero probar que esto acá", getState());
    let activeStep = getState().fcm.fcmPackage.activeStep;
    dispatch(setFcmPackageStep(activeStep - 1));
  };
};

export const setFcmPackageProp = (propertyName, value) => {
  return async (dispatch, getState) => {
    let fcmPackage = getState().fcm.fcmPackage;
    fcmPackage[propertyName] = value;
    return { type: types.fcmSetPackage, payload: { ...fcmPackage } };
  };
};

export const setFcmPackageNeedsConfirmation = (boolean) => ({
  type: types.fcmPackageCurPropNeedsConfirmation,
  payload: boolean,
});

export const setFcmPackageProperty = (value) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { packageProperty } = fcmPackage.currentProps;
    fcmPackage[packageProperty] = value;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};
