const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,

    // Preferences from survey
    focusDuration: String,
    preferredSession: String,
    soundPreference: String,
    distractions: [String],
    motivationType: [String],

    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);