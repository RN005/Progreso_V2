import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkPage() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(25);
  const [seconds, setSeconds] = useState(time * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);

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
      setSeconds(time * 60);
      setIsRunning(true);

      console.log("Session started");
    } catch (error) {
      console.error("Error starting session", error);
    }
  };

  // ⏱️ TIMER LOGIC (FIXED)
  useEffect(() => {
    let interval;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  // 🛑 AUTO END WHEN TIMER = 0 (SEPARATED FIX ✅)
  useEffect(() => {
    if (seconds === 0 && isRunning && sessionId) {
      endSession();
    }
  }, [seconds]);

  // 🛑 END SESSION
  const endSession = async () => {
    if (!sessionId) return; // ✅ safety

    setIsRunning(false);

    try {
      await axios.post("http://localhost:5000/api/session/end", {
        sessionId,
      });

      alert("Session Completed!");
      console.log("Session ended");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Update seconds when time changes (ONLY if not running ✅)
  useEffect(() => {
    if (!isRunning) {
      setSeconds(time * 60);
    }
  }, [time, isRunning]);

  // ⏱️ Format time
  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
      backgroundColor: time === 25 ? "#ff9800" : "#e0e0e0", // active vs inactive
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
    backgroundColor: "#658f20", // ✅ green
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
    backgroundColor: "#a5281f", // ✅ red
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