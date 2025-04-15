const { User } = require("../models");
const spotifyApi = require('../config/spotify');

const getAccessToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Access token set');
  } catch (err) {
    console.error('Error retrieving Spotify access token', err);
  }
};

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.redirect("/login?error=must include username and password");

    const user = await User.findByUsername(username);

    if (!user)
      return res.redirect("/login?error=username or password is incorrect");

    const passwordMatches = await User.checkPassword(password, user.password);

    if (!passwordMatches)
      return res.redirect("/login?error=username or password is incorrect");

    await getAccessToken();

    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect("/"));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function logout(req, res) {
  req.session.destroy(() => res.redirect("/"));
}

module.exports = { login, logout };

