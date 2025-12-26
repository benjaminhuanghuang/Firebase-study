# Cloud firestore

Project -> Cloud Firestore -> Create database

Start in test mode

Rule

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
        request.time < timestamp.date(2021, 4, 3);
    }
  }
}
```

## Coding

```js
import { db } from "./firebase";
import firebase from "firebase";

// Load
useEffect(() => {
  db.collection("todos")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => doc.data()));
    });
}, [input]);

// Create
const addTodo = (e) => {
  e.preventDefault();
  db.collection("todos").add({
    todo: input,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
  setInput("");
};

// delete
db.collection("todos").doc(arr.id).delete();
```
