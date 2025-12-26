import { useState } from "react";
import "./App.css";
import FilesViewer from "./components/FilesViewer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SideIcons from "./components/SideIcons";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => setUser(result.user))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="app">
      {user ? (
        <>
          <Header userPhoto={user?.photoURL} />
          <div className="app__main">
            <Sidebar />
            <FilesViewer />
            <SideIcons />
          </div>
        </>
      ) : (
        <div className="app__login">
          <img src="logo512.png" alt="Storage" />
          <button onClick={handleLogin}>Log in to Storage</button>
        </div>
      )}
    </div>
  );
}

export default App;
