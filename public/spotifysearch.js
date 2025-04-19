document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/api/spotify/daylight");
      const data = await response.json();
  
      const container = document.getElementById("daylight-tracks");
      container.innerHTML = ""; 
  
      if (!data.tracks || data.tracks.length === 0) {
        container.innerHTML = "<p>No tracks found.</p>";
        return;
      }
  
      data.tracks.forEach(track => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h4>${track.name}</h4>
          <p>By ${track.artist}</p>
          <audio controls src="${track.preview_url}"></audio>
        `;
        container.appendChild(div);
      });
    } catch (err) {
      console.error("Spotify fetch error:", err);
    }
  });
  