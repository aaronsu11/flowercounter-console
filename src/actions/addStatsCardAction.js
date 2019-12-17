const addStatsCardAction = (
  statsName,
  statsDescription,
  statsIcon,
  statsIconColor,
  statsFooterIcon,
  statsFooterIconState,
  statsFooterPercentage,
  statsFooterText
) => async dispatch => {
  // call API to add card into database with above details
  dispatch({
    type: "addStatsCard",
    payload: {
      statsName: statsName,
      statsDescription: statsDescription,
      statsIcon: statsIcon,
      statsIconColor: statsIconColor,
      statsFooterIcon: statsFooterIcon,
      statsFooterIconState: statsFooterIconState,
      statsFooterPercentage: statsFooterPercentage,
      statsFooterText: statsFooterText
    }
  });
};

export default addStatsCardAction;
