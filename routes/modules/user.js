const express = require('express')
const router = express.Router()
const passport = require('passport')
router.get('/signin', (req, res) => {
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)
router.post('/signup', (req, res) => {

})
router.get('/signout', (req, res) => {

})
module.exports = router
