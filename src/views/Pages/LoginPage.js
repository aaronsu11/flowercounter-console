import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import queryString from "query-string";

// redux actions
import { loginAction } from "actions/authActions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  // Parse URL query or default to "console"
  const [source] = React.useState(
    queryString.parse(props.location.search).source || "console"
  );

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const onEmailChange = email => {
    setEmail(email);
  };
  const onPasswordChange = password => {
    setPassword(password);
  };
  const handleLogin = () => {
    props.login(source, email, password);
  };
  const handleKeyPress = key => {
    if (key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>
                {/* <CustomInput
                  labelText="First Name.."
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                /> */}
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onEmailChange(e.target.value),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => onPasswordChange(e.target.value),
                    onKeyPress: e => handleKeyPress(e.key),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button
                  color="rose"
                  simple
                  size="lg"
                  block
                  onClick={handleLogin}
                >
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

LoginPage.propTypes = {
  login: PropTypes.func,
  match: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  login: (source, email, password) =>
    dispatch(loginAction(source, email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
