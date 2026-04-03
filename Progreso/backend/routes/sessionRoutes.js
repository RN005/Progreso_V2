const express = require("express");
const router = express.Router();
const {
    startSession,
    endSession,
    getUserSessions,
} = require("../controllers/sessionController");

router.post("/start", startSession);
router.post("/end", endSession);
router.get("/user/:id", getUserSessions);

module.exports = router;