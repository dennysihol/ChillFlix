const express = require("express")
const router = express.Router();
const SeriesController = require("../controllers/seriesController");

router.get("", SeriesController.getTvSeries);
router.post("", SeriesController.addTvSeries);
router.put("/:id", SeriesController.updateTvSeries);
router.delete("/:id", SeriesController.deleteTvSeries);

module.exports = router;