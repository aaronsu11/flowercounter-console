export default (state = {}, action) => {
  switch (action.type) {
    case "viewVineyardTable":
      console.log("view vineyard table");
      return { ...state, curView: "vineyardTable" };
    case "viewBlockTable":
      console.log("view block table of vineyard ", action.payload);
      return { ...state, curView: "blockTable", curVineyard: action.payload };
    case "viewDatasetTable":
      console.log("view dataset table of block ", action.payload);
      return { ...state, curView: "datasetTable", curBlock: action.payload };
    case "viewImageTable":
      console.log("view image table of dataset ", action.payload);
      return { ...state, curView: "imageTable", curDataset: action.payload };
    default:
      return state;
  }
};
