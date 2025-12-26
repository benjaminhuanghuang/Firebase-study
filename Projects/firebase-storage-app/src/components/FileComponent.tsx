import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Modal } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebase";

import "./FileComponent.css";

const FileComponent = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      setFile(e.target.files?.[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);

          await addDoc(collection(db, "myFiles"), {
            timestamp: serverTimestamp(),
            caption: file.name,
            fileUrl: url,
            size: uploadTask.snapshot.totalBytes,
          });

          const meta = await getMetadata(storageRef);
          console.log("File size from metadata:", meta.size);

          setUploading(false);
          setOpen(false);
          setFile(null);
        } catch (err) {
          console.error("Error during post-upload operations:", err);
          setUploading(false);
        }
      }
    );
  };

  return (
    <div className="file" onClick={handleOpen}>
      <div className="file__container">
        <AddIcon fontSize="large" />
        <p>New</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="upload-modal"
        aria-describedby="upload-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <p id="upload-modal">Select files you want to upload!</p>
          {uploading ? (
            <p id="upload-description">Uploading...</p>
          ) : (
            <>
              <input
                type="file"
                onChange={handleChange}
                style={{ marginBottom: "16px", display: "block" }}
              />
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file}
              >
                Upload
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FileComponent;
