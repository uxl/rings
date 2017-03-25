express = require 'express'
router = express.Router()

# GET home page.

router.get '/', (req, res) ->
  res.render 'index', { title: 'Rings' }
  # is this live data

module.exports = router
