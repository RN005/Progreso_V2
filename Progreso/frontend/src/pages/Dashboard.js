import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null); // ✅ NEW
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/analytics/${userId}`
        );
        setAnalytics(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
    fetchAnalytics(); // ✅ NEW CALL
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>

          {/* ✅ REAL DATA */}
          {analytics ? (
            <>
              <p><strong>Total Sessions:</strong> {analytics.totalSessions}</p>
              <p><strong>Total Focus Time:</strong> {analytics.totalFocusTime} mins</p>
            </>
          ) : (
            <p>Loading analytics...</p>
          )}

          {/* ✅ START WORK BUTTON */}
          <button
  onClick={() => navigate("/work")}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    fontSize: "16px",
    backgroundColor: "#589bd3", // ✅ blue
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