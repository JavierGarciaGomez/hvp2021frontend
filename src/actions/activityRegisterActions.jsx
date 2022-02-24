// 367

import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import {
  checkIfIsBetween,
  findObjectByProperty,
  checkIfIsLong,
  checkIfIsOld,
  sortCollectionByDate,
  checkIfIsStartBeforeEnd,
  fireSwalSuccess,
  fireSwalError,
  sortCollectionAlphabetically,
  sortObjectPropertiesAlphabetically,
} from "../helpers/utilities";
import { types } from "../types/types";
import { authLogin, startChecking } from "./authActions";

export const allActivityRegistersStartLoading = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(activityRegistersIsLoading());
      let resp = await fetchConToken(`activityRegister/`);
      let body = await resp.json();

      let allActivityRegisters = sortCollectionByDate(
        body.allActivityRegisters,
        "endingTime"
      );

      if (body.ok) {
        dispatch(allActivityRegisterLoaded(allActivityRegisters));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(activityRegistersFinishedLoading());
  };
};

// Todo
export const activityRegistersStartLoading = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(activityRegistersIsLoading());
      const { uid } = getState().auth;
      let resp = await fetchConToken(`misc/activityType`);
      let body = await resp.json();
      dispatch(activityTypesLoaded(body.misc.data));

      resp = await fetchConToken(`activityRegister/getByCol/${uid}`);
      body = await resp.json();

      let activityRegisters = sortCollectionByDate(
        body.activityRegisters,
        "endingTime"
      );

      if (body.ok) {
        dispatch(colActRegistersLoaded(activityRegisters));

        let currentRegister = findObjectByProperty(
          activityRegisters,
          "endingTime",
          null
        );
        if (currentRegister) {
          dispatch(setCurrentRegister(currentRegister));
        } else {
          dispatch(setCurrentRegister(null));
        }

        dispatch(
          setLastActivityRegister(
            activityRegisters.reduce((a, b) =>
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

export const activeActivityRegisterStartLoading = (actRegId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(activityRegistersIsLoading());
      let resp = await fetchConToken(`activityRegister/${actRegId}`);
      let body = await resp.json();

      if (body.ok) {
        dispatch(setActiveActivityRegister(body.activityRegister));
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(activityRegistersFinishedLoading());
  };
};

// todo doing
export const setActiveActivityRegister = (data) => ({
  type: types.setActiveActivityRegister,
  payload: data,
});

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
const allActivityRegisterLoaded = (data) => {
  return {
    type: types.allActivityRegistersLoaded,
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
      const { activeColRegisters } = getState().activityRegister;

      let isOld = checkIfIsOld(activity);
      let isBetween = checkIfIsBetween(activeColRegisters, activity);
      let isLong = checkIfIsLong(activity);
      let isStartBeforeEnd = checkIfIsStartBeforeEnd(activity);

      if (isBetween || isOld || !isStartBeforeEnd) {
        return Swal.fire({
          icon: "error",
          title:
            "No puedes crear una actividad dentro de otra, ni que haya empezado hace más de tres días, ni que termine antes de que empiece",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      if (isLong) {
        activity.endingTime = dayjs(activity.startingTime).add(14, "hours");
      }
      console.log("activity before", activity);
      activity.startingTime = dayjs(activity.startingTime).toISOString();
      if (activity.endingTime) {
        activity.endingTime = dayjs(activity.endingTime).toISOString();
      }
      console.log("activity after", activity);

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
        dispatch(activeActivityRegisterStartLoading(activity._id));
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
      const { activeColRegisters } = getState().activityRegister;

      let isOld = checkIfIsOld(activity);
      let isBetween = checkIfIsBetween(activeColRegisters, activity);
      let isLong = checkIfIsLong(activity);
      let isStartBeforeEnd = checkIfIsStartBeforeEnd(activity);

      console.log("isold", isOld, "isbetween", isBetween, "islong", isLong);
      if (isBetween || isLong || isOld || !isStartBeforeEnd) {
        return Swal.fire({
          icon: "error",
          title:
            "No puedes crear una actividad dentro de otra, ni que haya empezado hace más de tres días, ni que termine antes de que empiece",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      console.log("activity before", activity);
      activity.startingTime = dayjs(activity.startingTime).toISOString();
      if (activity.endingTime) {
        activity.endingTime = dayjs(activity.endingTime).toISOString();
      }
      console.log("activity before", activity);

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
        `activityRegister/${activityRegisterId}`,
        {},
        "DELETE"
      );
      const body = await resp.json();

      if (body.ok) {
        fireSwalSuccess("Eliminación correcta");
        dispatch(activityRegistersStartLoading());
      } else {
        fireSwalError(body.msg);
      }
    } catch (error) {
      fireSwalError(error.message);
    }
  };
};

// Todo
const activityRegisterUpdate = (activityRegister) => ({
  type: types.activityRegisterUpdate,
  payload: activityRegister,
});
