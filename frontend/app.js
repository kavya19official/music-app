async function getRecommendations() {
  const mood = document.getElementById("mood").value;
  const playlistDiv = document.getElementById("playlist");

  playlistDiv.innerHTML = "<p>Loading recommendations...</p>";

  try {
    // Change URL to your backend endpoint
    const response = await fetch(`http://localhost:5000/recommend?mood=${mood}`);
    const data = await response.json();

    playlistDiv.innerHTML = "<h3>Recommended Tracks</h3>";

    data.tracks.forEach(track => {
      const trackDiv = document.createElement("div");
      trackDiv.className = "track";
      trackDiv.innerText = `${track.title} — ${track.artist}`;
      playlistDiv.appendChild(trackDiv);
    });

  } catch (error) {
    playlistDiv.innerHTML = "<p>Failed to load recommendations.</p>";
    console.error(error);
  }
}