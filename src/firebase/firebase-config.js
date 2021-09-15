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

const firebaseConfigTest = {
  apiKey: "AIzaSyAMpWdFfIYty5DHpt5PM16TlpELFR-RYzU",
  authDomain: "crud-react-4075c.firebaseapp.com",
  projectId: "crud-react-4075c",
  storageBucket: "crud-react-4075c.appspot.com",
  messagingSenderId: "303737044730",
  appId: "1:303737044730:web:1bec740315b40ebc0ed343",
};
if (process.env === "test") {
  //Testing
  firebase.initializeApp(firebaseConfigTest);
} else {
  //development
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { db, googleAuth, firebase };
