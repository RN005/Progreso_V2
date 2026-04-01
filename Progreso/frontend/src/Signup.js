import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // ✅ FIX 1: use form instead of undefined userData
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        form
      );

      console.log(res.data);

      // store userId
      localStorage.setItem("userId", res.data._id);

      alert("User Created");

      // redirect
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Error connecting backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup Page</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br /><br />

      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}

export default Signup;