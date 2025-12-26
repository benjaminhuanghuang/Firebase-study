# Firebase Auth

```js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const res = await createUserWithEmailAndPassword(auth, email, password);

const formData = new FormData(e.target);
const { email, password } = Object.fromEntries(formData);

const userCredential = await signInWithEmailAndPassword(auth, email, password);
const user = userCredential.user;

// Delete The ID token, The refresh token, The local session
await signOut(auth);
```

UI

```js
import { onAuthStateChanged } from "firebase/auth";

const { currentUser, isLoading, fetchUserInfo } = useUserStore();

useEffect(() => {
  const unSub = onAuthStateChanged(auth, (user) => {
    // update user info in global store when auth state changes
    fetchUserInfo(user?.uid);
  });
  return () => {
    unSub();
  };
}, [fetchUserInfo]);
```
