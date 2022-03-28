const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/signin', (req, res) => {
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })
)
router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      console.log('email 已被註冊')
      return res.redirect('/user/signup')
    }
    return bcrypt.genSalt(5).then(salt => bcrypt.hash(req.body.password, salt)).then(hash => {
      User.create({ name: req.body.name, email: req.body.email, password: hash }).then(() => res.redirect('/')).catch(err => console.log('err'))
    })
  })
})
router.get('/signout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/auth/facebook', passport.authenticate('facebook',{scope:['email','public_profile']}))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect:'/',failureRedirect: '/' }))

module.exports = router
