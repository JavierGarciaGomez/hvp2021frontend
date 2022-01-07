// 367
// import { fetchSinToken, fetchConToken } from "../helpers/fetch";
// import { types } from "../../../hvp2021backend/types/types";
import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { genderTypes, roleTypes } from "../types/types";
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

// 369
export const startRegister = async (data) => {
  console.log("START REGISTER");

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
