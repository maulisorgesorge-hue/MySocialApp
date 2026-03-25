const express = require('express');
const router = express.Router(); // Router चालू किया
const mongoose = require('mongoose');

// --- AR EFFECT MODEL ---
const AREffect = mongoose.model("AREffect", {
  name: String,
  type: String, // face, background, object
  fileUrl: String, 
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. CREATE AR EFFECT
router.post("/ar/create", async (req, res) => {
  const { name, type, fileUrl, createdBy } = req.body;
  const effect = new AREffect({ name, type, fileUrl, createdBy });
  await effect.save();
  res.json({ message: "AR Effect created", effect });
});

// 2. GET ALL AR EFFECTS
router.get("/ar/effects", async (req, res) => {
  const effects = await AREffect.find().sort({ createdAt: -1 });
  res.json({ total: effects.length, effects });
});

// 3. APPLY AR EFFECT (SIMULATED)
router.post("/ar/apply", async (req, res) => {
  const { effectId, mediaUrl } = req.body;
  const effect = await AREffect.findById(effectId);
  if (!effect) return res.status(404).send("AR effect not found");

  res.json({
    message: "AR effect applied (simulated)",
    appliedEffect: effect,
    mediaUrl: mediaUrl
  });
});

// सबसे जरूरी लाइन!
module.exports = router;
