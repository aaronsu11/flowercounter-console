import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import { getVineyardTableAction } from "actions/tableActions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

function Browser(props) {
  const classes = useStyles();
  const { tableState, getVineyardTable } = props;
  useEffect(() => {
    // console.log("getting table");
    getVineyardTable(0);
  }, [getVineyardTable]);

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="success" icon>
            <CardIcon color="success">
              <ViewList />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>List</h4>
          </CardHeader>
          <CardBody>
            {tableState && tableState.dataTable ? (
              <DynamicReactTable dataTable={tableState.dataTable} />
            ) : (
              <div></div>
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Browser.propTypes = {
  tableState: PropTypes.object,
  getVineyardTable: PropTypes.func
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  getVineyardTable: token => dispatch(getVineyardTableAction(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browser);
