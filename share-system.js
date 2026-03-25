const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require("path");
const fs = require("fs");

// --- ROUTES ---

// 1. SHARE POST (TOGGLE + COUNT)
router.post("/share/:postId", async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).send("Post not found");

  if (!post.shares) post.shares = [];
  let shared = false;

  if (post.shares.includes(userId)) {
    post.shares = post.shares.filter(id => id !== userId);
    shared = false;
  } else {
    post.shares.push(userId);
    shared = true;
  }

  await post.save();
  res.json({
    message: shared ? "Shared" : "Unshared",
    totalShares: post.shares.length,
    shared: shared
  });
});

// 2. SHARE LINK GENERATE
router.get("/share/link/:postId", async (req, res) => {
  const link = `http://your-app-url.com/post/${req.params.postId}`; // यहाँ अपना असली URL डालें
  res.json({ message: "Share Link", link: link });
});

// 3. DOWNLOAD FILE
router.get("/download/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).send("Post not found");

  const filePath = path.join(__dirname, "uploads", post.image || post.videoUrl);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  res.download(filePath);
});

// 4. STREAM VIDEO (For Reels/Videos)
router.get("/stream/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const filePath = path.join(__dirname, "uploads", post.videoUrl);

  if (!fs.existsSync(filePath)) return res.status(404).send("Video not found");

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    });
    file.pipe(res);
  } else {
    res.writeHead(200, { "Content-Length": fileSize, "Content-Type": "video/mp4" });
    fs.createReadStream(filePath).pipe(res);
  }
});

// 5. GET TOTAL SHARES
router.get("/shares/count/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  res.json({ totalShares: post.shares ? post.shares.length : 0 });
});

// 6. CLEAR ALL SHARES (Admin Only)
router.post("/shares/clear/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.shares = [];
  await post.save();
  res.json({ message: "All Shares Cleared", totalShares: 0 });
});

// सबसे जरूरी लाइन!
module.exports = router;
