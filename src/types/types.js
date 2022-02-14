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

  /************* dbUi *********/
  dbUiMenuToggle: "[dbUI] toggle menu",
  dbUiSetMenuState: "[dbUI] set menu state",
  dbUiIsSmallScreen: "[dbUI] is small screen",
  dbUiSetMenuView: "[dbUI] set menu view",

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

export const procedureQuestionsTypes = {
  puppiesNum: "Cantidad de cachorros",
  dogsNum: "Cantidad de perros",
  partnerNum: "Cantidad de socios a inscribir o renovar",
  olderThan3Months: "Los cachorros son mayores de 3 meses",
  transfersNum: "Cantidad de transferencias o cambios de propietario",
  sedationIsNeeded: "Requiere sedación para poder aplicar el tatuaje",
};

export const procedureTypes = {
  pedigree: {
    title: "Pedigrí",
    value: "pedigree",
    questions: [
      {
        name: "puppiesNum",
        question: "Cantidad de cachorros",
        tooltip: "Cantidad de cachorros que se van a registrar.",
        type: "number",
      },
      {
        name: "partnerNum",
        question: "Cantidad de socios a inscribir o renovar",
        tooltip:
          "Los propietarios de los padres deben ser, en lo individual, socios vigentes. En caso de no serlo deberán abonar su inscripción o renovación.",
        type: "number",
      },
      {
        name: "transfersNum",
        question: "Cantidad de transferencias o cambios de propietario",
        tooltip:
          "En caso de que existan endosos en los pedigríes de los padres deberán haberse formalizado ante la FCM. En caso contrario, deberá abonarse también la transferencia.",
        type: "number",
      },
      {
        name: "olderThan3Months",
        question: "Los cachorros son mayores de 3 meses",
        tooltip:
          "Los cachorros siempre deben ser de entre 6 semanas y 8 meses. Pero cuando son mayores de tres meses, el costo es adicional.",
        isBoolean: true,
      },
      {
        name: "sedationIsNeeded",
        question: "Requiere sedación para poder aplicar el tatuaje",
        tooltip: "Los cachorros o perros inquietos podrían necesitar sedación.",
        // type: "number",
        isBoolean: true,
      },
    ],
  },
  racePurity: {
    title: "Pureza racial",
    value: "racePurity",
    questions: [
      {
        name: "puppiesNum",
        question: "Cantidad de cachorros",
        tooltip: "Cantidad de cachorros que se van a registrar.",
        type: "number",
      },
      {
        name: "partnerNum",
        question: "Cantidad de socios a inscribir o renovar",
        tooltip:
          "Los propietarios de los padres deben ser, en lo individual, socios vigentes. En caso de no serlo deberán abonar su inscripción o renovación.",
        type: "number",
      },
      {
        name: "transfersNum",
        question: "Cantidad de transferencias o cambios de propietario",
        tooltip:
          "En caso de que existan endosos en los pedigríes de los padres deberán haberse formalizado ante la FCM. En caso contrario, deberá abonarse también la transferencia.",
        type: "number",
      },
      {
        name: "olderThan3Months",
        question: "Los cachorros son mayores de 3 meses",
        tooltip:
          "Los cachorros siempre deben ser de entre 6 semanas y 8 meses. Pero cuando son mayores de tres meses, el costo es adicional.",
        isBoolean: true,
      },
      {
        name: "sedationIsNeeded",
        question: "Requiere sedación para poder aplicar el tatuaje",
        tooltip: "Los cachorros o perros inquietos podrían necesitar sedación.",
        isBoolean: true,
      },
    ],
  },
  initialRacePurity: {
    title: "Pureza racial Inicial",
    value: "initialRacePurity",
    questions: [
      {
        name: "partnerNum",
        question: "Cantidad de socios a inscribir o renovar",
        tooltip:
          "El propio deberá ser socio vigente. En caso de no serlo deberá abonar su inscripción o renovación.",
        type: "number",
      },
      {
        name: "sedationIsNeeded",
        question: "Requiere sedación para poder aplicar el tatuaje",
        tooltip: "Los cachorros o perros inquietos podrían necesitar sedación.",

        isBoolean: true,
      },
    ],
  },
  initialRegister: {
    title: "Registro inicial",
    value: "initialRegister",
    questions: [
      {
        name: "partnerNum",
        question: "Cantidad de socios a inscribir o renovar",
        tooltip:
          "Los propietarios de los padres deben ser, en lo individual, socios vigentes. En caso de no serlo deberán abonar su inscripción o renovación.",
        type: "number",
      },
      {
        name: "olderThan3Months",
        question: "El cachorro es mayor de 3 meses",
        tooltip:
          "El cachorro siempre debe ser de entre 6 semanas y 6 meses. Pero cuando son mayores de tres meses, el costo es adicional.",
        isBoolean: true,
      },
      {
        name: "sedationIsNeeded",
        question: "Requiere sedación para poder aplicar el tatuaje",
        tooltip: "Los cachorros o perros inquietos podrían necesitar sedación.",

        isBoolean: true,
      },
    ],
  },
  contestCertificate: {
    title: "Certificado para concurso",
    value: "contestCertificate",
    questions: [
      {
        name: "partnerNum",
        question: "Cantidad de socios a inscribir o renovar",
        tooltip:
          "El propietario deberá ser socio vigente. En caso de no serlo deberá abonar su inscripción o renovación.",
        type: "number",
      },
      {
        name: "olderThan3Months",
        question: "El perro es mayor de 3 meses",
        tooltip:
          "Los perros deben ser mayores a 6 semanas y menores de 10 años, pero el costo para los mayores de 3 meses es superior.",
        isBoolean: true,
      },
      {
        name: "sedationIsNeeded",
        question: "Requiere sedación para poder aplicar el tatuaje",
        tooltip: "Los cachorros o perros inquietos podrían necesitar sedación.",

        isBoolean: true,
      },
    ],
  },
  transfer: {
    title: "Cambio de propietario o transferencia",
    value: "transfer",
    questions: [
      {
        name: "transfersNum",
        question: "Cantidad de transferencias o cambios de propietario",
        tooltip:
          "En caso de que existan endosos en los pedigríes de los padres deberán haberse formalizado ante la FCM. En caso contrario, deberá abonarse también la transferencia.",
        type: "number",
      },
    ],
  },
  partnership: {
    title: "Alta o renovación de membresía FCM",
    value: "partnership",
    questions: [
      {
        name: "partnerNum",
        question: "Cantidad de socios a inscribir o renovar",
        tooltip:
          "Los propietarios de los padres deben ser, en lo individual, socios vigentes. En caso de no serlo deberán abonar su inscripción o renovación.",
        type: "number",
      },
    ],
  },
};
