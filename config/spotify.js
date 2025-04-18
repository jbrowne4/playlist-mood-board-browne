const axios = require('axios');
require('dotenv').config();

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = new Date().getTime();

  // If token is still valid, return it
  if (accessToken && now < tokenExpiresAt) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiresAt = now + response.data.expires_in * 1000; // expires_in is in seconds

    return accessToken;
  } catch (error) {
    console.error('Error getting Spotify access token:', error.response?.data || error.message);
    throw new Error('Failed to get access token from Spotify');
  }
}

async function searchTracks(query) {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error.response?.data || error.message);
    throw new Error('Failed to search tracks');
  }
}

module.exports = {
  searchTracks,
  getAccessToken
};


