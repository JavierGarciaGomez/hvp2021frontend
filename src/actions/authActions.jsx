// 367
// import { fetchSinToken, fetchConToken } from "../helpers/fetch";
// import { types } from "../../../hvp2021backend/types/types";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { genderTypes, roleTypes, types } from "../types/types";
// import { fetchConToken, fetchSinToken } from "../helpers/fetch";
// import { eventLogout } from "./eventActions";
// import { eventLogout } from "./events";

export const authLogin = (user) => ({ type: types.authLogin, payload: user });

export const startChecking = () => {
  return async (dispatch) => {
    try {
      // check if there is a token in local storage to renew
      const token = localStorage.getItem("token") || "";
      if (token === "") {
        return dispatch(checkingFinish());
      }
      const resp = await fetchConToken("auth/renew");
      const body = await resp.json();

      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());

        const { uid, col_code, role, imgUrl } = body;
        return dispatch(
          authLogin({
            uid,
            col_code,
            role,
            imgUrl,
          })
        );
      } else {
      }
      dispatch(checkingFinish());
    } catch (error) {
      dispatch(checkingFinish());
    }
  };
};

export const userStartLogin = (data) => {
  return async (dispatch) => {
    // fetch the data (receive token, uid, colcode, role and imgurl)
    const resp = await fetchSinToken("auth/", { ...data }, "POST");
    const body = await resp.json();

    if (body.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login exitoso",
        showConfirmButton: false,
        timer: 1500,
      });

      // retrieve fetched data
      const { uid, col_code, role, imgUrl, token } = body;
      // save in localstorage
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      // get the body and dispatch
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

export const userStartRegister = (data) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("users/create", { ...data }, "POST");
    const body = await resp.json();

    if (body.ok) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Usuario creado correctamente",
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

const checkingFinish = () => ({ type: types.authCheckingFinish });

// const login = (user) => ({
//   type: types.authLogin,
//   payload: user,
// });

// 373
export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();

    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    dispatch(logout());
    // clear events
    // dispatch(eventLogout());
  };
};

const logout = () => ({ type: types.authLogout });

// export const collaboratorStartUpdate = (collaborator) => {
//   console.log("COLLABORATOR ACTIONS. START UPDATE", collaborator);
//   return async (dispatch) => {
//     try {
//       const resp = await fetchSinToken(
//         `collaborators/${collaborator._id}`,
//         collaborator,
//         "PUT"
//       );
//       const body = await resp.json();

//       if (body.ok) {
//         dispatch(collaboratorUpdate(collaborator));
//       } else {
//         Swal.fire("error", body.msg, "error");
//       }
//     } catch (error) {
//       Swal.fire("error", "error", "error");
//     }
//   };
// };

// const collaboratorUpdate = (collaborator) => ({
//   type: types.collaboratorUpdate,
//   payload: collaborator,
// });
