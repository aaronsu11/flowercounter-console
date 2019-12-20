import { vineyardList } from "variables/general.js";

export const getVineyardTableAction = token => async dispatch => {
  // local dataset
  dispatch({
    type: "getVineyardTable",
    payload: vineyardList || {}
  });
  return Promise.resolve();
  // call API to retrieve all stats card
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
