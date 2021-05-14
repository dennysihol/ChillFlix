const express = require('express')
const router = express.Router()
const SeriesController = require('../controllers/seriesController')

router.get('/', SeriesController.find)
router.post('/', SeriesController.create)
router.get('/:id', SeriesController.findOne)
router.put('/:id', SeriesController.update)
router.delete('/:id', SeriesController.delete)

module.exports = router