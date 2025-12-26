import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAhPbdGcRlpLyy8I2HUAtxw51_sEYBBj3k",
  authDomain: "ben-firebase-study.firebaseapp.com",
  databaseURL: "https://ben-firebase-study.firebaseio.com",
  projectId: "ben-firebase-study",
  storageBucket: "ben-firebase-study.appspot.com",
  messagingSenderId: "502096306530",
  appId: "1:502096306530:web:3254847645f9fdd97a4c3b"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
