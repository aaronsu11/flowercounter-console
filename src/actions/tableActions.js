import React from "react";
// import {vineyardList,blockList,datasetList,imageList} from "variables/general.js";

const apiURL = "http://flower-counter.appspot.com/";

export const refreshTableAction = () => ({
  type: "refreshTable",
  payload: {}
});

export const getVineyardTableAction = token => async dispatch => {
  // local dataset
  // dispatch({
  //   type: "getVineyardTable",
  //   payload: vineyardList || {}
  // });
  // return Promise.resolve();

  // call flower counter API to retrieve all vineyards
  fetch(apiURL + "list", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: token,
      type: "vineyardls"
    })
  })
    .then(response => response.json())
    .then(dataTable => {
      dispatch({
        type: "getVineyardTable",
        payload: dataTable || {}
      });
    });

  // call firebase API to retrieve all stats card
  // statsCardsRef.on("value", snapshot => {
  //   dispatch({
  //     type: "getAllStatsCards",
  //     payload: snapshot.val() || {}
  //   });
  // });
};

export const getBlockTableAction = (token, vineyard) => async dispatch => {
  // local dataset
  // dispatch({
  //   type: "getBlockTable",
  //   payload: blockList || {}
  // });
  // return Promise.resolve();

  // call flower counter API to retrieve all blocks
  console.log("Getting Block Table");
  fetch(apiURL + "list", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: token,
      type: "blockls",
      vineyard: vineyard
    })
  })
    .then(response => response.json())
    .then(dataTable => {
      dispatch({
        type: "getBlockTable",
        payload: dataTable || {}
      });
    });
};

export const getDatasetTableAction = (
  token,
  vineyard,
  block
) => async dispatch => {
  // local dataset
  // dispatch({
  //   type: "getDatasetTable",
  //   payload: datasetList || {}
  // });

  // call flower counter API to retrieve all blocks
  fetch(apiURL + "list", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: token,
      type: "datasetls",
      vineyard: vineyard,
      block: block
    })
  })
    .then(response => response.json())
    .then(dataTable => {
      dispatch({
        type: "getDatasetTable",
        payload: dataTable || {}
      });
    });
};

export const getImageTableAction = (
  token,
  vineyard,
  block,
  dataset
) => async dispatch => {
  // local dataset
  // dispatch({
  //   type: "getImageTable",
  //   payload: imageList || {}
  // });

  // call flower counter API to retrieve all blocks
  fetch(apiURL + "list", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: token,
      type: "imagels",
      vineyard: vineyard,
      block: block,
      dataset: dataset
    })
  })
    .then(response => response.json())
    .then(dataTable => {
      let i = dataTable.accessors.indexOf("preview");
      let imageTable = dataTable;
      imageTable.dataRows = dataTable.dataRows.map(dataRow => {
        let imageRow = dataRow;
        imageRow[i] = (
          <img
            src={dataRow[i]}
            alt="max100% x 50"
            style={{ height: "50px", maxWidth: "100%" }}
          />
        );
        return imageRow;
      });
      dispatch({
        type: "getImageTable",
        payload: imageTable || {}
      });
    });
};
