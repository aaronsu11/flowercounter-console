import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import {
  refreshTableAction,
  getVineyardTableAction,
  getBlockTableAction,
  getDatasetTableAction,
  getImageTableAction
} from "actions/tableActions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import DynamicReactTable from "components/Table/DynamicReactTable";
import DynamicBreadcrumbs from "components/Breadcrumbs/DynamicBreadcrumbs";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  dynamicTableRows: {
    alignItems: "center",
    justifyContent: "center"
    // textAlign: "center"
  }
};

const useStyles = makeStyles(styles);

function Browser(props) {
  const classes = useStyles();
  const {
    firebase: { auth },
    tableState,
    viewState,
    // refreshTable,
    getVineyardTable,
    getBlockTable,
    getDatasetTable,
    getImageTable
  } = props;

  const [firstMount, setMount] = useState(true);
  useEffect(() => {
    setMount(false);
  }, []);

  useEffect(() => {
    let token = auth.uid;
    switch (viewState.curView) {
      case "blockTable":
        console.log("getting block table");
        getBlockTable(token, viewState.curVineyard);
        break;
      case "datasetTable":
        console.log("getting dataset table");
        getDatasetTable(token, viewState.curVineyard, viewState.curBlock);
        break;
      case "imageTable":
        console.log("getting image table");
        getImageTable(
          token,
          viewState.curVineyard,
          viewState.curBlock,
          viewState.curDataset
        );
        break;
      default:
        console.log("default to vineyard table");
        getVineyardTable(token);
        break;
    }
  }, [
    auth.uid,
    viewState,
    getVineyardTable,
    getBlockTable,
    getDatasetTable,
    getImageTable
  ]);

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="success" icon>
            <CardIcon color="success">
              <ViewList />
            </CardIcon>
            <div className={classes.cardIconTitle}>
              <DynamicBreadcrumbs />
            </div>
          </CardHeader>
          <CardBody className={classes.dynamicTableRows}>
            {!firstMount && tableState && tableState.dataTable ? (
              <DynamicReactTable dataTable={tableState.dataTable} />
            ) : (
              <CircularProgress />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Browser.propTypes = {
  firebase: PropTypes.object,
  tableState: PropTypes.object,
  viewState: PropTypes.object,
  refreshTable: PropTypes.func,
  getVineyardTable: PropTypes.func,
  getBlockTable: PropTypes.func,
  getDatasetTable: PropTypes.func,
  getImageTable: PropTypes.func
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  refreshTable: () => dispatch(refreshTableAction()),
  getVineyardTable: token => dispatch(getVineyardTableAction(token)),
  getBlockTable: (token, vineyard) =>
    dispatch(getBlockTableAction(token, vineyard)),
  getDatasetTable: (token, vineyard, block) =>
    dispatch(getDatasetTableAction(token, vineyard, block)),
  getImageTable: (token, vineyard, block, dataset) =>
    dispatch(getImageTableAction(token, vineyard, block, dataset))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browser);
