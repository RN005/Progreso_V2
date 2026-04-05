

const Session = require("../models/session");
const User = require("../models/User");
const { calculateXP } = require("../utils/xpCalculator"); // ✅ import fixed

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

// END SESSION + GIVE XP ⭐ (FINAL FIXED VERSION)
exports.endSession = async (req, res) => {
    try {
        console.log("🔥 END SESSION API HIT");
        console.log("BODY:", req.body);

        const { sessionId, duration } = req.body;

        if (!sessionId) {
            return res.status(400).json({ message: "No sessionId received" });
        }

        // ✅ FIXED XP CALCULATION USING xpCalculator
        const xp = calculateXP(duration); 
        console.log("XP CALCULATED:", xp);

        // 🔥 FORCE UPDATE IN DB
        const updatedSession = await Session.findByIdAndUpdate(
            sessionId,
            { completed: true, duration, xp },
            { new: true }
        );

        console.log("UPDATED SESSION:", updatedSession);

        if (!updatedSession) {
            return res.status(404).json({ message: "Session NOT FOUND" });
        }

        // ✅ update user XP
        const user = await User.findById(updatedSession.userId);
        if (!user.xp) user.xp = 0; // safety check
        user.xp += xp;
        await user.save();

        res.json({
            message: "Session ended",
            session: updatedSession,
            xp: xp,
        });

    } catch (err) {
        console.error("END SESSION ERROR:", err);
        res.status(500).json({ error: err.message });
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