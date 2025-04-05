import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // uses token-aware Axios instance

const Welcome = () => {
  const [message, setMessage] = useState("");
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/welcome")
      .then((res) => {
        setMessage(res.data.message); // e.g., "Welcome back, user@example.com!"
      })
      .catch((err) => {
        console.error("Unauthorized or invalid token:", err);
        setExpired(true);
        localStorage.removeItem("token");
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
        <p style={{ color: "red" }}>🔐 Your session has expired. Redirecting...</p>
      ) : (
        <>
          <p>{message}</p>
          <button
            onClick={handleLogout}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Welcome;
