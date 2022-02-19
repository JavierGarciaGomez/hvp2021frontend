// 367

import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { findObjectByProperty } from "../helpers/utilites";
import { types } from "../types/types";
import { authLogin, startChecking } from "./authActions";

// Todo
export const activityRegistersStartLoading = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(activityRegistersIsLoading());
      const { uid } = getState().auth;
      let resp = await fetchConToken(`misc/activityType`);
      let body = await resp.json();
      dispatch(activityTypesLoaded(body.misc.data));

      resp = await fetchConToken(`activityRegister/${uid}`);
      body = await resp.json();

      if (body.ok) {
        dispatch(colActRegistersLoaded(body.activityRegisters));
        dispatch(
          setCurrentRegister(
            findObjectByProperty(body.activityRegisters, "endingTime", null)
          )
        );

        dispatch(
          setLastActivityRegister(
            body.activityRegisters.reduce((a, b) =>
              a.endingTime > b.endingTime ? a : b
            )
          )
        );
        dispatch(activityRegistersFinishedLoading());
      }
    } catch (error) {
      dispatch(activityRegistersFinishedLoading());
      console.log(error);
    }
  };
};

// Todo
const activityRegistersIsLoading = () => ({
  type: types.activityRegisterIsLoading,
});

// Todo
const activityRegistersFinishedLoading = () => ({
  type: types.activityRegisterFinishedLoading,
});

// Todo
const activityTypesLoaded = (data) => {
  return {
    type: types.activityTypesLoaded,
    payload: data,
  };
};

// Todo
const colActRegistersLoaded = (activityRegisters) => {
  return {
    type: types.colActivityRegistersLoaded,
    payload: activityRegisters,
  };
};

// Todo
const setCurrentRegister = (data) => {
  return {
    type: types.setCurrentActivityRegister,
    payload: data,
  };
};

const setLastActivityRegister = (data) => {
  return {
    type: types.setLastActivityRegister,
    payload: data,
  };
};

// Todo
export const activityRegisterStartUpdate = (activity) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(
        `activityRegister/${activity._id}`,
        activity,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: true,
        });
        dispatch(activityRegistersStartLoading());
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

// todo
export const createActivityRegister = (activity) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`activityRegister/`, activity, "POST");
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: true,
        });
        dispatch(activityRegistersStartLoading());
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

// Todo
export const activityRegisterStartSetActive = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`activityRegisters/${id}`, {
        activityRegisterId: id,
      });

      const body = await resp.json();

      if (body.ok) {
        const activityRegister = body.activityRegister;

        dispatch(activityRegisterSetActive(activityRegister));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("error", "error", "error");
    }
  };
};

// Todo
const activityRegisterSetActive = (activityRegister) => {
  return {
    type: types.activityRegisterSetActive,
    payload: activityRegister,
  };
};

// Todo
export const activityRegisterStartCreate = async (data) => {
  const resp = await fetchConToken("activityRegisters/create", data, "POST");
  const body = await resp.json();
  if (body.ok) {
    // localStorage.setItem("token", body.token);
    // localStorage.setItem("token-init-date", new Date().getTime());
    // dispatch(
    //   login({
    //     uid: body.uid,
    //     name: body.name,
    //   })
    // );
    Swal.fire({
      icon: "success",
      title: `Usuario ${body.activityRegister.col_code} creado con éxito. El código de acceso es: ${body.activityRegister.accessCode}`,
      showConfirmButton: true,
    });
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

// Todo
export const activityRegisterStartLogin = (data) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("activityRegisters/", { ...data }, "POST");
    const body = await resp.json();

    if (body.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      const { uid, col_code, role, imgUrl } = body;
      dispatch(
        authLogin({
          uid,
          col_code,
          role,
          imgUrl,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

// Todo
export const activityRegisterStartRegister = (data) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "activityRegisters/register",
      { ...data },
      "PATCH"
    );
    const body = await resp.json();

    if (body.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Colaborador actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(startChecking());
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

// Todo
export const activityRegisterDelete = (activityRegisterId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `activityRegisters/${activityRegisterId}`,
        {},
        "DELETE"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          icon: "success",
          title: "Colaborador eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(activityRegistersStartLoading(false));
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

// Todo
const activityRegisterUpdate = (activityRegister) => ({
  type: types.activityRegisterUpdate,
  payload: activityRegister,
});
