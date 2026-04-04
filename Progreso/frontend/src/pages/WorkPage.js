import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function WorkPage() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(25);
  const [seconds, setSeconds] = useState(time * 60);
  const [running, setRunning] = useState(false);

  const timerRef = useRef(null); // ✅ NEW (stores interval)

  // ▶️ Start Timer + Call START API
  const startTimer = async () => {
    if (!task) {
      alert("Please enter a task");
      return;
    }

    setSeconds(time * 60);
    setRunning(true);

    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:5000/api/session/start", {
        userId,
        task,
        duration: time,
      });
      console.log("Session started");
    } catch (error) {
      console.error("Error starting session", error);
    }

    // ✅ STORE interval in ref
    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          endSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 🛑 FIXED END SESSION
  const endSession = async () => {
    clearInterval(timerRef.current); // ✅ STOP TIMER

    setRunning(false);

    const userId = localStorage.getItem("userId");

    try {
      await axios.post("http://localhost:5000/api/session/end", {
        userId,
      });
      console.log("Session ended");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Reset seconds when time changes
  useEffect(() => {
    setSeconds(time * 60);
  }, [time]);

  // ⏱️ Format time nicely
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
    border: "1px solid black"
  }}
/>

      <div style={{ margin: "20px" }}>
        <button onClick={() => setTime(25)}>25 min</button>
        <button onClick={() => setTime(50)}>50 min</button>
      </div>

      <h3>{formatTime()}</h3>

      <button onClick={startTimer} disabled={running}>
        {running ? "Running..." : "Start"}
      </button>

      <br /><br />
      <button onClick={endSession} disabled={!running}>
        End Session
      </button>
    </div>
  );
}

export default WorkPage;