import { combineReducers } from "redux";

import authReducer from "reducers/authReducer";
import statsCardReducer from "reducers/statsCardReducer";
import tableReducer from "reducers/tableReducer";

export default combineReducers({
  authState: authReducer,
  statsCardState: statsCardReducer,
  tableState: tableReducer
});
