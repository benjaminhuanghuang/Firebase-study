import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';
console.log("Firebase API Key:", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
// Initialize Firebase
// Use app ben-firebase-study
const firebaseConfig = {
  apiKey: "AIzaSyAN8yW8DHVPNF_OmJaXClIA6r3wZNOFQ9s",
  authDomain: "ben-firebase-study-e17a7.firebaseapp.com",
  projectId: "ben-firebase-study-e17a7",
  storageBucket: "ben-firebase-study-e17a7.firebasestorage.app",
  messagingSenderId: "741390172015",
  appId: "1:741390172015:web:3a3c330be92d85def3729a",
  measurementId: "G-GSDM44WBKS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
export { app, db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
