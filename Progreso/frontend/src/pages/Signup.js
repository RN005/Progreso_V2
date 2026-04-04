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
    <div style={{ padding: "20px", textAlign: "center", marginTop: "50px" }}>
      <h2>Signup Page</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
          color: "white"
        }}
      />
      <br />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "14px",
          color: "white"
        }}
      />
      <br />

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#bfbbc6",
          color: "black",
          padding: "10px 25px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;