const Session = require("../models/session");
const User = require("../models/user");
const { calculateXP } = require("../xpCalculator"); // ⭐ correct path now

// ================================
// START STUDY SESSION
// POST /api/sessions/start
// ================================
exports.startSession = async (req, res) => {
    try {
        const { userId, duration } = req.body;

        // validation
        if (!userId || !duration) {
            return res.status(400).json({
                success: false,
                message: "userId and duration are required"
            });
        }

        const session = new Session({
            userId,
            duration,
            completed: false,
            startedAt: new Date()
        });

        await session.save();

        res.status(201).json({
            success: true,
            message: "Session started successfully",
            data: session
        });

    } catch (err) {
        console.error("Start Session Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to start session",
            error: err.message
        });
    }
};

// ================================
// END SESSION + GIVE XP ⭐
// POST /api/sessions/end
// ================================
exports.endSession = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "sessionId is required"
            });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        // prevent double XP bug 🚨
        if (session.completed) {
            return res.status(400).json({
                success: false,
                message: "Session already completed"
            });
        }

        session.completed = true;
        session.endedAt = new Date();
        await session.save();

        // ===== XP CALCULATION =====
        const xpEarned = calculateXP(session.duration);

        const user = await User.findById(session.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.xp += xpEarned;
        await user.save();

        res.json({
            success: true,
            message: "Session ended successfully",
            xpEarned,
            totalXP: user.xp,
            session
        });

    } catch (err) {
        console.error("End Session Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to end session",
            error: err.message
        });
    }
};

// ================================
// GET ALL USER SESSIONS
// GET /api/sessions/user/:id
// ================================
exports.getUserSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.params.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: sessions.length,
            data: sessions
        });

    } catch (err) {
        console.error("Get Sessions Error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch sessions",
            error: err.message
        });
    }
};