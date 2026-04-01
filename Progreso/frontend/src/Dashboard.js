import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );

        setUser(res.data);
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

          <p><strong>Focus Duration:</strong> 0 mins</p>

          <p><strong>Analytics:</strong> Coming Soon 📊</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;