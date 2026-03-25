const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- MODEL ---
const CartItem = mongoose.model("CartItem", {
  userId: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Product मॉडल से लिंक
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. ADD TO CART (अगर पहले से है तो क्वांटिटी बढ़ाएं)
router.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let item = await CartItem.findOne({ userId, productId });
    if (item) {
      item.quantity += (quantity || 1);
    } else {
      item = new CartItem({ userId, productId, quantity });
    }

    await item.save();
    res.json({ message: "Item added to cart 🛒", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET USER CART (सारे प्रोडक्ट्स की डिटेल्स के साथ)
router.get("/cart/:userId", async (req, res) => {
  try {
    const items = await CartItem.find({ userId: req.params.userId })
      .populate("productId"); // प्रोडक्ट की पूरी जानकारी फेच करेगा
    
    // कार्ट का टोटल कैलकुलेट करना (Optional but helpful)
    const subTotal = items.reduce((acc, curr) => acc + (curr.productId.price * curr.quantity), 0);
    
    res.json({ totalItems: items.length, subTotal, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. REMOVE ITEM
router.post("/cart/remove", async (req, res) => {
  const { userId, productId } = req.body;
  await CartItem.findOneAndDelete({ userId, productId });
  res.json({ message: "Item removed from cart" });
});

module.exports = router;
