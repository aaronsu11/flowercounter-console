import { combineReducers } from "redux";

import authReducer from "reducers/authReducer";
import statsCardReducer from "reducers/statsCardReducer";

export default combineReducers({
  authState: authReducer,
  statsCardState: statsCardReducer
});
