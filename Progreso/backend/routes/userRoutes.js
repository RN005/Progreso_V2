const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST → Signup user
router.post("/signup", async (req, res) => {
    try {
        const {
            name,
            email,
            focusDuration,
            preferredSession,
            soundPreference,
            distractions,
            motivationType
        } = req.body;

        const user = new User({
            name: name || "Anonymous",
            email: email || "noemail@test.com",
            focusDuration: focusDuration || "",
            preferredSession: preferredSession || "",
            soundPreference: soundPreference || "",
            distractions: distractions || [],
            motivationType: motivationType || []
        });

        await user.save();

        res.status(201).json(user);
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;