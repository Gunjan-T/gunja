import  firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTF_2UMhg2jmZ1Uo4ZXIG9n76mGr5w2aM",
  authDomain: "gunjan-611ab.firebaseapp.com",
  databaseURL: "https://gunjan-611ab-default-rtdb.firebaseio.com",
  projectId: "gunjan-611ab",
  storageBucket: "gunjan-611ab.appspot.com",
  messagingSenderId: "332006654897",
  appId: "1:332006654897:web:e4d4f9a49754c9a0e6b390",
  measurementId: "G-SMPVGL3LS8"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(app)
const auth = getAuth(app)

export { auth };