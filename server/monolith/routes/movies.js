const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/movieController')

router.get('/', MovieController.find)
router.post('/', MovieController.create)
router.put('/:id', MovieController.update)
router.delete('/:id', MovieController.delete)

module.exports = router