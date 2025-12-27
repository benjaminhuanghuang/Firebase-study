# Firebase CRUD

## Create document

```js
import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const collectionTodos = collection(db, "todos"); // create or get a collection
const newTodo = {
  title: "Sample Todo",
  completed: false,
  createdAt: new Date(),
};
const docRef = await addDoc(collectionTodos, newTodo);

console.log("Document written with ID: ", docRef.id);
```

## Get

```js
const collectionTodos = collection(db, "todos"); // create or get a collection
```

```js


// READ ALL
export const getAllTimers = async (): Promise<Timer[]> => {
  try {
    const q = query(
      collection(firestoreDb, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Timer[];
  } catch (error) {
    console.error("Error getting timers:", error);
    throw error;
  }
};

// READ ONE
export const getTimer = async (id: string): Promise<Timer | null> => {
  try {
    const docRef = doc(firestoreDb, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      } as Timer;
    }
    return null;
  } catch (error) {
    console.error("Error getting timer:", error);
    throw error;
  }
};

// UPDATE
export const updateTimer = async (
  id: string,
  timerData: Partial<TimerInput>
): Promise<void> => {
  try {
    const docRef = doc(firestoreDb, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...timerData,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating timer:", error);
    throw error;
  }
};

// DELETE
export const deleteTimer = async (id: string): Promise<void> => {
  try {
    const docRef = doc(firestoreDb, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting timer:", error);
    throw error;
  }
};
```
