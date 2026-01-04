import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
