export default (state = {}, action) => {
  switch (action.type) {
    case "addStatsCard":
      console.log("adding ", action.payload);
      return state;
    case "getAllStatsCard":
      console.log("getting ", action.payload);
      return { ...state, statsCardState: Object.values(action.payload) };
    default:
      return state;
  }
};
