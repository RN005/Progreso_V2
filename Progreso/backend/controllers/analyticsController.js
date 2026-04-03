const Session = require("../models/session");

exports.getAnalytics = async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.params.userId });

        const totalSessions = sessions.length;
        const totalFocusTime = sessions.reduce(
            (sum, s) => sum + s.duration,
            0
        );
        const avgSession =
            totalSessions === 0 ? 0 : totalFocusTime / totalSessions;

        res.json({
            totalSessions,
            totalFocusTime,
            avgSession,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};