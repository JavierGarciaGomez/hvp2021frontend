import { combineReducers } from "redux";
import { activityRegisterReducer } from "./activityRegisterReducer";
import { authLogReducer } from "./authLogReducer";
import { authReducer } from "./authReducer";
import { cleanUpsReducer } from "./cleanUpsReducer";
import { collaboratorReducer } from "./collaboratorReducer";
import { dbUiReducer } from "./dbUiReducer";
import { miscReducer } from "./miscReducer";
import { rfcReducer } from "./rfcReducer";
import { userReducer } from "./userReducer";
// import { authReducer } from "./collaboratorReducer";
// import { calendarReducer } from "./calendarReducer";
// import { uiReducer } from "./uiReducer";
export const rootReducer = combineReducers({
  collaborator: collaboratorReducer,
  auth: authReducer,
  cleanups: cleanUpsReducer,
  rfc: rfcReducer,
  users: userReducer,
  authLogs: authLogReducer,
  dbUi: dbUiReducer,
  activityRegister: activityRegisterReducer,
  misc: miscReducer,
});
