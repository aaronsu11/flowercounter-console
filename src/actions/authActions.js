// import firebase from "config/firebaseConfig";

// const databaseRef = firebase.database().ref();
// const userDetailsRef = databaseRef.child("user-details");

export const loginAction = (email, password) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(user) {
      console.log(user);
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
  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(function(user) {
  //     userDetailsRef.push().set({ userId: user.user.uid, userName: name });
  //     dispatch({
  //       type: "register",
  //       payload: true
  //     });
  //   })
  //   .catch(function(error) {
  //     alert(error);
  //   });
};
