import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { dailyCleanUpActions, types } from "../types/types";

export const dailyCleanUpsStartLoading = (branch) => {
  return async (dispatch) => {
    try {
      dispatch(dailyCleanUpsIsLoading());
      const resp = await fetchConToken(
        `cleanups/daily/checkCleanUpsAndGenerate/${branch}`
      );
      const body = await resp.json();
      if (body.ok) {
        console.log("cleanupsactions body", body);
        dispatch(dailyCleanUpsLoaded(body.dailyCleanUps));
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

const dailyCleanUpsIsLoading = () => ({
  type: types.dailyCleanUpsIsLoading,
});

const dailyCleanUpsLoaded = (dailyCleanUps) => {
  console.log("im here", dailyCleanUps);
  return {
    type: types.dailyCleanUpsLoaded,
    payload: dailyCleanUps,
  };
};

export const dailyCleanUpsAddCleaner = (cleanUpId) => {
  return async (dispatch) => {
    try {
      const data = { cleanUpId, action: dailyCleanUpActions.addCleaner };
      const resp = await fetchConToken("cleanups/daily/", data, "PATCH");
      const body = await resp.json();

      if (body.ok) {
        return Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1000,
        });

        // dispatch(collaboratorsLoaded(body.collaborators));
        // event.id = body.evento.id;
        // event.user = { _id: uid, name };
        // dispatch(eventAddNew(event));
      }
      return Swal.fire("Error", body.msg, "error");
    } catch (error) {
      console.log(error);
    }
  };
};

export const deepCleanUpCreate = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("cleanups/deep/createNew", data, "POST");
      const body = await resp.json();
      if (body.ok) {
        return Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      return Swal.fire({
        icon: "error",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire("Error", error.message, "error");
    }
  };
};

// todo redesign this to be ge get sending string
export const deepCleanUpsStartLoading = (branch) => {
  return async (dispatch) => {
    try {
      dispatch(deepCleanUpsIsLoading());
      const data = {
        branch,
      };
      const resp = await fetchConToken(`cleanups/deep/${branch}`, data, "POST");
      const body = await resp.json();
      if (body.ok) {
        console.log("cleanupsactions body", body);
        dispatch(deepCleanUpsLoaded(body.deepCleanUps));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("error", error.message, "error");
    }
  };
};

const deepCleanUpsIsLoading = () => ({
  type: types.deepCleanUpsIsLoading,
});

const deepCleanUpsLoaded = (deepCleanUps) => {
  return {
    type: types.deepCleanUpsLoaded,
    payload: deepCleanUps,
  };
};
