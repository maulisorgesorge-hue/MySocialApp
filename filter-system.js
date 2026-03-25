const express = require('express');
const router = express.Router();
const Jimp = require("jimp");
const path = require("path");

// --- ROUTES ---

// 1. APPLY FILTER TO IMAGE
router.post("/filter/apply", async (req, res) => {
  const { imagePath, filterType } = req.body; // imagePath: "uploads/photo.jpg"

  try {
    // फाइल का पूरा रास्ता (Full Path) निकालें
    const fullPath = path.join(__dirname, imagePath);
    const image = await Jimp.read(fullPath);

    switch (filterType) {
      case "grayscale": image.grayscale(); break;
      case "invert": image.invert(); break;
      case "sepia": image.sepia(); break;
      case "blur": image.blur(5); break;
      case "brightness": image.brightness(0.3); break;
      case "contrast": image.contrast(0.5); break;
      default: return res.status(400).json({ message: "Invalid filter type" });
    }

    // नया नाम दें (e.g., photo_filtered.jpg)
    const ext = path.extname(fullPath);
    const baseName = path.basename(fullPath, ext);
    const newFileName = `${baseName}_filtered${ext}`;
    const newPath = path.join(__dirname, "uploads", newFileName);

    await image.writeAsync(newPath);

    res.json({ 
      message: "Filter applied successfully", 
      filteredImage: `uploads/${newFileName}` 
    });
  } catch (err) {
    res.status(500).json({ message: "Error applying filter", error: err.message });
  }
});

// 2. GET AVAILABLE FILTERS
router.get("/filter/list", (req, res) => {
  const filters = ["grayscale", "invert", "sepia", "blur", "brightness", "contrast"];
  res.json({ filters });
});

module.exports = router;
