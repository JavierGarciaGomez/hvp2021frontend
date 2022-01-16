import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { dailyCleanUpActions, types } from "../types/types";

export const dailyCleanUpsStartLoading = () => {
  return async (dispatch) => {
    try {
      dispatch(dailyCleanUpsIsLoading());
      const resp = await fetchConToken(
        "cleanups/daily/checkCleanUpsAndGenerate"
      );
      const body = await resp.json();
      if (body.ok) {
        console.log("cleanupsactions body", body);
        dispatch(dailyCleanUpsLoaded(body.dailyCleanUps));
      }
    } catch (error) {
      Swal.fire("error", "error", "error");
    }
  };
};

const dailyCleanUpsIsLoading = () => ({
  type: types.dailyCleanUpsIsLoading,
});

const dailyCleanUpsLoaded = (dailyCleanUps) => {
  console.log("im here", dailyCleanUps);
  return {
    type: types.dailyCleanUpsLoaded,
    payload: dailyCleanUps,
  };
};

export const dailyCleanUpsAddCleaner = (cleanUpId) => {
  return async (dispatch) => {
    try {
      const data = { cleanUpId, action: dailyCleanUpActions.addCleaner };
      const resp = await fetchConToken("cleanups/daily/", data, "PATCH");
      const body = await resp.json();

      if (body.ok) {
        return Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1000,
        });

        // dispatch(collaboratorsLoaded(body.collaborators));
        // event.id = body.evento.id;
        // event.user = { _id: uid, name };
        // dispatch(eventAddNew(event));
      }
      return Swal.fire("Error", body.msg, "error");
    } catch (error) {
      console.log(error);
    }
  };
};
