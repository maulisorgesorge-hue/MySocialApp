const express = require('express');
const router = express.Router(); // राउटर बनाया
const mongoose = require('mongoose');

// --- MODEL ---
const Earning = mongoose.model("Earning", {
  userId: String,
  postId: String,
  type: String, 
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---
// ध्यान दें: यहाँ 'app' की जगह 'router' कर दिया गया है
router.post("/earnings/add", async (req, res) => {
  const { userId, postId, type, amount } = req.body;
  const earning = new Earning({ userId, postId, type, amount });
  await earning.save();
  res.json({ message: "Earning recorded", earning });
});

router.get("/earnings/user/:userId", async (req, res) => {
  const earnings = await Earning.find({ userId: req.params.userId });
  const total = earnings.reduce((acc, curr) => acc + curr.amount, 0);
  res.json({ totalEarnings: total, earnings: earnings });
});

router.get("/earnings/post/:postId", async (req, res) => {
  const earnings = await Earning.find({ postId: req.params.postId });
  const total = earnings.reduce((acc, curr) => acc + curr.amount, 0);
  res.json({ totalEarnings: total, earnings: earnings });
});

// सबसे जरूरी लाइन!
module.exports = router; 
