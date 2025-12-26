import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
// Pages
import About from "./pages/About";
import FirebaseCRUD from "./pages/FirebaseCRUD";
import ImageUpload from "./pages/ImageUpload";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <FirebaseCRUD />,
      },
      {
        path: "image-upload",
        element: <ImageUpload />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
