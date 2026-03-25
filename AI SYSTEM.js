const express = require('express');
const router = express.Router();

// 1. AI CAPTION GENERATOR
router.post("/ai/caption", (req, res) => {
  const { text } = req.body;
  const captions = [
    "🔥 This is going viral!", "💯 Best moment ever!", "🚀 Trending now!",
    "😍 Love this vibe!", "✨ Must watch!", "🎯 Perfect shot!",
    "⚡ Crazy content!", "📈 Going to explode!", "😎 Next level post!", "🎬 Cinematic feel!"
  ];
  const randomCaption = captions[Math.floor(Math.random() * captions.length)];
  res.json({ original: text, aiCaption: randomCaption });
});

// 2. AI HASHTAG GENERATOR
router.post("/ai/hashtags", (req, res) => {
  const hashtags = ["#viral", "#trending", "#reels", "#explore", "#instagood", "#love", "#follow", "#like", "#video", "#fyp", "#trend", "#newpost"];
  const shuffled = hashtags.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 6);
  res.json({ hashtags: selected });
});

// 3. AI VIRAL SCORE
router.post("/ai/score", (req, res) => {
  const score = Math.floor(Math.random() * 100);
  let result = score > 70 ? "High Viral Chance 🔥" : score > 40 ? "Medium Chance ⚡" : "Low Chance";
  res.json({ score: score, result: result });
});

// 4. AI BEST TIME TO POST
router.get("/ai/best-time", (req, res) => {
  const times = ["8:00 AM", "12:30 PM", "3:00 PM", "6:00 PM", "8:00 PM", "10:00 PM"];
  const best = times[Math.floor(Math.random() * times.length)];
  res.json({ bestTime: best });
});

// 5. AI CONTENT SUGGESTIONS
router.get("/ai/suggestions", (req, res) => {
  const ideas = ["Make a trending dance reel 💃", "Post motivational content 💡", "Share daily routine vlog 📹", "Create funny meme video 😂", "Do a challenge video 🔥", "Use trending song 🎵", "Before/After transformation 📸"];
  const selected = ideas.sort(() => 0.5 - Math.random()).slice(0, 3);
  res.json({ suggestions: selected });
});

// 6. AI AUTO RESPONSE (COMMENT REPLY)
router.post("/ai/reply", (req, res) => {
  const replies = ["Thanks bro ❤️", "Appreciate it 🙌", "Love you all 😍", "Keep supporting 🔥", "Means a lot 💯", "Thank you 😊"];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  res.json({ reply: reply });
});

module.exports = router;
