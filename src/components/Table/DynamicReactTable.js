import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import {
  viewBlockTableAction,
  viewDatasetTableAction,
  viewImageTableAction
} from "actions/viewActions";
import { refreshTableAction } from "actions/tableActions";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/icons
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components

import Button from "components/CustomButtons/Button.js";

function DynamicReactTable(props) {
  //  getting redux props
  const {
    viewState,
    refreshTable,
    viewBlockTable,
    viewDatasetTable,
    viewImageTable
  } = props;
  //  getting component props
  const { dataRows, headers, accessors } = props.dataTable;
  const [data, setData] = React.useState(
    dataRows.map((prop, key) => {
      const dataRow = {
        id: key,
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
                  "You've clicked LIKE button on \n{ \nRow: " + obj.id + "\n}."
                );
              }}
              color="info"
              className="like"
            >
              <Favorite />
            </Button>
            {/* use this button to add a edit kind of action */}
            {viewState.curView !== "imageTable" ? (
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  // let obj = data.find(o => o.id === key);
                  // alert(
                  //   "You've clicked EDIT button on \n{ \nRow: " + obj.id + "\n}."
                  // );
                  refreshTable();
                  switch (viewState.curView) {
                    case "vineyardTable":
                      console.log("view block table");
                      viewBlockTable(prop[0]);
                      break;
                    case "blockTable":
                      console.log("view dataset table");
                      viewDatasetTable(prop[0]);
                      break;
                    case "datasetTable":
                      console.log("view image table");
                      viewImageTable(prop[0]);
                      break;
                    default:
                      console.log("loss track");
                      break;
                  }
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>
            ) : null}
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
            </Button>
          </div>
        )
      };
      // extract the accessors from fetched data and dynamically assign to row
      accessors.map((accessor, key) => {
        dataRow[accessor] = prop[key];
        return true;
      });
      // modified row
      return dataRow;
    })
  );
  useEffect(() => {
    console.log("Mount");
    return () => {
      console.log("Unmount");
    };
  }, []);
  const columns = headers.map((header, key) => {
    // console.log(header.replace(/^\w/, c => c.toUpperCase()));
    return {
      Header: header,
      accessor: accessors[key]
    };
  });

  return (
    <ReactTable
      data={data}
      filterable
      columns={[
        ...columns,
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
  );
}

DynamicReactTable.defaultProps = {
  dataTable: { headers: [], dataRows: [] }
};

DynamicReactTable.propTypes = {
  dataTable: PropTypes.object,
  viewState: PropTypes.object,
  refreshTable: PropTypes.func,
  viewBlockTable: PropTypes.func,
  viewDatasetTable: PropTypes.func,
  viewImageTable: PropTypes.func
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  refreshTable: () => dispatch(refreshTableAction()),
  viewBlockTable: vineyard => dispatch(viewBlockTableAction(vineyard)),
  viewDatasetTable: block => dispatch(viewDatasetTableAction(block)),
  viewImageTable: dataset => dispatch(viewImageTableAction(dataset))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicReactTable);
