const Session = require("../models/session");

// GET USER ANALYTICS
// /api/analytics/:userId
exports.getAnalytics = async (req, res) => {
    try {
        const sessions = await Session.find({
            userId: req.params.userId,
            completed: true,
        });

        const totalSessions = sessions.length;

        const totalFocusTime = sessions.reduce(
            (acc, session) => acc + session.duration,
            0
        );

        const totalXP = sessions.reduce((acc, session) => {
            if (session.duration <= 25) return acc + 10;
            if (session.duration <= 50) return acc + 22;
            return acc + 35;
        }, 0);

        res.json({
            success: true,
            totalSessions,
            totalFocusTime,
            totalXP,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};