const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- MESSAGE MODEL ---
const Message = mongoose.model("Message", {
  senderId: String,
  receiverId: String,
  text: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. SEND MESSAGE
router.post("/dm/send", async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const message = new Message({ senderId, receiverId, text });
  await message.save();

  // ध्यान दें: Socket.io (io.emit) का काम हम index.js में करेंगे 
  // या req.app.get('socketio') का इस्तेमाल करेंगे। अभी के लिए डेटा सेव हो रहा है।
  res.json({ message: "Message sent", data: message });
});

// 2. GET CHAT BETWEEN TWO USERS
router.get("/dm/chat/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).sort({ createdAt: 1 });

  res.json({ total: messages.length, messages });
});

// 3. MARK AS READ
router.post("/dm/read/:messageId", async (req, res) => {
  const message = await Message.findById(req.params.messageId);
  if (!message) return res.status(404).send("Message not found");

  message.read = true;
  await message.save();
  res.json({ message: "Message marked as read", data: message });
});

module.exports = router;
