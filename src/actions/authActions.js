import firebase from "firebaseConfig";

const databaseRef = firebase.database().ref();
const userDetailsRef = databaseRef.child("user-details");

export const loginAction = (email, password) => async dispatch => {
  //TODO: login with JWT
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user) {
      dispatch({
        type: "login",
        payload: true
      });
    })
    .catch(function(error) {
      alert(error);
    });
};

export const registerAction = (name, email, password) => async dispatch => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      userDetailsRef.push().set({ userId: user.user.uid, userName: name });
      dispatch({
        type: "register",
        payload: true
      });
    })
    .catch(function(error) {
      alert(error);
    });
};
