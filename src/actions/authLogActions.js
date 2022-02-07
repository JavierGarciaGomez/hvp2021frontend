import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const authLogsStartLoading = () => {
  return async (dispatch) => {
    try {
      dispatch(authLogsIsLoading());

      const resp = await fetchConToken("collaboratorLog");
      const body = await resp.json();
      const resp2 = await fetchConToken("userLog");
      const body2 = await resp2.json();

      console.log("authLogActions", body, body2);

      if (body.ok && resp2.ok) {
        dispatch(
          authLogsLoaded({
            collaboratorLogs: body.authLogs,
            userLogs: body2.authLogs,
          })
        );
      }
    } catch (error) {
      dispatch(authLogsFinishedLoading());
      console.log(error);
    }
  };
};

// todo
const authLogsIsLoading = () => ({
  type: types.authLogsIsLoading,
});

// todo
const authLogsLoaded = (data) => {
  return {
    type: types.authLogsLoaded,
    payload: data,
  };
};

// todo
const authLogsFinishedLoading = () => ({
  type: types.authLogsFinishedLoading,
});
