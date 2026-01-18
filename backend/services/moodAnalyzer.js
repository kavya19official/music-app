module.exports = (text = "", noiseLevel = 0, mode = "personal") => {
  const t = text.toLowerCase();

  let scores = {
    calm: 0,
    happy: 0,
    energetic: 0,
    stressed: 0,
    neutral: 1
  };

  const keywords = {
    calm: ["relax", "peace", "sleep", "slow", "tired"],
    happy: ["happy", "joy", "excited", "fun", "smile"],
    energetic: ["party", "dance", "gym", "hype"],
    stressed: ["stress", "anxious", "pressure", "tense"]
  };

  for (const mood in keywords) {
    keywords[mood].forEach(word => {
      if (t.includes(word)) scores[mood] += 2;
    });
  }

  // 🔊 Noise fusion
  if (noiseLevel > 85) scores.energetic += 3;
  else if (noiseLevel > 60) scores.happy += 2;
  else if (noiseLevel < 30) scores.calm += 2;

  // 🧘 Mode influence
  if (mode === "wellness") scores.calm += 2;
  if (mode === "social") scores.energetic += 2;

  // 🛑 Stress override
  let finalMood = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  if (finalMood === "stressed") finalMood = "calm";

  const confidence = Math.min(scores[finalMood] * 20, 100);

  return {
    mood: finalMood,
    confidence,
    explanation: {
      scores,
      dominantSignal: noiseLevel > 70 ? "environment" : "text"
    }
  };
};