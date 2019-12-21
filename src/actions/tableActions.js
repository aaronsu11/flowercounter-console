import { vineyardList } from "variables/general.js";

const apiURL = "http://localhost:5000/";

export const getVineyardTableAction = token => async dispatch => {
  // local dataset
  dispatch({
    type: "getVineyardTable",
    payload: vineyardList || {}
  });
  return Promise.resolve();

  // call flower counter API to retrieve all vineyard
  // fetch(apiURL + "list", {
  //   method: "post",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     userid: token,
  //     type: "vineyardls"
  //   })
  // })
  //   .then(response => response.json())
  //   .then(dataTable => {
  //     console.log(dataTable);
  //     dispatch({
  //       type: "getVineyardTable",
  //       payload: dataTable || {}
  //     });
  //   });

  // call firebase API to retrieve all stats card
  // statsCardsRef.on("value", snapshot => {
  //   dispatch({
  //     type: "getAllStatsCards",
  //     payload: snapshot.val() || {}
  //   });
  // });
};

export const getBlockTableAction = (vineyard, token) => async dispatch => {
  // local dataset
  dispatch({
    type: "getBlockTable",
    payload: {}
  });
};

export const getDatasetTableAction = (block, token) => async dispatch => {
  // local dataset
  dispatch({
    type: "getDatasetTable",
    payload: {}
  });
};

export const getImageTableAction = (dataset, token) => async dispatch => {
  // local dataset
  dispatch({
    type: "getImageTable",
    payload: {}
  });
};
