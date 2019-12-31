import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import {
  viewVineyardTableAction,
  viewBlockTableAction,
  viewDatasetTableAction
} from "actions/viewActions";
import { refreshTableAction } from "actions/tableActions";

// @material-ui/core
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function DynamicBreadcrumbs(props) {
  const {
    viewState,
    refreshTable,
    viewVineyardTable,
    viewBlockTable,
    viewDatasetTable
  } = props;
  const { curView } = viewState;

  const viewMap = {
    vineyardTable: 0,
    blockTable: 1,
    datasetTable: 2,
    imageTable: 3
  };

  let tableTitle = curView.replace(/^./, curView[0].toUpperCase());
  tableTitle = tableTitle.split("T", 1) + "s";

  const handleClick = (event, view) => {
    event.preventDefault();
    refreshTable();
    switch (view) {
      case "vineyard":
        console.log("view block table");
        viewVineyardTable();
        break;
      case "block":
        console.log("view block table");
        viewBlockTable(viewState.curVineyard);
        break;
      case "dataset":
        console.log("view dataset table");
        viewDatasetTable(viewState.curBlock);
        break;
      default:
        console.log("loss track");
        break;
    }
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        href="/"
        onClick={e => {
          handleClick(e, "vineyard");
        }}
      >
        ...
      </Link>
      {viewMap[curView] > viewMap["vineyardTable"] ? (
        <Link
          color="inherit"
          href="/"
          onClick={e => {
            handleClick(e, "block");
          }}
        >
          {viewState.curVineyard}
        </Link>
      ) : null}
      {viewMap[curView] > viewMap["blockTable"] ? (
        <Link
          color="inherit"
          href="/"
          onClick={e => {
            handleClick(e, "dataset");
          }}
        >
          {viewState.curBlock}
        </Link>
      ) : null}
      {viewMap[curView] > viewMap["datasetTable"] ? (
        <Link
          color="inherit"
          href="/"
          onClick={e => {
            handleClick(e, "dataset");
          }}
        >
          {viewState.curDataset}
        </Link>
      ) : null}
      <Typography color="textPrimary">{tableTitle}</Typography>
    </Breadcrumbs>
  );
}

DynamicBreadcrumbs.propTypes = {
  viewState: PropTypes.object,
  refreshTable: PropTypes.func,
  viewVineyardTable: PropTypes.func,
  viewBlockTable: PropTypes.func,
  viewDatasetTable: PropTypes.func
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  refreshTable: () => dispatch(refreshTableAction()),
  viewVineyardTable: () => dispatch(viewVineyardTableAction()),
  viewBlockTable: vineyard => dispatch(viewBlockTableAction(vineyard)),
  viewDatasetTable: block => dispatch(viewDatasetTableAction(block))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicBreadcrumbs);
