const express = require('express');
const router = express.Router(); // Router का इस्तेमाल
const mongoose = require('mongoose');

// --- ROUTES ---

// 1. ADD COMMENT (app की जगह router लिखा है)
router.post("/comment/:postId", async (req, res) => {
  const { userId, text } = req.body;
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).send("Post not found");

  const newComment = {
    _id: new mongoose.Types.ObjectId(),
    userId, text, likes: [], replies: [], createdAt: new Date()
  };

  post.comments.push(newComment);
  await post.save();
  res.json({ message: "Comment Added", comment: newComment, totalComments: post.comments.length });
});

// 2. GET ALL COMMENTS
router.get("/comments/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  res.json({ totalComments: post.comments.length, comments: post.comments });
});

// 3. DELETE COMMENT
router.post("/comment/delete/:postId/:commentId", async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.find(c => c._id.toString() === req.params.commentId);

  if (!comment) return res.status(404).send("Comment not found");
  if (comment.userId !== userId) return res.status(403).send("Not allowed");

  post.comments = post.comments.filter(c => c._id.toString() !== req.params.commentId);
  await post.save();
  res.json({ message: "Comment Deleted", totalComments: post.comments.length });
});

// 4. LIKE / UNLIKE COMMENT
router.post("/comment/like/:postId/:commentId", async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.find(c => c._id.toString() === req.params.commentId);

  let liked = false;
  if (comment.likes.includes(userId)) {
    comment.likes = comment.likes.filter(id => id !== userId);
    liked = false;
  } else {
    comment.likes.push(userId);
    liked = true;
  }
  await post.save();
  res.json({ message: liked ? "Comment Liked" : "Comment Unliked", totalLikes: comment.likes.length, liked: liked });
});

// 5. ADD REPLY TO COMMENT
router.post("/comment/reply/:postId/:commentId", async (req, res) => {
  const { userId, text } = req.body;
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.find(c => c._id.toString() === req.params.commentId);

  const reply = { _id: new mongoose.Types.ObjectId(), userId, text, createdAt: new Date() };
  comment.replies.push(reply);
  await post.save();
  res.json({ message: "Reply Added", reply: reply });
});

// 6. EDIT COMMENT
router.post("/comment/edit/:postId/:commentId", async (req, res) => {
  const { userId, text } = req.body;
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.find(c => c._id.toString() === req.params.commentId);

  if (comment.userId !== userId) return res.status(403).send("Not allowed");
  comment.text = text;
  await post.save();
  res.json({ message: "Comment Updated", comment: comment });
});

// 7. CLEAR ALL COMMENTS (Admin)
router.post("/comments/clear/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.comments = [];
  await post.save();
  res.json({ message: "All Comments Cleared", totalComments: 0 });
});

// सबसे जरूरी लाइन!
module.exports = router; 
