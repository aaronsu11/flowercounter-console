/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Aaron Su

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ReactReduxFirebaseProvider, isLoaded } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import store from "store";
import firebase from "config/firebaseConfig";
import { rrfConfig } from "config/config";

import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import AuthLayout from "layouts/Auth.js";
// import RtlLayout from "layouts/RTL.js";
import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();

// react-redux-firebase props
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div>Loading, please wait...</div>;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router history={hist}>
        <AuthIsLoaded>
          <Switch>
            {/* <PrivateRoute path="/rtl">
              <RtlLayout />
            </PrivateRoute> */}
            <Route path="/auth" component={AuthLayout} />
            <PrivateRoute path="/admin">
              <AdminLayout />
            </PrivateRoute>
            <Redirect exact from="/" to="/admin/dashboard" />
            <Redirect to="/auth/error-page" />
          </Switch>
        </AuthIsLoaded>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
