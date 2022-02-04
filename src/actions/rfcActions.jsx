import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const rfcStartLoading = () => {
  return async (dispatch) => {
    try {
      dispatch(rfcIsLoading());
      const resp = await fetchConToken(`rfc/`);
      const body = await resp.json();
      if (body.ok) {
        dispatch(allRfcLoaded(body.allRfc));
      }
    } catch (error) {
      Swal.fire("error", error.msg, "error");
    }
  };
};

const rfcIsLoading = () => ({
  type: types.rfcIsLoading,
});

const allRfcLoaded = (allRfc) => {
  return {
    type: types.rfcLoaded,
    payload: allRfc,
  };
};

export const rfcCreate = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("rfc", data, "POST");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1000,
        });
        await dispatch(rfcStartLoading());
        return;
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

export const rfcUpdate = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`rfc/${data._id}`, data, "PUT");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          showConfirmButton: false,
          timer: 1000,
        });
        await dispatch(rfcStartLoading());
        return;
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

export const rfcDelete = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`rfc/${data._id}`, data, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Eliminación exitosa",
          showConfirmButton: false,
          timer: 1000,
        });
        await dispatch(rfcStartLoading());
        return;
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

// TODO: all below
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
        // return dispatch(dailyCleanUpsStartLoading(branch));
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
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        // dispatch(deepCleanUpsIsLoading());
        // despachar lo otro
        return dispatch(operatingRoomCleanUpsStartLoading(branch));
      }
      return Swal.fire({
        icon: "error",
        title: body.msg,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      return dispatch(operatingRoomCleanUpsStartLoading(branch));
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
        dispatch(operatingRoomCleanUpsStartLoading(branch));
        return;
      }
      return Swal.fire("Error", body.msg, "error");
    } catch (error) {
      console.log(error);
    }
  };
};
