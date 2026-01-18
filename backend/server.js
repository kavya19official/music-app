const express = require('express');
const cors = require('cors');

const moodRoutes = require('./routes/mood');
const playlistRoutes = require('./routes/playlist');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/mood', moodRoutes);
app.use('/api/playlist', playlistRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🎵 Auralyn backend running on port ${PORT}`);
});