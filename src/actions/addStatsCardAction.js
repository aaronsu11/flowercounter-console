// import firebase from "firebaseConfig";

// connect to firebase realtime database
// const databaseRef = firebase.database().ref();
// const statsCardsRef = databaseRef.child("stats-cards");

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
  // add local data to state
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
  // call API to add card into database with above details
  // (await statsCardsRef.push())
  //   .set({
  //     statsName: statsName,
  //     statsDescription: statsDescription,
  //     statsIcon: statsIcon,
  //     statsIconColor: statsIconColor,
  //     statsFooterIcon: statsFooterIcon,
  //     statsFooterIconState: statsFooterIconState,
  //     statsFooterPercentage: statsFooterPercentage,
  //     statsFooterText: statsFooterText
  //   })
  //   .then(() => dispatch({ type: "addStatsCard" }));
};

export default addStatsCardAction;
