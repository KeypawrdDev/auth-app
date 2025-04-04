import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Toast from "./components/Toast";
import { useNotifications } from "./hooks/useNotifications";

const App = () => {
  const message = useNotifications();

  return (
    <BrowserRouter>
      <Toast message={message} />
      <Routes>
        <Route path="/" element={<Register />} />       // or change this to /register
        <Route path="/register" element={<Register />} />  // Add this if needed
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
