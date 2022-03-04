import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { clientStartLoading } from "./clientsActions";

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

      console.log("userRemove este es el body", body);

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

export const userAddFcmPartner = (userId, fcmPartnerId) => {
  return async (dispatch) => {
    try {
      console.log("Voy por acá");
      const resp = await fetchConToken(
        `users/${userId}/fcmPartner/link/${fcmPartnerId}`,
        {},
        "PATCH"
      );
      const body = await resp.json();

      console.log("userAddFcmPartner este es el body", body);

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
