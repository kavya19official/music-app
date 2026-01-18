const express = require('express');
const router = express.Router();
const musicEngine = require('../services/musicEngine');

router.get('/:mood', (req, res) => {
  const mood = req.params.mood;
  const playlist = musicEngine(mood);

  res.json({
    mood,
    playlist
  });
});

module.exports = router;