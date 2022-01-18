// 367
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { genderTypes, roleTypes, types } from "../types/types";
import { authLogin } from "./authActions";

export const collaboratorsStartLoading = (isPublic = true) => {
  return async (dispatch) => {
    try {
      dispatch(collaboratorsIsLoading());

      let resp;
      if (isPublic) {
        resp = await fetchSinToken("collaborators/getAllForWeb");
      } else {
        resp = await fetchConToken("collaborators");
      }

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
      const resp = await fetchConToken(`collaborators/${id}`, {
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
  const resp = await fetchConToken("collaborators/create", data, "POST");
  const body = await resp.json();
  if (body.ok) {
    console.log("este es el body", body);
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
      title: `Usuario ${body.collaborator.col_code} creado con éxito. El código de acceso es: ${body.collaborator.accessCode}`,
      showConfirmButton: true,
    });
  } else {
    Swal.fire("Error", body.msg, "error");
  }
};

export const collaboratorStartLogin = (data) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("collaborators/", { ...data }, "POST");
    const body = await resp.json();

    console.log("start login", body);

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
      const resp = await fetchConToken(
        `collaborators/${collaborator._id}`,
        collaborator,
        "PUT"
      );
      const body = await resp.json();
      console.log("este es el ", body);

      if (body.ok) {
        dispatch(collaboratorUpdate(collaborator));
        Swal.fire({
          icon: "success",
          title: body.msg,
          showConfirmButton: true,
        });
      } else {
        Swal.fire("error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

export const collaboratorDelete = (collaboratorId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `collaborators/${collaboratorId}`,
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
        dispatch(collaboratorsStartLoading(false));
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
