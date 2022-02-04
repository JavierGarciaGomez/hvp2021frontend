import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { cleanUpsReducer } from "./cleanUpsReducer";
import { collaboratorReducer } from "./collaboratorReducer";
import { rfcReducer } from "./rfcReducer";
// import { authReducer } from "./collaboratorReducer";
// import { calendarReducer } from "./calendarReducer";
// import { uiReducer } from "./uiReducer";
export const rootReducer = combineReducers({
  collaborator: collaboratorReducer,
  // ui: uiReducer,
  // calendar: calendarReducer,
  auth: authReducer,
  cleanups: cleanUpsReducer,
  rfc: rfcReducer,
});
