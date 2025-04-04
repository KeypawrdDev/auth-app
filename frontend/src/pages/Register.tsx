import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/register", {
        email,
        password,
      });

      console.log("✅ Registered:", res.data);
      setMessage("🎉 Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      console.error("❌ Error registering:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.detail || "Registration failed. Try a different email."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Register
        </button>
      </form>

      {message && (
        <div style={{ marginTop: "1rem", color: message.includes("🎉") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
