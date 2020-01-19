import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";

import register from "assets/img/register.jpeg";
import login from "assets/img/login.jpeg";
import lock from "assets/img/lock.jpeg";
import error from "assets/img/clint-mckoy.jpg";
import pricing from "assets/img/bg-pricing.jpeg";

const useStyles = makeStyles(styles);

function Auth(props) {
  const {
    firebase: { auth, profile },
    authState: { source, homeURL },
    ...rest
  } = props;
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBgImage = () => {
    if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
      return register;
    } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
      return login;
    } else if (window.location.pathname.indexOf("/auth/pricing-page") !== -1) {
      return pricing;
    } else if (
      window.location.pathname.indexOf("/auth/lock-screen-page") !== -1
    ) {
      return lock;
    } else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
      return error;
    }
  };
  const getActiveRoute = routes => {
    let activeRoute = "SRV Flower Counter";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  // Direct to dashboard once logged in
  if (auth.uid && profile.isLoaded) {
    console.log(props.firebase);
    if (source === "home") {
      console.log("From Home");
      window.location =
        homeURL +
        `?uid=${auth.uid}&email=${auth.email}&name=${profile.userName}`;
    } else {
      console.log("From Console");
      return <Redirect to="/admin" />;
    }
  }

  return (
    <div>
      <AuthNavbar
        brandText={getActiveRoute(routes)}
        homeURL={homeURL}
        {...rest}
      />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + getBgImage() + ")" }}
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
          <Footer white />
        </div>
      </div>
    </div>
  );
}

Auth.propTypes = {
  firebase: PropTypes.object,
  authState: PropTypes.object
};

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  {}
)(Auth);
