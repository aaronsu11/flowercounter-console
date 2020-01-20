import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// redux actions
import {
  viewBlockTableAction,
  viewDatasetTableAction,
  viewImageTableAction
} from "actions/viewActions";
import { refreshTableAction, deleteRecordAction } from "actions/tableActions";

// react component for creating dynamic tables
import ReactTable from "react-table";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Warning from "components/Typography/Warning.js";
// @material-ui/icons
// import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/modalStyle.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function DynamicReactTable(props) {
  //  getting redux props
  const {
    viewState: { curView, curVineyard, curBlock, curDataset },
    firebase: { auth },
    refreshTable,
    deleteRecord,
    viewBlockTable,
    viewDatasetTable,
    viewImageTable
  } = props;
  //  getting component props
  const { dataRows, headers, accessors } = props.dataTable;

  const handleViewChange = dataRow => {
    refreshTable();
    switch (curView) {
      case "vineyardTable":
        console.log("view block table");
        viewBlockTable(dataRow[0]);
        break;
      case "blockTable":
        console.log("view dataset table");
        viewDatasetTable(dataRow[0]);
        break;
      case "datasetTable":
        console.log("view image table");
        viewImageTable(dataRow[6]); //access the hidden batchid
        break;
      default:
        console.log("lost track");
        break;
    }
  };

  const handleDelete = () => {
    if (dataRows[rowKey]) {
      // Delete table row display
      let newData = data;
      newData.find((o, i) => {
        if (o.id === rowKey) {
          // here you should add some custom code so you can delete the data
          // from this component and from your server as well
          newData.splice(i, 1);
          return true;
        }
        return false;
      });
      setData([...newData]);
      // Delete record on server
      let i = accessors.indexOf("name");
      let id =
        curView === "datasetTable" ? dataRows[rowKey][6] : dataRows[rowKey][i];
      let target = {
        uid: auth.uid,
        type: curView.split("T", 1)[0],
        vineyard: curVineyard,
        block: curBlock,
        dataset: curDataset,
        name: id
      };
      deleteRecord(target);
    } else {
      alert("Error, reloading");
      refreshTable();
    }
    setModal(false);
  };

  const classes = useStyles();

  const [modal, setModal] = React.useState(false);
  const [rowKey, setRowKey] = React.useState();
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
            {/* {curView !== "imageTable" ? (
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  // let obj = data.find(o => o.id === key);
                  // alert(
                  //   "You've clicked EDIT button on \n{ \nRow: " + obj.id + "\n}."
                  // );
                  handleViewChange(prop);
                }}
                color="warning"
                className="edit"
              >
                <Dvr />
              </Button>
            ) : null} */}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => {
                setModal(true);
                setRowKey(key);
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
        if (accessor === "name") {
          let link = (
            <Button color="success" onClick={() => handleViewChange(prop)}>
              {prop[key]}
            </Button>
          );
          dataRow[accessor] = link;
        } else {
          dataRow[accessor] = prop[key];
        }

        return true;
      });
      // modified row
      return dataRow;
    })
  );
  // useEffect(() => {
  //   console.log("Mount");
  //   return () => {
  //     console.log("Unmount");
  //   };
  // }, []);
  const columns = headers.map((header, key) => {
    // console.log(header.replace(/^\w/, c => c.toUpperCase()));
    return {
      Header: header,
      accessor: accessors[key]
    };
  });

  return (
    <div>
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
      <div>
        {/* <Button color="rose" round onClick={() => setModal(true)}>
          Modal
        </Button> */}
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          transition={Transition}
          keepMounted
          onClose={() => setModal(false)}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => setModal(false)}
            >
              <Close className={classes.modalClose} />
            </Button>
            <Warning>
              <h3 className={classes.modalTitle}>Warning</h3>
            </Warning>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <h5>
              Are you sure you want to delete {curView.split("T", 1)}{" "}
              <b>{dataRows[rowKey] ? dataRows[rowKey][0] : null}</b>?
            </h5>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            <Button onClick={() => setModal(false)}>Never Mind</Button>
            <Button onClick={() => handleDelete()} color="warning" simple>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

DynamicReactTable.defaultProps = {
  dataTable: { headers: [], dataRows: [] }
};

DynamicReactTable.propTypes = {
  dataTable: PropTypes.object,
  viewState: PropTypes.object,
  firebase: PropTypes.object,
  refreshTable: PropTypes.func,
  deleteRecord: PropTypes.func,
  viewBlockTable: PropTypes.func,
  viewDatasetTable: PropTypes.func,
  viewImageTable: PropTypes.func
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  refreshTable: () => dispatch(refreshTableAction()),
  deleteRecord: id => dispatch(deleteRecordAction(id)),
  viewBlockTable: vineyard => dispatch(viewBlockTableAction(vineyard)),
  viewDatasetTable: block => dispatch(viewDatasetTableAction(block)),
  viewImageTable: dataset => dispatch(viewImageTableAction(dataset))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicReactTable);
