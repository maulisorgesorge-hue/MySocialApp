const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || "MY_SUPER_SECRET_KEY_123";

// --- MIDDLEWARE: AUTH CHECK ---
// इसे हम एक्सपोर्ट करेंगे ताकि दूसरी फाइलों में इस्तेमाल हो सके
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN" फॉर्मेट के लिए

  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

// --- ROUTES ---

// 1. SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // चेक करें कि यूजर पहले से तो नहीं है
    const exists = await mongoose.model("User").findOne({ email });
    if (exists) return res.status(400).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new (mongoose.model("User"))({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await mongoose.model("User").findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("Invalid credentials");

  // टोकन बनाना
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    message: "Login success",
    token: token,
    user: { id: user._id, username: user.username, email: user.email }
  });
});

module.exports = { router, auth };
