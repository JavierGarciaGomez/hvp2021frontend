import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { fireSwalSuccess } from "../helpers/utilities";
import { types } from "../types/types";
import { clientStartLoading, updateClientReducer } from "./clientsActions";

export const usersStartLoading = () => {
  return async (dispatch) => {
    try {
      dispatch(userIsLoading());

      const resp = await fetchConToken("auth");
      const body = await resp.json();

      if (body.ok) {
        dispatch(usersLoaded(body.users));
      }
    } catch (error) {
      dispatch(usersFinishedLoading());
      console.log(error);
    }
  };
};

// todo
const userIsLoading = () => ({
  type: types.usersIsLoading,
});

// todo
const usersLoaded = (data) => {
  return {
    type: types.usersLoaded,
    payload: data,
  };
};

// todo
const usersFinishedLoading = () => ({
  type: types.usersFinishedLoading,
});

export const userDelete = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`users/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Colaborador eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(usersStartLoading());
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

export const userRemoveFcmPartner = (userId, fcmPartnerId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `users/${userId}/fcmPartner/unlink/${fcmPartnerId}`,
        {},
        "PATCH"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro desvinculado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(clientStartLoading(userId));
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

export const userAddFcmPartner = (userId, fcmPartner) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `users/${userId}/fcmPartner/link/${fcmPartner._id}`,
        {},
        "PATCH"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro vinculado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        const client = getState().clients.client;
        client.linkedFcmPartners.push(fcmPartner);
        dispatch(updateClientReducer({ ...client }));
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

export const userRemoveFcmDog = (userId, fcmDogId, fireSwal = true) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `users/${userId}/dogs/unlink/${fcmDogId}`,
        {},
        "PATCH"
      );
      const body = await resp.json();

      if (body.ok) {
        fireSwal && fireSwalSuccess(body.msg);
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

export const userAddFcmDog = (userId, fcmDog) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `users/${userId}/dogs/link/${fcmDog._id}`,
        {},
        "PATCH"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro vinculado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        const client = getState().clients.client;
        client.linkedDogs.push(fcmDog);
        dispatch(updateClientReducer({ ...client }));
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};
