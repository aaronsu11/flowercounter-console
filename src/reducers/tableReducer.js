export default (state = {}, action) => {
  switch (action.type) {
    case "refreshTable":
      console.log("refresh table");
      return { ...state, dataTable: null };
    case "getVineyardTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    case "getBlockTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    default:
      return state;
  }
};
