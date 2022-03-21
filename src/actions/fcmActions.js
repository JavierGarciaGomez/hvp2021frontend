import { ClassNames } from "@emotion/react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { array } from "yup";
import {
  removeArrayElementById,
  updateArrayElementById,
} from "../helpers/arrayUtilities";
import {
  areAllStepsCompleted,
  insertOrUpdateProcedureById,
  isLastStep,
  removeProcedureByIdAndType,
} from "../helpers/fcmUtilities";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import {
  fireSwalError,
  fireSwalSuccess,
  objectContainsObjectProperties,
  printAndFireError,
  replaceElementInCollection,
} from "../helpers/utilities";
import { fcmStepTypes, types } from "../types/types";
import {
  clientStartLoading,
  unlinkFcmDogFromClient,
  updateClientReducer,
} from "./clientsActions";
import { userRemoveFcmDog } from "./userActions";

/***************************************************************/
/***************************************************************/
/**********************USED ****** *****************************/
/***************************************************************/
/***************************************************************/

/***************************************************************/
/**********************COMMON *****************************/
/***************************************************************/
// USED
export const fcmIsLoading = () => ({
  type: types.fcmsIsLoading,
});

// USED
export const fcmFinishedLoading = () => ({
  type: types.fcmsFinishedLoading,
});
/***************************************************************/
/**********************ALL FCM *****************************/
/***************************************************************/

// USED
export const startLoadingAllFcm = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fcmIsLoading());
      let resp = await fetchConToken(`fcm/all/`);
      let body = await resp.json();

      if (body.ok) {
        dispatch(allFcmLoaded(body.allFcm));
      }
    } catch (error) {
      fireSwalError(error.message);
    }
    dispatch(fcmFinishedLoading());
  };
};

// USED
export const allFcmLoaded = (data) => ({
  type: types.fcmAllLoaded,
  payload: data,
});

export const updateAllFcm = (data) => ({
  type: types.fcmUpdateAll,
  payload: data,
});

/***************************************************************/
/**********************FCM PARTNER *****************************/
/***************************************************************/
export const createFcmPartner = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcm/partners/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        // update the data in client
        const client = getState().clients.client;
        if (client) {
          client.linkedFcmPartners.push(body.saved);
          dispatch(updateClientReducer({ ...client }));
        }

        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        const newAllFcmPartners = [...newAllFcm.allFcmPartners];

        newAllFcmPartners.push(body.saved);

        newAllFcm.allFcmPartners = newAllFcmPartners;
        dispatch(updateAllFcm(newAllFcm));

        fireSwalSuccess(body.msg);
        return body.saved;
      } else {
        fireSwalError(body.msg);
        return false;
      }
    } catch (error) {
      printAndFireError(error);
      return false;
    }
  };
};

// TODO: USED
export const updateFcmPartner = (object) => {
  return async (dispatch, getState) => {
    try {
      // fetch the update
      const resp = await fetchConToken(
        `fcm/partners/${object._id}`,
        object,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
        // update the data in client
        const client = getState().clients.client;
        if (client) {
          client.linkedFcmPartners = replaceElementInCollection(
            object,
            client.linkedFcmPartners
          );
          dispatch(updateClientReducer({ ...client }));
        }
        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        newAllFcm.allFcmPartners = updateArrayElementById(
          newAllFcm.allFcmPartners,
          object
        );
        dispatch(updateAllFcm(newAllFcm));

        fireSwalSuccess(body.msg);
        return body.updatedData;
      } else {
        fireSwalError(body.msg);
        return false;
      }
    } catch (error) {
      printAndFireError(error);

      return false;
    }
  };
};

export const deleteFcmPartner = (id) => {
  return async (dispatch, getState) => {
    try {
      // fetch the update
      const resp = await fetchConToken(`fcm/partners/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        newAllFcm.allFcmPartners = removeArrayElementById(
          newAllFcm.allFcmPartners,
          id
        );

        dispatch(updateAllFcm(newAllFcm));

        return fireSwalSuccess(body.msg);
      } else {
        fireSwalError(body.msg);
        return false;
      }
    } catch (error) {
      printAndFireError(error);
      return false;
    }
  };
};

/***************************************************************/
/**********************FCM DOGS    *****************************/
/***************************************************************/

export const createFcmDog = (object, fireSwal = true) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcm/dogs/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        // update the data in client
        const client = getState().clients.client;
        if (client) {
          client.linkedDogs.push(body.saved);
          dispatch(updateClientReducer({ ...client }));
        }

        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        const newAllFcmDogs = [...newAllFcm.allFcmDogs];
        newAllFcmDogs.push(body.saved);
        newAllFcm.allFcmDogs = newAllFcmDogs;
        dispatch(updateAllFcm(newAllFcm));

        fireSwal && fireSwalSuccess(body.msg);
        return body.saved;
      } else {
        fireSwal && fireSwalError(body.msg);
        return false;
      }
    } catch (error) {
      printAndFireError(error);
      return false;
    }
  };
};

export const updateFcmDog = (object) => {
  return async (dispatch, getState) => {
    try {
      // fetch the update
      const resp = await fetchConToken(`fcm/dogs/${object._id}`, object, "PUT");
      const body = await resp.json();

      if (body.ok) {
        // update the data in client

        const client = getState().clients.client;
        if (client) {
          client.linkedDogs = replaceElementInCollection(
            object,
            client.linkedDogs
          );
          dispatch(updateClientReducer({ ...client }));
        }

        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        newAllFcm.allFcmDogs = updateArrayElementById(
          newAllFcm.allFcmDogs,
          object
        );
        dispatch(updateAllFcm(newAllFcm));

        fireSwalSuccess(body.msg);
        return body.updatedData;
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

export const deleteFcmDog = (id, fireSwal = false) => {
  return async (dispatch, getState) => {
    try {
      // fetch
      const resp = await fetchConToken(`fcm/dogs/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        const newAllFcm = { ...getState().fcm.allFcm };
        newAllFcm.allFcmDogs = removeArrayElementById(newAllFcm.allFcmDogs, id);

        dispatch(updateAllFcm(newAllFcm));

        if (fireSwal) {
          fireSwalSuccess(body.msg);
        }
        return body.updatedData;
      } else {
        if (fireSwal) {
          fireSwalError(body.msg);
        }
        return false;
      }
    } catch (error) {
      if (fireSwal) {
        fireSwalError(error.message);
      }
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
        if (client) {
          client.linkedFcmTransfers.push(body.saved);
          dispatch(updateClientReducer({ ...client }));
        }

        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        const newAllFcmTransfers = [...newAllFcm.allFcmTransfers];
        newAllFcmTransfers.push(body.saved);
        newAllFcm.allFcmTransfers = newAllFcmTransfers;
        dispatch(updateAllFcm(newAllFcm));

        fireSwalSuccess(body.msg);
        return body.saved;
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
        if (client) {
          client.linkedFcmTransfers = replaceElementInCollection(
            object,
            client.linkedFcmTransfers
          );

          dispatch(updateClientReducer({ ...client }));
        }

        // update the data in allFCM
        const newAllFcm = { ...getState().fcm.allFcm };
        newAllFcm.allFcmTransfers = updateArrayElementById(
          newAllFcm.allFcmTransfers,
          object
        );
        dispatch(updateAllFcm(newAllFcm));

        fireSwalSuccess(body.msg);
        return body.updatedData;
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

export const deleteFcmTransfer = (id, fireSwal = false) => {
  return async (dispatch, getState) => {
    try {
      // fetch
      const resp = await fetchConToken(`fcm/fcmTransfers/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        const newAllFcm = { ...getState().fcm.allFcm };
        newAllFcm.allFcmTransfers = removeArrayElementById(
          newAllFcm.allFcmTransfers,
          id
        );

        dispatch(updateAllFcm(newAllFcm));

        if (fireSwal) {
          fireSwalSuccess(body.msg);
        }
        return body.updatedData;
      } else {
        if (fireSwal) {
          fireSwalError(body.msg);
        }
        return false;
      }
    } catch (error) {
      if (fireSwal) {
        fireSwalError(error.message);
      }
      return false;
    }
  };
};

/***************************************************************/
/**********************FCM PACKAGE *****************************/
/***************************************************************/

/**************CRUD*********************/

export const createFcmPackage = () => {
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

// USED
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

// USED
export const fcmPackageLoaded = (data) => ({
  type: types.fcmPackageLoaded,
  payload: data,
});

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

/**************HANDLING PACKAGES*********************/
export const updateFcmPackageProperty = (propertyName, value) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const newFcmPackage = { ...fcmPackage };
    newFcmPackage[propertyName] = value;

    dispatch({ type: types.fcmUpdatePackageProperty, payload: newFcmPackage });
  };
};

export const setFcmPackageStatus = (status) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const newFcmPackage = { ...fcmPackage };
    newFcmPackage.status = status;

    dispatch({ type: types.fcmUpdatePackageProperty, payload: newFcmPackage });
  };
};

export const updateStepReferences = (object) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const newFcmPackage = { ...fcmPackage };
    const { activeStep } = newFcmPackage;
    const { packageProperty } = newFcmPackage.currentProps;

    // todo: delete first and maybe second
    newFcmPackage[packageProperty] = object._id;
    newFcmPackage.steps[activeStep].dataId = object._id;
    newFcmPackage.steps[activeStep].stepData = object;

    dispatch({
      type: types.fcmPackageUpdateStepReferences,
      payload: newFcmPackage,
    });
  };
};

export const addAndRemoveFcmCertificatesProcedures = (puppy) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const newFcmPackage = { ...fcmPackage };
    const { procedures, activeStep, steps } = newFcmPackage;
    const currentStep = { ...steps[activeStep] };

    // remove previous procedures from the same step
    const newProcedures = procedures.filter(
      (element) => element.stepFromOrigin !== activeStep
    );

    newProcedures.push({
      stepFromOrigin: activeStep,
      type: "certificate",
      data: puppy,
      dataId: puppy._id,
    });
    dispatch(fcmPackageUpdateProcedures(newProcedures));
  };
};

export const addAndRemoveFcmTransfersProcedures = (fcmTransfer) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const newFcmPackage = { ...fcmPackage };
    const { procedures, activeStep, steps } = newFcmPackage;
    const currentStep = { ...steps[activeStep] };

    // remove previous procedures from the same step
    const newProcedures = procedures.filter(
      (element) => element.stepFromOrigin !== activeStep
    );

    newProcedures.push({
      stepFromOrigin: activeStep,
      type: "transfer",
      data: fcmTransfer,
      dataId: fcmTransfer._id,
    });
    dispatch(fcmPackageUpdateProcedures(newProcedures));
  };
};

export const addAndRemoveFcmPartnerProcedures = (stepData) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const newFcmPackage = { ...fcmPackage };
    const { procedures, activeStep, steps } = newFcmPackage;

    // remove previous procedures from the same step
    let newProcedures = procedures.filter(
      (element) => element.stepFromOrigin !== activeStep
    );

    // remove procedures with the same dataid
    // newProcedures = newProcedures.filter(
    //   (element) => element.dataId !== stepData._id
    // );

    stepData.isPending &&
      insertOrUpdateProcedureById(newProcedures, stepData._id, {
        stepFromOrigin: activeStep,
        type: "partnerRegistration",
        data: stepData,
        dataId: stepData._id,
      });

    // newProcedures.push({
    //   stepFromOrigin: activeStep,
    //   type: "partnerRegistration",
    //   data: stepData,
    //   dataId: stepData._id,
    // });

    dayjs(stepData.expirationDate).isBefore(dayjs().add(14, "days"))
      ? insertOrUpdateProcedureById(newProcedures, stepData._id, {
          stepFromOrigin: activeStep,
          type: "partnerRenewal",
          data: stepData,
          dataId: stepData._id,
        })
      : removeProcedureByIdAndType(newProcedures, {
          dataId: stepData._id,
          type: "partnerRenewal",
        });

    // newProcedures.push({
    //   stepFromOrigin: activeStep,
    //   type: "partnerRenewal",
    //   data: stepData,
    //   dataId: stepData._id,
    // });

    stepData.isPending &&
      insertOrUpdateProcedureById(newProcedures, stepData._id, {
        stepFromOrigin: activeStep,
        type: "responsiveLetter",
        data: stepData,
        dataId: stepData._id,
      });

    // stepData.isCardLost) {
    //   newProcedures.push({
    //     stepFromOrigin: activeStep,
    //     type: "responsiveLetter",
    //     data: stepData,
    //     dataId: stepData._id,
    //   });
    // }
    dispatch(fcmPackageUpdateProcedures(newProcedures));
  };
};

export const addAndRemoveFcmProcedures = (stepData) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const newFcmPackage = { ...fcmPackage };
    const { procedures, activeStep } = newFcmPackage;

    // remove previous procedures from the same step
    const newProcedures = procedures.filter(
      (element) => element.stepFromOrigin !== activeStep
    );

    if (activeStep === 0 || activeStep === 1) {
      if (stepData.isPending) {
        newProcedures.push({
          stepFromOrigin: activeStep,
          type: "partnerRegistration",
          data: stepData,
          dataId: stepData._id,
        });
      }

      if (dayjs(stepData.expirationDate).isBefore(dayjs().add(14, "days"))) {
        newProcedures.push({
          stepFromOrigin: activeStep,
          type: "partnerRenewal",
          data: stepData,
          dataId: stepData._id,
        });
      }
      if (stepData.isCardLost) {
        newProcedures.push({
          stepFromOrigin: activeStep,
          type: "responsiveLetter",
          data: stepData,
          dataId: stepData._id,
        });
      }
    }
    if (activeStep === 4) {
      stepData.puppies.map((element) => {
        newProcedures.push({
          stepFromOrigin: activeStep,
          type: "certificate",
          data: element,
          dataId: element._id,
        });
      });
    }

    if (activeStep > 4) {
      stepData.puppies.map((element) => {
        newProcedures.push({
          stepFromOrigin: activeStep,
          type: "transfer",
          data: stepData,
          dataId: stepData._id,
        });
      });
    }

    dispatch(fcmPackageUpdateProcedures(newProcedures));
  };
};

export const removePreviousPuppies = (puppies) => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const client = getState().clients.client;
    const { activeStep, steps, completedSteps } = fcmPackage;

    console.table(puppies);
    // array of puppies to remove (puppies with id)
    const newPuppies = puppies.filter((puppy) => puppy._id);
    console.table(newPuppies);
    if (newPuppies.length > 0) {
      for (const puppy of newPuppies) {
        // remove from database
        dispatch(deleteFcmDog(puppy._id, false));
        // unlink client database
        dispatch(userRemoveFcmDog(client._id, puppy._id, false));
        // remove client reducer
        dispatch(unlinkFcmDogFromClient(puppy._id, false));
        // remove allfcm reducer
      }
    }
  };
};

export const fcmPackageUpdateProcedures = (newProcedures) => {
  return { type: types.fcmPackageUpdateProcedures, payload: newProcedures };
};

/**************HANDLING STEPS*********************/
export const setFcmPackageStep = (step) => ({
  type: types.fcmPackageSetStep,
  payload: step,
});

export const handleBackFcmPackageStep = () => {
  return async (dispatch, getState) => {
    let activeStep = getState().fcm.fcmPackage.activeStep;
    dispatch(setFcmPackageStep(activeStep - 1));
  };
};

export const handleNextFcmPackageStep = () => {
  return async (dispatch, getState) => {
    const fcmPackage = getState().fcm.fcmPackage;
    const { activeStep, steps, completedSteps } = fcmPackage;

    // It's the last step, but not all steps have been completed,
    // find the first step that hasnt been completed
    const newActiveStep =
      isLastStep(activeStep, steps) &&
      !areAllStepsCompleted(completedSteps, steps)
        ? steps.findIndex((step, i) => !(i in completedSteps))
        : activeStep + 1;

    // set active step to 2
    dispatch(setFcmPackageStep(newActiveStep));
  };
};

export const handleFcmCompleteStep = () => {
  return async (dispatch, getState) => {
    const newFcmPackage = { ...getState().fcm.fcmPackage };
    const { activeStep, completedSteps } = newFcmPackage;

    // set that the step is confirmed
    dispatch(setFcmActiveStepProperty("needsConfirmation", false));
    // add step to completedSteps
    const newCompletedSteps = { ...completedSteps };
    newCompletedSteps[activeStep] = true;

    dispatch(updateFcmPackageProperty("completedSteps", newCompletedSteps));

    // handle next

    dispatch(handleNextFcmPackageStep());
  };
};

export const setFcmActiveStepProperty = (propertyName, value) => {
  return async (dispatch, getState) => {
    const newFcmPackage = { ...getState().fcm.fcmPackage };
    const { activeStep } = newFcmPackage;

    const activeStepProperties = { ...newFcmPackage.steps[activeStep] };
    activeStepProperties[propertyName] = value;

    dispatch({
      type: types.fcmSetActiveStepProperties,
      payload: activeStepProperties,
    });
  };
};

export const cleanFcmStep = () => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const {
      activeStep,
      procedures,
      completedSteps,
      currentProps,
      steps,
      breedingForm,
    } = fcmPackage;

    const relatedSteps = steps.reduce(
      (arr, step, index) => (
        step.stepFromOrigin === activeStep && arr.push(index), arr
      ),
      []
    );
    relatedSteps.push(activeStep);

    // search and remove procedures
    const newProcedures = procedures.filter(
      (element) => !relatedSteps.includes(element.stepFromOrigin)
    );

    let newSteps = [...fcmPackage.steps];
    // search and remove completed steps
    const newCompletedSteps = { ...completedSteps };
    relatedSteps.forEach((element) => {
      console.log(element, newSteps[element]);
      newCompletedSteps[element] = false;
      newSteps[element].dataId = null;
      newSteps[element].stepData = null;
    });

    // search and remove steps
    newSteps = newSteps.filter(
      (element) => !relatedSteps.includes(element.stepFromOrigin)
    );

    // search and remove packageproperty
    const newFcmPackage = { ...fcmPackage };

    // new data set delete

    console.log("newSteps", newSteps, "steps", steps);

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

export const addOrRemoveFcmTransferSteps = (fcmDog, isPuppy = false) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;

    if (fcmDog.isTransferPending) {
      dispatch(
        addNewFcmStep({
          stepLabel: `Transferencia de ${fcmDog.petName}`,
          stepType: fcmStepTypes.fcmTransferStep,
          dataId: null,
          stepData: { previousOwner: null, dog: fcmDog._id, newOwner: null },
          needsConfirmation: false,
          stepFromOrigin: activeStep,
          isPuppy: isPuppy,
        })
      );
    }
  };
};

export const addOrRemoveFcmPartnerSteps = (fcmDog) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;

    if (fcmDog.isTransferPending) {
      dispatch(
        addNewFcmStep({
          stepLabel: `Nuevo propietario de ${fcmDog.petName}`,
          stepType: fcmStepTypes.fcmPartnerStep,
          dataId: null,
          stepData: null,
          needsConfirmation: false,
          stepFromOrigin: activeStep,
        })
      );
    }
  };
};

// todo: review
export const addFcmPartnerStep = (object) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    const currentStep = { ...steps[activeStep] };

    // todo: review
    // check if the steps are renewed
    // filters the steps that came from this step

    // in case of parents transfers dont add step if existed previously
    if (currentStep.stepType === fcmStepTypes.fcmPartnerStep) {
      const existentStep = newSteps.find(
        (step) => step.stepFromOrigin === activeStep
      );
      if (!existentStep) {
        newSteps.splice(newSteps.length - 1, 0, object);
      }
    }

    if (activeStep === 4) {
      const existentStep = newSteps.find(
        (step) =>
          step.stepFromOrigin === activeStep &&
          step.stepObject.puppyName === object.stepObject.puppyName
      );
      if (!existentStep) {
        newSteps.splice(newSteps.length - 1, 0, object);
      }
    }

    // newSteps.splice(newSteps.length - 1, 0, object);

    dispatch(updateFcmPackageProperty("steps", newSteps));
  };
};

// todo: review
export const checkAndAddFcmPartnerStep = (puppy) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { activeStep } = fcmPackage;

    if (puppy.isTransferPending) {
      dispatch(
        addNewFcmStep({
          stepLabel: `Nuevo propietario de ${puppy.petName}`,
          stepType: fcmStepTypes.fcmPartnerStep,
          dataId: null,
          stepData: null,
          needsConfirmation: false,
          stepFromOrigin: activeStep,
        })
      );
    }
  };
};
export const checkAndAddFcmTransferStep = (fcmDog, isPuppy = false) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { activeStep } = fcmPackage;

    if (fcmDog.isTransferPending) {
      dispatch(
        addNewFcmStep({
          stepLabel: `Transferencia de ${fcmDog.petName}`,
          stepType: fcmStepTypes.fcmTransferStep,
          dataId: null,
          stepData: { previousOwner: null, dog: fcmDog._id, newOwner: null },
          needsConfirmation: false,
          stepFromOrigin: activeStep,
          isPuppy,
        })
      );
    }
  };
};

// todo: review
export const addNewFcmStep = (newStep) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    const currentStep = { ...steps[activeStep] };

    newSteps.splice(newSteps.length - 1, 0, newStep);
    dispatch(updateFcmPackageProperty("steps", newSteps));
  };
};

// todo delete
export const oldAddNewFcmStep = (object) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    const currentStep = { ...steps[activeStep] };

    // todo: review
    // check if the steps are renewed
    // filters the steps that came from this step

    // in case of parents transfers dont add step if existed previously
    if (currentStep.stepType === fcmStepTypes.fcmPartnerStep) {
      const existentStep = newSteps.find(
        (step) => step.stepFromOrigin === activeStep
      );
      if (!existentStep) {
        newSteps.splice(newSteps.length - 1, 0, object);
      }
    }

    if (activeStep === 4) {
      const existentStep = newSteps.find(
        (step) =>
          step.stepFromOrigin === activeStep &&
          step.stepObject.puppyName === object.stepObject.puppyName
      );
      if (!existentStep) {
        newSteps.splice(newSteps.length - 1, 0, object);
      }
    }

    // newSteps.splice(newSteps.length - 1, 0, object);

    dispatch(updateFcmPackageProperty("steps", newSteps));
  };
};

// todo: review
export const removeFcmSteps = () => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = steps.filter(
      (element) => element.stepFromOrigin !== activeStep
    );
    // newSteps.splice(newSteps.length - 1, 0, object);
    dispatch(updateFcmPackageProperty("steps", newSteps));
  };
};

/**************HANDLING PROCEDURES*********************/

/***************************************************************/
/***************************************************************/
/**********************NOT CHECKED *****************************/
/***************************************************************/
/***************************************************************/

export const fcmPackageStepSetNeedsConfirmation = (boolea) => ({});

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

export const fcmPartnersLoaded = (data) => ({
  type: types.fcmPartnersLoaded,
  payload: data,
});

/***************************************************************/
/**********************FCM DOGS    *****************************/
/***************************************************************/

export const fcmDogsLoaded = (data) => ({
  type: types.fcmDogsLoaded,
  payload: data,
});

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

/***************************************************************/
/**********************FcmTransfers    *****************************/
/***************************************************************/

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

/***************************************************************/
/**********************FCM PACKAGES*****************************/
/***************************************************************/
export const setFcmPackage = (object) => ({
  type: types.fcmSetPackage,
  payload: object,
});

export const setFcmPackageSkipped = (object) => ({
  type: types.fcmPackageSetSkipped,
  payload: object,
});

export const addFcmProcedure = (object) => {
  return async (dispatch, getState) => {
    let fcmPackage = getState().fcm.fcmPackage;
    let { procedures = [] } = fcmPackage;
    let newProcedures = [...procedures];

    const objectToCheck = {
      stepFromOrigin: object.stepFromOrigin,
      type: object.type,
    };

    console.log("***Estoy en addfcmprocedure, objecttocheck", objectToCheck);

    const elementIndex = newProcedures.findIndex((element) =>
      objectContainsObjectProperties(element, objectToCheck)
    );
    if (elementIndex >= 0) {
      newProcedures[elementIndex] = object;
    } else {
      newProcedures.push(object);
    }

    dispatch(setFcmPackageProp("procedures", newProcedures));
  };
};

export const removeFcmProcedure = (object) => {
  return async (dispatch, getState) => {
    console.log("***** estoy acá");
    let fcmPackage = getState().fcm.fcmPackage;
    let { procedures = [] } = fcmPackage;
    let newProcedures = [...procedures];

    const objectToCheck = {
      stepFromOrigin: object.stepFromOrigin,
      type: object.type,
    };

    newProcedures = newProcedures.filter(
      (element) => !objectContainsObjectProperties(element, objectToCheck)
    );
    console.log("newprocedurs after filtering", newProcedures);

    dispatch(setFcmPackageProp("procedures", newProcedures));
  };
};

export const addFcmCertificateProcedure = (object) => {
  return async (dispatch, getState) => {
    let fcmPackage = getState().fcm.fcmPackage;
    let { procedures = [] } = fcmPackage;
    let newProcedures = [...procedures];

    newProcedures.push(object);
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

export const setFcmBreedingForm = (values) => {
  return async (dispatch, getState) => {
    // const client = getState().clients.client;
    // dispatch(updateClientReducer({ ...client }));
    dispatch(setFcmPackageProp("breedingForm", values));

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
    fcmPackage.steps = newSteps;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};

export const removeFcmPuppiesTransfersSteps = (puppiesTransfers = []) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const puppiesTransfersNames = puppiesTransfers.map(
      (element) => element.puppyName
    );

    console.log("puppiesTransferNames", puppiesTransfersNames);
    const newSteps = steps.filter((element) => {
      if (element.stepFromOrigin !== 4) {
        return element;
      } else {
        console.log("ESTE ES EL PASO ACTUAL", element.stepObject);
        if (puppiesTransfersNames.includes(element.stepObject.puppyName)) {
          return element;
        }
      }
    });
    console.log("newsteps", newSteps);

    dispatch(setFcmPackageProp("steps", newSteps));
  };
};

export const setFcmCurrentStepObject = (object) => {
  return async (dispatch, getState) => {
    const { fcmPackage } = getState().fcm;
    const { steps, activeStep } = fcmPackage;
    const newSteps = [...steps];
    newSteps[activeStep].stepObject = object;
    fcmPackage.steps = newSteps;
    dispatch(setFcmPackage({ ...fcmPackage }));
  };
};

export const empty = () => {};

const procedures = {
  partnersRegistrations: [],
  partnersRenewals: [],
  transfers: [],
  certificates: [],
  responsiveLetter: [],
};

const procedure = {
  stepFromOrigin: "",
  type: "",
  data: "",
  dataId: "",
};

// si surge
