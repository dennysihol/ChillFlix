const express = require("express")
const router = express.Router();
const MovieController = require("../controllers/movieController");

router.get("", MovieController.getMovie);
router.post("", MovieController.addMovie);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

module.exports = router;