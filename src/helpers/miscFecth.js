import { fetchSinToken } from "./fetch";
import Swal from "sweetalert2";

export const getCollaboratorbyId = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken(`collaborators/${id}`, {
        collaboratorId: id,
      });

      const body = await resp.json();

      if (body.ok) {
        const collaborator = body.collaborator;
        console.log("mis fecth", collaborator);
        return collaborator;
      }
    } catch (error) {
      Swal.fire("error", error, "error");
    }
  };
};

export const getCollaboratorbyIdBis = async (id) => {
  try {
    const resp = await fetchSinToken(`collaborators/${id}`, {
      collaboratorId: id,
    });

    const body = await resp.json();

    if (body.ok) {
      const collaborator = body.collaborator;

      return collaborator;
    }
  } catch (error) {
    Swal.fire("error", error, "error");
  }
};
