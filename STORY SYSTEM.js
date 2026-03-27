const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- STORY MODEL ---
const Story = mongoose.model("Story", {
  userId: String,
  media: String,
  caption: String,
  viewers: [String],
  // 24 घंटे बाद ऑटो-डिलीट (86400 सेकंड)
  createdAt: { type: Date, default: Date.now, expires: 86400 }
});

// --- ROUTES ---

// 1. ADD STORY
router.post("/story", async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.json({ message: "Story Added Successfully 📸", story });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL ACTIVE STORIES
router.get("/stories", async (req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.json({ totalStories: stories.length, stories });
});

// 3. VIEW STORY (Add Viewer)
router.post("/story/view/:storyId", async (req, res) => {
  const { userId } = req.body;
  const story = await Story.findById(req.params.storyId);
  
  if (!story) return res.status(404).send("Story not found");

  if (!story.viewers.includes(userId)) {
    story.viewers.push(userId);
    await story.save();
  }

  res.json({ message: "Story Viewed", totalViews: story.viewers.length });
});

// 4. DELETE STORY
router.delete("/story/:storyId", async (req, res) => {
  await Story.findByIdAndDelete(req.params.storyId);
  res.json({ message: "Story Deleted" });
});

module.exports = router;
