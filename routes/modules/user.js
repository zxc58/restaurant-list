const express = require('express')
const router = express.Router()

router.get('/signin', (req, res) => {
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signin', (req, res) => {

})
router.post('/signup', (req, res) => {

})
router.get('/signout', (req, res) => {

})
module.exports = router
