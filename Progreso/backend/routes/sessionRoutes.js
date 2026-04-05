const express = require("express");
const router = express.Router();

const {
    startSession,
    endSession,
    getUserSessions,
} = require("../controllers/sessionController");

// Start session
router.post("/start", startSession);

// End session
router.post("/end", endSession);

// Get sessions of user
router.get("/user/:id", getUserSessions);

module.exports = router;