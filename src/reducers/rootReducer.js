import { combineReducers } from "redux";

import authReducer from "reducers/authReducer";
import statsCardReducer from "reducers/statsCardReducer";
import tableReducer from "reducers/tableReducer";
import viewReducer from "reducers/viewReducer";

export default combineReducers({
  authState: authReducer,
  statsCardState: statsCardReducer,
  tableState: tableReducer,
  viewState: viewReducer
});
