const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- LIVE SESSION MODEL ---
const LiveSession = mongoose.model("LiveSession", {
  userId: String,
  title: String,
  viewers: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. START LIVE SESSION
router.post("/live/start", async (req, res) => {
  const { userId, title } = req.body;
  const live = new LiveSession({ userId, title });
  await live.save();

  // Socket.io emit (req.app.get से io एक्सेस करना)
  const io = req.app.get('socketio');
  if (io) io.emit("liveStarted", live);

  res.json({ message: "Live started", live });
});

// 2. END LIVE SESSION
router.post("/live/end/:liveId", async (req, res) => {
  const live = await LiveSession.findById(req.params.liveId);
  if (!live) return res.status(404).send("Live session not found");

  live.isActive = false;
  await live.save();

  const io = req.app.get('socketio');
  if (io) io.emit("liveEnded", live);

  res.json({ message: "Live ended", live });
});

// 3. GET ACTIVE LIVE SESSIONS (Home Page के लिए)
router.get("/live/active", async (req, res) => {
  const activeLives = await LiveSession.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(activeLives);
});

module.exports = router;
