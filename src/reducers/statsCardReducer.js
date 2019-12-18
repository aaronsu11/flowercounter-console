export default (state = {}, action) => {
  switch (action.type) {
    case "addStatsCard":
      // console.log("adding ", action.payload);
      return state;
    case "getAllStatsCards":
      // console.log("getting ", action.payload);
      return { ...state, statsCardList: Object.values(action.payload) };
    default:
      return state;
  }
};
