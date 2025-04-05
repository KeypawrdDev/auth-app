import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { useNotifications } from "../hooks/useNotifications"; // ✅ only here
import Toast from "../components/Toast";

const Welcome = () => {
  const [message, setMessage] = useState("");
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  const notification = useNotifications(); // ✅ socket only starts here

  useEffect(() => {
    api.get("/welcome")
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setExpired(true);
        setTimeout(() => navigate("/login"), 1500);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Welcome Page</h2>
      {expired ? (
        <p style={{ color: "red" }}>🔐 Session expired. Redirecting...</p>
      ) : (
        <>
          <p>{message}</p>
          <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
            Logout
          </button>
        </>
      )}
      {notification && <Toast message={notification} />}
    </div>
  );
};

export default Welcome;
