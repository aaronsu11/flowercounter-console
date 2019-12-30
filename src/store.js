import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
// import { getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";

import rootReducer from "reducers/rootReducer";

// For chrome Redux Dev tool
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const initialState = {
  authState: {},
  statsCardState: {},
  tableState: {},
  viewState: { curView: "vineyardTable" }
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    // Firebase store enhancers
    applyMiddleware(reduxThunk.withExtraArgument({ getFirebase }))
  )
);

export default store;
