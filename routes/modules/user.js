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
    successRedirect: '/',failureFlash: true,
    failureRedirect: '/user/signin'
  })
)
router.post('/signup', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('signup', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.push({ message: 'email 已被註冊！' })
      return res.render('signup', {
        errors,
        name,
        email,
        password,
        confirmPassword
    })}
    return bcrypt.genSalt(5).then(salt => bcrypt.hash(req.body.password, salt)).then(hash => {
      User.create({ name: req.body.name, email: req.body.email, password: hash })
        .then(() => {
          req.flash("success_msg","Sign up success")
          res.redirect('/user/signin')
        })
        .catch(err => console.log(err))
    }).catch(err => console.log(err))
  })
})
router.get('/signout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/user/signin')
})

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }))

module.exports = router
