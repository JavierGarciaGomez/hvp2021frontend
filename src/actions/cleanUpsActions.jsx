import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { cleanUpActions, types } from "../types/types";

export const dailyCleanUpsStartLoading = (branch) => {
  return async (dispatch) => {
    try {
      dispatch(dailyCleanUpsIsLoading());
      const resp = await fetchConToken(`cleanups/daily/${branch}`);
      const body = await resp.json();
      if (body.ok) {
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
  return {
    type: types.dailyCleanUpsLoaded,
    payload: dailyCleanUps,
  };
};

export const updateDailyCleanUp = (dailyCleanUpId, branch, data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `cleanups/daily/${branch}/${dailyCleanUpId}`,
        data,
        "PATCH"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          showConfirmButton: false,
          timer: 1500,
        });
        return dispatch(dailyCleanUpsStartLoading(branch));
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
      return Swal.fire("Error", error.message, "error");
    }
  };
};

export const deepCleanUpUpdate = (branch, id, data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `cleanups/deep/${branch}/${id}`,
        data,
        "PUT"
      );
      const body = await resp.json();
      if (body.ok) {
        return Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return Swal.fire({
        icon: "error",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      return Swal.fire("Error", error.message, "error");
    }
  };
};

// todo redesign this to be ge get sending string
export const deepCleanUpsStartLoading = (branch) => {
  return async (dispatch) => {
    try {
      dispatch(deepCleanUpsIsLoading());
      const resp = await fetchConToken(`cleanups/deep/${branch}`);
      const body = await resp.json();
      if (body.ok) {
        dispatch(deepCleanUpsLoaded(body.deepCleanUps));
      }
    } catch (error) {
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

export const deepCleanUpStartSetActive = (branch, id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`cleanups/deep/${branch}/${id}`);

      const body = await resp.json();

      if (body.ok) {
        const deepCleanUp = body.deepCleanUp;

        dispatch(deepCleanUpSetActive(deepCleanUp));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("error", "error", "error");
    }
  };
};

const deepCleanUpSetActive = (deepCleanUp) => ({
  type: types.deepCleanUpsSetActive,
  payload: deepCleanUp,
});

export const operatingRoomCleanUpCreate = (branch) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `cleanups/operatingRoom/${branch}/createNew`,
        {},
        "POST"
      );
      const body = await resp.json();
      if (body.ok) {
        console.log(body);
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        // dispatch(deepCleanUpsIsLoading());
        // despachar lo otro
        return;
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

export const operatingRoomCleanUpsStartLoading = (branch) => {
  return async (dispatch) => {
    try {
      dispatch(operatingRoomCleanUpsIsLoading());
      const resp = await fetchConToken(`cleanups/operatingroom/${branch}`);
      const body = await resp.json();
      if (body.ok) {
        dispatch(operatingRoomCleanUpsLoaded(body.operatingRoomCleanUps));
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

const operatingRoomCleanUpsIsLoading = () => ({
  type: types.operatingRoomCleanUpsIsLoading,
});

const operatingRoomCleanUpsLoaded = (operatingRoomCleanUps) => {
  return {
    type: types.operatingRoomCleanUpsLoaded,
    payload: operatingRoomCleanUps,
  };
};

export const updateOperatingRoomCleanUp = (
  operatingRoomCleanUpId,
  branch,
  data
) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `cleanups/operatingroom/${branch}/${operatingRoomCleanUpId}`,
        data,
        "PATCH"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          showConfirmButton: false,
          timer: 1500,
        });
        return dispatch(operatingRoomCleanUpsStartLoading(branch));
      }
      return Swal.fire("Error", body.msg, "error");
    } catch (error) {
      console.log(error);
    }
  };
};
