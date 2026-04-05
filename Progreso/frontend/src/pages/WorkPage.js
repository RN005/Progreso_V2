// frontend/src/pages/WorkPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WorkPage() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const navigate = useNavigate();

  // ▶️ START SESSION + TIMER
  const startTimer = async () => {
    if (!task) {
      alert("Please enter a task");
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:5000/api/session/start", {
        userId,
        task,
        duration: time,
      });

      setSessionId(res.data._id);
      setSeconds(0);
      setIsRunning(true);

      console.log("Session started");
    } catch (error) {
      console.error("Error starting session", error);
    }
  };

  // ⏱️ TIMER LOGIC
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // 🛑 END SESSION (FIXED PROPERLY)
  const endSession = async () => {
    if (!sessionId) {
      alert("No active session");
      return;
    }

    setIsRunning(false);

    try {
      console.log("🚀 Ending session:", {
        sessionId,
        seconds,
      });

      const res = await axios.post("http://localhost:5000/api/session/end", {
        sessionId: sessionId,
        duration: seconds, // ✅ send seconds
      });

      console.log("✅ Response:", res.data);

      alert(`Session completed! You earned ${res.data?.xp || 1} XP`);

      // ✅ notify Dashboard to refresh immediately
      window.dispatchEvent(new Event("sessionEnded"));

      // RESET
      setSessionId(null);
      setTask("");
      setSeconds(0);

    } catch (err) {
      console.error("❌ End session error:", err);
    }
  };

  // ⏱️ Format time
  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative" }}>
      {/* 🔙 Back Button Top-Left */}
      <button
  onClick={() => navigate("/")}
  style={{
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 18px",
    backgroundColor: "#202223", 
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)", // subtle shadow
    transition: "all 0.2s ease",
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = "#323941"}
  onMouseLeave={(e) => e.target.style.backgroundColor = "#202223"}
>
  ← Dashboard
</button>

      <h2>Work Page</h2>

      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{
          color: "black",
          backgroundColor: "white",
          padding: "8px",
          border: "1px solid black",
        }}
      />

      <div style={{ margin: "20px" }}>
        <button
          onClick={() => setTime(25)}
          disabled={isRunning}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: time === 25 ? "#ff9800" : "#e0e0e0",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          25 min
        </button>

        <button
          onClick={() => setTime(50)}
          disabled={isRunning}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundColor: time === 50 ? "#ff9800" : "#e0e0e0",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          50 min
        </button>
      </div>

      <h1 style={{ fontSize: "48px", margin: "20px" }}>
        {formatTime()}
      </h1>

      <button
        onClick={startTimer}
        disabled={isRunning}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#658f20",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isRunning ? "Running..." : "Start"}
      </button>

      <br /><br />

      <button
        onClick={endSession}
        disabled={!isRunning}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#a5281f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        End Session
      </button>
    </div>
  );
}

export default WorkPage;