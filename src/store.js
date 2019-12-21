import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "reducers/rootReducer";

function configureStore(
  state = {
    authState: {},
    statsCardState: {},
    tableState: {},
    viewState: { curView: "vineyardTable" }
  }
) {
  return createStore(rootReducer, state, applyMiddleware(reduxThunk));
}

export default configureStore;
