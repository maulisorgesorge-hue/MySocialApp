const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

// एक्सप्रेस ऐप शुरू करें
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// --- DATABASE CONNECTION ---
// यहाँ अपनी MongoDB URI डालें
const MONGO_URI = "mongodb+srv://your_username:your_password@cluster.mongodb.net/MySocialApp";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Database Connected Successfully ✅"))
  .catch((err) => console.log("DB Connection Error: ", err));

// --- IMPORT ROUTES (जो फोल्डर्स हमने अभी बनाए) ---
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const storyRoute = require("./routes/story");

// --- USE ROUTES ---
// अब आपके API Endpoints ऐसे होंगे: /api/auth/login, /api/posts/all आदि
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/stories", storyRoute);

// Home Route (चेक करने के लिए कि सर्वर चल रहा है)
app.get("/", (req, res) => {
  res.send("Welcome to My Social Media API 🚀");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥`);
});
