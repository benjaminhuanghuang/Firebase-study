# Upload

https://firebase.google.com/docs/storage/web/upload-files

```js
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, `images/${date + file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject("Something went wrong!" + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
```

UI

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
// update user data
await setDoc(doc(db, "users", res.user.uid), {
  username,
  email,
  avatar: imgUrl,
  id: res.user.uid,
  blocked: [],
});

<form>
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
</form>;
```
