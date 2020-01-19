/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href={props.homeURL} target="_blank" className={block}>
                {rtlActive ? "الصفحة الرئيسية" : "Home"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="http://www.robotics.unsw.edu.au/srv/" target="_blank" className={block}>
                {rtlActive ? "شركة" : "Company"}
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#about" className={block}>
                {rtlActive ? "بعدسة" : "About"}
              </a>
            </ListItem>
            {/* <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={block}>
                {rtlActive ? "مدونة" : "Blog"}
              </a>
            </ListItem> */}
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="http://www.robotics.unsw.edu.au/srv/"
            className={anchor}
            target="_blank"
          >
            {rtlActive ? "توقيت الإبداعية" : "Smart Robotic Viticulture"}
          </a>
          {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : ", let's make your vineyard smarter."}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
  homeURL: PropTypes.string
};
