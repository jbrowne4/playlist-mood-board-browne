const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});

router.get('/', (req, res) => {
  const samplePlaylists = [
    {
      title: "Dream Pop Drift",
    description: "Float through dreamy and hazy vocals.",
    image: "/images/dream-pop.jpg",
    vibe: "dream-pop"
  },
  {
    title: "Golden Hour Glow",
    description: "Warm, nostalgic tracks for sunlit moments.",
    image: "/images/golden-hour.jpg",
    vibe: "golden-hour"
  },
  {
    title: "Neon Night Vibes",
    description: "Electric beats for late-night city cruising.",
    image: "/images/neon-lights.jpg",
    vibe: "neon"
  },
  {
    title: "Rainy Day Reflection",
    description: "Soft, mellow sounds for introspective moods.",
    image: "/images/rainy-day.jpg",
    vibe: "rainy"
    }
  ];

  res.render('index', { playlists: samplePlaylists });
});

module.exports = router;
