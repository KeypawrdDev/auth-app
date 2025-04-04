import { useEffect, useState } from "react";

export const useNotifications = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = window.location.hostname;
    const socket = new WebSocket(`${protocol}://${host}:8000/ws/notifications`);
    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("📨 Message received:", event.data);
      setMessage(event.data);
      setTimeout(() => setMessage(""), 5000);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return message;
};
