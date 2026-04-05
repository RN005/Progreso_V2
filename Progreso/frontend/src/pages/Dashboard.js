// frontend/src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalSessions: 0,
    totalFocusTime: 0,
    xp: 0,
  });

  const navigate = useNavigate();

  // Fetch user & analytics on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.log("User Error:", err);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/analytics/${userId}`);
        console.log("🔥 Analytics Data:", res.data);

        setAnalytics({
          totalSessions: res.data.totalSessions || 0,
          totalFocusTime: res.data.totalFocusTime || 0,
          xp: res.data.xp || 0,
        });
      } catch (err) {
        console.log("Analytics Error:", err);
      }
    };

    fetchUser();
    fetchAnalytics();

    // ✅ Listen for sessionEnded event from WorkPage
    const handleSessionEnded = () => {
      fetchAnalytics(); // refresh analytics immediately
    };

    window.addEventListener("sessionEnded", handleSessionEnded);

    return () => window.removeEventListener("sessionEnded", handleSessionEnded);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>

          <p><strong>Total Sessions:</strong> {analytics.totalSessions}</p>
          <p><strong>Total Focus Time:</strong> {analytics.totalFocusTime} mins</p>
          <p><strong>XP:</strong> {analytics.xp}</p>

          <button
            onClick={() => navigate("/work")}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#589bd3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Start Working 🚀
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;