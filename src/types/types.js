// 318
export const types = {
  // collaborator
  collaboratorCreateNew: "[collaborator] add new",
  collaboratorsLoaded: "[collaborator] loaded",
  collaboratorSetActive: "[collaborator] set active",
  collaboratorUpdate: "[collaborator] update",
  collaboratorIsLoading: "[collaborator] is loading",
  collaboratorFinishedLoading: "[collaborator] finished loading",

  authLogin: "[auth] login",
  authCheckingFinish: "[auth] finish checking login state",
  authLogout: "[auth] logout",

  dailyCleanUpsIsLoading: "[cleanUps] daily clean ups is loading",
  dailyCleanUpsLoaded: "[cleanUps] daily clean ups loaded",

  /*
  uiOpenModal: "[ui] Open modal",
  uiCloseModal: "[ui] Close modal",
  eventSetActive: "[event] Set active",
  eventStartAddNew: "[event] Add new",
  eventAddNew: "[event] Add new",
  eventClearActiveEvent: "[event] Clear active event",
  eventUpdate: "[event] Event update",
  eventDelete: "[event] Event delete",
  eventsLoaded: "[event] Events loaded",
  eventLogout: "[event] Events logout",

  // 366
  authCheckingFinish: "[auth] Finish checking login state",
  authStartLogin: "[auth] Start login",
  authLogin: "[auth] Login",
  authStartRegister: "[auth] Start Register",
  authStartStartTokenRenew: "[auth] Start token renew",
  
  */
};

export const genderTypes = {
  male: "Masculino",
  female: "Femenino",
  transgender: "Transgénero",
  nonBinary: "No binario",
  other: "Otro",
};

export const roleTypes = {
  admin: "Administrador",
  manager: "Gerente",
  collaborator: "Colaborador",
  user: "User",
  guest: "Invitado",
};

export const positionTypes = {
  medicalDirector: "Director médico",
  adminDirector: "Director administrativo",
  veterinaryA: "Veterinario A",
  veterinaryB: "Veterinario B",
  assistantA: "Asistente veterinario A",
  assistantB: "Asistente veterinario B",
  receptionist: "Recepcionista",
  consultant: "Asesor",
};

export const dailyCleanUpActions = {
  addCleaner: "addCleaner",
  addSupervisor: "addSupervisor",
  addComment: "addComment",
};
