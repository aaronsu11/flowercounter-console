import React from "react";
import PropTypes from "prop-types";

// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/icons
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components

import Button from "components/CustomButtons/Button.js";

export default function DynamicReactTable(props) {
  const { dataRows, headers } = props.dataTable;
  const [data, setData] = React.useState(
    dataRows.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        time: prop[1],
        feature: prop[2],
        stats: prop[3].mean,
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
  // const columns = headers.map(header => {
  //   // console.log(header.replace(/^\w/, c => c.toUpperCase()));
  //   return {
  //     Header: header.replace(/^\w/, c => c.toUpperCase()),
  //     accessor: header
  //   };
  // });

  return (
    <ReactTable
      data={data}
      filterable
      columns={[
        {
          Header: headers[0],
          accessor: "name"
        },
        {
          Header: headers[1],
          accessor: "time"
        },
        {
          Header: headers[2],
          accessor: "feature"
        },
        {
          Header: headers[3],
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
  );
}

DynamicReactTable.defaultProps = {
  dataTable: { headers: [], dataRows: [] }
};

DynamicReactTable.propTypes = {
  dataTable: PropTypes.object
};
