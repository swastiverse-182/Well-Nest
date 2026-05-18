import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* GET all goals (authenticated) */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      healthGoals: user.healthGoals,
      workoutGoals: user.workoutGoals,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ADD goal (authenticated) */
router.post("/", authMiddleware, async (req, res) => {
  const { healthGoal, workoutGoal } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (healthGoal) user.healthGoals.push(healthGoal);
    if (workoutGoal) user.workoutGoals.push(workoutGoal);

    await user.save();

    res.json({
      message: "Goal added",
      healthGoals: user.healthGoals,
      workoutGoals: user.workoutGoals,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add goal" });
  }
});

/* DELETE goal (authenticated) */
router.delete("/", authMiddleware, async (req, res) => {
  const { type, index } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (type === "health") user.healthGoals.splice(index, 1);
    if (type === "workout") user.workoutGoals.splice(index, 1);

    await user.save();

    res.json({
      healthGoals: user.healthGoals,
      workoutGoals: user.workoutGoals,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete goal" });
  }
});

export default router;
