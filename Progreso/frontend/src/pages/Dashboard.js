import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({   // ✅ ADDED
    sessions: 0,
    focusTime: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );

        setUser(res.data);

        // ✅ TEMP STATIC DATA (can connect backend later)
        setStats({
          sessions: 5,
          focusTime: 120
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>

          {/* ✅ UPDATED STATS */}
          <h3>Total Sessions: {stats.sessions}</h3>
          <h3>Focus Time: {stats.focusTime} mins</h3>

          <p><strong>Analytics:</strong> Coming Soon 📊</p>

          <button onClick={() => navigate("/work")}>
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