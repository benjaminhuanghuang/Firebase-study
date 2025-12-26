# Update user

```js
const res = await createUserWithEmailAndPassword(auth, email, password);

const imgUrl = await upload(avatar.file);

// Update by ID
await setDoc(doc(db, "users", res.user.uid), {
  username,
  email,
  avatar: imgUrl,
  id: res.user.uid,
  blocked: [],
});

await setDoc(doc(db, "userchats", res.user.uid), {
  chats: [],
});
```
