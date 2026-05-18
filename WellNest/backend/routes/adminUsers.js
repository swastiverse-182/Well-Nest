import express from "express";
import User from "../models/User.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// GET all users (admin)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE user by ID (admin)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// USER ANALYTICS (admin)
router.get("/analytics", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayUsers = await User.countDocuments({
      createdAt: { $gte: today },
    });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const weeklyUsers = await User.countDocuments({
      createdAt: { $gte: last7Days },
    });

    res.json({
      totalUsers,
      todayUsers,
      weeklyUsers,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
