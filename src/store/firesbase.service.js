import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYndPhOumY4Ai5PVGQLckYxvPAm1zRhSo",
  authDomain: "extramile-5c05c.firebaseapp.com",
  projectId: "extramile-5c05c",
  storageBucket: "extramile-5c05c.appspot.com",
  messagingSenderId: "257766069413",
  appId: "1:257766069413:web:6aa285b5234c655ae3294c",
  measurementId: "G-LTYTH23ZZX",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
