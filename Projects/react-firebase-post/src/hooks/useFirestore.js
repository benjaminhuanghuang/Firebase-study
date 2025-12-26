import { useState, useEffect } from "react";
import { db } from "../firebase";

const useFireStore = (collection, orderBy, dir = "desc") => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = db.collection(collection)
      .orderBy(orderBy, dir)
      .onSnapshot((snap) => {
        const documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return ()=> unsub();
  }, [collection, orderBy, dir]);

  return { docs };
};

export default useFireStore;
