import { useGridReducer } from "@material-ui/data-grid";
import { combineReducers } from "redux";
import { authLogReducer } from "./authLogReducer";
import { authReducer } from "./authReducer";
import { cleanUpsReducer } from "./cleanUpsReducer";
import { collaboratorReducer } from "./collaboratorReducer";
import { rfcReducer } from "./rfcReducer";
import { userReducer } from "./userReducer";
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
  users: userReducer,
  authLogs: authLogReducer,
});
