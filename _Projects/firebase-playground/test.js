import { db } from "./firebaseConfig.js";
import { addDoc, collection, getDocs } from "firebase/firestore";

const addTodo = async () => {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: "todo22222",
      completed: false,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e.code, e.message);
  }
};

addTodo();
