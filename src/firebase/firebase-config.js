import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW6qJS5m_gQu1xILUvMsxDvenvORgES3s",
  authDomain: "journal-c1b30.firebaseapp.com",
  projectId: "journal-c1b30",
  storageBucket: "journal-c1b30.appspot.com",
  messagingSenderId: "411729708965",
  appId: "1:411729708965:web:dd3b76e6728bde5f410a4c",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { db, googleAuth, firebase };
