import { initializeApp } from "firebase/app";
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
  //
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
export { app, db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
