const express = require('express');
const router = express.Router();
const analyzeMood = require('../services/moodAnalyzer');

/**
 * POST /api/mood/detect
 * Body:
 * {
 *   text: "I feel stressed and tired",
 *   noiseLevel: 25,
 *   mode: "personal" | "social" | "wellness"
 * }
 */
router.post('/detect', (req, res) => {
  const {
    text = "",
    noiseLevel = 0,
    mode = "personal"
  } = req.body;

  // 🛑 Basic validation
  if (noiseLevel < 0 || noiseLevel > 120) {
    return res.status(400).json({
      success: false,
      error: "Invalid noise level"
    });
  }

  // 🧠 Mood analysis
  const analysis = analyzeMood(text, noiseLevel, mode);

  res.json({
    success: true,
    input: { text, noiseLevel, mode },
    result: {
      mood: analysis.mood,
      confidence: analysis.confidence
    },
    explanation: analysis.explanation,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;