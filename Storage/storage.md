# Firebase Storage

## Set up storage in Firebase

Project -> Storage -> Get Started

Rule

```js
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

## Upload file

```js
import { storage, db } from "../firebase";

const handleUpload = () => {
  setUploading(true);
  storage
    .ref(`files/${file.name}`)
    .put(file)
    .then((snapshot) => {
      console.log(snapshot);
      storage
        .ref("files")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("myFiles").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: file.name,
            fileUrl: url,
            size: snapshot._delegate.bytesTransferred,
          });
          setUploading(false);
          setOpen(false);
          setFile(null);
        });
      storage
        .ref("files")
        .child(file.name)
        .getMetadata()
        .then((meta) => {
          console.log(meta.size);
        });
    });
};
```
