import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { collaboratorReducer } from "./collaboratorReducer";
// import { authReducer } from "./collaboratorReducer";
// import { calendarReducer } from "./calendarReducer";
// import { uiReducer } from "./uiReducer";
export const rootReducer = combineReducers({
  collaborator: collaboratorReducer,
  // ui: uiReducer,
  // calendar: calendarReducer,
  auth: authReducer,
});
