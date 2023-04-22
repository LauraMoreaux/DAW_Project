// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ76-qWVi6qxSSpOJtnu0SektsWYr-CEI",
  authDomain: "fir-proyecto-9e04e.firebaseapp.com",
  projectId: "fir-proyecto-9e04e",
  storageBucket: "fir-proyecto-9e04e.appspot.com",
  messagingSenderId: "984243627704",
  appId: "1:984243627704:web:2d29a0be07678fde8cb64d",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore;
