import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import {
  addStatsCardAction,
  getAllStatsCardsAction
} from "actions/statsCardActions";

import { getVineyardTableAction } from "actions/tableActions";

// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
// import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Tooltip from "@material-ui/core/Tooltip";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import CameraAlt from "@material-ui/icons/CameraAlt";
// import ContentCopy from "@material-ui/icons/ContentCopy";
// import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Refresh from "@material-ui/icons/Refresh";
// import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
// import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Table from "components/Table/Table.js";
// import Button from "components/CustomButtons/Button.js";
// import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardIcon from "components/Card/CardIcon.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import { dailySalesChart } from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();
  // potential problem with func dependency
  const {
    firebase: { auth },
    tableState,
    getVineyardTable
  } = props;
  useEffect(() => {
    // console.log("getting table");
    getVineyardTable(auth.uid);
  }, [getVineyardTable, auth.uid]);

  // const { statsCardState, getAllStatsCards } = props;
  // useEffect(() => {
  //   getAllStatsCards();
  // }, [getAllStatsCards]);

  return (
    <div>
      <h3>Vineyard List</h3>
      <br />
      <GridContainer>
        {tableState && tableState.dataTable ? (
          tableState.dataTable.dataRows.map((prop, key) => {
            // let color = prop.color === "default" ? "success" : prop.color;
            let color = "success";
            let latestRecord =
              typeof prop[1] === "string" || prop[1] instanceof String
                ? prop[1]
                : prop[1].toString();
            return (
              <GridItem xs={12} sm={6} md={6} lg={3} key={key}>
                <Card>
                  <CardHeader color={color} text>
                    <CardText color={color}>
                      <h4 className={classes.cardSubtitle}>{prop[0]}</h4>
                      {/* <p className="card-category">{prop.subtitle}</p> */}
                    </CardText>
                  </CardHeader>
                  <CardBody>
                    <h3 className={classes.cardCategory}>
                      {prop[2]} <small>Blocks</small>
                    </h3>
                    {/* <br />
                    <p>Click here to add notes...</p> */}
                  </CardBody>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <CameraAlt /> Latest Dataset: {latestRecord}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })
        ) : (
          <CircularProgress />
        )}
        {/* <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        {/* <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}

Dashboard.propTypes = {
  firebase: PropTypes.object,
  tableState: PropTypes.object,
  getVineyardTable: PropTypes.func,
  statsCardState: PropTypes.object,
  getAllStatsCards: PropTypes.func
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  getVineyardTable: token => dispatch(getVineyardTableAction(token)),
  addStatsCard: (
    statsName,
    statsDescription,
    statsIcon,
    statsIconColor,
    statsFooterIcon,
    statsFooterIconState,
    statsFooterPercentage,
    statsFooterText
  ) =>
    dispatch(
      addStatsCardAction(
        statsName,
        statsDescription,
        statsIcon,
        statsIconColor,
        statsFooterIcon,
        statsFooterIconState,
        statsFooterPercentage,
        statsFooterText
      )
    ),
  getAllStatsCards: () => dispatch(getAllStatsCardsAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
