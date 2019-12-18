// import firebase from "firebaseConfig";
import { cardStats } from "variables/general";

// connect to firebase realtime database
// const databaseRef = firebase.database().ref();
// const statsCardsRef = databaseRef.child("stats-cards");

export const addStatsCardAction = (
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

// connect to firebase realtime database
// const databaseRef = firebase.database().ref();
// const statsCardsRef = databaseRef.child("stats-cards");

export const getAllStatsCardsAction = () => async dispatch => {
  // local dataset
  dispatch({
    type: "getAllStatsCards",
    payload: cardStats || {}
  });
  // call API to retrieve all stats card
  // statsCardsRef.on("value", snapshot => {
  //   dispatch({
  //     type: "getAllStatsCards",
  //     payload: snapshot.val() || {}
  //   });
  // });
};
