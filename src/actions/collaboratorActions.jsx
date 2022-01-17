// 367
// import { fetchSinToken, fetchConToken } from "../helpers/fetch";
// import { types } from "../../../hvp2021backend/types/types";
import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { genderTypes, roleTypes, types } from "../types/types";
import { authLogin } from "./authActions";
// import { fetchConToken, fetchSinToken } from "../helpers/fetch";
// import { eventLogout } from "./eventActions";
// import { eventLogout } from "./events";

// export const startLogin = (email, password) => {
//   return async (dispatch) => {
//     const resp = await fetchSinToken("auth", { email, password }, "POST");
//     const body = await resp.json();

//     if (body.ok) {
//       localStorage.setItem("token", body.token);
//       localStorage.setItem("token-init-date", new Date().getTime());
//       dispatch(
//         login({
//           uid: body.uid,
//           name: body.name,
//         })
//       );
//     } else {
//       Swal.fire("Error", body.msg, "error");
//     }
//   };
// };

// 2022-01-07
export const collaboratorsStartLoading = () => {
  return async (dispatch) => {
    try {
      dispatch(collaboratorsIsLoading());
      const resp = await fetchSinToken("collaborators");
      const body = await resp.json();

      if (body.ok) {
        dispatch(collaboratorsLoaded(body.collaborators));
        // event.id = body.evento.id;
        // event.user = { _id: uid, name };
        // dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("error", "error", "error");
    }
  };
};

const collaboratorsIsLoading = () => ({
  type: types.collaboratorIsLoading,
});

const collaboratorsFinishedLoading = () => ({
  type: types.collaboratorFinishedLoading,
});

export const collaboratorStartSetActive = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`collaborators/${id}`, {
        collaboratorId: id,
      });

      const body = await resp.json();

      if (body.ok) {
        const collaborator = body.collaborator;

        dispatch(collaboratorSetActive(collaborator));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("error", "error", "error");
    }
  };
};

const collaboratorSetActive = (collaborator) => {
  return {
    type: types.collaboratorSetActive,
    payload: collaborator,
  };
};

const collaboratorsLoaded = (collaborators) => {
  return {
    type: types.collaboratorsLoaded,
    payload: collaborators,
  };
};

// 369
export const collaboratorStartCreate = async (data) => {
  const resp = await fetchSinToken("collaborators/create", data, "POST");
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
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

export const collaboratorStartLogin = (data) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("collaborators/", { ...data }, "POST");
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

      const { uid, col_code, role } = body;
      dispatch(
        authLogin({
          uid,
          col_code,
          role,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const collaboratorStartRegister = (data) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "collaborators/register",
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
      // localStorage.setItem("token", body.token);
      // localStorage.setItem("token-init-date", new Date().getTime());
      // dispatch(
      //   login({
      //     uid: body.uid,
      //     name: body.name,
      //   })
      // );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

// 363
// export const startChecking = () => {
//   return async (dispatch) => {
//     const resp = await fetchConToken("auth/renew");

//     const body = await resp.json();

//     if (body.ok) {
//       localStorage.setItem("token", body.token);
//       localStorage.setItem("token-init-date", new Date().getTime());
//       dispatch(
//         login({
//           uid: body.uid,
//           name: body.name,
//         })
//       );
//     } else {
//       dispatch(checkingFinish());
//     }
//   };
// };

// const checkingFinish = () => ({ type: types.authCheckingFinish });

// const login = (user) => ({
//   type: types.authLogin,
//   payload: user,
// });

// 373
// export const startLogout = () => {
//   return (dispatch) => {
//     localStorage.clear();
//     dispatch(logout());
//     // clear events
//     dispatch(eventLogout());
//   };
// };

// const logout = () => ({ type: types.authLogout });

export const collaboratorStartUpdate = (collaborator) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        `collaborators/${collaborator._id}`,
        collaborator,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
        dispatch(collaboratorUpdate(collaborator));
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

const collaboratorUpdate = (collaborator) => ({
  type: types.collaboratorUpdate,
  payload: collaborator,
});
