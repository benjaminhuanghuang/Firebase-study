import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "../config/FirebaseConfig";
import type { Timer, TimerInput } from "../types/Timer";

const COLLECTION_NAME = "timers";

// CREATE
export const createTimer = async (timerData: TimerInput): Promise<string> => {
  try {
    const docRef = await addDoc(collection(firestoreDb, COLLECTION_NAME), {
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
