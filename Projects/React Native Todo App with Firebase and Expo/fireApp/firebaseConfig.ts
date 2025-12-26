import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
// Use app ben-firebase-study
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ben-firebase-study-e17a7.firebaseapp.com",
  projectId: "ben-firebase-study-e17a7",
  storageBucket: "ben-firebase-study-e17a7.firebasestorage.app",
  messagingSenderId: "741390172015",
  appId: "1:741390172015:web:3a3c330be92d85def3729a",
  measurementId: "G-GSDM44WBKS",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
