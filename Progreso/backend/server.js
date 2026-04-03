// ===== IMPORTS =====
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
app.use("/api/session", require("./routes/sessionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
// ===== CONFIG =====
dotenv.config();
const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/api/users", require("./routes/userRoutes"));

// ===== DATABASE CONNECTION =====
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});