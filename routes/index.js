const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const resetaurants = require('./modules/restaurants')
const user = require('./modules/user')
const { authenticator } = require('../config/passport')

router.use('/user', user)
router.use('/restaurants', resetaurants)
router.use('/', authenticator, home)
module.exports = router
