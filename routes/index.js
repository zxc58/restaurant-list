const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const resetaurants = require('./modules/restaurants')
const user = require('./modules/user')

router.use('/user', user)
router.use('/restaurants', resetaurants)
router.use('/', home)
module.exports = router
