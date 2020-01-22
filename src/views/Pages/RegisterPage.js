import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import queryString from "query-string";

// redux actions
import { registerAction } from "actions/authActions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";
import ErrorOutline from "@material-ui/icons/ErrorOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Snackbars from "components/Snackbar/Snackbar.js";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function RegisterPage(props) {
  const {
    authState: { authError }
  } = props;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const [error, setError] = React.useState("");
  const [tl, setTl] = React.useState(false);
  // Parse URL query or default to "console"
  const [source] = React.useState(
    queryString.parse(props.location.search).source || "console"
  );

  React.useEffect(() => {
    if (authError) {
      setError(authError.message);
      setTl(true);
    }
  }, [authError]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const classes = useStyles();
  const onNameChange = name => {
    setName(name);
  };
  const onEmailChange = email => {
    setEmail(email);
  };
  const onPasswordChange = password => {
    setPassword(password);
  };
  const validateForm = () => {
    if (!name) {
      setError("Please fill in your name");
      return false;
    }
    if (!email) {
      setError("Please fill in your email");
      return false;
    }
    if (!password) {
      setError("Please fill in your password");
      return false;
    }
    if (!checked[0]) {
      setError("Please agree to Terms and Conditions");
      return false;
    }
    return true;
  };
  return (
    <div className={classes.container}>
      <Snackbars
        place="bc"
        color="danger"
        message={error}
        open={tl}
        closeNotification={() => setTl(false)}
        close
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Register</h2>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={5}>
                  <InfoArea
                    title="Responsive Interface"
                    description="Upload images and get processed results in real-time"
                    icon={Code}
                    iconColor="primary"
                  />
                  <InfoArea
                    title="Database interaction"
                    description="Log-in to your console, enjoy seamless interactions with your data and generate reports"
                    icon={Timeline}
                    iconColor="rose"
                  />
                  <InfoArea
                    title="Customizable"
                    description="Contact us for fully customizable Image Processing Algorithm and Admin Dashboard"
                    icon={Group}
                    iconColor="info"
                  />
                </GridItem>
                <GridItem xs={12} sm={8} md={5}>
                  <div className={classes.center}>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    {` `}
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                    {` `}
                    <Button justIcon round color="facebook">
                      <i className="fab fa-facebook-f" />
                    </Button>
                    {` `}
                    <h4 className={classes.socialTitle}>or be classical</h4>
                  </div>
                  <form className={classes.form}>
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: e => onNameChange(e.target.value),
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Name..."
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: e => onEmailChange(e.target.value),
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Email..."
                      }}
                    />
                    <CustomInput
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        type: "password",
                        onChange: e => onPasswordChange(e.target.value),
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        placeholder: "Password..."
                      }}
                    />
                    <FormControlLabel
                      classes={{
                        root: classes.checkboxLabelControl,
                        label: classes.checkboxLabel
                      }}
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(1)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      label={
                        <span>
                          I agree to the{" "}
                          <a href="#pablo">terms and conditions</a>.
                        </span>
                      }
                    />
                    <div className={classes.center}>
                      <Button
                        round
                        color="primary"
                        onClick={() => {
                          if (validateForm()) {
                            // console.log("Good");
                            props.register(source, name, email, password);
                          } else {
                            setTl(true);
                          }
                        }}
                      >
                        Get started
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Snackbars
            place="bc"
            color="danger"
            icon={ErrorOutline}
            message={error}
            open={tl}
            closeNotification={() => setTl(false)}
            close
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

RegisterPage.propTypes = {
  authState: PropTypes.object,
  register: PropTypes.func,
  location: PropTypes.object
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  register: (source, name, email, password) =>
    dispatch(registerAction(source, name, email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
