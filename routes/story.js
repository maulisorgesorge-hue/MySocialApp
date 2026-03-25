const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// 1. नई स्टोरी डालना
router.post("/add", async (req, res) => {
  try {
    const { userId, media, caption } = req.body;
    const newStory = new Story({ userId, media, caption });
    await newStory.save();
    res.status(201).json({ message: "Story shared! 🤳", newStory });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. दोस्तों की स्टोरीज देखना
router.get("/feed/:userId", async (req, res) => {
  try {
    // यहाँ सिर्फ 24 घंटे पुरानी स्टोरीज ही दिखेंगी (TTL logic)
    const stories = await Story.find().populate("userId", "username profilePicture");
    res.json(stories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
  
