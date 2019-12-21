export default (state = {}, action) => {
  switch (action.type) {
    case "viewBlockTable":
      console.log("view block table of vineyard ", action.payload);
      return { ...state, curView: "blockTable", curVineyard: action.payload };
    default:
      return state;
  }
};
