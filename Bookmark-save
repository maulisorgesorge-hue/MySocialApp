const express = require('express');
const router = express.Router(); // राउटर बनाया
const mongoose = require('mongoose');

// --- MODEL ---
const Bookmark = mongoose.model("Bookmark", {
  userId: String,
  postId: String,
  reelId: String,      
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// SAVE POST OR REEL (app की जगह router लिखा है)
router.post("/bookmark/save", async (req, res) => {
  const { userId, postId, reelId } = req.body;

  const exists = await Bookmark.findOne({ userId, postId, reelId });
  if (exists) return res.status(400).send("Already bookmarked");

  const bookmark = new Bookmark({ userId, postId, reelId });
  await bookmark.save();

  res.json({ message: "Saved successfully", bookmark });
});

// GET USER BOOKMARKS
router.get("/bookmark/:userId", async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json({ total: bookmarks.length, bookmarks });
});

// REMOVE BOOKMARK
router.post("/bookmark/remove", async (req, res) => {
  const { userId, postId, reelId } = req.body;
  await Bookmark.findOneAndDelete({ userId, postId, reelId });
  res.json({ message: "Bookmark removed" });
});

// सबसे जरूरी लाइन!
module.exports = router; 
