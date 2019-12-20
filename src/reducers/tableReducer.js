export default (state = {}, action) => {
  switch (action.type) {
    case "getVineyardTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    default:
      return state;
  }
};
