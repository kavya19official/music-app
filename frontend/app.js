const moodButtons = document.querySelectorAll(".mood");
const playlist = document.getElementById("playlist");
const statusText = document.getElementById("status");

moodButtons.forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    fetchRecommendations(mood);
  });
});

async function fetchRecommendations(mood) {
  playlist.innerHTML = "";
  statusText.innerText = "Analyzing mood and generating recommendations...";

  try {
    const response = await fetch(
      `http://localhost:5000/recommend?mood=${mood}`
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    statusText.innerText = `Playlist for "${mood}" mood`;

    data.tracks.forEach(track => {
      const li = document.createElement("li");
      li.className = "track";
      li.innerText = `${track.title} — ${track.artist}`;
      playlist.appendChild(li);
    });

    if (data.tracks.length === 0) {
      statusText.innerText = "No recommendations found.";
    }

  } catch (error) {
    statusText.innerText = "Failed to fetch recommendations. Please try again.";
    console.error(error);
  }
}