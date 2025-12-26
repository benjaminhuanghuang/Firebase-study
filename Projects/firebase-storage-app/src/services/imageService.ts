import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/FirebaseConfig";

// Upload image and return download URL
export const uploadImage = async (
  uri: string,
  folder: string = "images"
): Promise<string> => {
  try {
    // Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create unique filename
    const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    // Upload
    await uploadBytes(storageRef, blob);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Upload with progress tracking
export const uploadImageWithProgress = async (
  uri: string,
  folder: string = "images",
  onProgress: (progress: number) => void
): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const filename = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const storageRef = ref(storage, `${folder}/${filename}`);

    // ✅ Wrap in a Promise to handle resolve/reject properly
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  } catch (error) {
    // If fetching the blob failed, reject immediately
    return Promise.reject(error);
  }
};

// Delete image by URL
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
