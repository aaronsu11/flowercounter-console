import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmbEYCRih5N8ls-UYgv26OnAz67IDR8gk",
  authDomain: "flower-counter.firebaseapp.com",
  databaseURL: "https://flower-counter.firebaseio.com",
  projectId: "flower-counter",
  storageBucket: "flower-counter.appspot.com",
  messagingSenderId: "276724841166",
  appId: "1:276724841166:web:9a24d03f468502b5992e9f",
  measurementId: "G-4HSDYZE7SQ"
};

export default firebase.initializeApp(firebaseConfig);
