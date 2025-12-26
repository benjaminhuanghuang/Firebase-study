# Check user

```js
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const usersRef = collection(db, "users");
const q = query(usersRef, where("username", "==", username));
const querySnapshot = await getDocs(q);
if (!querySnapshot.empty) {
  return toast.warn("Select another username");
}
```
