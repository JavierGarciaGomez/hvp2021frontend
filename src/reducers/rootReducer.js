import { combineReducers } from "redux";
import { activityRegisterReducer } from "./activityRegisterReducer";
import { authLogReducer } from "./authLogReducer";
import { authReducer } from "./authReducer";
import { cleanUpsReducer } from "./cleanUpsReducer";
import { clientsReducer } from "./clientsReducer";
import { collaboratorReducer } from "./collaboratorReducer";
import { dbUiReducer } from "./dbUiReducer";
import { documentationReducer } from "./documentationReducer";
import { miscReducer } from "./miscReducer";
import { rfcReducer } from "./rfcReducer";
import { userReducer } from "./userReducer";
// import { authReducer } from "./collaboratorReducer";
// import { calendarReducer } from "./calendarReducer";
// import { uiReducer } from "./uiReducer";
export const rootReducer = combineReducers({
  activityRegister: activityRegisterReducer,
  auth: authReducer,
  authLogs: authLogReducer,
  cleanups: cleanUpsReducer,
  clients: clientsReducer,
  collaborator: collaboratorReducer,
  documentation: documentationReducer,
  dbUi: dbUiReducer,
  misc: miscReducer,
  rfc: rfcReducer,
  users: userReducer,
});
