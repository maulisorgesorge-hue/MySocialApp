const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- ROUTES ---

// 1. USER DASHBOARD (Aggregated Data)
router.get("/dashboard/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  // सभी मॉडल्स से डेटा लाना (सुनिश्चित करें कि ये मॉडल्स index.js में डिफाइन हैं)
  const posts = await mongoose.model("Post").find({ userId });
  const reels = await mongoose.model("Reel").find({ userId });
  
  const likes = posts.reduce((acc, p) => acc + (p.likes ? p.likes.length : 0), 0);
  const comments = posts.reduce((acc, p) => acc + (p.comments ? p.comments.length : 0), 0);
  
  // Earnings डेटा
  const earnings = await mongoose.model("Earning").find({ userId });
  const totalEarnings = earnings.reduce((acc, e) => acc + e.amount, 0);

  res.json({
    postsCount: posts.length,
    reelsCount: reels.length,
    totalLikes: likes,
    totalComments: comments,
    totalEarnings
  });
});

// 2. PLATFORM-WIDE DASHBOARD (Admin के लिए)
router.get("/dashboard/platform", async (req, res) => {
  const totalUsers = await mongoose.model("User").countDocuments();
  const totalPosts = await mongoose.model("Post").countDocuments();
  const totalEarnings = (await mongoose.model("Earning").find()).reduce((acc, e) => acc + e.amount, 0);

  res.json({
    totalUsers,
    totalPosts,
    totalEarnings
  });
});

// 3. TRENDING CONTENT
router.get("/dashboard/trending", async (req, res) => {
  const trendingPosts = await mongoose.model("Analytics").find().sort({ likes: -1, views: -1 }).limit(10);
  res.json({ trendingPosts });
});

module.exports = router;
