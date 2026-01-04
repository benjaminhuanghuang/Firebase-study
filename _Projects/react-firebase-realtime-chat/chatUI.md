# Chat

## Message styling

```css
.message {
  max-width: 70%;
  display: flex;
  gap: 20px;

  &.own {
    align-self: flex-end;

    .texts {
      p {
        background-color: #5183fe;
      }
    }
  }
}
```

```js
 <div className={
    message.senderId === currentUser?.id ? "message own" : "message"
  }
  key={message?.createAt}
>
```

## Scroll to end

```js
const endRef = useRef(null);

useEffect(() => {
  endRef.current?.scrollIntoView({ behavior: "smooth" });
}, [chat.messages]);
```
