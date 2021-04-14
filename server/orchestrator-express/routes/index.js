const express = require("express")
const router = express.Router();
const movieRouter = require("./movies");
const seriesRouter = require("./series");
const Controller = require('../controllers/controller')

router.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

router.get("/entertainme", Controller.showAllData);

router.use("/movies", movieRouter);
router.use("/series", seriesRouter);

module.exports = router;