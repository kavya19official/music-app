const express = require('express');
const router = express.Router();
const musicEngine = require('../services/musicEngine');

/**
 * GET /api/playlist
 * Query Params:
 * mood: calm | happy | energetic | neutral
 * mode: personal | social | wellness | business
 * energy: low | medium | high
 */
router.get('/', (req, res) => {
  const {
    mood = "neutral",
    mode = "personal",
    energy = "medium"
  } = req.query;

  const result = musicEngine({ mood, mode, energy });

  res.json({
    success: true,
    context: { mood, mode, energy },
    explanation: result.explanation,
    playlist: result.playlist
  });
});

module.exports = router;