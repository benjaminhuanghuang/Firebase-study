# Upload image

The label’s htmlFor="file" links it to the <input id="file">.
When you click the label, the browser automatically triggers the input’s file picker.

```js
const [avatar, setAvatar] = useState({
  file: null,
  url: "",
});

const handleAvatar = (e) => {
  if (e.target.files[0]) {
    setAvatar({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  }
};

const imgUrl = await upload(avatar.file);
await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });


<label htmlFor="file">
<img src={avatar.url || "./avatar.png"} alt="" />
Upload an image
</label>
<input
type="file"
id="file"
style={{ display: "none" }}
onChange={handleAvatar}
/>
```
