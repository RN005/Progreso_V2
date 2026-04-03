const Session = require("../models/session");
const User = require("../models/User");
const { calculateXP } = require("../utils/xpCalculator");

// START SESSION
exports.startSession = async (req, res) => {
    try {
        const session = new Session({
            userId: req.body.userId,
            duration: req.body.duration,
            completed: false,
        });

        await session.save();
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// END SESSION + GIVE XP ⭐
exports.endSession = async (req, res) => {
    try {
        const session = await Session.findById(req.body.sessionId);
        session.completed = true;
        await session.save();

        // XP LOGIC
        const xp = calculateXP(session.duration);
        const user = await User.findById(session.userId);
        user.xp += xp;
        await user.save();

        res.json({ session, xpEarned: xp });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET USER SESSIONS
exports.getUserSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.params.id });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};