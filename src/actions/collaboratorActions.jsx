// 367
// import { fetchSinToken, fetchConToken } from "../helpers/fetch";
// import { types } from "../../../hvp2021backend/types/types";
import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch";
import { genderTypes, roleTypes, types } from "../types/types";
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
      const resp = await fetchSinToken("collaborators");
      const body = await resp.json();

      if (body.ok) {
        console.log("collaborators start loading", body.collaborators);
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

export const collaboratorStartSetActive = (id) => {
  console.log("COLLABORATOR ACTIONS. Collaborator start set active", id);
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`collaborators/${id}`, {
        collaboratorId: id,
      });

      const body = await resp.json();

      if (body.ok) {
        const collaborator = body.collaborator;
        console.log("mis fecth", collaborator);
        dispatch(collaboratorSetActive(collaborator));
      }
      console.log("COLLABORATOR ACTIONS. Collaborator finish set active");
    } catch (error) {
      console.log(error);
      Swal.fire("error", "error", "error");
    }
  };
};

const collaboratorSetActive = (collaborator) => {
  console.log("COLLABORATOR ACTIONS. Collaborator set active");

  return {
    type: types.collaboratorSetActive,
    payload: collaborator,
  };
};

const collaboratorsLoaded = (collaborators) => {
  console.log("collaborators loaded", collaborators);
  return {
    type: types.collaboratorsLoaded,
    payload: collaborators,
  };
};

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

export const collaboratorStartUpdate = (collaborator) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(
        `events/${collaborator.id}`,
        collaborator,
        "PUT"
      );
      const body = await resp.json();

      if (body.ok) {
        // dispatch(eventUpdate(event));
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});
