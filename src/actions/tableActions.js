import React from "react";
// import {vineyardList,blockList,datasetList,imageList} from "variables/general.js";

const apiURL = "http://flower-counter.appspot.com/";
// const apiURL = "http://localhost:5000/";

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
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "tableGetError",
        error
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
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "tableGetError",
        error
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
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "tableGetError",
        error
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
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "tableGetError",
        error
      });
    });
};

export const deleteRecordAction = target => async dispatch => {
  // dispatch({
  //   type: "deleteRecord"
  // });
  // call flower counter API to retrieve all vineyards
  console.log(target);
  fetch(apiURL + "delete", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(target)
  })
    .then(response => response.json())
    .then(info => {
      console.log(info);
      dispatch({
        type: "deleteRecord",
        payload: target.name
      });
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "tableDeleteError",
        error
      });
    });
};
