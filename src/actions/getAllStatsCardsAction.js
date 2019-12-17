const getAllStatCardsAction = () => async dispatch => {
  // call API to retrieve all stats card
  dispatch({
    type: "getAllStatsCards",
    payload: {}
  });
};

export default getAllStatCardsAction;
