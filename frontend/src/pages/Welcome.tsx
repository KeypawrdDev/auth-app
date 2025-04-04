import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Use named import

interface DecodedToken {
  sub: string;
  exp: number;
}

const Welcome = () => {
  const [email, setEmail] = useState("");
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token); // ✅ Correct usage
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp < now) {
        setExpired(true);
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setEmail(decoded.sub);
      }
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }
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
          <p>🎉 Hello, <strong>{email}</strong>!</p>
          <button onClick={handleLogout} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Welcome;
