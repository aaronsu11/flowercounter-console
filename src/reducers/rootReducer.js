import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "reducers/authReducer";
import statsCardReducer from "reducers/statsCardReducer";
import tableReducer from "reducers/tableReducer";
import viewReducer from "reducers/viewReducer";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  authState: authReducer,
  statsCardState: statsCardReducer,
  tableState: tableReducer,
  viewState: viewReducer
});
