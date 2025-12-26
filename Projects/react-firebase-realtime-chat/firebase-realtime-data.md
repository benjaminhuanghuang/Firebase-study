# Firebase realtime data

onSnapshot

```js
useEffect(() => {
  const unSub = onSnapshot(
    doc(db, "userchats", currentUser.id),
    async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    }
  );

  return () => {
    unSub();
  };
}, [currentUser.id]);
```
