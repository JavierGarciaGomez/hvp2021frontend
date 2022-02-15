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
      const resp = await fetchConToken("collaborators/renew");
      const body = await resp.json();

      console.log("body", body);

      if (body.ok) {
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
    const resp = await fetchSinToken("auth/create", { ...data }, "POST");
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
// export const collaboratorsStartLoading = ({ data }) => {
//   return async (dispatch) => {
//     try {
//       const resp = await fetchSinToken("collaborators");
//       const body = await resp.json();

//       if (body.ok) {
//         console.log("collaborators start loading", body.collaborators);
//         dispatch(collaboratorsLoaded(body.collaborators));
//         // event.id = body.evento.id;
//         // event.user = { _id: uid, name };
//         // dispatch(eventAddNew(event));
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire("error", "error", "error");
//     }
//   };
// };

// export const collaboratorStartSetActive = (id) => {
//   console.log("COLLABORATOR ACTIONS. Collaborator start set active", id);
//   return async (dispatch) => {
//     try {
//       const resp = await fetchSinToken(`collaborators/${id}`, {
//         collaboratorId: id,
//       });

//       const body = await resp.json();

//       if (body.ok) {
//         const collaborator = body.collaborator;
//         console.log("mis fecth", collaborator);
//         dispatch(collaboratorSetActive(collaborator));
//       }
//       console.log("COLLABORATOR ACTIONS. Collaborator finish set active");
//     } catch (error) {
//       console.log(error);
//       Swal.fire("error", "error", "error");
//     }
//   };
// };

// const collaboratorSetActive = (collaborator) => {
//   console.log("COLLABORATOR ACTIONS. Collaborator set active");

//   return {
//     type: types.collaboratorSetActive,
//     payload: collaborator,
//   };
// };

// const collaboratorsLoaded = (collaborators) => {
//   console.log("collaborators loaded", collaborators);
//   return {
//     type: types.collaboratorsLoaded,
//     payload: collaborators,
//   };
// };

// 369
// export const collaboratorStartCreate = async (data) => {
//   console.log("START REGISTER");

//   const resp = await fetchSinToken("collaborators/create", data, "POST");
//   const body = await resp.json();
//   if (body.ok) {
//     // localStorage.setItem("token", body.token);
//     // localStorage.setItem("token-init-date", new Date().getTime());
//     // dispatch(
//     //   login({
//     //     uid: body.uid,
//     //     name: body.name,
//     //   })
//     // );
//   } else {
//     Swal.fire("Error", body.msg, "error");
//   }
// };

// export const collaboratorStartLogin = (data) => {
//   return async (dispatch) => {
//     const resp = await fetchSinToken("collaborators/", { ...data }, "POST");
//     const body = await resp.json();
//     console.log("collaboratorActions, body: ", body);
//     if (body.ok) {
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Login exitoso",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       localStorage.setItem("token", body.token);
//       localStorage.setItem("token-init-date", new Date().getTime());
//       // dispatch(
//       //   login({
//       //     uid: body.uid,
//       //     name: body.name,
//       //   })
//       // );
//     } else {
//       Swal.fire("Error", body.msg, "error");
//     }
//   };
// };

// export const collaboratorStartRegister = (data) => {
//   return async (dispatch) => {
//     const resp = await fetchSinToken(
//       "collaborators/register",
//       { ...data },
//       "PATCH"
//     );
//     const body = await resp.json();
//     console.log("collaboratorActions, body: ", body);
//     if (body.ok) {
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Colaborador actualizado correctamente",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       // localStorage.setItem("token", body.token);
//       // localStorage.setItem("token-init-date", new Date().getTime());
//       // dispatch(
//       //   login({
//       //     uid: body.uid,
//       //     name: body.name,
//       //   })
//       // );
//     } else {
//       Swal.fire("Error", body.msg, "error");
//     }
//   };
// };

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
