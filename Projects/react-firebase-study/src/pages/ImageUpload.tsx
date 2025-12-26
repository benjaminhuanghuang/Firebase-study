import React, { useRef, useState } from "react";
import { uploadImageWithProgress } from "../services/imageService";

export default function UploadImagePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; title: string }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const pickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadedImageUrl(null);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      window.alert("Please select an image first.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const fileURL = URL.createObjectURL(selectedImage);
      const downloadURL = await uploadImageWithProgress(
        fileURL,
        "uploads",
        (progress) => setUploadProgress(progress)
      );

      setUploadedImageUrl(downloadURL);
      setUploadedImages([
        { url: downloadURL, title: imageTitle || "Untitled" },
        ...uploadedImages,
      ]);

      window.alert("Image uploaded successfully!");
      setSelectedImage(null);
      setImageTitle("");
      setPreviewUrl(null);
    } catch (error) {
      console.error(error);
      window.alert("Failed to upload image.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteImage = async (url: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteImage(url);
      setUploadedImages(uploadedImages.filter((img) => img.url !== url));
      window.alert("Image deleted successfully!");
    } catch (error) {
      console.log("Failed to delete image.", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Upload Image</h1>
        <p className="text-gray-600 mb-6">
          Select an image to upload to Firebase Storage.
        </p>

        {/* Image Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4 flex flex-col items-center justify-center">
          {previewUrl ? (
            <div className="relative w-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-96 object-cover rounded-lg"
              />
              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedImage(null);
                }}
              >
                ❌
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No image selected</p>
          )}
        </div>

        {/* Title Input */}
        {selectedImage && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Title (optional)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={imageTitle}
              onChange={(e) => setImageTitle(e.target.value)}
              placeholder="Enter image title"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
          <button
            onClick={pickImage}
            className="border border-blue-500 text-blue-500 font-semibold py-2 rounded-lg hover:bg-blue-50"
          >
            Choose from Device
          </button>

          {selectedImage && (
            <button
              onClick={uploadImage}
              disabled={uploading}
              className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <span className="animate-spin">⏳</span> Uploading{" "}
                  {uploadProgress.toFixed(0)}%
                </>
              ) : (
                <>☁️ Upload to Firebase</>
              )}
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="mb-4">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-1">
              {uploadProgress.toFixed(0)}%
            </p>
          </div>
        )}

        {/* Uploaded URL */}
        {uploadedImageUrl && (
          <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg mb-6">
            <p className="font-semibold text-blue-600 mb-1">
              ✅ Uploaded Successfully!
            </p>
            <p className="text-sm break-all">{uploadedImageUrl}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(uploadedImageUrl);
                window.alert("URL copied to clipboard!");
              }}
              className="mt-2 text-blue-600 font-medium"
            >
              📋 Copy URL
            </button>
          </div>
        )}

        {/* Uploaded Images Gallery */}
        {uploadedImages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Uploaded Images</h2>
            {uploadedImages.map((img, i) => (
              <div
                key={i}
                className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-16 h-16 object-cover rounded-lg mr-3"
                />
                <div className="flex-1">
                  <p className="font-medium">{img.title}</p>
                  <p className="text-xs text-gray-500 truncate">{img.url}</p>
                </div>
                <button
                  onClick={() => deleteImage(img.url)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg text-sm text-gray-700">
          ℹ️ Images are stored in Firebase Storage and can be accessed via the
          returned URL.
        </div>
      </div>
    </div>
  );
}
