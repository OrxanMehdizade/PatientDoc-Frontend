import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import User from "./pages/User";
import "./assets/styles/App.css";
import { useEffect } from "react";
import pace from "pace-js";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    // Configure Pace.js if necessary
    window.paceOptions = {
      ajax: true, // Monitor AJAX requests
      document: true, // Monitor document loading
      eventLag: false, // Disable event lag monitoring
      themes: "flash",
    };

    // Start Pace.js
    pace.start();
  }, []);
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/auth/:action?" element={<Auth />} />
          <Route path="/user/:action?/:id?" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
