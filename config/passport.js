const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require("passport-facebook").Strategy
function auth (app) {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log('That email is not registered!')
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            console.log('email inin')
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  passport.use(new FacebookStrategy({
    clientID: 4813153298722595,
    clientSecret: '37c9fc733111a9defb67a5bc5825a9c5',
    callbackURL: 'http://localhost:3000/user/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  },
  (accessToken, refreshToken, profile, done) => {
    /* User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user)
    }) */
    console.log(profile)
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))})
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
module.exports = {
  authenticator: (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/user/signin')
  },
  auth
}
