export default (state = {}, action) => {
  switch (action.type) {
    case "refreshTable":
      console.log("refresh table");
      return { ...state, dataTable: null };
    case "deleteRecord":
      console.log("deleted record: ", action.payload);
      return state;
    case "getVineyardTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    case "getBlockTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    case "getDatasetTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    case "getImageTable":
      console.log("getting ", action.payload);
      return { ...state, dataTable: action.payload };
    default:
      return state;
  }
};
