const express = require("express")
const router = express.Router();
const movieRouter = require("./movies");
const seriesRouter = require("./series");

router.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

router.use("/movies", movieRouter);
router.use("/series", seriesRouter);

module.exports = router;