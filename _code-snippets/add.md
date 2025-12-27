# Add

```js
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const collectionTodos = collection(db, "todos");
const docRef = await addDoc(collectionTodos, {
  title: "Sample Todo",
  completed: false,
});
console.log("Document written with ID: ", docRef.id);

// CREATE
export const createTimer = async (timerData: TimerInput): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...timerData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating timer:", error);
    throw error;
  }
};
```
