import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

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
