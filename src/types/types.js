// 318
export const types = {
  /************* Collaborator *********/
  collaboratorCreateNew: "[collaborator] add new",
  collaboratorsLoaded: "[collaborator] loaded",
  collaboratorSetActive: "[collaborator] set active",
  collaboratorUpdate: "[collaborator] update",
  collaboratorIsLoading: "[collaborator] is loading",
  collaboratorFinishedLoading: "[collaborator] finished loading",

  /************* Auth *********/
  authLogin: "[auth] login",
  authCheckingFinish: "[auth] finish checking login state",
  authLogout: "[auth] logout",

  /************* Cleanups *********/

  lastMonthCleanUpsLoaded: "[cleanUps] last month cleanups loaded",

  dailyCleanUpsIsLoading: "[cleanUps] daily cleanups is loading",
  dailyCleanUpsLoaded: "[cleanUps] daily cleanups loaded",

  deepCleanUpsIsLoading: "[cleanUps] deep cleanups is loading",
  deepCleanUpsLoaded: "[cleanUps] deep cleanups loaded",
  deepCleanUpsSetActive: "[deepCleanUps] set active",

  operatingRoomCleanUpsIsLoading: "[cleanups] operating room is loading",
  operatingRoomCleanUpsLoaded: "[cleanups] operating room cleanups loaded",

  /************* RFC *********/
  rfcIsLoading: "[rfc] rfc is loading",
  rfcLoaded: "[rfc] rfc is loaded",

  /************* User *********/
  userSetActive: "[User] set active",
  userUpdate: "[user] update",
  usersLoaded: "[user] loaded",
  usersIsLoading: "[user] is loading",
  usersFinishedLoading: "[user] finished loading",

  /************* AuthLogs *********/
  authLogsLoaded: "[authLogs] loaded",
  authLogsIsLoading: "[authLogs] is loading",
  authLogsFinishedLoading: "[authLogs] finished loading",

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
  manager: "Gerente",
  veterinaryA: "Veterinario A",
  veterinaryB: "Veterinario B",
  assistantA: "Asistente veterinario A",
  assistantB: "Asistente veterinario B",
  receptionist: "Recepcionista",
  consultant: "Asesor",
};

export const cleanUpActions = {
  addCleaner: "addCleaner",
  addSupervisor: "addSupervisor",
  addComment: "addComment",
};

export const deepCleanUpActivities = {
  correctOrder: "Orden conforme a los lineamientos",
  wasteDisposal: "Objetos inservibles y residuos desechados",
  cleanedEquipment: "Equipamiento limpiado",
  cleanedCages: "Jaulas limpias",
  cleanedDrawers: "Gavetas limpias y bien acomodadas",
  cleanedRefigerator: "Refrigerador limpio y sin residuos o sobrantes",
  everyAreaCleaned: "Limpieza y orden completa de todas las áreas",
};
