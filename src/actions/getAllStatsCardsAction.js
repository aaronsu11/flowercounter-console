// import firebase from "firebaseConfig";
import { cardStats } from "variables/general";

// connect to firebase realtime database
// const databaseRef = firebase.database().ref();
// const statsCardsRef = databaseRef.child("stats-cards");

const getAllStatCardsAction = () => async dispatch => {
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

export default getAllStatCardsAction;
