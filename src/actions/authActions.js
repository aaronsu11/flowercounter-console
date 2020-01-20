// import firebase from "config/firebaseConfig";

// const databaseRef = firebase.database().ref();
// const userDetailsRef = databaseRef.child("user-details");

export const registerAction = (source, name, email, password) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      return firebase
        .firestore()
        .collection("users")
        .doc(res.user.uid)
        .set({ userName: name });
    })
    .then(() => {
      // userDetailsRef.push().set({ userId: user.user.uid, userName: name });
      dispatch({
        type: "register",
        payload: source
      });
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "registerError",
        error
      });
    });
};

export const loginAction = (source, email, password) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  firebase
    .login({ email, password })
    .then(user => {
      console.log(user);
      dispatch({
        type: "login",
        payload: source
      });
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "loginError",
        error
      });
    });
};

export const logoutAction = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  firebase
    .logout()
    .then(() => {
      dispatch({
        type: "logout"
      });
    })
    .catch(error => {
      alert(error);
      dispatch({
        type: "logoutError",
        error
      });
    });
};
