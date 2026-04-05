exports.calculateXP = (duration) => {
    // Pomodoro = 25 min → 10 XP
    if (duration <= 25) return 10;

    // Long focus session → bonus XP
    if (duration <= 50) return 22;

    // Deep work bonus
    return 35;
};