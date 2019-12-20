import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import { getVineyardTableAction } from "actions/tableActions";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
// import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

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
  const [data, setData] = React.useState({});
  const classes = useStyles();
  const { tableState, getVineyardTable } = props;
  useEffect(() => {
    // console.log("getting table");
    getVineyardTable(0);
  }, [getVineyardTable]);
  useEffect(() => {
    tableState &&
      tableState.dataTable &&
      tableState.dataTable.dataRows &&
      setData(
        tableState.dataTable.dataRows.map((prop, key) => {
          return {
            id: key,
            name: prop[0],
            time: prop[1],
            feature: prop[2],
            stats: prop[3],
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = data.find(o => o.id === key);
                    alert(
                      "You've clicked LIKE button on \n{ \nName: " +
                        obj.name +
                        ", \ntime: " +
                        obj.time +
                        ", \nfeature: " +
                        obj.feature +
                        ", \nstats: " +
                        obj.stats +
                        "\n}."
                    );
                  }}
                  color="info"
                  className="like"
                >
                  <Favorite />
                </Button>{" "}
                {/* use this button to add a edit kind of action */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    let obj = data.find(o => o.id === key);
                    alert(
                      "You've clicked EDIT button on \n{ \nName: " +
                        obj.name +
                        ", \ntime: " +
                        obj.time +
                        ", \nfeature: " +
                        obj.feature +
                        ", \nstats: " +
                        obj.stats +
                        "\n}."
                    );
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>{" "}
                {/* use this button to remove the data row */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    var newData = data;
                    newData.find((o, i) => {
                      if (o.id === key) {
                        // here you should add some custom code so you can delete the data
                        // from this component and from your server as well
                        newData.splice(i, 1);
                        return true;
                      }
                      return false;
                    });
                    setData([...newData]);
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>{" "}
              </div>
            )
          };
        })
      );
  }, [tableState]);

  let dataProps = data[0] ? { data: data } : null;
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
            <ReactTable
              // data={data}
              {...dataProps}
              filterable
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Time",
                  accessor: "time"
                },
                {
                  Header: "Feature",
                  accessor: "feature"
                },
                {
                  Header: "Stats",
                  accessor: "stats"
                },
                {
                  Header: "",
                  accessor: "actions",
                  sortable: false,
                  filterable: false
                }
              ]}
              defaultPageSize={10}
              showPaginationTop
              showPaginationBottom={false}
              className="-striped -highlight"
            />
            )
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
