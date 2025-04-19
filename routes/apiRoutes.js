const { getDaylightTracks } = require("../utils/spotify");

router.get("/spotify/daylight", async (req, res) => {
  try {
    const tracks = await getDaylightTracks();
    res.json({ tracks });
  } catch (err) {
    console.error("Spotify API error:", err);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
});
