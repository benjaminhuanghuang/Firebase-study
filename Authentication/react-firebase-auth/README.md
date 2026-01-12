# React Authentication Crash Course With Firebase And Routing -2020-10

https://www.youtube.com/watch?v=PKwu15ldZ7k&t=156s&ab_channel=WebDevSimplified

React + Context + BootStrap + Firebase

## Firebase Auth API

listener for login and logout

```js
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    setLoading(false);
  });

  return unsubscribe;
}, []);
```

Uer name / password login

```js
return auth.signInWithEmailAndPassword(email, password);
```

Google login

```js
auth
  .signInWithPopup(provider)
  .then((user) => {
    setCurrentUser(user);
    history.push("/");
  })
  .catch((error) => {
    alert(error.message);
  });
```

Logout

```js
auth.signOut();
```

Reset password

```js
auth.sendPasswordResetEmail(email);
```

Update

```js
currentUser.updateEmail(email);
currentUser.updatePassword(password);
```
