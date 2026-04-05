require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// HEALTH CHECK ROUTE
app.get("/", (req, res) => {
    res.send("Progreso Backend Running 🚀");
});

// ROUTES
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/session", require("./routes/sessionRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));