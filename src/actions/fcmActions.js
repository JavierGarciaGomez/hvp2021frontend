import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { fireSwalError, fireSwalSuccess } from "../helpers/utilities";
import { types } from "../types/types";

// todo
export const createFcmPartner = (object) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken(`fcmPartner/`, object, "POST");
      const body = await resp.json();

      if (body.ok) {
        fireSwalSuccess(body.msg);
        return true;
      } else {
        fireSwalError(body.msg);
        return false;
      }
    } catch (error) {
      fireSwalError(error.message);
      return false;
    }
  };
};
