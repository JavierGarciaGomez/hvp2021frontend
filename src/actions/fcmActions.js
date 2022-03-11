import Swal from "sweetalert2";
import { areAllStepsCompleted, isLastStep } from "../helpers/fcmUtilities";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import {
  fireSwalError,
  fireSwalSuccess,
  isStepSkipped,
  replaceElementInCollection,
} from "../helpers/utilities";
import { types } from "../types/types";
import { clientStartLoading, updateClientReducer } from "./clientsActions";

/***************************************************************/
/**********************FCM PARTNER *****************************/
/***************************************************************/
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

/***************************************************************/
/**********************FCM DOGS    *****************************/
/***************************************************************/

export const createFcmDog = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcm/dogs/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        const client = getState().clients.client;
        client.linkedDogs.push(body.saved);
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

export const startLoadingFcmDogs = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fcmIsLoading());
      let resp = await fetchConToken(`fcm/dogs/`);
      let body = await resp.json();

      if (body.ok) {
        dispatch(fcmDogsLoaded(body.allDogs));
      }
    } catch (error) {
      console.log(error);
      fireSwalError(error.message);
    }
    dispatch(fcmFinishedLoading());
  };
};

export const fcmDogsLoaded = (data) => ({
  type: types.fcmDogsLoaded,
  payload: data,
});

export const updateFcmDog = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcm/dogs/${object._id}`, object, "PUT");
      const body = await resp.json();

      console.log("esta respuesta tengo", body);

      if (body.ok) {
        const client = getState().clients.client;

        client.linkedDogs = replaceElementInCollection(
          object,
          client.linkedDogs
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

/***************************************************************/
/**********************FcmTransfers    *****************************/
/***************************************************************/

export const createFcmtransfer = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcm/fcmTransfers/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        const client = getState().clients.client;
        client.linkedFcmTransfers.push(body.saved);
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

// export const startLoadingFcmtransfers = () => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(fcmIsLoading());
//       let resp = await fetchConToken(`fcm/fcmtransfers/`);
//       let body = await resp.json();

//       if (body.ok) {
//         dispatch(fcmtransfersLoaded(body.allFcmTransfers));
//       }
//     } catch (error) {
//       console.log(error);
//       fireSwalError(error.message);
//     }
//     dispatch(fcmFinishedLoading());
//   };
// };

// export const fcmtransfersLoaded = (data) => ({
//   type: types.fcmtransfersLoaded,
//   payload: data,
// });

export const updateFcmtransfer = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `fcm/fcmTransfers/${object._id}`,
        object,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
        const client = getState().clients.client;

        client.linkedFcmTransfers = replaceElementInCollection(
          object,
          client.linkedFcmTransfers
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

/***************************************************************/
/**********************FCM PACKAGES*****************************/
/***************************************************************/
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

export const handleNextFcmPackageStep = () => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const { activeStep, skippedSteps, steps, completedSteps } = fcmPackage;

    // It's the last step, but not all steps have been completed,
    // find the first step that hasnt been completed
    const newActiveStep =
      isLastStep(activeStep, steps) &&
      !areAllStepsCompleted(completedSteps, steps)
        ? steps.findIndex((step, i) => !(i in completedSteps))
        : activeStep + 1;

    console.log("99999999999999new active step", newActiveStep);

    // Todo: ¿Delete?
    if (isStepSkipped(skippedSteps, activeStep)) {
      skippedSteps = new Set(skippedSteps.values());
      skippedSteps.delete(activeStep);
    }
    // set active step to 2
    dispatch(setFcmPackageStep(newActiveStep));

    // Todo: ¿Delete?
    dispatch(setFcmPackageSkipped(skippedSteps));
  };
};

export const handleBackFcmPackageStep = () => {
  return async (dispatch, getState) => {
    console.log("***************solo quiero probar que esto acá", getState());
    let activeStep = getState().fcm.fcmPackage.activeStep;
    dispatch(setFcmPackageStep(activeStep - 1));
  };
};

export const handleFcmCompleteStep = () => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const { activeStep, completedSteps } = fcmPackage;
    const newCompletedSteps = completedSteps;
    newCompletedSteps[activeStep] = true;
    dispatch(setFcmPackageProp, "completedSteps", newCompletedSteps);
    dispatch(handleNextFcmPackageStep());
  };
};

export const setFcmCompletedSteps = (object) => {
  return async (dispatch, getState) => {
    dispatch(setFcmPackageProp("completedSteps", object));
  };
};

export const addFcmProcedure = (object) => {
  return async (dispatch, getState) => {
    let fcmPackage = getState().fcm.fcmPackage;
    let { procedures = [] } = fcmPackage;

    // check if procedure exists
    let newProcedures = [...procedures];
    let index = newProcedures.findIndex(
      (element) => element.step === object.step
    );
    // if exists. Replace it.
    if (index !== -1) {
      newProcedures[index] = object;
      // if not. Add it.
    } else {
      newProcedures.push(object);
    }
    dispatch(setFcmPackageProp("procedures", newProcedures));
  };
};

export const setFcmPackageProp = (propertyName, value) => {
  console.log("estoy acá 4", propertyName, value);
  return async (dispatch, getState) => {
    let fcmPackage = getState().fcm.fcmPackage;
    fcmPackage[propertyName] = value;
    console.log("estoy acá 5", fcmPackage);
    return { type: types.fcmSetPackage, payload: { ...fcmPackage } };
  };
};

export const setFcmPackageCurrentProps = (object) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    fcmPackage.currentProps = object;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};

export const setFcmPackageCurrentPropsProperty = (propertyName, value) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    fcmPackage.currentProps[propertyName] = value;
    dispatch(setFcmPackage({ ...fcmPackage }));
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

export const setFcmPackageEditable = (boolean) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;

    fcmPackage.currentProps.isEditable = boolean;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};

export const cleanFcmStep = () => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { activeStep, procedures, completedSteps, currentProps, steps } =
      fcmPackage;

    // search and remove procedures
    const newProcedures = procedures.filter(
      (element) => element.step !== activeStep
    );

    // search and remove steps
    const newSteps = steps.filter(
      (element) => element.stepFromOrigin !== activeStep
    );
    // search and remove completed steps
    const newCompletedSteps = { ...completedSteps };
    newCompletedSteps[activeStep] = false;
    // search and remove packageproperty
    const newFcmPackage = { ...fcmPackage };
    newFcmPackage[currentProps.packageProperty] = "";
    // new data set delete

    console.log("newSteps", newSteps, "steps", steps);

    newSteps[activeStep].dataId = null;
    newSteps[activeStep].config.isEditable = true;

    dispatch(
      setFcmPackage({
        ...newFcmPackage,
        procedures: newProcedures,
        completedSteps: newCompletedSteps,
        steps: newSteps,
      })
    );
  };
};

export const addNewFcmStep = (object) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps } = fcmPackage;
    const newSteps = [...steps];
    newSteps.push(object);
    console.log("estos son los nuevos steps", newSteps);
    dispatch(setFcmPackageProp("steps", newSteps));
  };
};

export const startLoadingFcmPackage = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fcmIsLoading());
      const resp = await fetchConToken(`fcm/fcmPackages/${id}`);
      const body = await resp.json();

      if (body.ok) {
        return dispatch(fcmPackageLoaded(body.data));
      } else {
        return fireSwalError(body.msg);
      }
    } catch (error) {
      return fireSwalError(error.message);
    }
  };
};

export const fcmPackageLoaded = (data) => ({
  type: types.fcmPackageLoaded,
  payload: data,
});

export const saveFcmPackage = () => {
  return async (dispatch, getState) => {
    try {
      const { fcmPackage } = getState().fcm;
      const resp = await fetchConToken(`fcm/fcmPackages/`, fcmPackage, "POST");
      const body = await resp.json();

      if (body.ok) {
        console.log("saved, LLegué acá, client", body.saved);
        const client = getState().clients.client;
        client.linkedFcmPackages.push(body.saved);
        dispatch(updateClientReducer({ ...client }));

        console.log(body.saved, body.saved._id);

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

export const updateFcmPackage = (id) => {
  return async (dispatch, getState) => {
    try {
      const { fcmPackage } = getState().fcm;
      const resp = await fetchConToken(
        `fcm/fcmPackages/${id}`,
        fcmPackage,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
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

export const setFcmBreedingForm = (values) => {
  return async (dispatch, getState) => {
    // const client = getState().clients.client;
    // dispatch(updateClientReducer({ ...client }));
    dispatch(setFcmPackageProp, "breedingForm", values);

    fireSwalSuccess("Éxito");
  };
};

export const setFcmCurrentStepEditable = (boolean) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    newSteps[activeStep].config.isEditable = boolean;
    fcmPackage.steps = newSteps;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};

export const setFcmCurrentStepDataId = (dataId) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    newSteps[activeStep].dataId = dataId;
    fcmPackage.steps = newSteps;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};

export const setFcmCurrentStepConfig = (data = {}) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    const newConfig = { ...newSteps[activeStep].config, ...data };
    newSteps[activeStep].config = { ...newConfig };
    console.log("new config", newConfig);
    fcmPackage.steps = newSteps;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};
