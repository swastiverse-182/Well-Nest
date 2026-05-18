import express from "express";
import CalendarEvent from "../models/CalendarEvent.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* Get all events for user */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const events = await CalendarEvent.find({ user: req.user.id })
      .sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

/* Add event */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Title and date required" });
    }

    const event = await CalendarEvent.create({
      user: req.user.id,
      title,
      date,
      description,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to add event" });
  }
});

/* Delete event */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await CalendarEvent.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({ message: "Event removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
