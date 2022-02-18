// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(app)
const auth = getAuth(app)

export { auth };