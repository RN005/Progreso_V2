const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    userId: String,
    duration: Number,
    completed: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Session", sessionSchema);