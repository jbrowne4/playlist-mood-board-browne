const axios = require("axios");

let accessToken = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

  const response = await axios.post("https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }), {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

  accessToken = response.data.access_token;
  return accessToken;
}

async function getDaylightTracks() {
  const token = await getAccessToken();
  const playlistId = "37i9dQZF1DX1BzILRveYHb"; 

  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const tracks = response.data.items.map(item => ({
    name: item.track.name,
    artist: item.track.artists[0].name,
    preview_url: item.track.preview_url
  })).filter(t => t.preview_url);

  return tracks;
}

module.exports = { getDaylightTracks };

