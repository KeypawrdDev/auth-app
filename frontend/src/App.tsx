import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

const App = () => {

  return (
    <BrowserRouter>
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
