const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ BETTER CORS CONFIG (important)
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/session", require("./routes/sessionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Progreso")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
